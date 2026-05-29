const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'data/kb.db');

// Ensure data folder exists
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

let db = null;

function saveDb() {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

async function getDb() {
  if (db) return db;

  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  // Initialize schema
  db.run(`
    CREATE TABLE IF NOT EXISTS kb_articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL,
      summary TEXT,
      content TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','published')),
      source_id INTEGER,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_kb_articles_slug ON kb_articles(slug);
    CREATE INDEX IF NOT EXISTS idx_kb_articles_status ON kb_articles(status);

    CREATE TABLE IF NOT EXISTS kb_sources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      type TEXT NOT NULL,
      path TEXT,
      content TEXT NOT NULL,
      last_scanned TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS kb_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  saveDb();
  return db;
}

// Helper: query all rows
async function all(sql, params = []) {
  const database = await getDb();
  const stmt = database.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

// Helper: query first row
async function get(sql, params = []) {
  const rows = await all(sql, params);
  return rows[0] || null;
}

// Helper: execute command
async function run(sql, params = []) {
  const database = await getDb();
  database.run(sql, params);
  saveDb();
  const lastId = database.exec('SELECT last_insert_rowid() as id')[0];
  return {
    lastInsertRowid: lastId ? lastId.values[0][0] : null,
  };
}

module.exports = { getDb, all, get, run, saveDb };
