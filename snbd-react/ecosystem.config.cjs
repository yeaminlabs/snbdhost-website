// PM2 ecosystem config — keeps the blog API alive permanently
// Start:   pm2 start ecosystem.config.cjs
// Stop:    pm2 stop snbd-blog-api
// Restart: pm2 restart snbd-blog-api
// Logs:    pm2 logs snbd-blog-api
// Status:  pm2 status

module.exports = {
  apps: [
    {
      name: 'snbd-blog-api',
      script: './server/index.js',
      cwd: __dirname,
      interpreter: 'node',

      // Restart automatically on crash
      autorestart: true,
      watch: false,           // Don't watch files in production (use restart instead)
      max_memory_restart: '512M',

      // Exponential backoff for repeated crashes (max 30s between retries)
      exp_backoff_restart_delay: 100,
      max_restarts: 20,

      // Env vars — merged with server/.env (dotenv loads that file)
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },

      // Log files
      out_file: './logs/api-out.log',
      error_file: './logs/api-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true,
    },
  ],
};
