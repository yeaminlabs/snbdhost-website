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
    image: `${BASE_URL}/og/home.jpg`,
  },
  '/hosting': {
    title: 'Shared Web Hosting Bangladesh — NVMe SSD cPanel Hosting | SNBD HOST',
    description: 'Fast shared web hosting with NVMe SSD, LiteSpeed, cPanel, and free SSL. Plans from ৳99/mo.',
    image: `${BASE_URL}/og/hosting.jpg`,
  },
  '/reseller-hosting': {
    title: 'Reseller Hosting Bangladesh — White Label cPanel Hosting | SNBD HOST',
    description: 'Start your hosting business with SNBD HOST. WHM, CloudLinux isolation, unlimited cPanel accounts.',
    image: `${BASE_URL}/og/reseller.jpg`,
  },
  '/domain': {
    title: 'Domain Registration Bangladesh — .com .bd .xyz | SNBD HOST',
    description: 'Register .com, .bd, .xyz and 50+ domain extensions at the lowest prices in Bangladesh.',
    image: `${BASE_URL}/og/domain.jpg`,
  },
  '/vps-server': {
    title: 'VPS Server Bangladesh — KVM Linux VPS Singapore & USA | SNBD HOST',
    description: 'High-performance KVM Linux VPS with AMD EPYC CPUs and NVMe SSD from ৳897/mo.',
    image: `${BASE_URL}/og/vps.jpg`,
  },
  '/bdix-servers': {
    title: 'BDIX Server Bangladesh — Ultra-Fast Local VPS | SNBD HOST',
    description: 'BDIX-peered servers with sub-millisecond ping in Dhaka, Bangladesh. From ৳500/mo.',
    image: `${BASE_URL}/og/bdix.jpg`,
  },
  '/openclaw': {
    title: 'OpenClaw — Deploy Your Own AI Agent in 60 Seconds | SNBD HOST',
    description: 'Private, always-on AI agent platform hosted on SNBD HOST. Live in 60 seconds.',
    image: `${BASE_URL}/og/openclaw.jpg`,
  },
  '/n8n-automation': {
    title: 'n8n Automation Hosting Bangladesh — Managed n8n Server | SNBD HOST',
    description: 'Managed n8n workflow automation hosting. Instant setup, unlimited workflows from ৳250/mo.',
    image: `${BASE_URL}/og/n8n.jpg`,
  },
  '/offers': {
    title: 'Web Hosting Offers & Discount Codes Bangladesh | SNBD HOST',
    description: 'Latest SNBD HOST promo codes and limited-time offers. Save up to 75%.',
    image: `${BASE_URL}/og/offers.jpg`,
  },
  '/support': {
    title: 'Customer Support — SNBD HOST Help Center',
    description: 'Get 24/7 support from SNBD HOST. Browse our knowledge base or chat live.',
    image: `${BASE_URL}/og/support.jpg`,
  },
  '/blog': {
    title: 'Blog — Web Hosting Tips, Tutorials & Bangladesh Tech News | SNBD HOST',
    description: 'The SNBD HOST blog: hosting tutorials, server guides, and Bangladesh tech news.',
    image: `${BASE_URL}/og/blog.jpg`,
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

// Security: escape HTML special characters to prevent XSS in meta tag injection
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getAbsoluteImageUrl(url) {
  if (!url) return DEFAULT_IMAGE;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

// ─── Per-page JSON-LD schemas injected server-side for crawlers ───────────────
// React components render these client-side, but schema.org / Google Rich Results
// validator and social bots don't run JS. We duplicate the schema data here so
// crawlers always see full structured data in raw HTML.

const PAGE_SCHEMAS = {
  '/vps-server': [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Do I get full root access?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, all our Linux VPS plans come with full root access, giving you complete control over your server environment and the ability to install any custom software.' } },
        { '@type': 'Question', name: 'Which operating systems do you support?', acceptedAnswer: { '@type': 'Answer', text: 'We support a wide range of Linux distributions including Ubuntu, Debian, CentOS, AlmaLinux, and Rocky Linux. You can install or reinstall them in 1-click from the dashboard.' } },
        { '@type': 'Question', name: 'Are the resources dedicated?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, our KVM virtualization ensures that your RAM, CPU cores, and NVMe storage are strictly dedicated to your virtual server and never oversold.' } },
        { '@type': 'Question', name: 'Do you provide automated backups?', acceptedAnswer: { '@type': 'Answer', text: 'We provide automated weekly backups by default. You can also create manual snapshots instantly before making major changes to your server.' } },
      ],
    },
  ],
  '/bdix-servers': [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is BDIX and why do I need it?', acceptedAnswer: { '@type': 'Answer', text: 'BDIX (Bangladesh Internet Exchange) is a local peering network. It allows inter-ISP traffic to stay within Bangladesh instead of routing internationally. This results in ultra-low latency (usually <1ms) and much faster download/upload speeds for local users.' } },
        { '@type': 'Question', name: 'Do these servers come with Root Access?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, all BDIX VPS plans come with full administrator/root access. You have complete freedom to install any software, operating system (Ubuntu, CentOS, Debian, etc.), and control panel you desire.' } },
        { '@type': 'Question', name: 'Can I upgrade my plan later?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely! You can easily scale up your CPU, RAM, and Storage at any time directly from our client portal without any data loss or significant downtime.' } },
        { '@type': 'Question', name: 'Which Control Panels do you support?', acceptedAnswer: { '@type': 'Answer', text: 'We support all major control panels including cPanel/WHM, DirectAdmin, CyberPanel, and Webuzo. You can purchase a license alongside your server or install a free panel.' } },
      ],
    },
  ],
  '/n8n-automation': [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can n8n help reduce time spent managing social media?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Automatically schedule posts, reply to DMs, or track mentions across platforms using workflows. You can connect Instagram, Facebook, Twitter/X, LinkedIn and more through n8n\'s integrations and trigger actions based on events or schedules.' } },
        { '@type': 'Question', name: 'Is it possible to automate follow-up emails to customers who didn\'t complete checkout?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely! n8n can integrate with your WooCommerce or custom store, detect abandoned carts, and automatically send personalized follow-up emails via Gmail, SMTP, or any email service. You can set delays, conditions, and personalization — all without code.' } },
        { '@type': 'Question', name: 'Do I need coding skills to use n8n?', acceptedAnswer: { '@type': 'Answer', text: 'No coding skills required for most workflows! n8n has a visual drag-and-drop editor where you connect nodes to build workflows. However, if you want advanced logic, you can optionally write small JavaScript snippets for maximum flexibility.' } },
        { '@type': 'Question', name: 'How is this better than Zapier or other tools?', acceptedAnswer: { '@type': 'Answer', text: 'Unlike Zapier, n8n is self-hosted — meaning your data stays on YOUR server, not a third-party cloud. You also get unlimited workflows, no per-task pricing, and far more flexibility with custom logic. SNBD HOST provides fully managed n8n instances so you get all benefits without server management headaches.' } },
        { '@type': 'Question', name: 'What happens if something goes wrong in my workflow?', acceptedAnswer: { '@type': 'Answer', text: 'n8n has built-in error handling with retry logic, error workflows, and execution logs. You can see exactly what happened at each step. Our 24/7 support team is also available to help troubleshoot any workflow issues.' } },
      ],
    },
  ],
  '/offers': [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Do many hosting and domain promo codes are currently available?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, we regularly update our active promo codes. You can find the best current deals directly on this page or applied automatically at checkout.' } },
        { '@type': 'Question', name: 'Are there any special discounts for new clients signing up?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. All our first-time customers receive our introductory pricing, which is up to 75% off the regular renewal rate.' } },
        { '@type': 'Question', name: 'What is the maximum discount I can get with a SNBD HOST coupon?', acceptedAnswer: { '@type': 'Answer', text: 'During special sales events, you can save up to 80% on long-term hosting plans, plus get a free domain name for the first year.' } },
        { '@type': 'Question', name: 'Can I use multiple coupon codes on a single order?', acceptedAnswer: { '@type': 'Answer', text: 'No, our system only accepts one coupon code per transaction. We recommend choosing the code that provides the highest overall discount for your cart.' } },
        { '@type': 'Question', name: 'Do you have any discount for students or non-profits?', acceptedAnswer: { '@type': 'Answer', text: 'We occasionally run student promotions. Please contact our support team with your .edu email or non-profit documentation for custom pricing.' } },
      ],
    },
  ],
  '/reseller-hosting': [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Is it completely white-labeled?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, our reseller hosting is 100% white-labeled. You get your own private nameservers (ns1.yourdomain.com), and the control panel uses generic branding so your clients will never know about SNBD HOST.' } },
        { '@type': 'Question', name: 'Can I oversell resources?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, overselling is allowed on all our reseller packages. You can allocate more disk space and bandwidth to your clients than what is actually included in your master plan, allowing you to maximize profits.' } },
        { '@type': 'Question', name: 'Do you help with migration?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! We offer free conditional migrations for standard cPanel to cPanel transfers. For highly complex or massive server migrations, we have premium migration add-ons available.' } },
        { '@type': 'Question', name: 'Are my clients isolated from each other?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. We use CloudLinux LVE to strictly isolate each cPanel account you create. If one of your clients gets a traffic spike or runs a bad script, it will not affect the performance of your other clients.' } },
      ],
    },
  ],
  '/support': [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How do I open a support ticket?', acceptedAnswer: { '@type': 'Answer', text: 'Log in to your SNBD HOST client area, navigate to Support → Tickets, and click "Open New Ticket". Choose the appropriate department and describe your issue. Our team typically responds within 15 minutes.' } },
        { '@type': 'Question', name: 'Do you offer 24/7 support?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, our technical support team is available 24 hours a day, 7 days a week, 365 days a year. You can reach us via live chat, support ticket, or WhatsApp for urgent issues.' } },
        { '@type': 'Question', name: 'What is the average response time?', acceptedAnswer: { '@type': 'Answer', text: 'Our average first response time is under 15 minutes for tickets and instant for live chat during business hours. Critical server issues are escalated immediately to senior engineers.' } },
        { '@type': 'Question', name: 'Can I get support in Bengali?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Our support team is based in Bangladesh and fluent in both Bengali and English. You are welcome to submit tickets and chat in whichever language you are more comfortable with.' } },
      ],
    },
  ],
  '/openclaw': [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Do I need technical skills to use OpenClaw?', acceptedAnswer: { '@type': 'Answer', text: 'Not at all. With SNBD HOST\'s 1-click deployment, OpenClaw is installed and configured automatically. You simply log in and connect your apps via the visual interface.' } },
        { '@type': 'Question', name: 'Can I use OpenClaw with my own local LLM models?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. OpenClaw supports direct API connections to locally hosted models (like Llama 3) or external providers (OpenAI, Anthropic, etc.).' } },
        { '@type': 'Question', name: 'Is my data completely secure and private?', acceptedAnswer: { '@type': 'Answer', text: '100%. Unlike hosted SaaS platforms, your OpenClaw instance runs entirely on your SNBD HOST server. Your prompts, customer data, and API keys never leave your node.' } },
        { '@type': 'Question', name: 'What happens if my agent needs more resources?', acceptedAnswer: { '@type': 'Answer', text: 'You can seamlessly scale your VPS up from the SNBD HOST dashboard without any data loss. Upgrades take less than 60 seconds.' } },
      ],
    },
  ],
};

function buildJsonLdTags(schemas) {
  if (!schemas || schemas.length === 0) return '';
  return schemas
    .map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n');
}

function injectMeta(html, { title, description, image, urlPath, extraSchemas }) {
  const img = image || DEFAULT_IMAGE;
  const url = `${BASE_URL}${urlPath || '/'}`;
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const ldJson = buildJsonLdTags(extraSchemas);
  const tags = `
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDesc}">
    <meta property="og:title" content="${safeTitle}">
    <meta property="og:description" content="${safeDesc}">
    <meta property="og:image" content="${img}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:url" content="${url}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="SNBD HOST">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${safeTitle}">
    <meta name="twitter:description" content="${safeDesc}">
    <meta name="twitter:image" content="${img}">
    ${ldJson}`;

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
  const resolvedBase = path.resolve(activePath);
  const filePath = path.resolve(activePath, req.path.slice(1));

  // Security: prevent directory traversal
  if (!filePath.startsWith(resolvedBase)) {
    return res.status(403).send('Forbidden');
  }

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
    let extraSchemas = PAGE_SCHEMAS[req.path] || [];

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
            image: getAbsoluteImageUrl(post.og_image || post.featured_image_url),
          };
          
          const authorType = (post.author && post.author.toLowerCase().includes('team')) ? 'Organization' : 'Person';

          // BlogPosting structured data for Google rich results
          extraSchemas = [{
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt || '',
            image: getAbsoluteImageUrl(post.og_image || post.featured_image_url),
            url: `${BASE_URL}/blog/${post.slug}`,
            datePublished: post.published_at || post.created_at,
            dateModified: post.updated_at || post.published_at || post.created_at,
            author: {
              '@type': authorType,
              name: post.author || 'SNBD HOST Team',
              url: `${BASE_URL}/`,
            },
            publisher: {
              '@type': 'Organization',
              name: 'SNBD HOST',
              url: BASE_URL,
              logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blog/${post.slug}` },
          }];
        }
      } catch {}
    }

    if (!metaData) {
      metaData = { title: 'SNBD HOST', description: 'Bangladesh\'s leading web hosting provider.' };
    }

    let finalHtml = injectMeta(indexHtml, { ...metaData, urlPath: req.path, extraSchemas });
    if (headScripts) finalHtml = finalHtml.replace('</head>', `${headScripts}</head>`);
    if (bodyTag)     finalHtml = finalHtml.replace('<body>', `<body>${bodyTag}`);
    res.send(finalHtml);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => console.log(`SNBD HOST Blog API running on port ${PORT}`));
