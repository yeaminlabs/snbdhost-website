const fs = require('fs');
const path = require('path');

const AUDIT_LOG = path.join(__dirname, '../../data/audit.log');

function logAudit(action, details = {}) {
  const entry = JSON.stringify({ timestamp: new Date().toISOString(), action, ...details }) + '\n';
  try {
    const dir = path.dirname(AUDIT_LOG);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.appendFileSync(AUDIT_LOG, entry);
  } catch (err) {
    console.error('[audit] Failed to write audit log:', err.message);
  }
}

module.exports = { logAudit };
