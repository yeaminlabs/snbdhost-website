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

  const runCmd = (cmd) => execPromise(cmd, { cwd: PROJECT_ROOT });

  let stashed = false;
  try {
    // 1. Save uncommitted local work so it isn't lost
    const { stdout: stashOut } = await runCmd('git stash');
    if (!stashOut.includes('No local changes to save')) {
      stashed = true;
    }

    // 2. Checkout target commit
    await runCmd(`git checkout ${commitSha}`);

    // 3. Install packages if they changed, clean slate check
    await runCmd('npm install --legacy-peer-deps');

    // 4. Compile the React build using Vite
    await runCmd('npm run build');

    // 5. Restore repository back to main branch
    await runCmd('git checkout main');

    // 6. Pop stashed changes if any were saved
    if (stashed) {
      await runCmd('git stash pop');
    }

  } catch (err) {
    console.error('Git build compile error:', err);
    
    // Safety fallback: revert working directory state if compile fails mid-way
    try {
      await runCmd('git checkout main');
      if (stashed) {
        await runCmd('git stash pop');
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
