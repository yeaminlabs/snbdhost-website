import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import SEOHead from '../../components/SEOHead';
import JsonLd from '../../components/JsonLd';
import { BASE_URL } from '../../seo/pageMeta';
import { useBlogPost } from '../../hooks/useBlogPost';
import { useBlogPosts } from '../../hooks/useBlogPosts';

marked.setOptions({ breaks: true, gfm: true });

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

function readingTime(text) {
  const words = (text || '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function AuthorAvatar({ name, size = 'md' }) {
  const initial = name ? name.charAt(0).toUpperCase() : 'S';
  const sizeClasses = size === 'lg' ? 'w-12 h-12 text-sm' : 'w-8 h-8 text-xs';
  return (
    <div className={`${sizeClasses} rounded-full bg-red-650 text-white flex items-center justify-center font-bold shadow-sm border border-red-500/10`}>
      {initial}
    </div>
  );
}

function RelatedPostCard({ post }) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      {post.featured_image_url ? (
        <Link to={`/blog/${post.slug}`} className="block overflow-hidden aspect-[16/10]">
          <img
            src={post.featured_image_url}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          />
        </Link>
      ) : (
        <div className="aspect-[16/10] bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
          <i className="fa-solid fa-newspaper text-4xl text-red-500/20"></i>
        </div>
      )}

      <div className="p-5 flex flex-col flex-grow">
        {post.category && (
          <span className="inline-block text-[9px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-full mb-2.5 uppercase tracking-wider w-fit">
            {post.category}
          </span>
        )}

        <h4 className="text-sm font-black text-gray-900 mb-2 leading-snug group-hover:text-red-600 transition-colors line-clamp-2 flex-grow">
          <Link to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h4>

        <div className="flex items-center justify-between text-[10px] text-gray-400 mt-4 pt-3 border-t border-gray-50">
          <span className="font-semibold text-gray-700">{post.author || 'SNBD HOST Team'}</span>
          <span>{formatDate(post.published_at)}</span>
        </div>
      </div>
    </article>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const { post, loading, error } = useBlogPost(slug);
  const { posts: related } = useBlogPosts({ limit: 4, category: post?.category });
  
  // Reading scroll progress state
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <i className="fa-solid fa-circle-xmark text-5xl text-red-200 mb-4 animate-bounce"></i>
        <h1 className="text-2xl font-bold text-gray-700 mb-2">Post not found</h1>
        <p className="text-gray-400 mb-6">This article doesn't exist or has been removed.</p>
        <Link to="/blog" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-md">
          ← Return to Blog Home
        </Link>
      </div>
    );
  }

  const getAbsoluteImageUrl = (url) => {
    if (!url) return `${BASE_URL}/og/home.jpg`;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const authorType = (post.author && post.author.toLowerCase().includes('team')) ? 'Organization' : 'Person';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || '',
    image: getAbsoluteImageUrl(post.og_image || post.featured_image_url),
    author: {
      '@type': authorType,
      name: post.author || 'SNBD HOST Team',
      url: `${BASE_URL}/`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SNBD HOST',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
    url: `${BASE_URL}/blog/${post.slug}`,
  };

  const htmlContent = DOMPurify.sanitize(marked.parse(post.content || ''));
  const relatedPosts = related.filter(r => r.slug !== post.slug).slice(0, 3);

  const shareUrl = `${BASE_URL}/blog/${post.slug}`;

  return (
    <>
      <SEOHead
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt || ''}
        canonical={`${BASE_URL}/blog/${post.slug}`}
        ogImage={post.og_image || post.featured_image_url}
        ogType="article"
      />
      <JsonLd data={articleSchema} />

      {/* Reading Progress Indicator */}
      <div 
        className="fixed top-[73px] left-0 h-1 bg-gradient-to-r from-red-600 to-amber-500 z-50 transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <div className="bg-white pb-24">
        {/* Header Block */}
        <header className="pt-28 pb-10 px-4 max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-red-600 transition-colors bg-gray-50 hover:bg-red-50 border border-gray-100 hover:border-red-100 px-3.5 py-1.5 rounded-full">
              <i className="fa-solid fa-arrow-left text-[10px]"></i> Back to Articles
            </Link>
          </div>

          <div className="flex items-center gap-2 mb-4">
            {post.category && (
              <span className="inline-block text-[10px] font-black text-red-600 bg-red-50 border border-red-100/50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {post.category}
              </span>
            )}
            <span className="text-[10px] text-gray-400 font-bold bg-gray-50 border border-gray-100 px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <i className="fa-regular fa-clock"></i> {readingTime(post.content)} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Author Meta Row */}
          <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
            <AuthorAvatar name={post.author} size="lg" />
            <div>
              <div className="text-xs font-bold text-gray-800 leading-none mb-1">{post.author || 'SNBD HOST Team'}</div>
              <div className="text-[10px] text-gray-500 leading-none">
                Published on <span className="font-semibold">{formatDate(post.published_at)}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_image_url && (
          <div className="max-w-5xl mx-auto px-4 mb-10">
            <div className="relative aspect-[21/9] overflow-hidden rounded-3xl border border-gray-100 shadow-md">
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Sticky Sidebar (Share & Metadata) */}
          <aside className="lg:col-span-3 lg:sticky lg:top-36 h-fit order-2 lg:order-1 border-t lg:border-t-0 pt-8 lg:pt-0 border-gray-100">
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-3.5">Share Article</h4>
                <div className="flex lg:flex-col gap-2 flex-wrap">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center lg:justify-start gap-2 px-4 py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-gray-850 transition-all shadow-sm"
                  >
                    <i className="fa-brands fa-x-twitter text-xs"></i> <span className="hidden sm:inline lg:inline">Twitter / X</span>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center lg:justify-start gap-2 px-4 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-all shadow-sm"
                  >
                    <i className="fa-brands fa-facebook-f text-xs"></i> <span className="hidden sm:inline lg:inline">Facebook</span>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center lg:justify-start gap-2 px-4 py-2.5 bg-[#0A66C2] text-white text-xs font-bold rounded-xl hover:bg-[#08529c] transition-all shadow-sm"
                  >
                    <i className="fa-brands fa-linkedin-in text-xs"></i> <span className="hidden sm:inline lg:inline">LinkedIn</span>
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className={`flex items-center justify-center lg:justify-start gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all shadow-sm border cursor-pointer ${
                      copySuccess 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <i className={`fa-solid ${copySuccess ? 'fa-check' : 'fa-link'} text-xs`}></i>
                    <span>{copySuccess ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                </div>
              </div>

              {post.tags && (
                <div>
                  <h4 className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-3">Topic Tags</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(Array.isArray(post.tags) ? post.tags : post.tags.split(',')).map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-gray-50 border border-gray-100 text-gray-600 text-[10px] font-bold rounded-lg"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Article Body */}
          <main className="lg:col-span-9 order-1 lg:order-2">
            <article className="prose prose-base sm:prose-lg max-w-none text-gray-800 leading-relaxed font-sans
              prose-headings:font-black prose-headings:text-gray-900 prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:mb-5 prose-p:leading-relaxed prose-p:text-gray-700
              prose-a:text-red-650 prose-a:underline hover:prose-a:text-red-700
              prose-code:bg-slate-50 prose-code:border prose-code:border-slate-200 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-red-600 prose-code:font-mono prose-code:text-[13px]
              prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-2xl prose-pre:p-5 prose-pre:shadow-inner prose-pre:font-mono
              prose-blockquote:border-red-600 prose-blockquote:text-gray-500 prose-blockquote:font-medium prose-blockquote:bg-red-50/20 prose-blockquote:px-5 prose-blockquote:py-1 prose-blockquote:rounded-r-xl
              prose-img:rounded-3xl prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Author Bio Box */}
            <div className="bg-[#FAFBFD] border border-gray-100 rounded-3xl p-6 sm:p-8 mt-14 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-sm">
              <AuthorAvatar name={post.author} size="lg" />
              <div className="text-center sm:text-left flex-1">
                <h4 className="text-sm font-black text-gray-900 mb-1.5">Written by {post.author || 'SNBD HOST Team'}</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  The official publication of SNBD HOST, delivering system administration guides, web hosting recommendations, cloud solutions, and automation tips to power your business infrastructure.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 text-gray-400">
                  <a href="https://facebook.com/snbdhost" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
                    <i className="fa-brands fa-facebook text-sm"></i>
                  </a>
                  <a href="https://twitter.com/snbdhost" target="_blank" rel="noreferrer" className="hover:text-sky-500 transition-colors">
                    <i className="fa-brands fa-twitter text-sm"></i>
                  </a>
                  <a href="https://snbdhost.com" className="hover:text-red-600 transition-colors">
                    <i className="fa-solid fa-globe text-sm"></i>
                  </a>
                </div>
              </div>
            </div>
          </main>

        </div>
      </div>

      {/* Related Posts Grid Section */}
      {relatedPosts.length > 0 && (
        <section className="bg-[#FAFBFD] py-16 px-4 border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-black text-gray-900 uppercase tracking-wide">Suggested Reading</h2>
              <Link to="/blog" className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 hover:underline">
                View All Articles <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(p => (
                <RelatedPostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
