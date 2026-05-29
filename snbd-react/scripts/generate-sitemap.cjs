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

  // 2. Helper to write sitemap XML to both /public and /dist
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
  };

  // 3. Generate sitemap-pages.xml
  const pagesXml = `<?xml version="1.0" encoding="UTF-8"?>
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

  // 5. Generate sitemap.xml (Sitemap Index)
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-posts.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
  writeSitemapFile('sitemap.xml', indexXml);
}

generate().catch(e => { console.error(e); process.exit(1); });
