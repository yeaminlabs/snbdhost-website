const { exec, execSync } = require('child_process');
const util = require('util');
const path = require('path');

const execPromise = util.promisify(exec);

// PROJECT_ROOT = the snbd-react/ folder (where package.json lives)
const PROJECT_ROOT = path.join(__dirname, '../../');

// Find the true git repository root by walking up directories
function findGitRoot(startPath) {
  let currentDir = startPath;
  while (currentDir !== path.parse(currentDir).root) {
    if (require('fs').existsSync(path.join(currentDir, '.git'))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }
  return startPath;
}

const GIT_ROOT = findGitRoot(PROJECT_ROOT);

// Relative path from git root to the React app folder (e.g. "snbd-react" or "")
const REACT_SUBDIR = path.relative(GIT_ROOT, PROJECT_ROOT);

async function fetchCommits() {
  try {
    // Fetch latest info from remote repository
    await execPromise('git fetch origin main', { cwd: GIT_ROOT });

    // Retrieve last 10 commits with standard format: Hash|Author|Date|Subject
    const { stdout } = await execPromise(
      'git log origin/main -n 10 --date=iso --pretty=format:"%H|%an|%ad|%s"',
      { cwd: GIT_ROOT }
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

  try {
    console.log(`[VersionControl] Cloning git root (${GIT_ROOT}) into temp dir: ${tmpDir}`);

    // 1. Clone the TRUE git root (not a subfolder) — git requires this
    await execPromise(`git clone "${GIT_ROOT}" "${tmpDir}"`);

    // 2. Checkout the specific target commit
    await execPromise(`git checkout ${commitSha}`, { cwd: tmpDir });

    // 3. Navigate into the React app subfolder (e.g. snbd-react/) if this is a monorepo
    //    If REACT_SUBDIR is empty the React app IS the git root — no subdirectory needed
    const reactDir = REACT_SUBDIR ? path.join(tmpDir, REACT_SUBDIR) : tmpDir;
    console.log(`[VersionControl] Building from: ${reactDir}`);

    const runInReact = (cmd) => execPromise(cmd, { cwd: reactDir });

    // 4. Install dependencies (force dev dependencies for Vite build)
    await runInReact('npm install --legacy-peer-deps --include=dev');

    // 5. Compile the React/Vite build
    await runInReact('npm run build:full');

    // 6. Copy the new dist/ back to PROJECT_ROOT/dist/
    const sourceDist = path.join(reactDir, 'dist');
    const targetDist = path.join(PROJECT_ROOT, 'dist');

    if (fs.existsSync(targetDist)) {
      fs.rmSync(targetDist, { recursive: true, force: true });
    }
    fs.cpSync(sourceDist, targetDist, { recursive: true });

    // 7. Cleanup temporary directory
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
