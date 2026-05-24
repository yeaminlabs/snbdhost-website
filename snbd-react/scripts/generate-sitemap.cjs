#!/usr/bin/env node
/**
 * Sitemap generator — run after `vite build`
 * Queries the blog API for published posts and writes dist/sitemap.xml
 * Usage: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://snbdhost.com';
const API_URL = process.env.API_URL || 'http://localhost:3001';
const OUT_PATH = path.join(__dirname, '../dist/sitemap.xml');

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
];

async function generate() {
  const today = new Date().toISOString().split('T')[0];
  let blogRoutes = [];

  try {
    const res = await fetch(`${API_URL}/api/posts?status=published&limit=1000`);
    const { posts } = await res.json();
    blogRoutes = posts.map(p => ({
      path: `/blog/${p.slug}`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: p.updated_at ? p.updated_at.split('T')[0] : today,
    }));
    console.log(`✓ Found ${blogRoutes.length} published blog posts`);
  } catch (e) {
    console.warn(`⚠ Could not fetch blog posts from ${API_URL}: ${e.message}`);
  }

  const allRoutes = [...staticRoutes, ...blogRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    r => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${r.lastmod || today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, xml, 'utf8');
  console.log(`✓ Sitemap written to ${OUT_PATH} (${allRoutes.length} URLs)`);
}

generate().catch(e => { console.error(e); process.exit(1); });
