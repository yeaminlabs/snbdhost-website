const express = require('express');
const slugify = require('slugify');
const jwt = require('jsonwebtoken');
const { getDb, all, get, run, saveDb } = require('../db/database');
const requireAuth = require('../middleware/auth');
const router = express.Router();

// GET /api/posts
router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const { page = 1, limit = 10, category, status } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    // Only show drafts to authenticated admins (verified via session cookie)
    let showAll = false;
    if (status === 'all' && req.cookies && req.cookies.snbd_admin_session) {
      try {
        jwt.verify(req.cookies.snbd_admin_session, process.env.JWT_SECRET, { algorithms: ['HS256'] });
        showAll = true;
      } catch { /* invalid/expired cookie — treat as unauthenticated */ }
    }

    let where = showAll ? '1=1' : "status = 'published'";
    const params = [];

    if (category) {
      where += ' AND category = ?';
      params.push(category);
    }

    const posts = all(
      db,
      `SELECT id, title, slug, excerpt, author, category, tags,
              featured_image_url, status, published_at, created_at
       FROM posts WHERE ${where}
       ORDER BY COALESCE(published_at, created_at) DESC
       LIMIT ? OFFSET ?`,
      [...params, Number(limit), Number(offset)]
    );

    const totalRow = get(db, `SELECT COUNT(*) as count FROM posts WHERE ${where}`, params);
    const total = totalRow ? totalRow.count : 0;

    res.json({ posts, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/posts/:slug
router.get('/:slug', async (req, res) => {
  try {
    const db = await getDb();
    const post = get(
      db,
      "SELECT * FROM posts WHERE slug = ? AND status = 'published'",
      [req.params.slug]
    );

    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.tags) {
      try { post.tags = JSON.parse(post.tags); } catch {}
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/posts
router.post('/', requireAuth, async (req, res) => {
  try {
    const db = await getDb();
    const {
      title, slug: customSlug, content, excerpt, author, category, tags,
      featured_image_url, status, meta_title, meta_description, og_image,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'title and content are required' });
    }

    const slug = customSlug
      ? slugify(customSlug, { lower: true, strict: true })
      : slugify(title, { lower: true, strict: true });

    const existing = get(db, 'SELECT id FROM posts WHERE slug = ?', [slug]);
    if (existing) {
      return res.status(409).json({ error: 'A post with this slug or title already exists' });
    }

    const published_at = status === 'published' ? new Date().toISOString() : null;

    const result = run(db, `
      INSERT INTO posts
        (title, slug, excerpt, content, author, category, tags,
         featured_image_url, status, meta_title, meta_description, og_image, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title, slug, excerpt || null, content,
        author || 'SNBD HOST Team', category || null,
        tags ? JSON.stringify(tags) : null,
        featured_image_url || null,
        status || 'draft',
        meta_title || null, meta_description || null, og_image || null,
        published_at,
      ]
    );

    saveDb();
    triggerSitemapGeneration();
    res.status(201).json({ id: result.lastInsertRowid, slug });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/posts/:id
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const db = await getDb();
    const existing = get(db, 'SELECT * FROM posts WHERE id = ?', [req.params.id]);
    if (!existing) return res.status(404).json({ error: 'Post not found' });

    const {
      title, slug: customSlug, content, excerpt, author, category, tags,
      featured_image_url, status, meta_title, meta_description, og_image,
    } = req.body;

    const slug = customSlug
      ? slugify(customSlug, { lower: true, strict: true })
      : (existing.slug || slugify(title, { lower: true, strict: true }));

    const duplicate = get(db, 'SELECT id FROM posts WHERE slug = ? AND id != ?', [slug, req.params.id]);
    if (duplicate) {
      return res.status(409).json({ error: 'A post with this slug already exists' });
    }

    const published_at =
      status === 'published' && !existing.published_at
        ? new Date().toISOString()
        : existing.published_at;

    run(db, `
      UPDATE posts SET
        title = ?, slug = ?, content = ?, excerpt = ?, author = ?, category = ?, tags = ?,
        featured_image_url = ?, status = ?, meta_title = ?, meta_description = ?,
        og_image = ?, published_at = ?, updated_at = datetime('now')
      WHERE id = ?`,
      [
        title, slug, content, excerpt || null,
        author || 'SNBD HOST Team', category || null,
        tags ? JSON.stringify(tags) : null,
        featured_image_url || null,
        status || existing.status,
        meta_title || null, meta_description || null, og_image || null,
        published_at, req.params.id,
      ]
    );

    saveDb();
    triggerSitemapGeneration();
    res.json({ success: true, slug });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/posts/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const db = await getDb();
    const existing = get(db, 'SELECT id FROM posts WHERE id = ?', [req.params.id]);
    if (!existing) return res.status(404).json({ error: 'Post not found' });

    run(db, 'DELETE FROM posts WHERE id = ?', [req.params.id]);
    saveDb();
    triggerSitemapGeneration();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const { exec } = require('child_process');
const path = require('path');

function triggerSitemapGeneration() {
  const scriptPath = path.join(__dirname, '../../scripts/generate-sitemap.cjs');
  const cmd = `node "${scriptPath}"`;
  exec(cmd, { env: { ...process.env, API_URL: `http://localhost:${process.env.PORT || 3001}` } }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Sitemap generation failed: ${error.message}`);
      return;
    }
    if (stderr) console.error(`Sitemap stderr: ${stderr}`);
    console.log(`Sitemap generated successfully:\n${stdout}`);
  });
}

module.exports = router;
