const fs = require('fs');
const path = require('path');
const dbHelper = require('./db');
const initSqlJs = require('sql.js');

const PAGES_DIR = path.resolve(__dirname, '../../src/pages');
const BLOG_DB_PATH = path.resolve(__dirname, '../../data/blog.db');

const TARGET_PAGES = [
  { name: 'Home', file: 'Home.jsx' },
  { name: 'Shared Hosting', file: 'Hosting.jsx' },
  { name: 'Reseller Hosting', file: 'ResellerHosting.jsx' },
  { name: 'Domain Registration', file: 'Domain.jsx' },
  { name: 'VPS Server', file: 'VPSServer.jsx' },
  { name: 'BDIX Servers', file: 'BDIXServers.jsx' },
  { name: 'OpenClaw AI', file: 'OpenClaw.jsx' },
  { name: 'n8n Automation', file: 'N8NAutomation.jsx' },
  { name: 'Offers & Discounts', file: 'Offers.jsx' },
  { name: 'Privacy Policy', file: 'Privacy.jsx' },
  { name: 'Terms of Service', file: 'Terms.jsx' },
  { name: 'Developer Updates', file: 'DevUpdates.jsx' }
];

function cleanJsxContent(content) {
  // Remove import statements
  let cleaned = content.replace(/^import\s+[\s\S]*?;\s*$/gm, '');
  
  // Remove SVG tags and their children (which have large coordinate lists)
  cleaned = cleaned.replace(/<svg[\s\S]*?<\/svg>/gi, '[SVG Icon]');
  
  // Remove large SVG React imports if any
  cleaned = cleaned.replace(/const\s+\w+\s*=\s*\([\s\S]*?\)\s*=>\s*\([\s\S]*?svg[\s\S]*?\);?/gi, '');

  // Compress whitespace
  cleaned = cleaned.replace(/\n\s*\n+/g, '\n\n');
  
  return cleaned.trim();
}

async function scanSources() {
  const scanned = [];
  
  // 1. Scan Frontend Pages
  for (const page of TARGET_PAGES) {
    const filePath = path.join(PAGES_DIR, page.file);
    if (fs.existsSync(filePath)) {
      try {
        const rawContent = fs.readFileSync(filePath, 'utf8');
        const cleanContent = cleanJsxContent(rawContent);
        
        const sourceName = `page:${page.name.toLowerCase().replace(/\s+/g, '_')}`;
        await dbHelper.run(
          `INSERT INTO kb_sources (name, type, path, content, last_scanned) 
           VALUES (?, ?, ?, ?, datetime('now'))
           ON CONFLICT(name) DO UPDATE SET content = excluded.content, last_scanned = datetime('now')`,
          [sourceName, 'page', page.file, cleanContent]
        );
        scanned.push({ name: page.name, type: 'page' });
      } catch (err) {
        console.error(`[Crawler] Failed to scan page ${page.file}:`, err);
      }
    }
  }

  // 2. Scan Blog Database
  if (fs.existsSync(BLOG_DB_PATH)) {
    try {
      const fileBuffer = fs.readFileSync(BLOG_DB_PATH);
      const SQL = await initSqlJs();
      const blogDb = new SQL.Database(fileBuffer);
      
      // Query published posts
      const stmt = blogDb.prepare("SELECT id, title, slug, content, category FROM posts WHERE status = 'published'");
      const posts = [];
      while (stmt.step()) {
        posts.push(stmt.getAsObject());
      }
      stmt.free();
      blogDb.close();

      for (const post of posts) {
        const sourceName = `blog:${post.id}`;
        const sourceContent = `Title: ${post.title}\nCategory: ${post.category || 'General'}\nContent:\n${post.content}`;
        
        await dbHelper.run(
          `INSERT INTO kb_sources (name, type, path, content, last_scanned) 
           VALUES (?, ?, ?, ?, datetime('now'))
           ON CONFLICT(name) DO UPDATE SET content = excluded.content, last_scanned = datetime('now')`,
          [sourceName, 'blog', `/blog/${post.slug}`, sourceContent]
        );
        scanned.push({ name: post.title, type: 'blog' });
      }
    } catch (err) {
      console.error('[Crawler] Failed to read blog database:', err);
    }
  }

  return scanned;
}

module.exports = { scanSources };
