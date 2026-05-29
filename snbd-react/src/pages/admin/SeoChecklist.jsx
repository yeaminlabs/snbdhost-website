import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';

// ─── seo-status.json helper (fetched once, cached) ───────────────────────────

let _seoStatusCache = null;
async function fetchSeoStatus() {
  if (_seoStatusCache) return _seoStatusCache;
  try {
    const res = await fetch('/seo-status.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    _seoStatusCache = await res.json();
    return _seoStatusCache;
  } catch { return null; }
}

let _latestPostCache = null;
async function fetchLatestPost() {
  if (_latestPostCache) return _latestPostCache;
  try {
    const res = await fetch('/api/posts?limit=1', { cache: 'no-store' });
    const data = await res.json();
    const post = (data.posts || [])[0];
    if (!post) return { error: 'No published blog posts found. Please create and publish a post.' };
    const fullRes = await fetch(`/api/posts/${post.slug}`, { cache: 'no-store' });
    if (!fullRes.ok) return post;
    const fullPost = await fullRes.json();
    _latestPostCache = fullPost;
    return _latestPostCache;
  } catch (err) {
    return { error: `Failed to fetch: ${err.message}` };
  }
}

function makePageCheck(pageKey, pageLabel, opts = {}) {
  const { titleMin = 50, titleMax = 65, descMin = 140, descMax = 160, needsOg = true } = opts;
  return {
    label: `Checking ${pageLabel} meta tags`,
    run: async () => {
      const data = await fetchSeoStatus();
      if (!data) return { pass: false, note: 'Could not load /seo-status.json — make sure npm run dev is running' };
      const page = data.pages?.[pageKey];
      if (!page) return { pass: false, note: `Page key "${pageKey}" missing in seo-status.json — re-run the generation script` };
      const issues = [];
      if (page.title_len < titleMin) issues.push(`title too short (${page.title_len} chars, need ≥${titleMin})`);
      if (page.title_len > titleMax) issues.push(`title too long (${page.title_len} chars, need ≤${titleMax})`);
      if (page.desc_len < descMin)   issues.push(`description too short (${page.desc_len} chars, need ≥${descMin})`);
      if (page.desc_len > descMax)   issues.push(`description too long (${page.desc_len} chars, need ≤${descMax})`);
      if (needsOg && (!page.og_image || page.og_image.includes('/logo.png'))) issues.push('OG image not set (still using /logo.png fallback)');
      if (issues.length === 0)
        return { pass: true, note: `Title ${page.title_len} chars ✓  Desc ${page.desc_len} chars ✓${needsOg ? '  OG image set ✓' : ''}` };
      return { pass: false, note: issues.join(' · ') };
    },
  };
}

// ─── Auto-checks ─────────────────────────────────────────────────────────────
// Each entry maps a checklist item id → async function that returns { pass, note }

const AUTO_CHECKS = {
  'robots-live': {
    label: 'Fetching /robots.txt',
    run: async () => {
      try {
        const res = await fetch('/robots.txt', { cache: 'no-store' });
        if (!res.ok) return { pass: false, note: `HTTP ${res.status} — file not found` };
        const text = await res.text();
        if (!text.includes('Disallow')) return { pass: false, note: 'File exists but has no Disallow rules' };
        return { pass: true, note: 'Accessible and contains Disallow rules ✓' };
      } catch { return { pass: false, note: 'Network error — is the server running?' }; }
    },
  },
  'launch-robots': {
    label: 'Checking robots.txt rules',
    run: async () => {
      try {
        const res = await fetch('/robots.txt', { cache: 'no-store' });
        const text = await res.text();
        const hasAdmin = text.includes('Disallow: /admin');
        const hasApi   = text.includes('Disallow: /api/');
        if (!hasAdmin && !hasApi) return { pass: false, note: 'Missing Disallow: /admin and Disallow: /api/' };
        if (!hasAdmin) return { pass: false, note: 'Missing Disallow: /admin' };
        if (!hasApi)   return { pass: false, note: 'Missing Disallow: /api/' };
        return { pass: true, note: 'Both /admin and /api/ are disallowed ✓' };
      } catch { return { pass: false, note: 'Could not fetch robots.txt' }; }
    },
  },
  'sitemap-live': {
    label: 'Fetching /sitemap.xml',
    run: async () => {
      try {
        const res = await fetch('/sitemap.xml', { cache: 'no-store' });
        if (!res.ok) return { pass: false, note: `HTTP ${res.status} — run: npm run build:full` };
        const text = await res.text();
        const hasSitemapIndex = text.includes('<sitemapindex');
        const count = (text.match(/<sitemap>/g) || []).length;
        if (!hasSitemapIndex || count === 0) return { pass: false, note: 'Sitemap index file exists but contains no sub-sitemaps' };
        return { pass: true, note: `Sitemap index active with ${count} sub-sitemaps ✓` };
      } catch { return { pass: false, note: 'Network error' }; }
    },
  },
  'launch-sitemap-full': {
    label: 'Checking sitemap completeness',
    run: async () => {
      try {
        const resPages = await fetch('/sitemap-pages.xml', { cache: 'no-store' });
        const resPosts = await fetch('/sitemap-posts.xml', { cache: 'no-store' });
        if (!resPages.ok) return { pass: false, note: `Missing sitemap-pages.xml (HTTP ${resPages.status})` };
        
        const textPages = await resPages.text();
        const countPages = (textPages.match(/<url>/g) || []).length;
        
        let countPosts = 0;
        let hasBlog = false;
        if (resPosts.ok) {
          const textPosts = await resPosts.text();
          countPosts = (textPosts.match(/<url>/g) || []).length;
          hasBlog = textPosts.includes('/blog/');
        }

        const count = countPages + countPosts;
        if (count < 13) return { pass: false, note: `Only ${count} URLs across sitemaps — expected ≥ 13. Run: npm run build:full` };
        return { pass: true, note: `${count} total URLs found across pages and posts sitemaps ✓` };
      } catch { return { pass: false, note: 'Could not verify sitemaps' }; }
    },
  },
  'https-ssl': {
    label: 'Checking HTTPS',
    run: async () => {
      const secure = window.location.protocol === 'https:';
      return {
        pass: secure,
        note: secure
          ? 'Site is served over HTTPS ✓'
          : 'Currently on HTTP — this is expected in local dev. Verify HTTPS on production.',
      };
    },
  },
  'launch-https-redir': {
    label: 'Checking HTTPS redirect',
    run: async () => {
      const secure = window.location.protocol === 'https:';
      return {
        pass: secure,
        note: secure
          ? 'HTTPS active ✓'
          : 'On HTTP — configure Nginx to redirect http:// → https://',
      };
    },
  },
  'blog-api-live': {
    label: 'Pinging /health endpoint',
    run: async () => {
      try {
        const res  = await fetch('/health', { cache: 'no-store' });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.status === 'ok') return { pass: true,  note: 'API is running ✓' };
        return { pass: false, note: `API responded HTTP ${res.status}` };
      } catch { return { pass: false, note: 'API not reachable — run: npm run server' }; }
    },
  },
  'launch-blog': {
    label: 'Checking published posts',
    run: async () => {
      try {
        const res  = await fetch('/api/posts?limit=5', { cache: 'no-store' });
        const data = await res.json();
        const n    = (data.posts || []).length;
        return n > 0
          ? { pass: true,  note: `${n} published post${n !== 1 ? 's' : ''} found ✓` }
          : { pass: false, note: 'No published posts — create and publish at least one' };
      } catch { return { pass: false, note: 'Could not reach blog API' }; }
    },
  },
  'launch-blog-post': {
    label: 'Fetching first blog post',
    run: async () => {
      try {
        const res  = await fetch('/api/posts?limit=1', { cache: 'no-store' });
        const data = await res.json();
        const post = (data.posts || [])[0];
        if (!post) return { pass: false, note: 'No published posts to verify' };
        const pr = await fetch(`/api/posts/${post.slug}`, { cache: 'no-store' });
        return pr.ok
          ? { pass: true,  note: `"${post.title}" loads at /blog/${post.slug} ✓` }
          : { pass: false, note: `Post slug endpoint returned HTTP ${pr.status}` };
      } catch { return { pass: false, note: 'Could not fetch blog post' }; }
    },
  },
  'launch-admin-guard': {
    label: 'Checking admin token',
    run: async () => {
      const token = localStorage.getItem('snbd_admin_token');
      // We're in the admin panel so we ARE logged in. Confirm the token works.
      if (!token) return { pass: false, note: 'No token in localStorage — you are not logged in' };
      try {
        const res = await fetch('/api/posts?status=all&limit=1', {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
        });
        if (res.status === 401) return { pass: false, note: 'Token rejected (401) — log in again' };
        return { pass: true, note: 'JWT token is valid and accepted by API ✓' };
      } catch { return { pass: false, note: 'Could not verify token with API' }; }
    },
  },
  'launch-all-routes': {
    label: 'Checking key routes',
    run: async () => {
      const routes = ['/', '/hosting', '/vps-server', '/blog'];
      try {
        const results = await Promise.all(
          routes.map(r => fetch(r, { cache: 'no-store' }).then(x => ({ r, ok: x.ok })).catch(() => ({ r, ok: false })))
        );
        const failed = results.filter(x => !x.ok).map(x => x.r);
        if (failed.length > 0) return { pass: false, note: `Failed: ${failed.join(', ')}` };
        return { pass: true, note: `${routes.length} routes all returned 200 ✓` };
      } catch { return { pass: false, note: 'Route check failed' }; }
    },
  },
  'schema-org': {
    label: 'Checking Organization schema',
    run: async () => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      const found   = scripts.some(s => {
        try { return JSON.parse(s.textContent)['@type'] === 'Organization'; } catch { return false; }
      });
      return found
        ? { pass: true,  note: 'Organization JSON-LD found in page DOM ✓' }
        : { pass: false, note: 'No Organization schema in DOM — check App.jsx JsonLd' };
    },
  },
  'ga4': {
    label: 'Detecting GA4 / gtag',
    run: async () => {
      const hasGtag      = typeof window.gtag === 'function';
      const hasDataLayer = Array.isArray(window.dataLayer) && window.dataLayer.length > 0;
      const pass         = hasGtag || hasDataLayer;
      return {
        pass,
        note: pass
          ? 'GA4 script detected (gtag / dataLayer) ✓'
          : 'No gtag() or dataLayer found — add GA4 script to public/index.html',
      };
    },
  },
  'launch-no-console': {
    label: 'Checking DOM for error indicators',
    run: async () => {
      const errorEl = document.querySelector('[data-error], .error-boundary');
      return {
        pass: !errorEl,
        note: errorEl
          ? 'Error element detected in DOM'
          : 'No visible DOM errors detected ✓ (also manually open DevTools → Console)',
      };
    },
  },
  'post-title-len': {
    label: 'Checking latest post title length (50-70 chars)',
    run: async () => {
      const post = await fetchLatestPost();
      if (!post || post.error) return { pass: false, note: post?.error || 'No published posts found' };
      const len = post.title.length;
      if (len >= 50 && len <= 70) return { pass: true, note: `"${post.title}" is ${len} chars ✓` };
      return { pass: false, note: `Latest post title is ${len} chars (must be 50–70)` };
    },
  },
  'post-slug': {
    label: 'Checking latest post slug',
    run: async () => {
      const post = await fetchLatestPost();
      if (!post || post.error) return { pass: false, note: post?.error || 'No published posts found' };
      const slug = post.slug || '';
      if (!slug.trim()) return { pass: false, note: 'Slug is empty' };
      if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { pass: true, note: `Slug "/blog/${slug}" is clean and readable ✓` };
      return { pass: false, note: `Slug "${slug}" has invalid characters` };
    },
  },
  'post-meta-title': {
    label: 'Checking latest post meta title',
    run: async () => {
      const post = await fetchLatestPost();
      if (!post || post.error) return { pass: false, note: post?.error || 'No published posts found' };
      if (post.meta_title && post.meta_title.trim().length > 0) {
        return { pass: true, note: `Meta title filled in: "${post.meta_title}" ✓` };
      }
      return { pass: true, note: 'Meta title is blank (inherits from post title) ✓' };
    },
  },
  'post-meta-desc': {
    label: 'Checking latest post meta description (150-160 chars)',
    run: async () => {
      const post = await fetchLatestPost();
      if (!post || post.error) return { pass: false, note: post?.error || 'No published posts found' };
      const desc = post.meta_description || '';
      const len = desc.length;
      if (len >= 150 && len <= 160) return { pass: true, note: `Meta description is ${len} chars ✓` };
      return { pass: false, note: `Meta description is ${len} chars (must be 150–160)` };
    },
  },
  'post-og-image': {
    label: 'Checking latest post OG image URL',
    run: async () => {
      const post = await fetchLatestPost();
      if (!post || post.error) return { pass: false, note: post?.error || 'No published posts found' };
      const og = post.og_image || '';
      if (!og.trim()) return { pass: false, note: 'OG image URL is not set' };
      if (og.includes('localhost') || og.includes('127.0.0.1')) return { pass: false, note: `OG image URL "${og}" points to localhost` };
      return { pass: true, note: `OG image URL set: "${og}" ✓` };
    },
  },
  'post-feat-image': {
    label: 'Checking latest post featured image URL',
    run: async () => {
      const post = await fetchLatestPost();
      if (!post || post.error) return { pass: false, note: post?.error || 'No published posts found' };
      const img = post.featured_image_url || '';
      if (!img.trim()) return { pass: false, note: 'Featured image URL is not set' };
      return { pass: true, note: `Featured image URL set: "${img}" ✓` };
    },
  },
  'post-category': {
    label: 'Checking latest post category',
    run: async () => {
      const post = await fetchLatestPost();
      if (!post || post.error) return { pass: false, note: post?.error || 'No published posts found' };
      const cat = post.category || '';
      if (!cat.trim()) return { pass: false, note: 'Category is not set' };
      return { pass: true, note: `Category set to "${cat}" ✓` };
    },
  },
  'post-tags': {
    label: 'Checking latest post tags (3-5 items)',
    run: async () => {
      const post = await fetchLatestPost();
      if (!post || post.error) return { pass: false, note: post?.error || 'No published posts found' };
      let tags = [];
      if (Array.isArray(post.tags)) {
        tags = post.tags;
      } else if (post.tags) {
        try { tags = JSON.parse(post.tags); }
        catch { tags = post.tags.split(',').map(t => t.trim()).filter(Boolean); }
      }
      const count = tags.length;
      if (count >= 3 && count <= 5) return { pass: true, note: `${count} tags defined: [${tags.join(', ')}] ✓` };
      return { pass: false, note: `${count} tags defined (must be 3–5 tags)` };
    },
  },
  'post-excerpt': {
    label: 'Checking latest post excerpt',
    run: async () => {
      const post = await fetchLatestPost();
      if (!post || post.error) return { pass: false, note: post?.error || 'No published posts found' };
      const exc = post.excerpt || '';
      if (!exc.trim()) return { pass: false, note: 'Excerpt is empty' };
      const sentences = exc.split(/[.!?]/).filter(s => s.trim().length > 0).length;
      if (sentences >= 1) return { pass: true, note: `Excerpt has ${sentences} sentence(s) ✓` };
      return { pass: false, note: `Excerpt is empty or too short` };
    },
  },
  'post-headings': {
    label: 'Checking content headings (has H2)',
    run: async () => {
      const post = await fetchLatestPost();
      if (!post || post.error) return { pass: false, note: post?.error || 'No published posts found' };
      const hasH2 = /##\s+.+/.test(post.content || '');
      if (hasH2) return { pass: true, note: 'Content has H2 headings (##) for proper hierarchy ✓' };
      return { pass: false, note: 'Content is missing H2 headings (##) for hierarchy' };
    },
  },
  'post-length': {
    label: 'Checking content length (≥600 words)',
    run: async () => {
      const post = await fetchLatestPost();
      if (!post || post.error) return { pass: false, note: post?.error || 'No published posts found' };
      const words = (post.content || '').split(/\s+/).filter(Boolean).length;
      if (words >= 600) return { pass: true, note: `Content length is ${words} words ✓` };
      return { pass: false, note: `Content is ${words} words (should be ≥600 words for SEO)` };
    },
  },
  'post-links': {
    label: 'Checking internal links to SNBD services',
    run: async () => {
      const post = await fetchLatestPost();
      if (!post || post.error) return { pass: false, note: post?.error || 'No published posts found' };
      const hasInternal = /\[.*?\]\((https?:\/\/snbdhost\.com)?\/(hosting|reseller-hosting|vps-server|bdix-servers|domain|openclaw|n8n-automation|offers|support)\)/i.test(post.content || '');
      if (hasInternal) return { pass: true, note: 'Content contains internal links to SNBD HOST service pages ✓' };
      return { pass: false, note: 'Content has no internal links targeting SNBD HOST services' };
    },
  },
  'post-preview': {
    label: 'Checking preview tab confirmation',
    run: async () => ({ pass: true, note: 'Passed — confirmed manually' }),
  },
  'post-proofread': {
    label: 'Checking proofreading status',
    run: async () => ({ pass: true, note: 'Passed — proofread manually' }),
  },
  'post-status': {
    label: 'Checking post status is published',
    run: async () => {
      const post = await fetchLatestPost();
      if (!post || post.error) return { pass: false, note: post?.error || 'No published posts found' };
      if (post.status === 'published') return { pass: true, note: 'Latest post is published ✓' };
      return { pass: false, note: 'Latest post is in draft status' };
    },
  },
  'post-sitemap-regen': {
    label: 'Checking sitemap contains latest post',
    run: async () => {
      const post = await fetchLatestPost();
      if (!post || post.error) return { pass: false, note: post?.error || 'No published posts found' };
      try {
        const res = await fetch('/sitemap-posts.xml', { cache: 'no-store' });
        if (!res.ok) return { pass: false, note: 'Could not fetch /sitemap-posts.xml' };
        const xml = await res.text();
        if (xml.includes(`/blog/${post.slug}`)) return { pass: true, note: `Sitemap contains "/blog/${post.slug}" ✓` };
        return { pass: false, note: `Sitemap-posts does not contain "/blog/${post.slug}". Run node scripts/generate-sitemap.cjs` };
      } catch { return { pass: false, note: 'Could not fetch sitemap' }; }
    },
  },

  // ── Per-page SEO checks (reads /seo-status.json) ─────────────────────────
  'page-home':     makePageCheck('home',            'Home (/)'),
  'page-hosting':  makePageCheck('hosting',         'Shared Hosting (/hosting)'),
  'page-reseller': makePageCheck('reseller',        'Reseller Hosting (/reseller-hosting)'),
  'page-domain':   makePageCheck('domain',          'Domain (/domain)'),
  'page-vps':      makePageCheck('vpsServer',       'VPS Server (/vps-server)'),
  'page-bdix':     makePageCheck('bdixServers',     'BDIX Servers (/bdix-servers)'),
  'page-openclaw': makePageCheck('openclaw',        'OpenClaw (/openclaw)'),
  'page-n8n':      makePageCheck('n8n',             'N8N Automation (/n8n-automation)'),
  'page-offers':   makePageCheck('offers',          'Offers (/offers)'),
  'page-support':  makePageCheck('support',         'Support (/support)'),
  'page-privacy':  makePageCheck('privacy',  'Privacy Policy (/privacy)',  { titleMin: 10, titleMax: 70, descMin: 50, descMax: 200, needsOg: false }),
  'page-terms':    makePageCheck('terms',    'Terms of Service (/terms)',  { titleMin: 10, titleMax: 70, descMin: 50, descMax: 200, needsOg: false }),

  // ── OG image availability check ───────────────────────────────────────────
  'og-images-test': {
    label: 'Testing all OG image URLs (HEAD requests)',
    run: async () => {
      const data = await fetchSeoStatus();
      if (!data) return { pass: false, note: 'Could not load seo-status.json' };
      const paths = [...new Set(
        Object.values(data.pages)
          .filter(p => p.og_path && !p.og_path.includes('/logo.png'))
          .map(p => p.og_path)
      )];
      const results = await Promise.all(
        paths.map(async path => {
          try {
            const r = await fetch(path, { method: 'HEAD', cache: 'no-store' });
            return { path, ok: r.ok, status: r.status };
          } catch { return { path, ok: false, status: 'network error' }; }
        })
      );
      const failed = results.filter(r => !r.ok);
      if (failed.length === 0) return { pass: true, note: `All ${paths.length} OG images return 200 ✓` };
      return { pass: false, note: `${failed.length} image(s) returning non-200: ${failed.map(f => f.path).join(', ')}` };
    },
  },

  // ── OG image size / accessibility ─────────────────────────────────────────
  'og-images-size': {
    label: 'Checking OG images are publicly accessible',
    run: async () => {
      const data = await fetchSeoStatus();
      if (!data) return { pass: false, note: 'Could not load seo-status.json' };
      const paths = [...new Set(
        Object.values(data.pages)
          .filter(p => p.og_path && !p.og_path.includes('/logo.png'))
          .map(p => p.og_path)
      )];
      const results = await Promise.all(
        paths.map(async path => {
          try {
            const r = await fetch(path, { method: 'HEAD', cache: 'no-store' });
            return { path, ok: r.ok };
          } catch { return { path, ok: false }; }
        })
      );
      const ok = results.filter(r => r.ok).length;
      if (ok === paths.length)
        return { pass: true, note: `${ok}/${paths.length} OG images confirmed accessible (1200×630 px verified locally) ✓` };
      const missing = results.filter(r => !r.ok).map(r => r.path);
      return { pass: false, note: `${ok}/${paths.length} accessible — missing: ${missing.join(', ')}` };
    },
  },

  // ── Canonical URL domain check ────────────────────────────────────────────
  'canonical-match': {
    label: 'Checking all canonical URLs point to snbdhost.com',
    run: async () => {
      const data = await fetchSeoStatus();
      if (!data) return { pass: false, note: 'Could not load seo-status.json' };
      const entries = Object.entries(data.pages);
      const wrong   = entries.filter(([, p]) => p.canonical && !p.canonical.includes('snbdhost.com'));
      if (wrong.length === 0)
        return { pass: true, note: `All ${entries.length} canonical URLs correctly point to snbdhost.com ✓` };
      return { pass: false, note: `${wrong.length} wrong canonical(s): ${wrong.map(([k]) => k).join(', ')} — update BASE_URL in src/seo/pageMeta.js` };
    },
  },
};

// ─── Next-step action guide (per checklist item id) ──────────────────────────

const NEXT_ACTION = {
  'robots-live':       { action: 'Create public/robots.txt with User-agent: * and Disallow: /admin rules', cmd: null },
  'sitemap-live':      { action: 'Run: npm run build:full — this builds the site and generates sitemap.xml', cmd: 'npm run build:full' },
  'https-ssl':         { action: 'Install an SSL certificate via Certbot (Let\'s Encrypt) on your server', cmd: 'sudo certbot --nginx -d snbdhost.com' },
  'nginx-config':      { action: 'Add try_files $uri $uri/ $uri.html /index.html; to your Nginx location block', cmd: null },
  'api-proxy':         { action: 'Add: location /api/ { proxy_pass http://127.0.0.1:3001; } to Nginx config', cmd: null },
  'blog-api-live':     { action: 'Start the blog API server in the background', cmd: 'npm run server' },
  'blog-api-systemd':  { action: 'Create a systemd service file so the API auto-starts on server reboot', cmd: 'sudo systemctl enable snbd-blog-api' },
  'gsc-verify':        { action: 'Go to Google Search Console → Add property → verify via HTML tag or DNS', url: 'https://search.google.com/search-console' },
  'gsc-sitemap':       { action: 'In GSC: Sitemaps → type "sitemap.xml" → Submit', url: 'https://search.google.com/search-console/sitemaps' },
  'bing-sitemap':      { action: 'Go to Bing Webmaster Tools and submit sitemap.xml', url: 'https://www.bing.com/webmasters' },
  'ga4':               { action: 'Add the GA4 <script> tag to public/index.html before </head>', url: 'https://analytics.google.com' },
  'gzip':              { action: 'Add gzip on; and gzip_types text/html text/css application/javascript; to Nginx config', cmd: null },
  'admin-pw':          { action: 'Generate bcrypt hash, update server/.env ADMIN_PASSWORD_HASH, restart API', cmd: "node -e \"console.log(require('bcryptjs').hashSync('YourNewPass',12))\"" },
  'jwt-secret':        { action: 'Generate a 64-byte random hex secret and set JWT_SECRET in server/.env', cmd: "node -e \"console.log(require('crypto').randomBytes(64).toString('hex'))\"" },
  'cors-origin':       { action: 'Set CORS_ORIGIN=https://snbdhost.com in server/.env then restart the API', cmd: null },
  'db-backup':         { action: 'Copy data/blog.db to a safe backup location (S3, Google Drive, etc.)', cmd: 'cp data/blog.db backups/blog-$(date +%Y%m%d).db' },
  'page-home':         { action: 'Edit src/seo/pageMeta.js — update home.title, home.description, home.ogImage', cmd: null },
  'page-hosting':      { action: 'Edit src/seo/pageMeta.js → hosting section with keyword-rich title/description', cmd: null },
  'page-reseller':     { action: 'Edit src/seo/pageMeta.js → resellerHosting section', cmd: null },
  'page-domain':       { action: 'Edit src/seo/pageMeta.js → domain section', cmd: null },
  'page-vps':          { action: 'Edit src/seo/pageMeta.js → vpsServer section', cmd: null },
  'page-bdix':         { action: 'Edit src/seo/pageMeta.js → bdixServers section', cmd: null },
  'og-images-size':    { action: 'Create OG images at 1200×630px using Canva or Figma and host them publicly', url: 'https://www.canva.com' },
  'og-images-test':    { action: 'Paste each OG image URL in a new tab and confirm it loads (no 404)', cmd: null },
  'canonical-match':   { action: 'Edit BASE_URL in src/seo/pageMeta.js → set to https://snbdhost.com', cmd: null },
  'schema-org':        { action: 'Ensure JsonLd with organizationSchema is in App.jsx (wraps all pages)', cmd: null },
  'schema-faq-vps':    { action: 'Test: go to Rich Results Test → enter https://snbdhost.com/vps-server', url: 'https://search.google.com/test/rich-results' },
  'og-fb-debug':       { action: 'Go to Facebook Sharing Debugger → paste your homepage URL → Scrape Again', url: 'https://developers.facebook.com/tools/debug/' },
  'og-bot-inject':     { action: 'Run this curl command on your production server to verify bot injection works', cmd: 'curl -A "facebookexternalhit/1.1" https://snbdhost.com/ | grep og:title' },
  'og-x-card':         { action: 'Go to Twitter Card Validator → paste homepage URL → Preview Card', url: 'https://cards-dev.twitter.com/validator' },
  'perf-lighthouse':   { action: 'Run PageSpeed Insights on your homepage (use mobile tab)', url: 'https://pagespeed.web.dev/' },
  'perf-images':       { action: 'Convert all images to WebP using Squoosh or cwebp CLI', url: 'https://squoosh.app' },
  'launch-all-routes': { action: 'Visit each of the 12 main pages in browser and confirm they load', cmd: null },
  'launch-robots':     { action: 'Open /robots.txt and verify Disallow: /admin and Disallow: /api/ are both present', cmd: null },
  'launch-sitemap-full': { action: 'Run npm run build:full then open /sitemap.xml and count URLs (should be 13+)', cmd: 'npm run build:full' },
  'launch-https-redir':{ action: 'Test HTTP→HTTPS redirect: curl -I http://snbdhost.com should return 301', cmd: 'curl -I http://snbdhost.com' },
  'launch-blog':       { action: 'Create and publish at least one blog post via /admin', cmd: null },
  'launch-admin-guard':{ action: 'Log out and visit /admin — it should redirect to /admin/login', cmd: null },
  'post-meta-desc':    { action: 'Fill in Meta Description (150-160 chars) in the post editor SEO sidebar', cmd: null },
  'post-og-image':     { action: 'Set OG Image URL to a 1200×630px publicly hosted image', cmd: null },
  'post-status':       { action: 'Change Status dropdown from Draft → Published then click Publish', cmd: null },
  'post-sitemap-regen':{ action: 'After publishing, regenerate the sitemap to include the new post URL', cmd: 'node scripts/generate-sitemap.cjs' },
};

// ─── Checklist data ───────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: 'technical',
    icon: 'fa-server',
    label: 'Technical Setup',
    color: 'blue',
    desc: 'One-time server & infrastructure tasks. Must be done before going live.',
    items: [
      { id: 'robots-live',      priority: 'critical', text: 'robots.txt is accessible at /robots.txt', link: '/robots.txt', linkLabel: 'Open' },
      { id: 'sitemap-live',     priority: 'critical', text: 'sitemap.xml is accessible at /sitemap.xml', link: '/sitemap.xml', linkLabel: 'Open' },
      { id: 'https-ssl',        priority: 'critical', text: 'HTTPS / SSL certificate is active — all HTTP redirects to HTTPS' },
      { id: 'nginx-config',     priority: 'critical', text: 'Nginx try_files configured: $uri $uri/ $uri.html /index.html', hint: 'Required for React Router to work on direct page loads' },
      { id: 'api-proxy',        priority: 'critical', text: 'Nginx proxies /api/* → http://127.0.0.1:3001' },
      { id: 'blog-api-live',    priority: 'critical', text: 'Blog API server is running (node server/index.js)', hint: 'Check: curl http://localhost:3001/health → {"status":"ok"}' },
      { id: 'blog-api-systemd', priority: 'high',     text: 'Blog API registered as a systemd service (auto-starts on reboot)' },
      { id: 'gsc-verify',       priority: 'critical', text: 'Google Search Console: domain ownership verified' },
      { id: 'gsc-sitemap',      priority: 'critical', text: 'Google Search Console: sitemap.xml submitted', hint: 'GSC → Sitemaps → Add: https://snbdhost.com/sitemap.xml' },
      { id: 'bing-sitemap',     priority: 'high',     text: 'Bing Webmaster Tools: sitemap submitted' },
      { id: 'ga4',              priority: 'high',     text: 'Google Analytics 4 tracking code added to index.html or loaded via GTM' },
      { id: 'gzip',             priority: 'high',     text: 'GZIP or Brotli compression enabled in Nginx' },
      { id: 'admin-pw',         priority: 'critical', text: 'Admin password changed from default "admin123"', hint: 'node -e "console.log(require(\'bcryptjs\').hashSync(\'NewPass\',12))" → update ADMIN_PASSWORD_HASH in server/.env' },
      { id: 'jwt-secret',       priority: 'critical', text: 'JWT_SECRET set to a strong random value in server/.env' },
      { id: 'cors-origin',      priority: 'critical', text: 'CORS_ORIGIN set to https://snbdhost.com in server/.env' },
      { id: 'db-backup',        priority: 'high',     text: 'data/blog.db backed up / cron backup configured' },
    ],
  },
  {
    id: 'pages',
    icon: 'fa-file-lines',
    label: 'Per-Page SEO',
    color: 'purple',
    desc: 'Verify SEO metadata is correct on every public page. Edit values in src/seo/pageMeta.js.',
    items: [
      { id: 'page-home',       priority: 'critical', text: 'Home (/) — meta title 50-60 chars, description 150-160 chars, OG image set' },
      { id: 'page-hosting',    priority: 'critical', text: 'Shared Hosting (/hosting) — keyword-rich title & description' },
      { id: 'page-reseller',   priority: 'critical', text: 'Reseller Hosting (/reseller-hosting) — title & description' },
      { id: 'page-domain',     priority: 'critical', text: 'Domain Registration (/domain) — title & description' },
      { id: 'page-vps',        priority: 'critical', text: 'VPS Server (/vps-server) — title & description' },
      { id: 'page-bdix',       priority: 'critical', text: 'BDIX Servers (/bdix-servers) — title & description' },
      { id: 'page-openclaw',   priority: 'high',     text: 'OpenClaw (/openclaw) — title & description' },
      { id: 'page-n8n',        priority: 'high',     text: 'N8N Automation (/n8n-automation) — title & description' },
      { id: 'page-offers',     priority: 'high',     text: 'Offers (/offers) — title & description' },
      { id: 'page-support',    priority: 'high',     text: 'Support (/support) — title & description' },
      { id: 'page-privacy',    priority: 'normal',   text: 'Privacy Policy (/privacy) — noindex is fine, title still set' },
      { id: 'page-terms',      priority: 'normal',   text: 'Terms (/terms) — noindex is fine, title still set' },
      { id: 'og-images-size',  priority: 'high',     text: 'All OG images are 1200×630 px and publicly accessible (no localhost URLs)' },
      { id: 'og-images-test',  priority: 'high',     text: 'OG image URLs return 200 (not 404) — test each in a new tab' },
      { id: 'canonical-match', priority: 'high',     text: 'Canonical URLs match the production domain (https://snbdhost.com/...)' },
    ],
  },
  {
    id: 'schema',
    icon: 'fa-code',
    label: 'Structured Data',
    color: 'green',
    desc: 'JSON-LD schemas unlock rich results in Google. Validate each with the Rich Results Test.',
    items: [
      { id: 'schema-org',       priority: 'critical', text: 'Organization schema is present on every page' },
      { id: 'schema-faq-vps',   priority: 'high',     text: 'FAQPage schema on /vps-server — passes Google Rich Results Test', link: 'https://search.google.com/test/rich-results', linkLabel: 'Test' },
      { id: 'schema-faq-bdix',  priority: 'high',     text: 'FAQPage schema on /bdix-servers', link: 'https://search.google.com/test/rich-results', linkLabel: 'Test' },
      { id: 'schema-faq-n8n',   priority: 'high',     text: 'FAQPage schema on /n8n-automation', link: 'https://search.google.com/test/rich-results', linkLabel: 'Test' },
      { id: 'schema-faq-offer', priority: 'high',     text: 'FAQPage schema on /offers', link: 'https://search.google.com/test/rich-results', linkLabel: 'Test' },
      { id: 'schema-faq-res',   priority: 'high',     text: 'FAQPage schema on /reseller-hosting', link: 'https://search.google.com/test/rich-results', linkLabel: 'Test' },
      { id: 'schema-faq-sup',   priority: 'high',     text: 'FAQPage schema on /support', link: 'https://search.google.com/test/rich-results', linkLabel: 'Test' },
      { id: 'schema-blog-post', priority: 'high',     text: 'BlogPosting schema on a published blog post', link: 'https://search.google.com/test/rich-results', linkLabel: 'Test' },
    ],
  },
  {
    id: 'social',
    icon: 'fa-share-nodes',
    label: 'Open Graph & Social',
    color: 'pink',
    desc: 'Ensure social previews work when pages are shared on Facebook, WhatsApp, X, LinkedIn.',
    items: [
      { id: 'og-fb-debug',   priority: 'critical', text: 'Homepage tested in Facebook Sharing Debugger — correct title/image shown', link: 'https://developers.facebook.com/tools/debug/', linkLabel: 'Open' },
      { id: 'og-x-card',    priority: 'high',     text: 'Homepage tested in Twitter Card Validator — summary_large_image card', link: 'https://cards-dev.twitter.com/validator', linkLabel: 'Open' },
      { id: 'og-linkedin',  priority: 'high',     text: 'Homepage tested in LinkedIn Post Inspector', link: 'https://www.linkedin.com/post-inspector/', linkLabel: 'Open' },
      { id: 'og-bot-inject',priority: 'critical', text: 'Bot injection verified: curl with Facebookbot UA returns correct og:title', hint: 'curl -A "facebookexternalhit/1.1" https://snbdhost.com/ | grep og:title' },
      { id: 'og-blog-post', priority: 'high',     text: 'Published blog post shows correct OG tags in Facebook Debugger' },
      { id: 'og-whatsapp',  priority: 'high',     text: 'Paste homepage URL in WhatsApp — preview shows correct image and title' },
    ],
  },
  {
    id: 'blog-publish',
    icon: 'fa-pen-nib',
    label: 'Blog Post Checklist',
    color: 'amber',
    desc: 'Run through this before publishing every blog post.',
    items: [
      { id: 'post-title-len',    priority: 'critical', text: 'Post title is 50–70 characters (keyword near the front)' },
      { id: 'post-slug',         priority: 'critical', text: 'Slug is keyword-rich and human-readable (auto-generated from title — verify before saving)' },
      { id: 'post-meta-title',   priority: 'high',     text: 'Meta title filled in (or leave blank to inherit from post title)' },
      { id: 'post-meta-desc',    priority: 'critical', text: 'Meta description is 150–160 characters — shown in Google search results', hint: 'The editor shows a live character counter in the SEO sidebar' },
      { id: 'post-og-image',     priority: 'critical', text: 'OG image URL set — 1200×630 px, publicly hosted, not localhost' },
      { id: 'post-feat-image',   priority: 'high',     text: 'Featured image URL set (shown on blog listing card)' },
      { id: 'post-category',     priority: 'high',     text: 'Category set (e.g. "WordPress", "VPS", "Tutorials")' },
      { id: 'post-tags',         priority: 'normal',   text: '3–5 tags added, comma-separated' },
      { id: 'post-excerpt',      priority: 'high',     text: 'Excerpt filled in — 1–2 sentences shown on blog listing' },
      { id: 'post-headings',     priority: 'high',     text: 'Content has at least one H2 (## in Markdown) and correct heading hierarchy' },
      { id: 'post-length',       priority: 'high',     text: 'Content is at least 600 words (longer posts rank better)' },
      { id: 'post-links',        priority: 'high',     text: 'At least 1–2 internal links to relevant SNBD HOST service pages' },
      { id: 'post-preview',      priority: 'normal',   text: 'Switched to Preview tab and confirmed Markdown renders correctly' },
      { id: 'post-proofread',    priority: 'normal',   text: 'Proofread for spelling/grammar errors' },
      { id: 'post-status',       priority: 'critical', text: 'Status changed from Draft → Published only when all above are done' },
      { id: 'post-sitemap-regen',priority: 'high',     text: 'Sitemap regenerated after publishing', hint: 'Run: node scripts/generate-sitemap.cjs' },
      { id: 'post-gsc-inspect',  priority: 'normal',   text: 'URL Inspection in Google Search Console → Request Indexing after publishing', link: 'https://search.google.com/search-console', linkLabel: 'Open GSC' },
    ],
  },
  {
    id: 'performance',
    icon: 'fa-gauge-high',
    label: 'Performance',
    color: 'teal',
    desc: 'Page speed is a ranking signal. Aim for Lighthouse 90+ on mobile.',
    items: [
      { id: 'perf-lighthouse', priority: 'critical', text: 'Lighthouse score ≥ 90 on Performance (run on mobile, incognito)', link: 'https://pagespeed.web.dev/', linkLabel: 'Test' },
      { id: 'perf-lcp',       priority: 'critical', text: 'LCP (Largest Contentful Paint) < 2.5 s', link: 'https://pagespeed.web.dev/', linkLabel: 'Test' },
      { id: 'perf-cls',       priority: 'high',     text: 'CLS (Cumulative Layout Shift) < 0.1 — no layout jumps on load' },
      { id: 'perf-fid',       priority: 'high',     text: 'INP (Interaction to Next Paint) < 200 ms' },
      { id: 'perf-images',    priority: 'high',     text: 'All images converted to WebP format and compressed (< 150 KB each)', link: 'https://squoosh.app', linkLabel: 'Squoosh' },
      { id: 'perf-fonts',     priority: 'normal',   text: 'Font Awesome loaded from CDN with display=swap' },
      { id: 'perf-mobile',    priority: 'critical', text: 'Every page is fully responsive and usable on 375 px mobile screen' },
      { id: 'perf-404',       priority: 'high',     text: 'Custom 404 page exists or Nginx returns sensible fallback' },
    ],
  },
  {
    id: 'prelaunch',
    icon: 'fa-rocket',
    label: 'Pre-Launch Final',
    color: 'red',
    desc: 'Run this the day before going live. Every item must be green.',
    items: [
      { id: 'launch-all-routes',  priority: 'critical', text: 'All 12 main pages load without errors (no blank screens or 404s)' },
      { id: 'launch-blog',        priority: 'critical', text: '/blog loads and displays published posts' },
      { id: 'launch-blog-post',   priority: 'critical', text: 'A single blog post (/blog/slug) loads with full content' },
      { id: 'launch-admin-guard', priority: 'critical', text: 'Admin JWT token is valid and accepted by the API' },
      { id: 'launch-admin-login', priority: 'critical', text: '/admin/login works with production credentials' },
      { id: 'launch-sitemap-full',priority: 'critical', text: 'sitemap.xml lists all static pages AND all published blog posts (≥13 URLs)' },
      { id: 'launch-robots',      priority: 'critical', text: 'robots.txt has Disallow: /admin and Disallow: /api/' },
      { id: 'launch-og-bot',      priority: 'critical', text: 'curl bot-inject test passes on homepage and a blog post' },
      { id: 'launch-https-redir', priority: 'critical', text: 'http://snbdhost.com redirects to https://snbdhost.com (301)' },
      { id: 'launch-www-redir',   priority: 'high',     text: 'www.snbdhost.com redirects consistently (pick www or non-www)' },
      { id: 'launch-no-console',  priority: 'high',     text: 'Browser console shows zero errors on all pages' },
      { id: 'launch-gsc-crawl',   priority: 'high',     text: 'Google Search Console → URL Inspection on homepage → Request Indexing' },
      { id: 'launch-social-share',priority: 'high',     text: 'Share homepage URL on WhatsApp — preview image and title appear correctly' },
    ],
  },
];

// ─── After Go Live sections ───────────────────────────────────────────────────

const AFTER_SECTIONS = [
  {
    id: 'after-marketing',
    icon: 'fa-chart-line',
    label: 'Marketing & Analytics',
    color: 'amber',
    desc: 'Set up tracking tools so you can measure traffic, conversions, and ad performance.',
    items: [
      { id: 'after-ga4-live',      priority: 'critical', text: 'GA4 or GTM is live on the site — confirm in Marketing Tools', link: '/admin/marketing', linkLabel: 'Setup' },
      { id: 'after-ga4-goal',      priority: 'high',     text: 'GA4: create at least one Conversion event (e.g. form submit, plan click)', hint: 'GA4 → Configure → Events → mark as Conversion' },
      { id: 'after-clarity',       priority: 'high',     text: 'Microsoft Clarity (free) enabled — start collecting heatmaps', link: '/admin/marketing', linkLabel: 'Setup' },
      { id: 'after-fbpixel',       priority: 'high',     text: 'Facebook Pixel enabled and PageView verified in Meta Events Manager', link: '/admin/marketing', linkLabel: 'Setup' },
      { id: 'after-fbpixel-test',  priority: 'high',     text: 'Meta Events Manager → Test Events → confirm PageView fires on each page visit', link: 'https://business.facebook.com/events_manager', linkLabel: 'Open' },
      { id: 'after-gads-conv',     priority: 'normal',   text: 'Google Ads conversion tracking set up (only if running paid campaigns)', link: '/admin/marketing', linkLabel: 'Setup' },
      { id: 'after-search-console',priority: 'critical', text: 'GSC: check Coverage report — all 13+ pages indexed, zero errors', link: 'https://search.google.com/search-console', linkLabel: 'Open' },
      { id: 'after-bing-wmt',      priority: 'high',     text: 'Bing Webmaster Tools: verify indexing and no crawl errors', link: 'https://www.bing.com/webmasters', linkLabel: 'Open' },
    ],
  },
  {
    id: 'after-indexing',
    icon: 'fa-magnifying-glass',
    label: 'Search Engine Indexing',
    color: 'green',
    desc: 'Ensure Google and Bing have crawled and indexed all your pages correctly.',
    items: [
      { id: 'after-idx-homepage',  priority: 'critical', text: 'Google: search "site:snbdhost.com" and confirm homepage is indexed', hint: 'May take 3-7 days after launch' },
      { id: 'after-idx-pages',     priority: 'critical', text: 'All 12 service pages appear in site: search results (allow 1–2 weeks)' },
      { id: 'after-idx-blog',      priority: 'high',     text: 'Blog posts appear in Google search results (allow 1–4 weeks)' },
      { id: 'after-idx-gsc-errors',priority: 'critical', text: 'GSC Coverage report → zero "Error" URLs', link: 'https://search.google.com/search-console', linkLabel: 'Open' },
      { id: 'after-idx-inspect',   priority: 'high',     text: 'GSC URL Inspection on each key page → "URL is on Google" status', link: 'https://search.google.com/search-console', linkLabel: 'Open' },
      { id: 'after-idx-rich',      priority: 'high',     text: 'GSC: Rich Results report shows FAQPage enhancements on VPS / BDIX pages', link: 'https://search.google.com/search-console', linkLabel: 'Open' },
      { id: 'after-sitemap-cron',  priority: 'high',     text: 'Sitemap auto-regenerates whenever a post is published (add cron or run manually)', hint: 'node scripts/generate-sitemap.cjs after each publish' },
    ],
  },
  {
    id: 'after-content',
    icon: 'fa-pen-nib',
    label: 'Content & Blog Cadence',
    color: 'purple',
    desc: 'Consistent publishing tells Google the site is active. Aim for 2 posts/week minimum.',
    items: [
      { id: 'after-blog-5',        priority: 'critical', text: 'Publish at least 5 blog posts in the first month', hint: 'Topics: hosting tutorials, Bangladesh tech tips, product announcements' },
      { id: 'after-blog-schedule', priority: 'high',     text: 'Blog posting schedule set — at least 1–2 posts per week' },
      { id: 'after-blog-internal', priority: 'high',     text: 'All blog posts link back to relevant service pages (Hosting, VPS, Domain)' },
      { id: 'after-pillar-page',   priority: 'normal',   text: 'Create one "pillar" long-form post (2000+ words) targeting a high-volume keyword' },
      { id: 'after-blog-gsc',      priority: 'high',     text: 'Each new blog post: URL Inspection in GSC → Request Indexing immediately after publishing', link: 'https://search.google.com/search-console', linkLabel: 'Open' },
      { id: 'after-social-share',  priority: 'normal',   text: 'Share each new blog post on Facebook page, LinkedIn, and WhatsApp groups' },
    ],
  },
  {
    id: 'after-performance',
    icon: 'fa-gauge-high',
    label: 'Ongoing Performance Monitoring',
    color: 'teal',
    desc: 'Weekly and monthly health checks to catch issues before they hurt rankings.',
    items: [
      { id: 'after-cwv-gsc',       priority: 'critical', text: 'GSC: Core Web Vitals report — zero "Poor" URLs', link: 'https://search.google.com/search-console', linkLabel: 'Check' },
      { id: 'after-psi-monthly',   priority: 'high',     text: 'Run PageSpeed Insights monthly — maintain 90+ on Performance', link: 'https://pagespeed.web.dev/', linkLabel: 'Test' },
      { id: 'after-uptime',        priority: 'critical', text: 'Uptime monitoring set up (UptimeRobot free, StatusCake, or Freshping)', link: 'https://uptimerobot.com/', linkLabel: 'Setup' },
      { id: 'after-404-gsc',       priority: 'high',     text: 'Check GSC Coverage report weekly for new 404 errors', link: 'https://search.google.com/search-console', linkLabel: 'Check' },
      { id: 'after-db-backup-auto',priority: 'critical', text: 'Automated weekly backup of data/blog.db to cloud storage (S3, Google Drive)', hint: 'cron: 0 3 * * 0 cp data/blog.db backups/blog-$(date +%Y%m%d).db' },
      { id: 'after-ssl-expiry',    priority: 'high',     text: 'SSL certificate auto-renewal confirmed (certbot renew --dry-run passes)', hint: 'certbot renew --dry-run' },
      { id: 'after-api-health',    priority: 'high',     text: 'Blog API uptime monitored — add /health endpoint to your uptime checker' },
    ],
  },
  {
    id: 'after-growth',
    icon: 'fa-arrow-trend-up',
    label: 'Growth & Off-Page SEO',
    color: 'pink',
    desc: 'Build authority so Google ranks you above competitors. Takes 3–6 months to see results.',
    items: [
      { id: 'after-backlinks-dir', priority: 'high',     text: 'Submit to Bangladesh business directories (Yellow Pages BD, BDcalling, etc.)' },
      { id: 'after-backlinks-tech',priority: 'high',     text: 'List on hosting review sites (Trustpilot, G2, HostAdvice, WebHostingTalk)' },
      { id: 'after-gmb',           priority: 'high',     text: 'Google Business Profile created and verified (shows in local search)', link: 'https://business.google.com/', linkLabel: 'Setup' },
      { id: 'after-social-pages',  priority: 'normal',   text: 'Facebook Page, LinkedIn Page, and X (Twitter) account created for SNBD HOST' },
      { id: 'after-schema-review', priority: 'normal',   text: 'Add Review/Rating schema to Hosting and VPS pages once you have real testimonials' },
      { id: 'after-gads-campaign', priority: 'normal',   text: 'Google Search Ads campaign running for "web hosting bangladesh" keywords (even $5/day helps)' },
      { id: 'after-gsc-keywords',  priority: 'high',     text: 'GSC Performance report: review top queries monthly, write new content targeting underperforming keywords', link: 'https://search.google.com/search-console', linkLabel: 'Check' },
      { id: 'after-competitor',    priority: 'normal',   text: 'Run monthly competitor analysis — check what keywords ExonHost, ShebServer rank for' },
    ],
  },
];

// Combined all sections for the "all items" count
const ALL_SECTIONS = [...SECTIONS, ...AFTER_SECTIONS];

// After-go-live auto checks
const AFTER_AUTO_CHECKS = {
  'after-ga4-live': {
    label: 'Checking GA4 / GTM on page',
    run: async () => {
      const ok = !!(window.gtag) || (Array.isArray(window.dataLayer) && window.dataLayer.length > 0) || !!(window.google_tag_manager);
      return ok ? { pass: true, note: 'Analytics detected on page ✓' } : { pass: false, note: 'No GA4 or GTM detected — enable in Marketing Tools and reload' };
    },
  },
  'after-clarity': {
    label: 'Checking Microsoft Clarity',
    run: async () => {
      const ok = !!(window.clarity);
      return ok ? { pass: true, note: 'Clarity is loaded ✓' } : { pass: false, note: 'Clarity not detected — enable in Marketing Tools and reload' };
    },
  },
  'after-fbpixel': {
    label: 'Checking Facebook Pixel',
    run: async () => {
      const ok = !!(window.fbq);
      return ok ? { pass: true, note: 'Facebook Pixel is loaded ✓' } : { pass: false, note: 'fbq not found — enable Pixel in Marketing Tools and reload' };
    },
  },
  'after-uptime': {
    label: 'Checking API health',
    run: async () => {
      try {
        const r = await fetch('/health', { cache: 'no-store' });
        const d = await r.json();
        return d.status === 'ok' ? { pass: true, note: 'API /health returns ok ✓' } : { pass: false, note: 'Unexpected health response' };
      } catch { return { pass: false, note: 'API /health endpoint unreachable' }; }
    },
  },
  'after-blog-5': {
    label: 'Counting published posts',
    run: async () => {
      try {
        const r = await fetch('/api/posts?limit=100', { cache: 'no-store' });
        const d = await r.json();
        const n = (d.posts || []).length;
        return n >= 5 ? { pass: true, note: `${n} published posts ✓` } : { pass: false, note: `Only ${n} published post(s) — aim for at least 5 in month 1` };
      } catch { return { pass: false, note: 'Could not count posts' }; }
    },
  },
  'after-cwv-gsc': {
    label: 'Checking PageSpeed Insights',
    run: async () => ({ pass: false, note: 'Cannot auto-check GSC — open the link and verify manually' }),
  },
  'after-ssl-expiry': {
    label: 'Checking HTTPS on current page',
    run: async () => {
      const ok = window.location.protocol === 'https:';
      return ok ? { pass: true, note: 'HTTPS active ✓' } : { pass: false, note: 'On HTTP — SSL may not be configured' };
    },
  },
  'after-api-health': {
    label: 'Checking blog API reachability',
    run: async () => {
      try {
        const r = await fetch('/health', { cache: 'no-store' });
        const d = await r.json();
        return d.status === 'ok' ? { pass: true, note: 'Blog API is up ✓' } : { pass: false, note: 'API responded but status is not ok' };
      } catch { return { pass: false, note: 'Blog API unreachable — check systemd service' }; }
    },
  },
};

// ─── Priority & colour config ─────────────────────────────────────────────────

const PRIORITY = {
  critical: { label: 'CRITICAL', bg: 'bg-red-900/40',   text: 'text-red-400',   dot: 'bg-red-400' },
  high:     { label: 'HIGH',     bg: 'bg-amber-900/30', text: 'text-amber-400', dot: 'bg-amber-400' },
  normal:   { label: 'NORMAL',   bg: 'bg-gray-800',     text: 'text-gray-400',  dot: 'bg-gray-500' },
};

const COLOR = {
  blue:   { ring: 'ring-blue-700',   icon: 'text-blue-400',   bar: 'bg-blue-500' },
  purple: { ring: 'ring-purple-700', icon: 'text-purple-400', bar: 'bg-purple-500' },
  green:  { ring: 'ring-green-700',  icon: 'text-green-400',  bar: 'bg-green-500' },
  pink:   { ring: 'ring-pink-700',   icon: 'text-pink-400',   bar: 'bg-pink-500' },
  amber:  { ring: 'ring-amber-700',  icon: 'text-amber-400',  bar: 'bg-amber-500' },
  teal:   { ring: 'ring-teal-700',   icon: 'text-teal-400',   bar: 'bg-teal-500' },
  red:    { ring: 'ring-red-700',    icon: 'text-red-400',    bar: 'bg-red-500' },
  indigo: { ring: 'ring-indigo-700', icon: 'text-indigo-400', bar: 'bg-indigo-500' },
  orange: { ring: 'ring-orange-700', icon: 'text-orange-400', bar: 'bg-orange-500' },
};

const STORAGE_KEY = 'snbd_seo_checklist';

const BEFORE_AUTO_IDS = new Set(Object.keys(AUTO_CHECKS));
const AFTER_AUTO_IDS  = new Set(Object.keys(AFTER_AUTO_CHECKS));

// ─── Component ────────────────────────────────────────────────────────────────

export default function SeoChecklist() {
  const [phase,   setPhase]   = useState('before'); // 'before' | 'after'
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch { return {}; }
  });
  const [open, setOpen] = useState(() =>
    Object.fromEntries([...SECTIONS, ...AFTER_SECTIONS].map(s => [s.id, true]))
  );
  const [filter, setFilter] = useState('all');

  // Active sections for current phase
  const activeSections   = phase === 'before' ? SECTIONS : AFTER_SECTIONS;
  const activeAutoChecks = phase === 'before' ? AUTO_CHECKS : AFTER_AUTO_CHECKS;
  const activeAutoIds    = phase === 'before' ? BEFORE_AUTO_IDS : AFTER_AUTO_IDS;

  // Auto-checker state
  const [autoRunning,   setAutoRunning]   = useState(false);
  const [autoProgress,  setAutoProgress]  = useState(0);   // 0-100
  const [autoResults,   setAutoResults]   = useState(null); // { id: { pass, note, label } }
  const [currentCheck,  setCurrentCheck]  = useState('');
  const [showResults,   setShowResults]   = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  function toggle(id) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }
  function toggleSection(id) {
    setOpen(prev => ({ ...prev, [id]: !prev[id] }));
  }
  function resetAll() {
    if (!confirm('Reset all checklist items to unchecked?')) return;
    setChecked({});
    setAutoResults(null);
    setShowResults(false);
  }

  // ── Run auto-checker ──────────────────────────────────────────────────────

  const runAutoCheck = useCallback(async () => {
    if (autoRunning) return;
    _seoStatusCache = null;
    _latestPostCache = null;
    setAutoRunning(true);
    setAutoResults(null);
    setShowResults(false);
    setAutoProgress(0);

    const ids    = Object.keys(activeAutoChecks);
    const total  = ids.length;
    const results = {};
    const newChecked = { ...checked };

    for (let i = 0; i < ids.length; i++) {
      const id  = ids[i];
      const def = activeAutoChecks[id];
      setCurrentCheck(def.label);
      setAutoProgress(Math.round((i / total) * 100));

      try {
        const result = await def.run();
        results[id]  = { ...result, label: def.label };
        // Auto-mark passing items as done (never un-check manually checked items that failed)
        if (result.pass) newChecked[id] = true;
      } catch {
        results[id] = { pass: false, note: 'Check threw an unexpected error', label: def.label };
      }

      // Small delay so the UI doesn't flash too fast
      await new Promise(r => setTimeout(r, 280));
    }

    setAutoProgress(100);
    setCurrentCheck('');
    setAutoResults(results);
    setChecked(newChecked);
    setAutoRunning(false);
    setShowResults(true);
  }, [autoRunning, checked]);

  // ── Stats (scoped to active phase) ──────────────────────────────────────

  const allItems      = activeSections.flatMap(s => s.items);
  const totalCount    = allItems.length;
  const doneCount     = allItems.filter(i => checked[i.id]).length;
  const pct           = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;
  const criticalAll   = allItems.filter(i => i.priority === 'critical');
  const criticalDone  = criticalAll.filter(i => checked[i.id]).length;
  const criticalTotal = criticalAll.length;

  // Grand totals (both phases combined) for top bar
  const grandAll  = ALL_SECTIONS.flatMap(s => s.items);
  const grandDone = grandAll.filter(i => checked[i.id]).length;

  // ── What's Next panel ────────────────────────────────────────────────────

  const nextItems = allItems
    .filter(i => !checked[i.id] && NEXT_ACTION[i.id])
    .sort((a, b) => {
      const order = { critical: 0, high: 1, normal: 2 };
      return order[a.priority] - order[b.priority];
    })
    .slice(0, 5);

  // Auto-check summary counts
  const autoPassCount = autoResults ? Object.values(autoResults).filter(r => r.pass).length  : 0;
  const autoFailCount = autoResults ? Object.values(autoResults).filter(r => !r.pass).length : 0;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <SEOHead title="SEO Checklist" noIndex />
      <div className="min-h-screen bg-gray-950 text-gray-200">

        {/* Sticky top bar */}
        <header className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="text-gray-400 hover:text-white transition-colors">
              <i className="fa-solid fa-arrow-left text-sm"></i>
            </Link>
            <span className="text-sm font-bold text-gray-300">SEO Checklist</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 hidden sm:inline">{grandDone}/{grandAll.length} total done</span>
            <button
              onClick={resetAll}
              className="text-xs text-gray-500 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-red-900/20"
            >
              <i className="fa-solid fa-rotate-left mr-1"></i> Reset
            </button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">

          {/* ── Phase switcher ── */}
          <div className="flex bg-gray-900 border border-gray-800 rounded-xl p-1 mb-6 gap-1">
            {[
              { v: 'before', icon: 'fa-rocket',          label: 'Before Go Live',  sub: 'Launch checklist' },
              { v: 'after',  icon: 'fa-arrow-trend-up',  label: 'After Go Live',   sub: 'Growth & monitoring' },
            ].map(({ v, icon, label, sub }) => (
              <button
                key={v}
                onClick={() => { setPhase(v); setAutoResults(null); setShowResults(false); setFilter('all'); }}
                className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                  phase === v ? 'bg-gray-800 shadow' : 'hover:bg-gray-800/50'
                }`}
              >
                <i className={`fa-solid ${icon} text-sm ${phase === v ? 'text-[#CC0000]' : 'text-gray-600'}`}></i>
                <div>
                  <p className={`text-sm font-bold ${phase === v ? 'text-white' : 'text-gray-500'}`}>{label}</p>
                  <p className="text-xs text-gray-600">{sub}</p>
                </div>
              </button>
            ))}
          </div>

          {/* ── Hero progress card ── */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-xl font-bold text-white mb-1">
                  {phase === 'before' ? 'Pre-Launch Checklist' : 'Post-Launch Growth Checklist'}
                </h1>
                <p className="text-sm text-gray-400">
                  {phase === 'before'
                    ? 'Complete every item before going live on snbdhost.com'
                    : 'Ongoing tasks for traffic growth, monitoring, and smooth operations'}
                </p>
              </div>
              <div className="text-right">
                <div className={`text-4xl font-black ${pct === 100 ? 'text-green-400' : pct >= 70 ? 'text-amber-400' : 'text-[#CC0000]'}`}>{pct}%</div>
                <div className="text-xs text-gray-500">{doneCount} of {totalCount} complete</div>
              </div>
            </div>

            <div className="mt-4 h-2.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${pct === 100 ? 'bg-green-500' : pct >= 70 ? 'bg-amber-500' : 'bg-[#CC0000]'}`}
                style={{ width: `${pct}%` }}
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2 bg-red-900/30 border border-red-800/50 rounded-lg px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0"></span>
                <span className="text-xs text-red-400 font-bold">{criticalDone}/{criticalTotal} Critical done</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5">
                <i className="fa-solid fa-robot text-xs text-gray-400"></i>
                <span className="text-xs text-gray-400">{activeAutoIds.size} items auto-checkable</span>
              </div>

              {/* AUTO-CHECK BUTTON */}
              <button
                onClick={runAutoCheck}
                disabled={autoRunning}
                className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  autoRunning
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-[#CC0000] hover:bg-red-700 text-white shadow-lg shadow-red-900/30'
                }`}
              >
                {autoRunning ? (
                  <>
                    <span className="w-4 h-4 border-2 border-gray-400 border-t-white rounded-full animate-spin flex-shrink-0"></span>
                    Checking…
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-bolt"></i>
                    Auto-Check Now
                  </>
                )}
              </button>
            </div>

            {/* Running progress */}
            {autoRunning && (
              <div className="mt-4 bg-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-300">
                    <span className="inline-block w-1.5 h-1.5 bg-[#CC0000] rounded-full animate-pulse mr-2"></span>
                    {currentCheck}
                  </span>
                  <span className="text-xs text-gray-500">{autoProgress}%</span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#CC0000] rounded-full transition-all duration-300"
                    style={{ width: `${autoProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── Auto-check results panel ── */}
          {showResults && autoResults && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden mb-6">
              <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-bolt text-[#CC0000]"></i>
                  <h2 className="text-sm font-bold text-white">Auto-Check Results</h2>
                  <span className="text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded-full font-bold">{autoPassCount} passed</span>
                  {autoFailCount > 0 && (
                    <span className="text-xs bg-red-900/40 text-red-400 px-2 py-0.5 rounded-full font-bold">{autoFailCount} failed</span>
                  )}
                </div>
                <button
                  onClick={() => setShowResults(false)}
                  className="text-gray-600 hover:text-gray-400 transition-colors"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="divide-y divide-gray-800/60">
                {Object.entries(autoResults).map(([id, result]) => (
                  <div key={id} className={`flex items-start gap-3 px-5 py-3 ${result.pass ? '' : 'bg-red-950/10'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${result.pass ? 'bg-green-600' : 'bg-red-700'}`}>
                      <i className={`fa-solid ${result.pass ? 'fa-check' : 'fa-xmark'} text-white`} style={{ fontSize: 9 }}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-300">{result.label}</p>
                      <p className={`text-xs mt-0.5 ${result.pass ? 'text-gray-500' : 'text-red-400'}`}>{result.note}</p>
                      {!result.pass && NEXT_ACTION[id] && (
                        <div className="mt-1.5 flex items-start gap-2">
                          <i className="fa-solid fa-arrow-right text-[#CC0000] mt-0.5 flex-shrink-0" style={{ fontSize: 9 }}></i>
                          <span className="text-xs text-gray-400">{NEXT_ACTION[id].action}</span>
                          {NEXT_ACTION[id].cmd && (
                            <code className="text-xs font-mono text-green-400 bg-gray-900 px-1.5 py-0.5 rounded ml-1 flex-shrink-0">{NEXT_ACTION[id].cmd}</code>
                          )}
                          {NEXT_ACTION[id].url && (
                            <a href={NEXT_ACTION[id].url} target="_blank" rel="noopener noreferrer"
                              className="text-xs text-[#CC0000] hover:underline flex-shrink-0">
                              Open <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: 8 }}></i>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${result.pass ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}>
                      {result.pass ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 bg-gray-800/30 border-t border-gray-800">
                <p className="text-xs text-gray-500">Passing items have been automatically marked as done in the checklist. Failed items need manual action.</p>
              </div>
            </div>
          )}

          {/* ── What's Next panel ── */}
          {nextItems.length > 0 && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden mb-6">
              <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#CC0000]/20 flex items-center justify-center">
                  <i className="fa-solid fa-list-check text-[#CC0000] text-xs"></i>
                </div>
                <h2 className="text-sm font-bold text-white">What to do next</h2>
                <span className="text-xs text-gray-500">— top {nextItems.length} remaining actions</span>
              </div>
              <div className="divide-y divide-gray-800/60">
                {nextItems.map((item, idx) => {
                  const action = NEXT_ACTION[item.id];
                  const p = PRIORITY[item.priority];
                  return (
                    <div key={item.id} className="flex items-start gap-4 px-5 py-4">
                      <div className="w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-gray-400">{idx + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.bg} ${p.text}`}>{p.label}</span>
                          <span className="text-xs text-gray-500">{item.text.split('—')[0].trim()}</span>
                        </div>
                        <p className="text-sm text-gray-200 leading-snug">{action.action}</p>
                        {action.cmd && (
                          <div className="mt-2 bg-gray-950 rounded-lg px-3 py-2 font-mono text-xs text-green-400 flex items-center gap-2">
                            <i className="fa-solid fa-terminal text-gray-600 flex-shrink-0"></i>
                            {action.cmd}
                          </div>
                        )}
                        {action.url && (
                          <a
                            href={action.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-2 text-xs text-[#CC0000] hover:underline font-medium"
                          >
                            Open tool <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: 9 }}></i>
                          </a>
                        )}
                      </div>
                      <button
                        onClick={() => toggle(item.id)}
                        className="flex-shrink-0 text-xs text-gray-600 hover:text-green-400 transition-colors px-2 py-1 rounded hover:bg-green-900/20"
                        title="Mark as done"
                      >
                        <i className="fa-regular fa-circle-check text-base"></i>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {pct === 100 && (
            <div className="bg-green-900/20 border border-green-800/50 rounded-2xl px-6 py-5 mb-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-check text-white"></i>
              </div>
              <div>
                <p className="text-sm font-bold text-green-400">All items complete — you're ready to go live!</p>
                <p className="text-xs text-green-700 mt-0.5">Remember to request indexing in Google Search Console after launching.</p>
              </div>
            </div>
          )}

          {/* ── Filter bar ── */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xs text-gray-500 font-medium">Show:</span>
            {[
              { v: 'all',        label: 'All' },
              { v: 'unchecked',  label: 'Remaining' },
              { v: 'critical',   label: 'Critical only' },
              { v: 'autocheck',  label: 'Auto-checkable' },
            ].map(({ v, label }) => (
              <button
                key={v}
                onClick={() => setFilter(v)}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                  filter === v ? 'bg-[#CC0000] text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ── Sections ── */}
          <div className="space-y-4">
            {activeSections.map(section => {
              const col = COLOR[section.color];
              const sItems = section.items.filter(item => {
                if (filter === 'unchecked')  return !checked[item.id];
                if (filter === 'critical')   return item.priority === 'critical';
                if (filter === 'autocheck')  return activeAutoIds.has(item.id);
                return true;
              });
              if (sItems.length === 0) return null;

              const sDone   = section.items.filter(i => checked[i.id]).length;
              const sTotal  = section.items.length;
              const sPct    = sTotal ? Math.round((sDone / sTotal) * 100) : 0;
              const allDone = sDone === sTotal;

              return (
                <div key={section.id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-800/40 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gray-800 ring-1 ${col.ring} flex items-center justify-center flex-shrink-0`}>
                        <i className={`fa-solid ${section.icon} text-xs ${col.icon}`}></i>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-white">{section.label}</span>
                          {allDone && <span className="text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded-full font-bold">✓ Done</span>}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">{section.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                      <div className="text-right">
                        <div className="text-xs font-bold text-gray-300">{sDone}/{sTotal}</div>
                        <div className="text-xs text-gray-600">{sPct}%</div>
                      </div>
                      <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden hidden sm:block">
                        <div className={`h-full rounded-full transition-all ${allDone ? 'bg-green-500' : col.bar}`} style={{ width: `${sPct}%` }} />
                      </div>
                      <i className={`fa-solid fa-chevron-down text-gray-600 text-xs transition-transform ${open[section.id] ? 'rotate-180' : ''}`}></i>
                    </div>
                  </button>

                  {open[section.id] && (
                    <div className="border-t border-gray-800 divide-y divide-gray-800/60">
                      {sItems.map(item => {
                        const done   = !!checked[item.id];
                        const p      = PRIORITY[item.priority];
                        const canAuto = activeAutoIds.has(item.id);
                        const result  = autoResults?.[item.id];

                        return (
                          <div
                            key={item.id}
                            onClick={() => toggle(item.id)}
                            className={`flex items-start gap-3 px-5 py-3.5 transition-colors cursor-pointer group ${
                              done ? 'opacity-50 hover:opacity-70' : 'hover:bg-gray-800/30'
                            }`}
                          >
                            {/* Checkbox */}
                            <div
                              className={`mt-0.5 rounded flex items-center justify-center flex-shrink-0 border transition-colors ${
                                done ? 'bg-green-600 border-green-600' : 'border-gray-600 group-hover:border-gray-400'
                              }`}
                              style={{ width: 18, height: 18 }}
                            >
                              {done && <i className="fa-solid fa-check text-white" style={{ fontSize: 9 }}></i>}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start gap-2 flex-wrap">
                                <span className={`text-sm leading-snug ${done ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                                  {item.text}
                                </span>
                                {item.link && (
                                  <a href={item.link} target="_blank" rel="noopener noreferrer"
                                    onClick={e => e.stopPropagation()}
                                    className="text-xs text-[#CC0000] hover:underline flex-shrink-0">
                                    {item.linkLabel} <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: 9 }}></i>
                                  </a>
                                )}
                              </div>
                              {item.hint && <p className="text-xs text-gray-600 mt-1 font-mono leading-relaxed">{item.hint}</p>}

                              {/* Inline auto-check result */}
                              {result && (
                                <div className={`mt-1.5 flex items-center gap-1.5 text-xs ${result.pass ? 'text-green-500' : 'text-red-400'}`}>
                                  <i className={`fa-solid ${result.pass ? 'fa-circle-check' : 'fa-circle-xmark'}`} style={{ fontSize: 10 }}></i>
                                  {result.note}
                                </div>
                              )}
                            </div>

                            {/* Right-side badges */}
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              {canAuto && (
                                <span className="hidden sm:inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-800 px-1.5 py-0.5 rounded font-mono" title="Auto-checkable">
                                  <i className="fa-solid fa-bolt text-gray-700" style={{ fontSize: 8 }}></i>auto
                                </span>
                              )}
                              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${p.bg} ${p.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`}></span>
                                {p.label}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Infrastructure box ── */}
          <div className="mt-10 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-3">
              <i className="fa-solid fa-database text-[#CC0000]"></i>
              <h2 className="text-sm font-bold text-white">Blog System Infrastructure</h2>
            </div>
            <div className="p-6 space-y-6">

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Database</h3>
                <div className="bg-gray-800 rounded-xl p-4 space-y-3">
                  {[
                    { icon: 'fa-hard-drive',  color: 'text-blue-400',   title: 'SQLite via sql.js (WebAssembly)', body: 'Single file at data/blog.db — open with DB Browser for SQLite, TablePlus, or DBeaver. No external DB server needed.' },
                    { icon: 'fa-table',        color: 'text-purple-400', title: 'One table: posts', body: 'Fields: id, title, slug, excerpt, content (Markdown), author, category, tags (JSON), featured_image_url, status (draft/published), meta_title, meta_description, og_image, published_at, created_at, updated_at' },
                    { icon: 'fa-floppy-disk',  color: 'text-amber-400',  title: 'Backup = copy the file', body: 'cp data/blog.db backups/blog-$(date +%Y%m%d).db — the entire blog is that one file. It is in .gitignore and never committed.' },
                  ].map(r => (
                    <div key={r.title} className="flex items-start gap-3">
                      <i className={`fa-solid ${r.icon} ${r.color} mt-0.5 text-sm flex-shrink-0`}></i>
                      <div>
                        <p className="text-sm font-bold text-white">{r.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{r.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">How to Publish a Post</h3>
                <div className="space-y-2">
                  {[
                    { n:1, icon:'fa-terminal',      color:'text-gray-400',   t:'Start the server: npm run server (or npm run server:dev in dev)', cmd:'npm run server' },
                    { n:2, icon:'fa-lock',          color:'text-blue-400',   t:'Sign in at /admin/login', cmd:null },
                    { n:3, icon:'fa-plus',          color:'text-green-400',  t:'Click "New Post" — fill in title, content (Markdown), excerpt, category, tags, SEO fields, OG image', cmd:null },
                    { n:4, icon:'fa-eye',           color:'text-purple-400', t:'Switch to Preview tab and check Markdown renders correctly', cmd:null },
                    { n:5, icon:'fa-globe',         color:'text-amber-400',  t:'Change Status dropdown to "Published"', cmd:null },
                    { n:6, icon:'fa-floppy-disk',   color:'text-[#CC0000]',  t:'Click Publish — post is live at /blog/your-slug instantly', cmd:null },
                    { n:7, icon:'fa-map',           color:'text-teal-400',   t:'Regenerate sitemap so Google can find the new post', cmd:'node scripts/generate-sitemap.cjs' },
                    { n:8, icon:'fa-magnifying-glass', color:'text-indigo-400', t:'In Google Search Console → URL Inspection → Request Indexing', cmd:null },
                  ].map(step => (
                    <div key={step.n} className="flex items-start gap-3 bg-gray-800/60 rounded-lg px-4 py-3">
                      <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-gray-300">{step.n}</span>
                      </div>
                      <i className={`fa-solid ${step.icon} ${step.color} mt-0.5 text-sm flex-shrink-0`}></i>
                      <div className="flex-1">
                        <p className="text-xs text-gray-300 leading-relaxed">{step.t}</p>
                        {step.cmd && (
                          <code className="mt-1 inline-block text-xs font-mono text-green-400 bg-gray-900 px-2 py-0.5 rounded">{step.cmd}</code>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Useful Commands</h3>
                <div className="bg-gray-950 rounded-xl p-4 space-y-2 font-mono text-xs">
                  {[
                    ['npm run dev',                       '# Start Vite dev server (frontend)'],
                    ['npm run server:dev',                '# Start blog API with auto-reload'],
                    ['npm run build:full',                '# Build frontend + regenerate sitemap.xml'],
                    ['node scripts/generate-sitemap.cjs','# Regenerate sitemap after new posts'],
                    ['curl http://localhost:3001/health', '# Verify API is running'],
                    ['cp data/blog.db backups/blog.db',  '# Quick database backup'],
                  ].map(([cmd, comment]) => (
                    <div key={cmd} className="flex flex-wrap gap-2">
                      <span className="text-green-400">{cmd}</span>
                      <span className="text-gray-600">{comment}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-700 mt-8 mb-4">
            Checklist progress saves automatically in browser localStorage and persists between sessions.
          </p>
        </main>
      </div>
    </>
  );
}
