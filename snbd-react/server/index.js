require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json({ limit: '2mb' }));

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ──────────────────────────────────────────────────────────────
// Bot-aware meta tag injection
// Google crawls JS and picks up react-helmet-async tags.
// Social bots (Facebook, Twitter, WhatsApp, Telegram, etc.) do not
// run JS — we inject the right <meta> tags server-side for them.
// ──────────────────────────────────────────────────────────────

const BOT_UA = /bot|crawl|slurp|spider|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegram|discord|slack|pinterest|applebot/i;

const BASE_URL = 'https://snbdhost.com';
const DEFAULT_IMAGE = `${BASE_URL}/logo.png`;

const staticMeta = {
  '/': {
    title: "SNBD HOST — Bangladesh's #1 Web Hosting Provider",
    description: 'NVMe SSD web hosting, VPS servers, and domain registration in Bangladesh. BDIX-optimized, 99.9% uptime, 24/7 support.',
  },
  '/hosting': {
    title: 'Shared Web Hosting Bangladesh — NVMe SSD cPanel Hosting | SNBD HOST',
    description: 'Fast shared web hosting with NVMe SSD, LiteSpeed, cPanel, and free SSL. Plans from ৳99/mo.',
  },
  '/reseller-hosting': {
    title: 'Reseller Hosting Bangladesh — White Label cPanel Hosting | SNBD HOST',
    description: 'Start your hosting business with SNBD HOST. WHM, CloudLinux isolation, unlimited cPanel accounts.',
  },
  '/domain': {
    title: 'Domain Registration Bangladesh — .com .bd .xyz | SNBD HOST',
    description: 'Register .com, .bd, .xyz and 50+ domain extensions at the lowest prices in Bangladesh.',
  },
  '/vps-server': {
    title: 'VPS Server Bangladesh — KVM Linux VPS Singapore & USA | SNBD HOST',
    description: 'High-performance KVM Linux VPS with AMD EPYC CPUs and NVMe SSD from ৳897/mo.',
  },
  '/bdix-servers': {
    title: 'BDIX Server Bangladesh — Ultra-Fast Local VPS | SNBD HOST',
    description: 'BDIX-peered servers with sub-millisecond ping in Dhaka, Bangladesh. From ৳500/mo.',
  },
  '/openclaw': {
    title: 'OpenClaw — Deploy Your Own AI Agent in 60 Seconds | SNBD HOST',
    description: 'Private, always-on AI agent platform hosted on SNBD HOST. Live in 60 seconds.',
  },
  '/n8n-automation': {
    title: 'n8n Automation Hosting Bangladesh — Managed n8n Server | SNBD HOST',
    description: 'Managed n8n workflow automation hosting. Instant setup, unlimited workflows from ৳250/mo.',
  },
  '/offers': {
    title: 'Web Hosting Offers & Discount Codes Bangladesh | SNBD HOST',
    description: 'Latest SNBD HOST promo codes and limited-time offers. Save up to 75%.',
  },
  '/support': {
    title: 'Customer Support — SNBD HOST Help Center',
    description: 'Get 24/7 support from SNBD HOST. Browse our knowledge base or chat live.',
  },
  '/blog': {
    title: 'Blog — Web Hosting Tips, Tutorials & Bangladesh Tech News | SNBD HOST',
    description: 'The SNBD HOST blog: hosting tutorials, server guides, and Bangladesh tech news.',
  },
  '/privacy': {
    title: 'Privacy Policy — SNBD HOST',
    description: 'Read the SNBD HOST privacy policy. GDPR and CCPA compliant.',
  },
  '/terms': {
    title: 'Terms of Service — SNBD HOST',
    description: 'Review SNBD HOST terms of service for hosting, domain, and server products.',
  },
};

function injectMeta(html, { title, description, image, urlPath }) {
  const img = image || DEFAULT_IMAGE;
  const url = `${BASE_URL}${urlPath || '/'}`;
  const tags = `
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${img}">
    <meta property="og:url" content="${url}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="SNBD HOST">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${img}">`;

  return html.replace(/<title>.*?<\/title>/, '').replace('<head>', `<head>${tags}`);
}

// Serve static SPA in production (in dev, Vite dev server serves the frontend)
const DIST_PATH = path.join(__dirname, '../dist');
const INDEX_PATH = path.join(DIST_PATH, 'index.html');

if (fs.existsSync(DIST_PATH)) {
  app.use(express.static(DIST_PATH, { index: false }));

  app.get('*', async (req, res) => {
    try {
      const indexHtml = fs.readFileSync(INDEX_PATH, 'utf8');
      const isBot = BOT_UA.test(req.headers['user-agent'] || '');

      if (!isBot) return res.send(indexHtml);

      let metaData = staticMeta[req.path];

      if (req.path.startsWith('/blog/') && !staticMeta[req.path]) {
        try {
          const { getDb, get } = require('./db/database');
          const db = await getDb();
          const slug = req.path.replace('/blog/', '');
          const post = get(db, "SELECT * FROM posts WHERE slug = ? AND status = 'published'", [slug]);
          if (post) {
            metaData = {
              title: `${post.meta_title || post.title} | SNBD HOST Blog`,
              description: post.meta_description || post.excerpt || '',
              image: post.og_image || post.featured_image_url,
            };
          }
        } catch {}
      }

      if (!metaData) {
        metaData = { title: 'SNBD HOST', description: 'Bangladesh\'s leading web hosting provider.' };
      }

      res.send(injectMeta(indexHtml, { ...metaData, urlPath: req.path }));
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
}

app.listen(PORT, () => console.log(`SNBD HOST Blog API running on port ${PORT}`));
