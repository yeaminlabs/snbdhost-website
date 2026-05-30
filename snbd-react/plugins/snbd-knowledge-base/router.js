const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const dbHelper = require('./db');
const crawler = require('./crawler');
const gemini = require('./gemini');

const router = express.Router();

// Helper: Slugify text
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Helper: Trigger sitemap script regeneration asynchronously
function regenerateSitemaps() {
  const sitemapScript = path.resolve(__dirname, '../../scripts/generate-sitemap.cjs');
  // Pass current active PORT so sitemap fetches from correct port
  const port = process.env.PORT || 3001;
  const env = { ...process.env, API_URL: `http://localhost:${port}` };
  
  exec(`node "${sitemapScript}"`, { env }, (err, stdout, stderr) => {
    if (err) {
      console.error('[Plugin:Sitemap] Failed to regenerate sitemaps:', err.message);
    } else {
      console.log('[Plugin:Sitemap] Sitemaps regenerated successfully:\n', stdout.trim());
    }
  });
}

// Authentication middleware for plugin admin routes
function requirePluginAuth(req, res, next) {
  if (req.admin) {
    return next();
  }

  const token = req.cookies && req.cookies.snbd_admin_session;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No session token found' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    req.admin = jwt.verify(token, secret, { algorithms: ['HS256'] });
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized: Invalid session token' });
  }
}

// ──────────────────────────────────────────────────────────────
// PUBLIC ENDPOINTS
// ──────────────────────────────────────────────────────────────

// GET /api/kb/status - Check if plugin is active
router.get('/status', (req, res) => {
  let sitemapLastGenerated = null;
  try {
    const sitemapPath = path.resolve(__dirname, '../../public/sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      const stats = fs.statSync(sitemapPath);
      sitemapLastGenerated = stats.mtime;
    }
  } catch (err) {
    console.error('[Plugin:Status] Failed to get sitemap stats:', err.message);
  }
  res.json({ 
    active: true, 
    mode: req.admin ? 'integrated' : 'standalone',
    sitemapLastGenerated
  });
});

// GET /api/kb/articles - Get published articles (with search & category filters)
router.get('/articles', async (req, res) => {
  const { category, search } = req.query;
  
  let sql = "SELECT id, title, slug, category, summary, updated_at FROM kb_articles WHERE status = 'published'";
  const params = [];

  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }

  if (search) {
    sql += " AND (title LIKE ? OR content LIKE ? OR summary LIKE ?)";
    const searchParam = `%${search}%`;
    params.push(searchParam, searchParam, searchParam);
  }

  sql += " ORDER BY updated_at DESC";

  try {
    const articles = await dbHelper.all(sql, params);
    res.json({ articles });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve articles: ' + err.message });
  }
});

// GET /api/kb/categories - Get distinct categories
router.get('/categories', async (req, res) => {
  try {
    const rows = await dbHelper.all("SELECT DISTINCT category FROM kb_articles WHERE status = 'published' ORDER BY category ASC");
    const categories = rows.map(r => r.category);
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve categories: ' + err.message });
  }
});

// GET /api/kb/articles/:slug - Get single published article
router.get('/articles/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const article = await dbHelper.get("SELECT * FROM kb_articles WHERE slug = ? AND status = 'published'", [slug]);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json({ article });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve article: ' + err.message });
  }
});

// ──────────────────────────────────────────────────────────────
// ADMIN ENDPOINTS (Protected)
// ──────────────────────────────────────────────────────────────

// GET /api/kb/admin/settings - Get settings
router.get('/admin/settings', requirePluginAuth, async (req, res) => {
  try {
    const rows = await dbHelper.all("SELECT * FROM kb_settings");
    const settings = {};
    rows.forEach(r => {
      settings[r.key] = r.value;
    });
    // Don't leak full API key in response (mask it)
    if (settings.gemini_api_key) {
      const key = settings.gemini_api_key;
      settings.gemini_api_key = key.length > 8 ? `${key.slice(0, 4)}...${key.slice(-4)}` : '****';
      settings.has_api_key = true;
    } else {
      settings.has_api_key = false;
    }
    res.json({ settings });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get settings: ' + err.message });
  }
});

// POST /api/kb/admin/settings - Save settings
router.post('/admin/settings', requirePluginAuth, async (req, res) => {
  const { gemini_api_key, gemini_model, system_prompt } = req.body;
  try {
    if (gemini_api_key && !gemini_api_key.includes('...')) {
      await dbHelper.run(
        "INSERT INTO kb_settings (key, value) VALUES ('gemini_api_key', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
        [gemini_api_key]
      );
    }
    if (gemini_model) {
      await dbHelper.run(
        "INSERT INTO kb_settings (key, value) VALUES ('gemini_model', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
        [gemini_model]
      );
    }
    if (system_prompt !== undefined) {
      await dbHelper.run(
        "INSERT INTO kb_settings (key, value) VALUES ('system_prompt', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
        [system_prompt]
      );
    }
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save settings: ' + err.message });
  }
});

// GET /api/kb/admin/sources - Get sources list
router.get('/admin/sources', requirePluginAuth, async (req, res) => {
  try {
    const sources = await dbHelper.all("SELECT id, name, type, path, last_scanned, LENGTH(content) as length FROM kb_sources ORDER BY type, name");
    res.json({ sources });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get sources: ' + err.message });
  }
});

// POST /api/kb/admin/scan - Trigger scan
router.post('/admin/scan', requirePluginAuth, async (req, res) => {
  try {
    const scanned = await crawler.scanSources();
    res.json({ ok: true, scanned });
  } catch (err) {
    res.status(500).json({ error: 'Failed to scan website files: ' + err.message });
  }
});

// POST /api/kb/admin/regenerate-sitemap - Force regenerate sitemaps
router.post('/admin/regenerate-sitemap', requirePluginAuth, async (req, res) => {
  try {
    const sitemapScript = path.resolve(__dirname, '../../scripts/generate-sitemap.cjs');
    const port = process.env.PORT || 3001;
    const env = { ...process.env, API_URL: `http://localhost:${port}` };
    
    exec(`node "${sitemapScript}"`, { env }, (err, stdout, stderr) => {
      if (err) {
        console.error('[Plugin:Sitemap] Manual regeneration failed:', err.message);
        return res.status(500).json({ error: 'Failed to regenerate sitemaps: ' + err.message });
      }
      console.log('[Plugin:Sitemap] Manual sitemaps regenerated successfully:\n', stdout.trim());
      res.json({ ok: true, message: 'Sitemaps regenerated successfully.' });
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to trigger sitemap regeneration: ' + err.message });
  }
});

// POST /api/kb/admin/generate - Generate articles using Gemini
router.post('/admin/generate', requirePluginAuth, async (req, res) => {
  const { sourceIds, customTopic } = req.body;
  if ((!sourceIds || !Array.isArray(sourceIds) || sourceIds.length === 0) && (!customTopic || !customTopic.trim())) {
    return res.status(400).json({ error: 'Please select at least one source or write a custom topic/prompt.' });
  }

  try {
    const articles = await gemini.generateArticlesFromSources(sourceIds, customTopic);
    const createdDrafts = [];

    // Save generated articles as drafts in the database
    for (const art of articles) {
      let slugBase = slugify(art.title);
      let slug = slugBase;
      let count = 1;

      // Ensure slug is unique
      while (true) {
        const exists = await dbHelper.get("SELECT id FROM kb_articles WHERE slug = ?", [slug]);
        if (!exists) break;
        slug = `${slugBase}-${count++}`;
      }

      const result = await dbHelper.run(
        `INSERT INTO kb_articles (title, slug, category, summary, content, status, source_id, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, 'draft', ?, datetime('now'), datetime('now'))`,
        [art.title, slug, art.category, art.summary, art.content, (sourceIds && sourceIds.length > 0) ? sourceIds[0] : null]
      );
      
      createdDrafts.push({
        id: result.lastInsertRowid,
        title: art.title,
        slug,
        category: art.category,
        summary: art.summary,
        status: 'draft'
      });
    }

    // Trigger sitemap regeneration
    regenerateSitemaps();

    res.json({ ok: true, drafts: createdDrafts });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate articles: ' + err.message });
  }
});

// GET /api/kb/admin/articles - Get all articles (for admin table)
router.get('/admin/articles', requirePluginAuth, async (req, res) => {
  try {
    const articles = await dbHelper.all("SELECT id, title, slug, category, summary, status, updated_at FROM kb_articles ORDER BY updated_at DESC");
    res.json({ articles });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve admin articles: ' + err.message });
  }
});

// GET /api/kb/admin/articles/:id - Get single article (edit mode)
router.get('/admin/articles/:id', requirePluginAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const article = await dbHelper.get("SELECT * FROM kb_articles WHERE id = ?", [id]);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json({ article });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get article: ' + err.message });
  }
});

// POST /api/kb/admin/articles - Create article manually
router.post('/admin/articles', requirePluginAuth, async (req, res) => {
  const { title, category, summary, content, status } = req.body;
  if (!title || !category || !content) {
    return res.status(400).json({ error: 'Title, category, and content are required' });
  }

  let slugBase = slugify(title);
  let slug = slugBase;
  let count = 1;

  try {
    while (true) {
      const exists = await dbHelper.get("SELECT id FROM kb_articles WHERE slug = ?", [slug]);
      if (!exists) break;
      slug = `${slugBase}-${count++}`;
    }

    const result = await dbHelper.run(
      `INSERT INTO kb_articles (title, slug, category, summary, content, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      [title, slug, category, summary || '', content, status || 'draft']
    );

    // Trigger sitemap regeneration
    regenerateSitemaps();

    res.json({ ok: true, id: result.lastInsertRowid, slug });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create article: ' + err.message });
  }
});

// PUT /api/kb/admin/articles/:id - Update article
router.put('/admin/articles/:id', requirePluginAuth, async (req, res) => {
  const { id } = req.params;
  const { title, category, summary, content, status } = req.body;

  if (!title || !category || !content) {
    return res.status(400).json({ error: 'Title, category, and content are required' });
  }

  try {
    const existing = await dbHelper.get("SELECT slug, title FROM kb_articles WHERE id = ?", [id]);
    if (!existing) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Regenerate slug if title changes
    let slug = existing.slug;
    if (title !== existing.title) {
      let slugBase = slugify(title);
      slug = slugBase;
      let count = 1;
      while (true) {
        const exists = await dbHelper.get("SELECT id FROM kb_articles WHERE slug = ? AND id != ?", [slug, id]);
        if (!exists) break;
        slug = `${slugBase}-${count++}`;
      }
    }

    await dbHelper.run(
      `UPDATE kb_articles 
       SET title = ?, slug = ?, category = ?, summary = ?, content = ?, status = ?, updated_at = datetime('now')
       WHERE id = ?`,
      [title, slug, category, summary || '', content, status, id]
    );

    // Trigger sitemap regeneration
    regenerateSitemaps();

    res.json({ ok: true, slug });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update article: ' + err.message });
  }
});

// DELETE /api/kb/admin/articles/:id - Delete article
router.delete('/admin/articles/:id', requirePluginAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const existing = await dbHelper.get("SELECT id FROM kb_articles WHERE id = ?", [id]);
    if (!existing) {
      return res.status(404).json({ error: 'Article not found' });
    }
    await dbHelper.run("DELETE FROM kb_articles WHERE id = ?", [id]);
    
    // Trigger sitemap regeneration
    regenerateSitemaps();

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete article: ' + err.message });
  }
});

module.exports = router;
