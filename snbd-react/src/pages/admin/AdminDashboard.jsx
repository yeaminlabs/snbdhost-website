import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const JSON_HEADERS = { 'Content-Type': 'application/json' };

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/posts?status=all&limit=100', { credentials: 'include', headers: JSON_HEADERS });
      if (res.status === 401) {
        navigate('/admin/login');
        return;
      }
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  async function togglePublish(post) {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    await fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: JSON_HEADERS,
      body: JSON.stringify({ ...post, status: newStatus }),
    });
    fetchPosts();
  }

  async function deletePost(id) {
    if (!confirm('Delete this post permanently?')) return;
    await fetch(`/api/posts/${id}`, { method: 'DELETE', credentials: 'include', headers: JSON_HEADERS });
    fetchPosts();
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    navigate('/admin/login');
  }

  return (
    <>
      <SEOHead title="Admin Dashboard" noIndex />
      <div className="min-h-screen bg-gray-950 text-gray-200">

        {/* Top bar */}
        <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="SNBD HOST" className="h-7" />
            <span className="text-sm font-bold text-gray-300">Admin</span>
          </div>
          <nav className="flex items-center gap-1 flex-wrap">
            <Link to="/admin/seo-checklist" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors px-3 py-1.5 rounded-lg">
              <i className="fa-solid fa-list-check text-[#CC0000]"></i> SEO Checklist
            </Link>
            <Link to="/admin/marketing" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors px-3 py-1.5 rounded-lg">
              <i className="fa-solid fa-chart-line text-amber-400"></i> Marketing Tools
            </Link>
            <Link to="/admin/versions" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors px-3 py-1.5 rounded-lg">
              <i className="fa-solid fa-code-branch text-blue-400"></i> Version Control
            </Link>
            <Link to="/admin/plugins/knowledge-base" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors px-3 py-1.5 rounded-lg">
              <i className="fa-solid fa-brain text-red-500"></i> Knowledge Base
            </Link>
            <Link to="/blog" target="_blank" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors px-3 py-1.5 rounded-lg">
              <i className="fa-solid fa-arrow-up-right-from-square"></i> View Blog
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
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-white">Posts</h1>
            <div className="flex items-center gap-2">
              <Link
                to="/admin/seo-checklist"
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors border border-gray-700"
              >
                <i className="fa-solid fa-list-check text-[#CC0000]"></i> SEO Checklist
              </Link>
              <Link
                to="/admin/posts/new"
                className="flex items-center gap-2 bg-[#CC0000] hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
              >
                <i className="fa-solid fa-plus"></i> New Post
              </Link>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-[#CC0000] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <i className="fa-solid fa-newspaper text-4xl mb-4 block opacity-20"></i>
              <p>No posts yet.</p>
              <Link to="/admin/posts/new" className="text-[#CC0000] text-sm mt-2 block hover:underline">
                Create your first post →
              </Link>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                    <th className="text-left px-5 py-3 font-medium">Title</th>
                    <th className="text-left px-4 py-3 font-medium">Category</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-left px-4 py-3 font-medium">Published</th>
                    <th className="text-right px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, i) => (
                    <tr
                      key={post.id}
                      className={`border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors ${i === posts.length - 1 ? 'border-0' : ''}`}
                    >
                      <td className="px-5 py-4">
                        <div className="font-medium text-white line-clamp-1">{post.title}</div>
                        <div className="text-xs text-gray-500 mt-0.5">/blog/{post.slug}</div>
                      </td>
                      <td className="px-4 py-4 text-gray-400">{post.category || '—'}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold ${
                          post.status === 'published'
                            ? 'bg-green-900/40 text-green-400'
                            : 'bg-yellow-900/30 text-yellow-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${post.status === 'published' ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-400 text-xs">{formatDate(post.published_at)}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => togglePublish(post)}
                            title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                            className="p-1.5 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                          >
                            <i className={`fa-solid ${post.status === 'published' ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
                          </button>
                          <Link
                            to={`/admin/posts/${post.id}/edit`}
                            className="p-1.5 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                          >
                            <i className="fa-solid fa-pen text-xs"></i>
                          </Link>
                          {post.status === 'published' && (
                            <Link
                              to={`/blog/${post.slug}`}
                              target="_blank"
                              className="p-1.5 rounded hover:bg-gray-700 text-gray-400 hover:text-green-400 transition-colors"
                            >
                              <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                            </Link>
                          )}
                          <button
                            onClick={() => deletePost(post.id)}
                            className="p-1.5 rounded hover:bg-red-900/30 text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <i className="fa-solid fa-trash text-xs"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
