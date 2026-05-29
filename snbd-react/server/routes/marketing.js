const express = require('express');
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');
const { logAudit } = require('../utils/audit');

const router = express.Router();

const MARKETING_FILE = path.join(__dirname, '../../data/marketing.json');

const DEFAULT_CONFIG = {
  gtm:        { enabled: false, id: '' },
  ga4:        { enabled: false, id: '' },
  gads:       { enabled: false, id: '' },
  fbpixel:    { enabled: false, id: '' },
  clarity:    { enabled: false, id: '' },
  hotjar:     { enabled: false, id: '' },
  linkedin:   { enabled: false, id: '' },
  tiktok:     { enabled: false, id: '' },
  customHead: { enabled: false, code: '' },
};

function readConfig() {
  try {
    if (!fs.existsSync(MARKETING_FILE)) return { ...DEFAULT_CONFIG };
    return JSON.parse(fs.readFileSync(MARKETING_FILE, 'utf8'));
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

function writeConfig(config) {
  const dir = path.dirname(MARKETING_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(MARKETING_FILE, JSON.stringify(config, null, 2));
}

// GET /api/marketing-config  (public — needed by the frontend script injector)
router.get('/', (req, res) => {
  res.json(readConfig());
});

// PUT /api/marketing-config  (admin only)
router.put('/', auth, (req, res) => {
  const current = readConfig();
  const next = {};
  // Merge carefully — only accept known keys
  for (const key of Object.keys(DEFAULT_CONFIG)) {
    next[key] = { ...DEFAULT_CONFIG[key], ...current[key], ...(req.body[key] || {}) };
  }
  writeConfig(next);
  logAudit('marketing:update', { admin: req.admin?.email });
  res.json({ ok: true, config: next });
});

module.exports = router;
module.exports.readConfig = readConfig; // used by index.js for script injection
