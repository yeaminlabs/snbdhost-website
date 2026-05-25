const path = require('path');
const fs = require('fs');

const DEFAULT_DIST_PATH = path.join(__dirname, '../../dist');
let activeVersionPath = DEFAULT_DIST_PATH;
let activeVersionName = null;

function setActiveVersion(versionName) {
  if (versionName) {
    const versionDir = path.join(__dirname, '../../data/versions', versionName);
    if (fs.existsSync(versionDir)) {
      activeVersionPath = versionDir;
      activeVersionName = versionName;
      console.log(`[VersionState] Switched active version to ${versionName} (${versionDir})`);
      return true;
    }
  }
  activeVersionPath = DEFAULT_DIST_PATH;
  activeVersionName = null;
  console.log(`[VersionState] Switched active version to Default (/dist)`);
  return false;
}

function getActiveVersionPath() {
  return activeVersionPath;
}

function getActiveVersionName() {
  return activeVersionName;
}

module.exports = {
  setActiveVersion,
  getActiveVersionPath,
  getActiveVersionName
};
