import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import SEOHead from '../components/SEOHead';

export default function KnowledgeBase() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // URL Parameters (single source of truth for filters)
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';
  const debouncedSearch = searchParams.get('search') || '';

  // Data States
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  
  // Local input state for smooth typing experience
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  
  // UI States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Sync URL search query changes back to local input (e.g. on back button)
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  // Debouncer: Update the URL query string 300ms after user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchParams(prev => {
        if (searchQuery.trim()) {
          prev.set('search', searchQuery.trim());
        } else {
          prev.delete('search');
        }
        return prev;
      });
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery, setSearchParams]);

  // Load categories and initial articles
  useEffect(() => {
    async function initKb() {
      setLoading(true);
      try {
        // Fetch categories
        const catRes = await fetch('/api/plugins/snbd-knowledge-base/categories');
        const catData = await catRes.json();
        setCategories(catData.categories || []);

        // Fetch articles based on filter
        let url = '/api/plugins/snbd-knowledge-base/articles';
        const params = [];
        if (selectedCategory) params.push(`category=${encodeURIComponent(selectedCategory)}`);
        if (debouncedSearch) params.push(`search=${encodeURIComponent(debouncedSearch)}`);
        
        if (params.length > 0) {
          url += `?${params.join('&')}`;
        }

        const artRes = await fetch(url);
        const artData = await artRes.json();
        setArticles(artData.articles || []);
      } catch (err) {
        setError('Failed to connect to the Knowledge Base service.');
      } finally {
        setLoading(false);
      }
    }
    
    if (!slug) {
      initKb();
    }
  }, [selectedCategory, debouncedSearch, slug]);

  // Load single article when slug changes
  useEffect(() => {
    if (!slug) {
      setCurrentArticle(null);
      return;
    }

    async function fetchArticle() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/plugins/snbd-knowledge-base/articles/${slug}`);
        if (res.status === 404) {
          setError('Article not found.');
          setCurrentArticle(null);
          return;
        }
        const data = await res.json();
        setCurrentArticle(data.article);
      } catch (err) {
        setError('Could not retrieve article contents.');
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  // Render markdown safely
  const renderMarkdown = (content) => {
    if (!content) return '';
    // Strip leading heading (H1, H2, etc.) at the start of the content to avoid duplicate titles
    const cleanedContent = content.replace(/^\s*#+\s+.*(?:\r?\n|$)/, '').trim();
    const rawHtml = marked(cleanedContent);
    return DOMPurify.sanitize(rawHtml);
  };

  // Helper to change URL category search parameter
  const handleCategoryChange = (catName) => {
    setSearchParams(prev => {
      if (catName) {
        prev.set('category', catName);
      } else {
        prev.delete('category');
      }
      return prev;
    });
  };

  return (
    <div className="bg-[#f8f9fc] min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: `
        .kb-markdown h1 { font-size: 1.8rem; font-weight: 800; margin-top: 1.75rem; margin-bottom: 0.75rem; color: #111827; }
        .kb-markdown h2 { font-size: 1.4rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.25rem; }
        .kb-markdown h3 { font-size: 1.15rem; font-weight: 600; margin-top: 1.25rem; margin-bottom: 0.5rem; color: #374151; }
        .kb-markdown p { margin-bottom: 1.1rem; line-height: 1.625; color: #4b5563; font-size: 0.95rem; }
        .kb-markdown ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.1rem; space-y: 0.25rem; }
        .kb-markdown ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.1rem; space-y: 0.25rem; }
        .kb-markdown li { margin-bottom: 0.35rem; color: #4b5563; font-size: 0.95rem; }
        .kb-markdown pre { background: #1e293b; color: #f8fafc; border: 1px solid #334155; padding: 1.25rem; border-radius: 0.75rem; overflow-x: auto; margin-top: 0.75rem; margin-bottom: 1.25rem; font-family: monospace; font-size: 0.85rem; line-height: 1.5; }
        .kb-markdown code { background: #fee2e2; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-family: monospace; font-size: 0.85rem; color: #991b1b; }
        .kb-markdown pre code { background: none; padding: 0; border-radius: 0; color: inherit; font-size: inherit; }
        .kb-markdown a { color: #cc0000; text-decoration: underline; font-weight: 500; }
        .kb-markdown a:hover { color: #990000; }
        .kb-markdown blockquote { border-left: 4px solid #cc0000; padding-left: 1rem; color: #6b7280; font-style: italic; margin-bottom: 1.1rem; }
      ` }} />

      {slug && currentArticle ? (
        <SEOHead title={`${currentArticle.title} — Knowledge Base`} description={currentArticle.summary} />
      ) : (
        <SEOHead title="Knowledge Base Help Center — SNBD HOST" description="Search and browse categories for shared hosting, VPS servers, domain setup, WHM, and billing questions." />
      )}

      {/* ===== HEADER / HERO ===== */}
      <section className="bg-gradient-to-br from-gray-900 to-black pt-32 pb-20 sm:pb-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <Link to="/support" className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-red-400 font-bold mb-3 uppercase tracking-wider">
            <i className="fa-solid fa-arrow-left"></i> Support Center
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
            Knowledge Base
          </h1>
          
          {!slug && (
            <div className="relative max-w-2xl mx-auto shadow-2xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fa-solid fa-magnifying-glass text-gray-400 text-lg"></i>
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-gray-900 border-none rounded-xl pl-12 pr-6 py-4 text-base focus:outline-none focus:ring-3 focus:ring-red-500/40 transition-all font-medium placeholder-gray-400" 
                placeholder="Search tutorials, server guides or keywords..."
              />
            </div>
          )}
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-5 rounded-2xl max-w-xl mx-auto text-center shadow-sm">
            <i className="fa-solid fa-circle-exclamation text-3xl text-red-500 mb-3 block"></i>
            <h3 className="font-bold text-lg mb-1">Service Offline</h3>
            <p className="text-sm text-red-600/90 mb-4">{error}</p>
            <Link to="/support" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors">
              Return to Support Center
            </Link>
          </div>
        )}

        {!loading && !error && slug && currentArticle && (
          /* Article Detail View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Back Arrow / Meta (Col 3) */}
            <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-4">
              <Link 
                to="/support/kb"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 font-bold bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm transition-all"
              >
                <i className="fa-solid fa-arrow-left"></i> Back to KB
              </Link>
              
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3.5">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Category</span>
                  <span className="inline-block bg-red-50 text-red-600 font-bold text-xs px-2.5 py-1 rounded-lg border border-red-100 mt-1">
                    {currentArticle.category}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Last Updated</span>
                  <span className="text-xs text-gray-600 font-medium block mt-1">
                    {new Date(currentArticle.updated_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Article Body (Col 9) */}
            <article className="lg:col-span-9 bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug mb-4">
                {currentArticle.title}
              </h1>
              {currentArticle.summary && (
                <p className="text-gray-500 text-base leading-relaxed mb-6 font-medium italic border-l-2 border-gray-300 pl-4 py-0.5">
                  {currentArticle.summary}
                </p>
              )}
              <div 
                className="kb-markdown mt-6"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(currentArticle.content) }}
              />
            </article>
          </div>
        )}

        {!loading && !error && !slug && (
          /* KB Directory View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Category Sidebar (Col 3) */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-[10px] uppercase font-extrabold tracking-widest text-gray-400 pl-3">Categories</h3>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleCategoryChange('')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-between ${
                    selectedCategory === '' 
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/10' 
                      : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 shadow-sm'
                  }`}
                >
                  <span>All Categories</span>
                  <i className="fa-solid fa-list-ul text-xs opacity-60"></i>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-between ${
                      selectedCategory === cat 
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/10' 
                        : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 shadow-sm'
                    }`}
                  >
                    <span>{cat}</span>
                    <i className="fa-solid fa-chevron-right text-[10px] opacity-40"></i>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Articles Grid (Col 9) */}
            <div className="lg:col-span-9 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <h2 className="text-lg font-black text-gray-900">
                  {selectedCategory ? `${selectedCategory} Guides` : 'Help & Tutorial Articles'}
                </h2>
                <span className="text-xs text-gray-400 font-bold bg-gray-200/60 px-2.5 py-1 rounded-full">
                  {articles.length} {articles.length === 1 ? 'article' : 'articles'}
                </span>
              </div>

              {articles.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-2xl py-20 text-center text-gray-400 shadow-sm">
                  <i className="fa-regular fa-folder-open text-5xl mb-4 block opacity-30"></i>
                  <h3 className="font-bold text-gray-800 text-base mb-1">No articles found</h3>
                  <p className="text-sm">We couldn't find any articles matching your filters.</p>
                  <button 
                    onClick={() => { setSearchParams({}); setSearchQuery(''); }}
                    className="text-red-600 font-bold text-xs mt-3 hover:underline"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {articles.map((art) => (
                    <Link 
                      key={art.id}
                      to={`/support/kb/${art.slug}`}
                      className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-red-200 shadow-sm hover:shadow-md transition-all flex flex-col group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-red-50 text-red-600 font-bold text-[10px] px-2 py-0.5 rounded border border-red-100 uppercase tracking-wider">
                          {art.category}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          {new Date(art.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                        {art.title}
                      </h3>
                      
                      <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
                        {art.summary || 'Click to view the detailed step-by-step documentation for this topic.'}
                      </p>

                      <span className="text-xs font-bold text-[#CC0000] mt-auto flex items-center gap-1 group-hover:gap-1.5 transition-all">
                        Read Article <i className="fa-solid fa-arrow-right text-[10px]"></i>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        )}
      </main>
    </div>
  );
}
