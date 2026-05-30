import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';

export default function KnowledgeBaseAdmin() {
  const [apiActive, setApiActive] = useState(false);
  const [checkingApi, setCheckingApi] = useState(true);
  const [activeTab, setActiveTab] = useState('articles'); // articles, generator, sources, settings
  
  // Data States
  const [articles, setArticles] = useState([]);
  const [sources, setSources] = useState([]);
  const [settings, setSettings] = useState({ gemini_model: 'gemini-1.5-flash', system_prompt: '', has_api_key: false });
  
  // UI States
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  // Form/Editor States
  const [editingArticle, setEditingArticle] = useState(null);
  const [editorTitle, setEditorTitle] = useState('');
  const [editorCategory, setEditorCategory] = useState('');
  const [editorSummary, setEditorSummary] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [editorStatus, setEditorStatus] = useState('draft');
  
  // Settings Inputs
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [modelInput, setModelInput] = useState('gemini-1.5-flash');
  const [promptInput, setPromptInput] = useState('');
  
  // AI Generator States
  const [selectedSources, setSelectedSources] = useState([]);
  const [customTopic, setCustomTopic] = useState('');
  const [generatingArticles, setGeneratingArticles] = useState(false);

  // Sitemap States
  const [sitemapLastGenerated, setSitemapLastGenerated] = useState(null);
  const [sitemapRegenerating, setSitemapRegenerating] = useState(false);

  const navigate = useNavigate();
  const JSON_HEADERS = { 'Content-Type': 'application/json' };

  // 1. Check API Status
  const checkStatus = useCallback(async () => {
    setCheckingApi(true);
    try {
      const res = await fetch('/api/plugins/snbd-knowledge-base/status', { credentials: 'include' });
      if (res.status === 401) {
        navigate('/admin/login');
        return;
      }
      const data = await res.json();
      if (data.active) {
        setApiActive(true);
        setSitemapLastGenerated(data.sitemapLastGenerated || null);
      } else {
        setApiActive(false);
      }
    } catch (err) {
      setApiActive(false);
    } finally {
      setCheckingApi(false);
    }
  }, [navigate]);

  // 2. Fetch Articles
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/plugins/snbd-knowledge-base/admin/articles', { credentials: 'include' });
      if (res.status === 401) {
        navigate('/admin/login');
        return;
      }
      const data = await res.json();
      setArticles(data.articles || []);
    } catch {
      setError('Failed to load knowledge base articles.');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // 3. Fetch Sources
  const fetchSources = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/plugins/snbd-knowledge-base/admin/sources', { credentials: 'include' });
      const data = await res.json();
      setSources(data.sources || []);
    } catch {
      setError('Failed to load context sources.');
    } finally {
      setLoading(false);
    }
  }, []);

  // 4. Fetch Settings
  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/plugins/snbd-knowledge-base/admin/settings', { credentials: 'include' });
      const data = await res.json();
      const s = data.settings || {};
      setSettings(s);
      setModelInput(s.gemini_model || 'gemini-1.5-flash');
      setPromptInput(s.system_prompt || '');
      setApiKeyInput(s.gemini_api_key || '');
    } catch {
      setError('Failed to load settings.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync data based on active tab
  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  useEffect(() => {
    if (!apiActive) return;
    setError('');
    setSuccessMsg('');
    
    if (activeTab === 'articles') {
      fetchArticles();
    } else if (activeTab === 'sources' || activeTab === 'generator') {
      fetchSources();
    } else if (activeTab === 'settings') {
      fetchSettings();
    }
  }, [activeTab, apiActive, fetchArticles, fetchSources, fetchSettings]);

  // 5. Scan Website Content
  async function triggerScan() {
    setActionLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      const res = await fetch('/api/plugins/snbd-knowledge-base/admin/scan', {
        method: 'POST',
        credentials: 'include',
        headers: JSON_HEADERS
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to scan website.');
      setSuccessMsg(`Scan complete! Extracted ${data.scanned?.length || 0} pages & blog posts.`);
      fetchSources();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  }

  // 6. Save Settings
  async function saveSettings(e) {
    e.preventDefault();
    setActionLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      const res = await fetch('/api/plugins/snbd-knowledge-base/admin/settings', {
        method: 'POST',
        credentials: 'include',
        headers: JSON_HEADERS,
        body: JSON.stringify({
          gemini_api_key: apiKeyInput,
          gemini_model: modelInput,
          system_prompt: promptInput
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save settings.');
      setSuccessMsg('Settings saved successfully!');
      fetchSettings();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  }

  // 7. Toggle Publish Status
  async function togglePublish(article) {
    const newStatus = article.status === 'published' ? 'draft' : 'published';
    try {
      // Get full article details first
      const getRes = await fetch(`/api/plugins/snbd-knowledge-base/admin/articles/${article.id}`, { credentials: 'include' });
      const { article: fullArt } = await getRes.json();
      
      const res = await fetch(`/api/plugins/snbd-knowledge-base/admin/articles/${article.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: JSON_HEADERS,
        body: JSON.stringify({ ...fullArt, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update article status.');
      setSuccessMsg(`Article "${article.title}" is now a ${newStatus}.`);
      fetchArticles();
    } catch (err) {
      setError(err.message);
    }
  }

  // 8. Delete Article
  async function deleteArticle(id) {
    if (!confirm('Permanently delete this knowledge base article?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/plugins/snbd-knowledge-base/admin/articles/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: JSON_HEADERS
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete article.');
      setSuccessMsg('Article deleted successfully.');
      fetchArticles();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  }

  // 9. Open Editor
  function openEditor(article = null) {
    if (article) {
      setEditingArticle(article);
      // Fetch full content
      fetch(`/api/plugins/snbd-knowledge-base/admin/articles/${article.id}`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          const a = data.article;
          setEditorTitle(a.title);
          setEditorCategory(a.category);
          setEditorSummary(a.summary || '');
          setEditorContent(a.content);
          setEditorStatus(a.status);
        });
    } else {
      setEditingArticle('new');
      setEditorTitle('');
      setEditorCategory('Hosting');
      setEditorSummary('');
      setEditorContent('');
      setEditorStatus('draft');
    }
    setError('');
    setSuccessMsg('');
  }

  // 10. Save Article (CRUD)
  async function saveArticle(e) {
    e.preventDefault();
    if (!editorTitle.trim() || !editorCategory.trim() || !editorContent.trim()) {
      setError('Title, Category, and Content are required.');
      return;
    }

    setActionLoading(true);
    const body = {
      title: editorTitle.trim(),
      category: editorCategory.trim(),
      summary: editorSummary.trim(),
      content: editorContent.trim(),
      status: editorStatus
    };

    try {
      let url = '/api/plugins/snbd-knowledge-base/admin/articles';
      let method = 'POST';

      if (editingArticle && editingArticle !== 'new') {
        url = `/api/plugins/snbd-knowledge-base/admin/articles/${editingArticle.id}`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method,
        credentials: 'include',
        headers: JSON_HEADERS,
        body: JSON.stringify(body)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save article.');
      
      setSuccessMsg(`Article saved successfully!`);
      setEditingArticle(null);
      fetchArticles();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  }

  // 11. Run AI Generation
  async function runAiGeneration() {
    if (selectedSources.length === 0 && !customTopic.trim()) {
      setError('Please select at least one source context or provide a custom topic for Gemini.');
      return;
    }

    setGeneratingArticles(true);
    setError('');
    setSuccessMsg('');
    try {
      const res = await fetch('/api/plugins/snbd-knowledge-base/admin/generate', {
        method: 'POST',
        credentials: 'include',
        headers: JSON_HEADERS,
        body: JSON.stringify({ 
          sourceIds: selectedSources, 
          customTopic: customTopic.trim() 
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate articles.');
      
      setSuccessMsg(`Successfully generated ${data.drafts?.length || 0} articles as drafts! Check them below.`);
      setSelectedSources([]);
      setCustomTopic('');
      setActiveTab('articles');
    } catch (err) {
      setError(err.message);
    } finally {
      setGeneratingArticles(false);
    }
  }

  const toggleSourceSelection = (id) => {
    setSelectedSources(prev => 
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  async function forceRegenerateSitemap() {
    setSitemapRegenerating(true);
    setError('');
    setSuccessMsg('');
    try {
      const res = await fetch('/api/plugins/snbd-knowledge-base/admin/regenerate-sitemap', {
        method: 'POST',
        credentials: 'include',
        headers: JSON_HEADERS
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to regenerate sitemaps.');
      setSuccessMsg('Sitemaps regenerated successfully!');
      
      // Update sitemap timestamp from status check
      const statusRes = await fetch('/api/plugins/snbd-knowledge-base/status', { credentials: 'include' });
      const statusData = await statusRes.json();
      if (statusData.active) {
        setSitemapLastGenerated(statusData.sitemapLastGenerated || null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSitemapRegenerating(false);
    }
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    navigate('/admin/login');
  }

  return (
    <>
      <SEOHead title="Knowledge Base Plugin Manager" noIndex />
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
          <div className="mb-8">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <i className="fa-solid fa-brain text-red-500"></i> Gemini Knowledge Base Generator
            </h1>
            <p className="text-gray-400 text-xs mt-1">
              Generate dynamic, high-quality, and searchable support documentation automatically using the Gemini AI API.
            </p>
          </div>

          {/* Status Metrics Bar */}
          {apiActive && !checkingApi && !editingArticle && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Stat 1: Connection & Mode */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider block">Connection & Mode</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-white">Active</span>
                    <span className="text-[9px] text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded uppercase font-semibold">
                      {settings.gemini_model || '1.5 Flash'}
                    </span>
                  </div>
                </div>
                <i className="fa-solid fa-circle-nodes text-emerald-400 text-lg opacity-40"></i>
              </div>

              {/* Stat 2: Article Count */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider block">Knowledge Base Size</span>
                  <span className="text-sm font-black text-white mt-1 block">
                    {articles.length} {articles.length === 1 ? 'Article' : 'Articles'}
                  </span>
                </div>
                <i className="fa-solid fa-file-lines text-blue-400 text-lg opacity-40"></i>
              </div>

              {/* Stat 3: Sitemap Generation Status */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider block">XML Sitemap Index</span>
                  <span className="text-xs text-gray-300 mt-1 block">
                    Last Generated:{' '}
                    <span className="font-semibold text-white">
                      {sitemapLastGenerated ? new Date(sitemapLastGenerated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Never'}
                    </span>
                  </span>
                </div>
                <button
                  onClick={forceRegenerateSitemap}
                  disabled={sitemapRegenerating}
                  title="Force Regenerate Sitemap XML"
                  className="bg-gray-850 hover:bg-red-900/20 border border-gray-850 hover:border-red-900/50 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className={`fa-solid fa-arrows-rotate ${sitemapRegenerating ? 'animate-spin text-red-500' : 'text-gray-400'}`}></i>
                  {sitemapRegenerating ? 'Regenerating...' : 'Regenerate'}
                </button>
              </div>
            </div>
          )}

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

          {checkingApi ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : !apiActive ? (
            /* Setup guide screen when plugin folder is missing or standalone backend is down */
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-2xl mx-auto text-center shadow-xl">
              <i className="fa-solid fa-circle-info text-5xl text-blue-400/80 mb-4 block"></i>
              <h2 className="text-lg font-bold text-white mb-2">Knowledge Base Plugin Not Detected</h2>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                The plugin file structure is initialized on your server, but the backend routing is currently inactive. If you are using **Standalone Mode**, make sure the plugin server is running.
              </p>
              
              <div className="bg-gray-950 border border-gray-850 rounded-xl p-5 text-left text-xs font-mono mb-6 text-gray-300 space-y-3">
                <p className="font-bold text-white text-center border-b border-gray-800 pb-2">HOW TO INSTALL / START</p>
                <p>1. Open a terminal in the plugin folder:</p>
                <div className="bg-gray-900 p-2 rounded text-blue-400">cd plugins/snbd-knowledge-base</div>
                
                <p>2. Install standalone dependencies:</p>
                <div className="bg-gray-900 p-2 rounded text-blue-400">npm install</div>
                
                <p>3. Activate running mode:</p>
                <div className="text-gray-400 italic">// Integrated Mode: Restart main backend. It loads automatically.</div>
                <div className="text-gray-400 italic">// Standalone Mode: Start standalone server on port 3002:</div>
                <div className="bg-gray-900 p-2 rounded text-blue-400">npm start</div>
              </div>

              <button 
                onClick={checkStatus}
                className="bg-[#CC0000] hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <i className="fa-solid fa-arrows-rotate"></i> Re-check Status
              </button>
            </div>
          ) : editingArticle ? (
            /* CRUD Form view */
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-sm font-bold text-white mb-4 border-b border-gray-800 pb-3 flex items-center justify-between">
                <span>{editingArticle === 'new' ? 'Create Manual Article' : `Edit Article: ${editorTitle}`}</span>
                <button 
                  onClick={() => setEditingArticle(null)}
                  className="text-xs bg-gray-850 hover:bg-gray-800 text-gray-400 hover:text-white px-3 py-1.5 rounded transition-colors"
                >
                  Back to List
                </button>
              </h2>
              
              <form onSubmit={saveArticle} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">Title</label>
                    <input 
                      type="text"
                      value={editorTitle}
                      onChange={(e) => setEditorTitle(e.target.value)}
                      placeholder="e.g. How to install WordPress on cPanel?"
                      className="w-full bg-gray-950 border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3 py-2 text-xs text-white outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">Category</label>
                    <select
                      value={editorCategory}
                      onChange={(e) => setEditorCategory(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3 py-2 text-xs text-white outline-none transition-colors"
                    >
                      <option value="Hosting">Shared Hosting</option>
                      <option value="Reseller Hosting">Reseller Hosting</option>
                      <option value="VPS Server">VPS Server</option>
                      <option value="Domain">Domain</option>
                      <option value="n8n Automation">n8n Automation</option>
                      <option value="Billing">Billing & Invoice</option>
                      <option value="General">General / Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">Short Summary (Used in search preview)</label>
                  <input 
                    type="text"
                    value={editorSummary}
                    onChange={(e) => setEditorSummary(e.target.value)}
                    placeholder="Short 1-2 sentence description explaining the solution."
                    className="w-full bg-gray-950 border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3 py-2 text-xs text-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">Article Content (Supports Markdown)</label>
                  <textarea 
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    rows="12"
                    placeholder="Provide details of the guide here... Supports Markdown headers, lists, code, etc."
                    className="w-full bg-gray-950 border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3 py-2 text-xs text-white font-mono outline-none transition-colors resize-none"
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                  <div className="flex items-center gap-4">
                    <label className="inline-flex items-center gap-2 text-xs text-gray-400">
                      <input 
                        type="radio" 
                        name="status" 
                        value="draft" 
                        checked={editorStatus === 'draft'} 
                        onChange={() => setEditorStatus('draft')}
                        className="text-red-600 focus:ring-0 focus:ring-offset-0 bg-gray-950 border-gray-800"
                      />
                      Draft
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs text-gray-400">
                      <input 
                        type="radio" 
                        name="status" 
                        value="published" 
                        checked={editorStatus === 'published'} 
                        onChange={() => setEditorStatus('published')}
                        className="text-red-600 focus:ring-0 focus:ring-offset-0 bg-gray-950 border-gray-800"
                      />
                      Published
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      type="button" 
                      onClick={() => setEditingArticle(null)}
                      className="text-xs text-gray-400 hover:text-white px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={actionLoading}
                      className="bg-[#CC0000] hover:bg-red-700 text-white font-bold text-xs px-5 py-2 rounded-lg transition-colors"
                    >
                      {actionLoading ? 'Saving...' : 'Save Article'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* Main Dashboard View */
            <>
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-800 mb-6 gap-2 flex-wrap">
                <button 
                  onClick={() => setActiveTab('articles')}
                  className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${activeTab === 'articles' ? 'border-[#CC0000] text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
                >
                  <i className="fa-solid fa-file-lines text-[#CC0000] mr-1.5"></i> Articles ({articles.length})
                </button>
                <button 
                  onClick={() => setActiveTab('generator')}
                  className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${activeTab === 'generator' ? 'border-amber-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
                >
                  <i className="fa-solid fa-wand-magic-sparkles text-amber-500 mr-1.5"></i> AI Generator
                </button>
                <button 
                  onClick={() => setActiveTab('sources')}
                  className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${activeTab === 'sources' ? 'border-blue-400 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
                >
                  <i className="fa-solid fa-folder-open text-blue-400 mr-1.5"></i> Context Sources ({sources.length})
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${activeTab === 'settings' ? 'border-gray-400 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
                >
                  <i className="fa-solid fa-sliders text-gray-400 mr-1.5"></i> Settings
                </button>
              </div>

              {/* Loader */}
              {loading && !generatingArticles && (
                <div className="flex justify-center py-20">
                  <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* Tab 1: Articles List */}
              {!loading && activeTab === 'articles' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-bold text-white uppercase tracking-wider">Generated Articles</h2>
                    <button 
                      onClick={() => openEditor()}
                      className="bg-[#CC0000] hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                    >
                      <i className="fa-solid fa-plus text-[10px]"></i> Create Article
                    </button>
                  </div>

                  {articles.length === 0 ? (
                    <div className="bg-gray-900 border border-gray-800 rounded-xl py-16 text-center text-gray-500">
                      <i className="fa-solid fa-file-signature text-4xl mb-3 opacity-20 block"></i>
                      <p className="text-sm">No knowledge base articles created yet.</p>
                      <button 
                        onClick={() => setActiveTab('generator')}
                        className="text-[#CC0000] text-xs font-bold mt-2 hover:underline"
                      >
                        Generate Articles with AI →
                      </button>
                    </div>
                  ) : (
                    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-gray-800 text-gray-400 text-[10px] uppercase font-bold">
                            <th className="px-5 py-3">Title</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Last Updated</th>
                            <th className="px-5 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                          {articles.map((art) => (
                            <tr key={art.id} className="hover:bg-gray-800/10">
                              <td className="px-5 py-4">
                                <div className="font-semibold text-white line-clamp-1">{art.title}</div>
                                <div className="text-[10px] text-gray-500 mt-0.5">/support/kb/{art.slug}</div>
                              </td>
                              <td className="px-4 py-4">
                                <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded text-[10px]">{art.category}</span>
                              </td>
                              <td className="px-4 py-4">
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  art.status === 'published' ? 'bg-green-950 text-green-400' : 'bg-yellow-950 text-yellow-400'
                                }`}>
                                  <span className={`w-1 h-1 rounded-full ${art.status === 'published' ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                                  {art.status}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-gray-400">{new Date(art.updated_at).toLocaleDateString()}</td>
                              <td className="px-5 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button 
                                    onClick={() => togglePublish(art)}
                                    title={art.status === 'published' ? 'Unpublish' : 'Publish'}
                                    className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                                  >
                                    <i className={`fa-solid ${art.status === 'published' ? 'fa-eye-slash' : 'fa-eye'} text-[11px] p-0.5`}></i>
                                  </button>
                                  <button 
                                    onClick={() => openEditor(art)}
                                    title="Edit"
                                    className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                                  >
                                    <i className="fa-solid fa-pen text-[11px] p-0.5"></i>
                                  </button>
                                  <button 
                                    onClick={() => deleteArticle(art.id)}
                                    title="Delete"
                                    className="p-1 text-gray-400 hover:text-red-400 hover:bg-red-950/20 rounded transition-colors"
                                  >
                                    <i className="fa-solid fa-trash text-[11px] p-0.5"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: AI Generator */}
              {!loading && activeTab === 'generator' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xs font-bold text-white uppercase tracking-wider">Generate Support Articles with Gemini</h2>
                      <p className="text-[10px] text-gray-500 mt-0.5">Write a custom topic and/or select scanned page/blog contents to feed as context references.</p>
                    </div>
                    
                    <button
                      onClick={runAiGeneration}
                      disabled={(selectedSources.length === 0 && !customTopic.trim()) || generatingArticles}
                      className="bg-amber-500 hover:bg-amber-600 disabled:bg-gray-800 disabled:text-gray-600 text-gray-950 text-xs font-black px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-wand-magic-sparkles"></i> 
                      {generatingArticles ? 'AI Generating...' : 'Generate with Gemini'}
                    </button>
                  </div>

                  {!generatingArticles && (
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1.5 flex items-center gap-1.5">
                        <i className="fa-solid fa-pen-nib text-amber-500 text-xs"></i>
                        <span>Custom Topic / Prompt (Write your tutorial topic here)</span>
                      </label>
                      <textarea
                        value={customTopic}
                        onChange={(e) => setCustomTopic(e.target.value)}
                        placeholder="e.g. Write a step-by-step guide on how to configure Cloudflare CDN on cPanel hosting, point DNS, and configure SSL settings..."
                        rows="3"
                        className="w-full bg-gray-950 border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3 py-2 text-xs text-white outline-none transition-colors resize-none font-sans"
                      />
                      <p className="text-[9px] text-gray-500 mt-1">
                        If context sources are selected below, Gemini will also use them for branding and details. If no sources are selected, Gemini will write the article based on its general technical knowledge.
                      </p>
                    </div>
                  )}

                  {generatingArticles && (
                    <div className="bg-gray-900 border border-amber-500/20 rounded-xl p-8 text-center flex flex-col items-center justify-center">
                      <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <h3 className="font-bold text-white text-sm">Gemini AI is generating articles...</h3>
                      <p className="text-gray-400 text-xs mt-1 max-w-md">
                        We are uploading the selected page specifications and generating categorized markdown articles. This takes about 5-10 seconds.
                      </p>
                    </div>
                  )}

                  {!generatingArticles && sources.length === 0 ? (
                    <div className="bg-gray-900 border border-gray-800 rounded-xl py-12 text-center text-gray-500">
                      <i className="fa-solid fa-circle-nodes text-4xl mb-3 opacity-20 block"></i>
                      <p className="text-sm">No context sources scanned yet. Please scan website pages first.</p>
                      <button 
                        onClick={() => setActiveTab('sources')}
                        className="text-[#CC0000] text-xs font-bold mt-2 hover:underline"
                      >
                        Go to Sources & Scan →
                      </button>
                    </div>
                  ) : !generatingArticles && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sources.map(source => {
                        const isSelected = selectedSources.includes(source.id);
                        return (
                          <div 
                            key={source.id} 
                            onClick={() => toggleSourceSelection(source.id)}
                            className={`border rounded-xl p-4 cursor-pointer transition-all flex items-start gap-3 select-none ${
                              isSelected 
                                ? 'bg-amber-950/20 border-amber-500/80 shadow-md shadow-amber-900/10' 
                                : 'bg-gray-900 border-gray-800 hover:border-gray-700'
                            }`}
                          >
                            <input 
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}} // Controlled by container onClick
                              className="mt-1 text-amber-500 focus:ring-0 bg-gray-950 border-gray-800 rounded"
                            />
                            <div>
                              <div className="font-semibold text-xs text-white flex items-center gap-1.5">
                                {source.type === 'page' ? (
                                  <span className="bg-blue-950 text-blue-400 text-[8px] font-bold px-1.5 py-0.5 rounded border border-blue-900/40">PAGE</span>
                                ) : (
                                  <span className="bg-emerald-950 text-emerald-400 text-[8px] font-bold px-1.5 py-0.5 rounded border border-emerald-900/40">BLOG</span>
                                )}
                                {source.name}
                              </div>
                              <p className="text-[10px] text-gray-500 mt-1">Source file: <code>{source.path}</code> ({Math.round(source.length / 1024)} KB content)</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Sources Manager */}
              {!loading && activeTab === 'sources' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xs font-bold text-white uppercase tracking-wider">Context Reference Sources</h2>
                      <p className="text-[10px] text-gray-500 mt-0.5">These are files crawled on the server to feed technical specifications to the Gemini AI.</p>
                    </div>
                    
                    <button 
                      onClick={triggerScan}
                      disabled={actionLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1.5"
                    >
                      <i className={`fa-solid fa-arrows-rotate ${actionLoading ? 'animate-spin' : ''}`}></i> Scan/Re-index
                    </button>
                  </div>

                  {sources.length === 0 ? (
                    <div className="bg-gray-900 border border-gray-800 rounded-xl py-16 text-center text-gray-500">
                      <i className="fa-solid fa-spider text-4xl mb-3 opacity-20 block"></i>
                      <p className="text-sm">Context sources database is empty.</p>
                      <button 
                        onClick={triggerScan}
                        className="bg-[#CC0000] text-white text-xs font-bold px-4 py-2 mt-4 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Start First Scan
                      </button>
                    </div>
                  ) : (
                    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-gray-800 text-gray-400 text-[10px] uppercase font-bold">
                            <th className="px-5 py-3">Source Name</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">File/Path</th>
                            <th className="px-4 py-3">Character Size</th>
                            <th className="px-5 py-3 text-right">Last Scanned</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                          {sources.map(source => (
                            <tr key={source.id} className="hover:bg-gray-800/5">
                              <td className="px-5 py-3.5 font-semibold text-white">{source.name}</td>
                              <td className="px-4 py-3.5">
                                <span className={`text-[9px] uppercase font-extrabold px-2 py-0.5 rounded border ${
                                  source.type === 'page' 
                                    ? 'bg-blue-950/40 text-blue-400 border-blue-900/40' 
                                    : 'bg-emerald-950/40 text-emerald-400 border-emerald-900/40'
                                }`}>
                                  {source.type}
                                </span>
                              </td>
                              <td className="px-4 py-3.5 text-gray-400 font-mono text-[10px]">{source.path}</td>
                              <td className="px-4 py-3.5 text-gray-400">{source.length.toLocaleString()} characters</td>
                              <td className="px-5 py-3.5 text-gray-500 text-right">{new Date(source.last_scanned).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Settings */}
              {!loading && activeTab === 'settings' && (
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-3">Gemini API Configuration</h2>
                  
                  <form onSubmit={saveSettings} className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">Gemini API Key</label>
                      <div className="relative">
                        <input 
                          type={showApiKey ? 'text' : 'password'}
                          value={apiKeyInput}
                          onChange={(e) => setApiKeyInput(e.target.value)}
                          placeholder={settings.has_api_key ? 'Stored (Enter new key to overwrite)' : 'AIZAsy... (Enter Gemini API Key)'}
                          className="w-full bg-gray-950 border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg pl-3 pr-10 py-2 text-xs text-white outline-none transition-colors font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white"
                        >
                          <i className={`fa-solid ${showApiKey ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">Get an API key from <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-red-400 hover:underline">Google AI Studio</a>.</p>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">Active AI Model</label>
                      <select
                        value={modelInput}
                        onChange={(e) => setModelInput(e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3 py-2 text-xs text-white outline-none transition-colors"
                      >
                        <option value="gemini-1.5-flash">Gemini 1.5 Flash (Recommended - Fast & Accurate)</option>
                        <option value="gemini-2.5-flash">Gemini 2.5 Flash (Latest - Ultra-Fast)</option>
                        <option value="gemini-1.5-pro">Gemini 1.5 Pro (Advance Reasoning)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">Custom System Prompt Addendum</label>
                      <textarea 
                        value={promptInput}
                        onChange={(e) => setPromptInput(e.target.value)}
                        rows="6"
                        placeholder="Append custom instructions to guide how articles are structured, what language or tone to write in, etc."
                        className="w-full bg-gray-950 border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg px-3 py-2 text-xs text-white outline-none transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2 border-t border-gray-800 flex justify-end">
                      <button
                        type="submit"
                        disabled={actionLoading}
                        className="bg-[#CC0000] hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors"
                      >
                        {actionLoading ? 'Saving...' : 'Save Settings'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}
