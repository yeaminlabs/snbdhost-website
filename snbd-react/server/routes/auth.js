const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const requireAuth = require('../middleware/auth');
const router = express.Router();

// In-memory failed attempt tracker: ip -> { count, lockedUntil }
const failedAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // hard cap: 20 requests per 15 min per IP (catches bulk tools)
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Try again later.' },
});

function checkLockout(ip) {
  const record = failedAttempts.get(ip);
  if (!record) return null;
  if (record.lockedUntil && Date.now() < record.lockedUntil) {
    const retryAfter = Math.ceil((record.lockedUntil - Date.now()) / 1000);
    return retryAfter;
  }
  // Lockout expired — clear it
  if (record.lockedUntil && Date.now() >= record.lockedUntil) {
    failedAttempts.delete(ip);
  }
  return null;
}

function recordFailure(ip) {
  const record = failedAttempts.get(ip) || { count: 0, lockedUntil: null };
  record.count += 1;
  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = Date.now() + LOCKOUT_MS;
  }
  failedAttempts.set(ip, record);
}

function clearFailures(ip) {
  failedAttempts.delete(ip);
}

// POST /api/auth/login
router.post('/login', loginRateLimit, async (req, res) => {
  const ip = req.ip;

  const retryAfter = checkLockout(ip);
  if (retryAfter !== null) {
    res.set('Retry-After', String(retryAfter));
    return res.status(429).json({ error: `Too many failed attempts. Try again in ${Math.ceil(retryAfter / 60)} minute(s).` });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  if (email !== process.env.ADMIN_EMAIL) {
    recordFailure(ip);
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
  if (!valid) {
    recordFailure(ip);
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  clearFailures(ip);

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '8h' });

  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('snbd_admin_session', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 8 * 60 * 60 * 1000, // 8 hours
    path: '/',
  });

  res.json({ ok: true });
});

// GET /api/auth/verify — used by ProtectedRoute to validate session server-side
router.get('/verify', requireAuth, (req, res) => {
  res.json({ ok: true, email: req.admin.email });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('snbd_admin_session', { path: '/' });
  res.json({ ok: true });
});

module.exports = router;
