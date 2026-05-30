#!/usr/bin/env node
/**
 * Sitemap generator — run after `vite build`
 * Queries the blog API for published posts and writes sitemap xml files
 * Usage: node scripts/generate-sitemap.cjs
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://snbdhost.com';
const API_URL = process.env.API_URL || 'http://localhost:3001';

const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/hosting', changefreq: 'weekly', priority: '0.9' },
  { path: '/reseller-hosting', changefreq: 'weekly', priority: '0.9' },
  { path: '/domain', changefreq: 'weekly', priority: '0.8' },
  { path: '/vps-server', changefreq: 'weekly', priority: '0.9' },
  { path: '/bdix-servers', changefreq: 'weekly', priority: '0.8' },
  { path: '/openclaw', changefreq: 'monthly', priority: '0.7' },
  { path: '/n8n-automation', changefreq: 'monthly', priority: '0.7' },
  { path: '/offers', changefreq: 'daily', priority: '0.8' },
  { path: '/support', changefreq: 'monthly', priority: '0.6' },
  { path: '/blog', changefreq: 'daily', priority: '0.8' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
  { path: '/dev-updates', changefreq: 'monthly', priority: '0.5' },
];

async function generate() {
  const today = new Date().toISOString().split('T')[0];
  let blogRoutes = [];
  let kbRoutes = [];

  // 1. Fetch published blog posts
  try {
    const res = await fetch(`${API_URL}/api/posts?status=published&limit=1000`);
    const { posts } = await res.json();
    blogRoutes = posts.map(p => ({
      path: `/blog/${p.slug}`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: p.updated_at ? p.updated_at.split('T')[0] : (p.published_at ? p.published_at.split('T')[0] : today),
    }));
    console.log(`✓ Found ${blogRoutes.length} published blog posts`);
  } catch (e) {
    console.warn(`⚠ Could not fetch blog posts from ${API_URL}: ${e.message}`);
  }

  // 1.5 Fetch published Knowledge Base articles
  try {
    const res = await fetch(`${API_URL}/api/plugins/snbd-knowledge-base/articles`);
    if (res.ok) {
      const { articles } = await res.json();
      kbRoutes = (articles || []).map(a => ({
        path: `/support/kb/${a.slug}`,
        changefreq: 'monthly',
        priority: '0.7',
        lastmod: a.updated_at ? a.updated_at.split(' ')[0] : today,
      }));
      console.log(`✓ Found ${kbRoutes.length} published Knowledge Base articles`);
    } else {
      console.log(`ℹ Knowledge Base sitemap skipped (endpoint returned ${res.status})`);
    }
  } catch (e) {
    console.warn(`ℹ Could not fetch Knowledge Base articles from ${API_URL}: ${e.message}`);
  }

  // 2. Helper to write sitemap XML to both /public, /dist, and active versions
  const writeSitemapFile = (filename, content) => {
    const publicPath = path.join(__dirname, '../public', filename);
    const distPath = path.join(__dirname, '../dist', filename);

    // Write to public/
    fs.mkdirSync(path.dirname(publicPath), { recursive: true });
    fs.writeFileSync(publicPath, content, 'utf8');
    console.log(`✓ Written ${filename} to public/`);

    // Write to dist/ if it exists (vite build output)
    if (fs.existsSync(path.dirname(distPath))) {
      fs.writeFileSync(distPath, content, 'utf8');
      console.log(`✓ Written ${filename} to dist/`);
    }

    // Write to all versioned directories under data/versions/
    const versionsDir = path.join(__dirname, '../data/versions');
    if (fs.existsSync(versionsDir)) {
      try {
        const versions = fs.readdirSync(versionsDir);
        for (const ver of versions) {
          const verPath = path.join(versionsDir, ver);
          if (fs.statSync(verPath).isDirectory()) {
            const verFilePath = path.join(verPath, filename);
            fs.writeFileSync(verFilePath, content, 'utf8');
            console.log(`✓ Written ${filename} to version dir ${ver}`);
          }
        }
      } catch (err) {
        console.warn(`⚠ Could not write sitemaps to versioned folder: ${err.message}`);
      }
    }
  };

  // 3. Generate sitemap-pages.xml
  const pagesXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map(
    r => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
  writeSitemapFile('sitemap-pages.xml', pagesXml);

  // 4. Generate sitemap-posts.xml
  const postsXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogRoutes
  .map(
    r => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
  writeSitemapFile('sitemap-posts.xml', postsXml);

  // 4.5 Generate sitemap-kb.xml
  if (kbRoutes.length > 0) {
    const kbXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${kbRoutes
  .map(
    r => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
    writeSitemapFile('sitemap-kb.xml', kbXml);
  } else {
    // Delete sitemap-kb.xml if no published articles exist
    const publicPath = path.join(__dirname, '../public/sitemap-kb.xml');
    const distPath = path.join(__dirname, '../dist/sitemap-kb.xml');
    if (fs.existsSync(publicPath)) fs.unlinkSync(publicPath);
    if (fs.existsSync(distPath)) fs.unlinkSync(distPath);

    const versionsDir = path.join(__dirname, '../data/versions');
    if (fs.existsSync(versionsDir)) {
      try {
        const versions = fs.readdirSync(versionsDir);
        for (const ver of versions) {
          const verPath = path.join(versionsDir, ver);
          if (fs.statSync(verPath).isDirectory()) {
            const verFilePath = path.join(verPath, 'sitemap-kb.xml');
            if (fs.existsSync(verFilePath)) fs.unlinkSync(verFilePath);
          }
        }
      } catch (err) {
        console.warn(`⚠ Could not delete sitemap-kb.xml from versioned folder: ${err.message}`);
      }
    }
  }

  // 5. Generate sitemap.xml (Sitemap Index)
  let sitemapsList = `
  <sitemap>
    <loc>${BASE_URL}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-posts.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`;

  if (kbRoutes.length > 0) {
    sitemapsList += `
  <sitemap>
    <loc>${BASE_URL}/sitemap-kb.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`;
  }

  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapsList}
</sitemapindex>`;
  writeSitemapFile('sitemap.xml', indexXml);
}

generate().catch(e => { console.error(e); process.exit(1); });
