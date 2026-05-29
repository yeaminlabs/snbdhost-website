const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies && req.cookies.snbd_admin_session;
  if (!token) {
    return res.status(401).json({ error: 'No session cookie' });
  }
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired session' });
  }
};
