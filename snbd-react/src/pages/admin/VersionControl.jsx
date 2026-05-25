import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

export default function VersionControl() {
  const [versions, setVersions] = useState([]);
  const [commits, setCommits] = useState([]);
  const [loadingVersions, setLoadingVersions] = useState(true);
  const [loadingCommits, setLoadingCommits] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Deploy modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [versionName, setVersionName] = useState('');
  const [changelog, setChangelog] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('snbd_admin_token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const fetchVersions = useCallback(async () => {
    setLoadingVersions(true);
    try {
      const res = await fetch('/api/versions', { headers });
      if (res.status === 401) {
        localStorage.removeItem('snbd_admin_token');
        navigate('/admin/login');
        return;
      }
      const data = await res.json();
      setVersions(data.versions || []);
    } catch {
      setError('Failed to load version history.');
    } finally {
      setLoadingVersions(false);
    }
  }, [navigate]);

  const fetchCommits = useCallback(async () => {
    setLoadingCommits(true);
    try {
      const res = await fetch('/api/versions/commits', { headers });
      if (res.status === 401) return;
      const data = await res.json();
      setCommits(data.commits || []);
    } catch {
      // Don't crash the page if git remote fetch fails, just show in status
      console.error('Failed to load GitHub commits.');
    } finally {
      setLoadingCommits(false);
    }
  }, []);

  useEffect(() => {
    fetchVersions();
    fetchCommits();
  }, [fetchVersions, fetchCommits]);

  function logout() {
    localStorage.removeItem('snbd_admin_token');
    navigate('/admin/login');
  }

  // Open modal to configure release
  function openDeployModal(commit) {
    setSelectedCommit(commit);
    // Suggest a default version format based on latest version if available
    const latestVer = versions[0]?.version;
    let suggestedName = '';
    if (latestVer) {
      // E.g. v1.0.1 -> v1.0.2
      const match = latestVer.match(/^(v|V)?(\d+)\.(\d+)\.(\d+)$/);
      if (match) {
        const prefix = match[1] || 'v';
        const major = match[2];
        const minor = match[3];
        const patch = parseInt(match[4], 10) + 1;
        suggestedName = `${prefix}${major}.${minor}.${patch}`;
      }
    }
    setVersionName(suggestedName || 'v1.0.0');
    setChangelog(commit.message || '');
    setShowModal(true);
    setError('');
    setSuccessMsg('');
  }

  // Trigger server-side compilation & registration
  async function handleDeploySubmit(e) {
    e.preventDefault();
    if (!versionName.trim()) {
      setError('Version name is required.');
      return;
    }

    setActionLoading(true);
    setShowModal(false);
    setError('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/versions', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          version: versionName.trim(),
          commitSha: selectedCommit.hash,
          description: changelog.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to compile and deploy version.');
      }

      setSuccessMsg(`Version ${versionName} compiled and deployed successfully! Now serving live.`);
      fetchVersions();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
      setSelectedCommit(null);
    }
  }

  // Activate/Rollback version
  async function handleActivate(ver) {
    if (!confirm(`Are you sure you want to activate version ${ver.version}? The live site will switch to this build immediately.`)) return;

    setActionLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await fetch(`/api/versions/${ver.id}/activate`, {
        method: 'POST',
        headers
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to activate version.');
      }

      setSuccessMsg(`Successfully rolled back/activated version ${ver.version}!`);
      fetchVersions();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  }

  // Delete version
  async function handleDelete(ver) {
    if (!confirm(`Delete compiled files for ${ver.version} from server disk? This action cannot be undone.`)) return;

    setActionLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await fetch(`/api/versions/${ver.id}`, {
        method: 'DELETE',
        headers
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete version.');
      }

      setSuccessMsg(`Version ${ver.version} files deleted successfully.`);
      fetchVersions();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  }

  const activeVersion = versions.find(v => v.status === 'active');

  return (
    <>
      <SEOHead title="Version Control & Deployments" noIndex />
      <div className="min-h-screen bg-gray-950 text-gray-200">
        
        {/* Top bar */}
        <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="SNBD HOST" className="h-7" />
            <span className="text-sm font-bold text-gray-300">Admin</span>
          </div>
          <nav className="flex items-center gap-1 flex-wrap">
            <Link to="/admin" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors px-3 py-1.5 rounded-lg">
              <i className="fa-solid fa-newspaper text-xs text-blue-400"></i> Blog Posts
            </Link>
            <Link to="/admin/seo-checklist" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors px-3 py-1.5 rounded-lg">
              <i className="fa-solid fa-list-check text-[#CC0000]"></i> SEO Checklist
            </Link>
            <Link to="/admin/marketing" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors px-3 py-1.5 rounded-lg">
              <i className="fa-solid fa-chart-line text-amber-400"></i> Marketing Tools
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-colors px-3 py-1.5 rounded-lg"
            >
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </nav>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-8">
          
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-code-branch text-blue-400"></i> Version Control
              </h1>
              <p className="text-gray-400 text-xs mt-1">
                Compile commits from GitHub and switch between static build deployments instantly.
              </p>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => { fetchCommits(); fetchVersions(); }}
                className="flex items-center gap-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-white font-semibold px-3 py-2 rounded-lg border border-gray-700 transition-colors"
                disabled={actionLoading}
              >
                <i className={`fa-solid fa-arrows-rotate ${actionLoading ? 'animate-spin' : ''}`}></i> Sync Feed
              </button>
            </div>
          </div>

          {/* Feedback alerts */}
          {error && (
            <div className="bg-red-950/40 border border-red-800/80 text-red-400 text-xs px-4 py-3 rounded-lg mb-6 flex items-start gap-2">
              <i className="fa-solid fa-triangle-exclamation mt-0.5"></i>
              <span>{error}</span>
            </div>
          )}
          
          {successMsg && (
            <div className="bg-emerald-950/40 border border-emerald-800/80 text-emerald-400 text-xs px-4 py-3 rounded-lg mb-6 flex items-start gap-2">
              <i className="fa-solid fa-circle-check mt-0.5"></i>
              <span>{successMsg}</span>
            </div>
          )}

          {/* Active version status card */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block">CURRENT LIVE BUILD</span>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-xl font-black text-white">
                  {activeVersion ? activeVersion.version : 'Default (Static /dist)'}
                </span>
                {activeVersion && (
                  <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-800/40 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Active
                  </span>
                )}
              </div>
              {activeVersion && (
                <div className="mt-2 text-xs text-gray-400 space-y-0.5">
                  <p><strong>Commit:</strong> <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300 text-[10px]">{activeVersion.commit_sha}</code></p>
                  <p><strong>Release Notes:</strong> {activeVersion.description || '—'}</p>
                  <p><strong>Deployed At:</strong> {formatDate(activeVersion.created_at)}</p>
                </div>
              )}
              {!activeVersion && (
                <p className="text-xs text-gray-400 mt-2">
                  Serving compiled files directly from root <code>/dist</code> folder. No dynamic versions are active.
                </p>
              )}
            </div>
            
            <div className="bg-gray-950 border border-gray-800/80 rounded-lg p-3 text-xs text-gray-400 max-w-sm">
              <h3 className="font-semibold text-white mb-1 flex items-center gap-1">
                <i className="fa-solid fa-circle-info text-blue-400"></i> Deployment Node
              </h3>
              Zero-downtime hot-swapping is active. Reverting or switching builds takes less than 10 milliseconds and does not restart the web server.
            </div>
          </div>

          {/* Action Loading overlay */}
          {actionLoading && (
            <div className="bg-gray-900 border border-blue-900/40 rounded-xl p-8 mb-8 text-center flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <h3 className="font-bold text-white text-sm">Compiling & Deploying Build...</h3>
              <p className="text-gray-400 text-xs mt-1 max-w-md">
                Vite is bundling production assets and updating files on the server. This may take 5–15 seconds. Please do not close or refresh this page.
              </p>
            </div>
          )}

          {/* Grid Layout: Commits Feed vs Version History */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* GitHub Commits Feed (Col 5) */}
            <div className="lg:col-span-5">
              <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <i className="fa-brands fa-github text-gray-400"></i> GitHub Update Feed
              </h2>
              
              <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                {loadingCommits ? (
                  <div className="flex flex-col items-center py-12">
                    <div className="w-6 h-6 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs text-gray-500 mt-2">Fetching commits...</span>
                  </div>
                ) : commits.length === 0 ? (
                  <div className="py-12 text-center text-xs text-gray-500">
                    <i className="fa-solid fa-code-commit text-2xl mb-2 opacity-20 block"></i>
                    No remote commits detected or connection error.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-800">
                    {commits.map((commit) => {
                      const isDeployed = versions.some(v => v.commit_sha === commit.hash);
                      return (
                        <div key={commit.hash} className="p-4 hover:bg-gray-800/30 transition-colors">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-xs text-white line-clamp-2">
                              {commit.message}
                            </span>
                            <code className="text-[10px] bg-gray-950 border border-gray-850 px-1.5 py-0.5 rounded text-blue-400 font-mono">
                              {commit.hash.slice(0, 7)}
                            </code>
                          </div>
                          
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <div className="text-[10px] text-gray-500">
                              <span>by <strong>{commit.author}</strong></span>
                              <span className="mx-1.5">•</span>
                              <span>{formatDate(commit.date)}</span>
                            </div>
                            
                            <button
                              onClick={() => openDeployModal(commit)}
                              className={`text-[10px] font-bold px-2.5 py-1 rounded transition-colors ${
                                isDeployed 
                                  ? 'bg-blue-950 text-blue-400 border border-blue-900/40 hover:bg-blue-900/30'
                                  : 'bg-[#CC0000] text-white hover:bg-red-700'
                              }`}
                              disabled={actionLoading}
                            >
                              {isDeployed ? 'Re-deploy' : 'Compile & Deploy'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Compiled Version History (Col 7) */}
            <div className="lg:col-span-7">
              <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <i className="fa-solid fa-history text-gray-400"></i> Compiled Version History
              </h2>
              
              <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                {loadingVersions ? (
                  <div className="flex flex-col items-center py-12">
                    <div className="w-6 h-6 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs text-gray-500 mt-2">Loading versions...</span>
                  </div>
                ) : versions.length === 0 ? (
                  <div className="py-16 text-center text-xs text-gray-500">
                    <i className="fa-solid fa-boxes-stacked text-2xl mb-2 opacity-20 block"></i>
                    No compiled versions registered in DB.
                    <p className="mt-1 text-[10px] text-gray-600">Select a commit from the GitHub feed to compile your first version.</p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-gray-800 text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                        <th className="px-4 py-3">Version</th>
                        <th className="px-4 py-3">Commit & Notes</th>
                        <th className="px-4 py-3">Deployed At</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/60">
                      {versions.map((ver) => (
                        <tr key={ver.id} className="hover:bg-gray-800/10">
                          <td className="px-4 py-4 font-bold text-white align-top">
                            <div className="flex items-center gap-1.5">
                              {ver.version}
                              {ver.status === 'active' && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4 align-top">
                            <code className="text-[10px] bg-gray-950 px-1 py-0.5 rounded text-blue-300 font-mono block w-fit mb-1">
                              {ver.commit_sha.slice(0, 7)}
                            </code>
                            <span className="text-gray-300 text-[11px] block line-clamp-2">
                              {ver.description || '—'}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-gray-500 align-top whitespace-nowrap">
                            {formatDate(ver.created_at)}
                          </td>
                          <td className="px-4 py-4 text-right align-top">
                            <div className="flex items-center justify-end gap-1.5">
                              {ver.status !== 'active' ? (
                                <>
                                  <button
                                    onClick={() => handleActivate(ver)}
                                    className="bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white px-2 py-1 rounded font-semibold border border-gray-700 transition-colors"
                                    disabled={actionLoading}
                                    title="Switch live site to this build"
                                  >
                                    Activate
                                  </button>
                                  <button
                                    onClick={() => handleDelete(ver)}
                                    className="bg-red-950/20 hover:bg-red-950/40 text-red-400 hover:text-red-300 p-1 rounded transition-colors"
                                    disabled={actionLoading}
                                    title="Delete build files from disk"
                                  >
                                    <i className="fa-solid fa-trash text-[10px] px-1 py-0.5"></i>
                                  </button>
                                </>
                              ) : (
                                <span className="bg-emerald-950/40 text-emerald-400 font-bold border border-emerald-900/40 px-2 py-1 rounded text-[10px]">
                                  Live Now
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

          </div>

        </main>
      </div>

      {/* Compile & Deploy Modal */}
      {showModal && selectedCommit && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-md w-full overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <i className="fa-solid fa-gear text-blue-400"></i> Deploy Settings
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <form onSubmit={handleDeploySubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">Commit Target</label>
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-850">
                  <div className="flex justify-between items-start gap-1">
                    <span className="text-xs text-white font-semibold line-clamp-1">{selectedCommit.message}</span>
                    <code className="text-[10px] bg-gray-900 px-1 py-0.5 rounded text-blue-400 font-mono">{selectedCommit.hash.slice(0, 7)}</code>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">by {selectedCommit.author}</div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">Version Identifier</label>
                <input 
                  type="text"
                  value={versionName}
                  onChange={(e) => setVersionName(e.target.value)}
                  placeholder="e.g. v1.1.0"
                  className="w-full bg-gray-950 border border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-3 py-2 text-xs text-white outline-none transition-colors"
                  required
                />
                <span className="text-[10px] text-gray-500 mt-1 block">Recommended format: <code>vMajor.Minor.Patch</code></span>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">Release Description / Changelog</label>
                <textarea 
                  value={changelog}
                  onChange={(e) => setChangelog(e.target.value)}
                  rows="3"
                  className="w-full bg-gray-950 border border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-3 py-2 text-xs text-white outline-none transition-colors resize-none"
                  placeholder="What changes does this version bring?"
                />
              </div>

              <div className="flex gap-3 justify-end pt-2 border-t border-gray-800">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-xs text-gray-400 hover:text-white px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-[#CC0000] hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors"
                >
                  Build & Launch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
