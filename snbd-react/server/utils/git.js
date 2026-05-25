const { exec } = require('child_process');
const util = require('util');
const path = require('path');

const execPromise = util.promisify(exec);
const PROJECT_ROOT = path.join(__dirname, '../../');

async function fetchCommits() {
  try {
    // Fetch latest info from remote repository
    await execPromise('git fetch origin main', { cwd: PROJECT_ROOT });
    
    // Retrieve last 10 commits with standard format: Hash|Author|Date|Subject
    const { stdout } = await execPromise(
      'git log origin/main -n 10 --date=iso --pretty=format:"%H|%an|%ad|%s"',
      { cwd: PROJECT_ROOT }
    );
    
    if (!stdout.trim()) return [];
    
    return stdout.trim().split('\n').map(line => {
      const [hash, author, date, message] = line.split('|');
      return { hash, author, date, message };
    });
  } catch (err) {
    console.error('Git fetch/log error:', err);
    throw new Error(`Failed to retrieve commits from remote repository: ${err.message}`);
  }
}

async function buildCommit(commitSha) {
  // Security: validate commit SHA to prevent command injection
  const SHA_REGEX = /^[0-9a-f]{7,40}$/i;
  if (!commitSha || !SHA_REGEX.test(commitSha)) {
    throw new Error('Invalid commit SHA format. Must be a 7-40 character hex string.');
  }

  const os = require('os');
  const fs = require('fs');

  // Create a temporary directory for the build process
  const tmpDir = path.join(os.tmpdir(), `snbd-build-${commitSha}-${Date.now()}`);
  const runCmd = (cmd, cwd = tmpDir) => execPromise(cmd, { cwd });

  try {
    console.log(`[VersionControl] Creating temporary build directory at: ${tmpDir}`);
    // 1. Create a local clone of the repository in the temporary directory
    // This isolates the build process from the live server files to prevent 502 errors
    await execPromise(`git clone "${PROJECT_ROOT}" "${tmpDir}"`);

    // 2. Checkout target commit
    await runCmd(`git checkout ${commitSha}`);

    // 3. Install packages
    await runCmd('npm install --legacy-peer-deps');

    // 4. Compile the React build using Vite
    await runCmd('npm run build');

    // 5. Copy the built dist folder back to the project root
    const sourceDist = path.join(tmpDir, 'dist');
    const targetDist = path.join(PROJECT_ROOT, 'dist');
    
    // Clear the existing dist folder if it exists
    if (fs.existsSync(targetDist)) {
      fs.rmSync(targetDist, { recursive: true, force: true });
    }
    
    // Copy the new dist folder
    fs.cpSync(sourceDist, targetDist, { recursive: true });

    // 6. Cleanup temporary directory
    fs.rmSync(tmpDir, { recursive: true, force: true });

  } catch (err) {
    console.error('Git build compile error:', err);
    
    // Attempt cleanup on failure
    try {
      if (fs.existsSync(tmpDir)) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }
    } catch (cleanupErr) {
      console.error('Clean up error after build failure:', cleanupErr);
    }
    
    throw new Error(`Compilation failed: ${err.message}`);
  }
}

module.exports = {
  fetchCommits,
  buildCommit
};
