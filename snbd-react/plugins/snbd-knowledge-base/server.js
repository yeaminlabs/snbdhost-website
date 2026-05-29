require('dotenv').config({ path: require('path').join(__dirname, '../../server/.env') }); // Load main server's .env if present
require('dotenv').config({ path: require('path').join(__dirname, '.env') }); // Load local .env

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router');

const app = express();
const PORT = process.env.KB_PLUGIN_PORT || 3002;

// Enable CORS for frontend requests
const allowedOrigins = [
  process.env.CORS_ORIGIN || 'http://localhost:5173',
  'http://localhost:3001', // Main backend
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json({ limit: '2mb' }));

// Mount router under the exact same path prefix for consistency with integrated mode
app.use('/api/plugins/snbd-knowledge-base', router);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', plugin: 'snbd-knowledge-base' });
});

app.listen(PORT, () => {
  console.log(`[Plugin Standalone] Knowledge Base server is running on port ${PORT}`);
  console.log(`[Plugin Standalone] Mount path: http://localhost:${PORT}/api/plugins/snbd-knowledge-base`);
});
