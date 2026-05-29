const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const pluginDir = path.resolve(__dirname, '../plugins/snbd-knowledge-base');
const outputFile = path.resolve(__dirname, '../snbd-knowledge-base.zip');

console.log('[Packager] Preparing to package Knowledge Base plugin...');

if (!fs.existsSync(pluginDir)) {
  console.error('[Packager] Error: Plugin directory not found at:', pluginDir);
  process.exit(1);
}

// Clean up existing zip if any
if (fs.existsSync(outputFile)) {
  console.log('[Packager] Removing old zip file...');
  fs.unlinkSync(outputFile);
}

// Execute native zip command on mac/linux
const cmd = 'zip -r ../../snbd-knowledge-base.zip . -x "node_modules/*" -x "data/*" -x ".DS_Store" -x "package-lock.json"';

console.log('[Packager] Executing zip command...');
exec(cmd, { cwd: pluginDir }, (err, stdout, stderr) => {
  if (err) {
    console.error('[Packager] Error packaging plugin:', err.message);
    console.error(stderr);
    process.exit(1);
  }
  
  console.log(stdout);
  console.log('[Packager] ---------------------------------------------');
  console.log('[Packager] SUCCESS: Plugin zipped successfully!');
  console.log('[Packager] Output path:', outputFile);
  console.log('[Packager] ---------------------------------------------');
});
