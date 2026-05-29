const express = require('express');
const fs = require('fs');
const path = require('path');
const { getDb, all, get, run, saveDb } = require('../db/database');
const requireAuth = require('../middleware/auth');
const { fetchCommits, buildCommit } = require('../utils/git');
const { setActiveVersion } = require('../utils/versionState');
const { logAudit } = require('../utils/audit');

const router = express.Router();
const DIST_PATH = path.join(__dirname, '../../dist');
const VERSIONS_DIR = path.join(__dirname, '../../data/versions');

// Ensure versions directory exists
fs.mkdirSync(VERSIONS_DIR, { recursive: true });

// Helper to recursively copy directories
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Helper to recursively delete directories
function deleteRecursiveSync(targetPath) {
  if (fs.existsSync(targetPath)) {
    fs.readdirSync(targetPath).forEach((file) => {
      const curPath = path.join(targetPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteRecursiveSync(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(targetPath);
  }
}

// GET /api/versions/commits (admin only - fetch GitHub commits)
router.get('/commits', requireAuth, async (req, res) => {
  try {
    const commits = await fetchCommits();
    res.json({ commits });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/versions (admin only - retrieve local saved versions list)
router.get('/', requireAuth, async (req, res) => {
  try {
    const db = await getDb();
    const versions = all(db, 'SELECT * FROM versions ORDER BY created_at DESC');
    res.json({ versions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/versions (admin only - compile a commit and register it as a version)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { version, commitSha, description } = req.body;

    // 1. Validations
    if (!version || !commitSha) {
      return res.status(400).json({ error: 'version and commitSha are required' });
    }

    // Version format check (e.g. v1.0.0 or 1.2.34-beta) to avoid folder structure traversal
    const versionRegex = /^[vV]?\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/;
    if (!versionRegex.test(version)) {
      return res.status(400).json({ error: 'Invalid version format. Use semver format, e.g. v1.0.2' });
    }

    // Security: validate commitSha format to prevent command injection
    const shaRegex = /^[0-9a-f]{7,40}$/i;
    if (!shaRegex.test(commitSha)) {
      return res.status(400).json({ error: 'Invalid commit SHA format.' });
    }

    const db = await getDb();
    const existing = get(db, 'SELECT id FROM versions WHERE version = ?', [version]);
    if (existing) {
      return res.status(409).json({ error: `Version ${version} is already registered.` });
    }

    // 2. Compile commit code
    console.log(`[VersionControl] Commencing build for commit: ${commitSha}`);
    await buildCommit(commitSha);

    if (!fs.existsSync(DIST_PATH)) {
      return res.status(500).json({ error: 'Vite compilation complete, but no output dist/ folder was created.' });
    }

    // 3. Move files to versioned directory
    const targetDir = path.join(VERSIONS_DIR, version);
    if (fs.existsSync(targetDir)) {
      deleteRecursiveSync(targetDir);
    }
    fs.mkdirSync(targetDir, { recursive: true });
    
    console.log(`[VersionControl] Copying built files to version path: ${targetDir}`);
    copyRecursiveSync(DIST_PATH, targetDir);

    // 4. Update Database records
    run(db, "UPDATE versions SET status = 'inactive'");
    run(db, `
      INSERT INTO versions (version, commit_sha, description, status, created_at, updated_at)
      VALUES (?, ?, ?, 'active', datetime('now'), datetime('now'))
    `, [version, commitSha, description || '']);
    
    saveDb();

    // 5. Update shared state path
    setActiveVersion(version);

    logAudit('version:deploy', { version, commitSha, admin: req.admin?.email });
    res.status(201).json({ success: true, version });
  } catch (err) {
    console.error('[VersionControl] Deploy error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/versions/:id/activate (admin only - activate/rollback to a version)
router.post('/:id/activate', requireAuth, async (req, res) => {
  try {
    const db = await getDb();
    const targetVersion = get(db, 'SELECT * FROM versions WHERE id = ?', [req.params.id]);
    
    if (!targetVersion) {
      return res.status(404).json({ error: 'Version record not found in database.' });
    }

    const versionDir = path.join(VERSIONS_DIR, targetVersion.version);
    if (!fs.existsSync(versionDir)) {
      return res.status(400).json({ error: `Files for version ${targetVersion.version} do not exist on the server disk.` });
    }

    // Set all inactive, then activate selected
    run(db, "UPDATE versions SET status = 'inactive'");
    run(db, "UPDATE versions SET status = 'active', updated_at = datetime('now') WHERE id = ?", [req.params.id]);
    saveDb();

    // Switch dynamic files path in-memory
    setActiveVersion(targetVersion.version);

    logAudit('version:activate', { version: targetVersion.version, admin: req.admin?.email });
    res.json({ success: true, version: targetVersion.version });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/versions/:id (admin only - delete files and DB record to free disk space)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const db = await getDb();
    const targetVersion = get(db, 'SELECT * FROM versions WHERE id = ?', [req.params.id]);

    if (!targetVersion) {
      return res.status(404).json({ error: 'Version not found.' });
    }

    if (targetVersion.status === 'active') {
      return res.status(400).json({ error: 'Cannot delete the currently active version.' });
    }

    const versionDir = path.join(VERSIONS_DIR, targetVersion.version);
    if (fs.existsSync(versionDir)) {
      console.log(`[VersionControl] Deleting folder: ${versionDir}`);
      deleteRecursiveSync(versionDir);
    }

    run(db, 'DELETE FROM versions WHERE id = ?', [req.params.id]);
    saveDb();

    logAudit('version:delete', { version: targetVersion.version, admin: req.admin?.email });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
