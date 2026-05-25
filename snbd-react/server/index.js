require('dotenv').config({ path: require('path').join(__dirname, '.env') });
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
app.use('/api/marketing-config', require('./routes/marketing'));
app.use('/api/versions', require('./routes/versions'));

// Initialize active version state on server start
const { setActiveVersion, getActiveVersionPath } = require('./utils/versionState');

async function initActiveVersion() {
  try {
    const { getDb, get } = require('./db/database');
    const db = await getDb();
    const activeVer = get(db, "SELECT version FROM versions WHERE status = 'active'");
    if (activeVer) {
      setActiveVersion(activeVer.version);
    } else {
      setActiveVersion(null);
    }
  } catch (err) {
    console.error('Failed to initialize active version at startup:', err);
    setActiveVersion(null);
  }
}
initActiveVersion();

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

function buildMarketingHeadScripts(cfg) {
  let scripts = '';
  if (!cfg) return scripts;

  // Google Tag Manager (head snippet)
  if (cfg.gtm?.enabled && cfg.gtm.id) {
    scripts += `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${cfg.gtm.id}');</script>`;
  }

  // GA4
  if (cfg.ga4?.enabled && cfg.ga4.id) {
    scripts += `<script async src="https://www.googletagmanager.com/gtag/js?id=${cfg.ga4.id}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${cfg.ga4.id}');</script>`;
  }

  // Google Ads
  if (cfg.gads?.enabled && cfg.gads.id) {
    scripts += `<script async src="https://www.googletagmanager.com/gtag/js?id=${cfg.gads.id}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${cfg.gads.id}');</script>`;
  }

  // Facebook Pixel
  if (cfg.fbpixel?.enabled && cfg.fbpixel.id) {
    scripts += `<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${cfg.fbpixel.id}');fbq('track','PageView');</script><noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${cfg.fbpixel.id}&ev=PageView&noscript=1"/></noscript>`;
  }

  // Microsoft Clarity
  if (cfg.clarity?.enabled && cfg.clarity.id) {
    scripts += `<script type="text/javascript">(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${cfg.clarity.id}");</script>`;
  }

  // Hotjar
  if (cfg.hotjar?.enabled && cfg.hotjar.id) {
    scripts += `<script>(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${cfg.hotjar.id},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');</script>`;
  }

  // LinkedIn Insight Tag
  if (cfg.linkedin?.enabled && cfg.linkedin.id) {
    scripts += `<script type="text/javascript">_linkedin_partner_id="${cfg.linkedin.id}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s)})(window.lintrk);</script>`;
  }

  // TikTok Pixel
  if (cfg.tiktok?.enabled && cfg.tiktok.id) {
    scripts += `<script>!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._u=ttq._u||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a)};ttq.load("${cfg.tiktok.id}");ttq.page();}(window,document,'ttq');</script>`;
  }

  // Custom head code
  if (cfg.customHead?.enabled && cfg.customHead.code) {
    scripts += cfg.customHead.code;
  }

  return scripts;
}

function buildGtmBodyTag(cfg) {
  if (cfg?.gtm?.enabled && cfg.gtm.id) {
    return `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${cfg.gtm.id}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;
  }
  return '';
}

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

// Dynamic static SPA serving based on active version
app.use((req, res, next) => {
  // Skip API and health routes
  if (req.path.startsWith('/api') || req.path === '/health') {
    return next();
  }

  // index.html and root path must fall through to the wildcard SPA route for SEO meta injection
  if (req.path === '/' || req.path === '/index.html') {
    return next();
  }

  const activePath = getActiveVersionPath();
  const filePath = path.join(activePath, req.path);

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      return res.sendFile(filePath);
    }
    next();
  });
});

app.get('*', async (req, res) => {
  try {
    const activePath = getActiveVersionPath();
    const indexPath = path.join(activePath, 'index.html');
    
    let resolvedIndexPath = indexPath;
    if (!fs.existsSync(resolvedIndexPath)) {
      resolvedIndexPath = path.join(__dirname, '../dist/index.html');
    }

    if (!fs.existsSync(resolvedIndexPath)) {
      return res.status(404).send('Application build files not found.');
    }

    const indexHtml = fs.readFileSync(resolvedIndexPath, 'utf8');
    const isBot = BOT_UA.test(req.headers['user-agent'] || '');
    const mktCfg = require('./routes/marketing').readConfig();
    const headScripts = buildMarketingHeadScripts(mktCfg);
    const bodyTag    = buildGtmBodyTag(mktCfg);

    if (!isBot) {
      // Still inject marketing scripts for real users
      let html = indexHtml;
      if (headScripts) html = html.replace('</head>', `${headScripts}</head>`);
      if (bodyTag)    html = html.replace('<body>', `<body>${bodyTag}`);
      return res.send(html);
    }

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

    let finalHtml = injectMeta(indexHtml, { ...metaData, urlPath: req.path });
    if (headScripts) finalHtml = finalHtml.replace('</head>', `${headScripts}</head>`);
    if (bodyTag)     finalHtml = finalHtml.replace('<body>', `<body>${bodyTag}`);
    res.send(finalHtml);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => console.log(`SNBD HOST Blog API running on port ${PORT}`));
