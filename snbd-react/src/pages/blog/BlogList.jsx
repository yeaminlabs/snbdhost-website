import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { pageMeta } from '../../seo/pageMeta';
import { useBlogPosts } from '../../hooks/useBlogPosts';

function readingTime(text) {
  const words = (text || '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

function AuthorAvatar({ name }) {
  const initial = name ? name.charAt(0).toUpperCase() : 'S';
  return (
    <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs shadow-sm border border-red-500/10">
      {initial}
    </div>
  );
}

function PostCard({ post }) {
  return (
    <article className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group">
      {post.featured_image_url ? (
        <Link to={`/blog/${post.slug}`} className="block overflow-hidden aspect-[16/10]">
          <img
            src={post.featured_image_url}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
      ) : (
        <div className="aspect-[16/10] bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
          <i className="fa-solid fa-newspaper text-5xl text-red-500/20"></i>
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        {post.category && (
          <span className="inline-block text-[10px] font-black text-red-600 bg-red-50 border border-red-100/50 px-2.5 py-1 rounded-full mb-3.5 uppercase tracking-wider w-fit">
            {post.category}
          </span>
        )}

        <h3 className="text-lg font-black text-gray-900 mb-2.5 leading-snug group-hover:text-red-600 transition-colors">
          <Link to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className="text-xs text-gray-500 leading-relaxed flex-grow mb-5 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-[11px] text-gray-400 mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <AuthorAvatar name={post.author} />
            <span className="font-semibold text-gray-700">{post.author || 'SNBD HOST Team'}</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <span>{formatDate(post.published_at)}</span>
            <span>•</span>
            <span>{readingTime(post.content)} min read</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function FeaturedPostCard({ post }) {
  return (
    <article className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 mb-12 group">
      {post.featured_image_url ? (
        <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-72 lg:h-96">
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />
        </Link>
      ) : (
        <div className="h-72 lg:h-96 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
          <i className="fa-solid fa-newspaper text-7xl text-red-500/20"></i>
        </div>
      )}

      <div className="p-6 sm:p-10 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block text-[10px] font-black text-red-600 bg-red-50 border border-red-100/50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            {post.category || 'Featured'}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 flex items-center gap-1">
            <i className="fa-solid fa-star text-[8px]"></i> Latest Update
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 leading-tight group-hover:text-red-600 transition-colors">
          <Link to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        {post.excerpt && (
          <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-3 lg:line-clamp-4">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2.5">
            <AuthorAvatar name={post.author} />
            <div>
              <div className="font-bold text-gray-800 text-[11px] leading-none">{post.author || 'SNBD HOST Team'}</div>
              <span className="text-[10px] text-gray-400">Author</span>
            </div>
          </div>
          <div className="flex items-center gap-3 font-medium text-[11px]">
            <span>{formatDate(post.published_at)}</span>
            <span>•</span>
            <span>{readingTime(post.content)} min read</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const activeCategory = searchParams.get('category') || '';
  const LIMIT = 9;

  const { posts, total, loading, error } = useBlogPosts({ 
    page, 
    limit: LIMIT, 
    category: activeCategory 
  });
  const totalPages = Math.ceil(total / LIMIT);

  const categories = [
    { label: 'All Articles', value: '' },
    { label: 'Hosting', value: 'Hosting' },
    { label: 'VPS Server', value: 'VPS Server' },
    { label: 'Domain', value: 'Domain' },
    { label: 'n8n Automation', value: 'n8n Automation' },
    { label: 'Billing', value: 'Billing' },
    { label: 'General', value: 'General' }
  ];

  const handleCategoryChange = (catValue) => {
    if (catValue) {
      setSearchParams({ category: catValue, page: 1 });
    } else {
      setSearchParams({ page: 1 });
    }
  };

  const featuredPost = page === 1 && posts.length > 0 && !activeCategory ? posts[0] : null;
  const displayPosts = featuredPost ? posts.slice(1) : posts;

  return (
    <>
      <SEOHead {...pageMeta.blog} />

      {/* Premium Hero */}
      <section className="bg-white pt-28 pb-10 px-4 relative overflow-hidden">
        {/* Soft Background Blur Details */}
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-red-100/40 rounded-full blur-3xl -z-10 animate-pulse"></div>
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 bg-red-50 border border-red-100/50 text-red-600 text-xs font-black px-4 py-2 rounded-full mb-6 uppercase tracking-wider shadow-sm">
            <i className="fa-solid fa-newspaper text-[11px]"></i> SNBD HOST Hub
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight leading-none">
            Hosting Tips, Server Guides <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600">
              & Tech Tutorials
            </span>
          </h1>
          <p className="text-base text-gray-500 max-w-xl mx-auto font-medium">
            Learn how to deploy servers, manage WordPress, build automated workflows with n8n, and secure your cloud infrastructure.
          </p>
        </div>
      </section>

      {/* Category Tabs Section */}
      <section className="bg-white border-b border-gray-100 py-4 px-4 sticky top-[73px] z-20 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.label}
                onClick={() => handleCategoryChange(cat.value)}
                className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-200'
                    : 'bg-gray-50 text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="bg-[#FAFBFD] py-14 px-4 min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="flex justify-center items-center py-32">
              <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-24 text-gray-500 bg-white border border-gray-100 rounded-3xl p-10 max-w-lg mx-auto">
              <i className="fa-solid fa-circle-exclamation text-4xl text-red-500 mb-4 block"></i>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Failed to load articles</h3>
              <p className="text-sm text-gray-500">Please check your internet connection and try reloading the page.</p>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-24 text-gray-400 bg-white border border-gray-100 rounded-3xl p-10 max-w-lg mx-auto shadow-sm">
              <i className="fa-solid fa-box-open text-5xl mb-4 block opacity-30 text-gray-400"></i>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No articles found</h3>
              <p className="text-sm text-gray-500">There are no published posts in this category yet. Check back soon!</p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <>
              {/* Highlight Featured Post */}
              {featuredPost && <FeaturedPostCard post={featuredPost} />}

              {/* Standard Posts Grid */}
              {displayPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          {!loading && !error && totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-16">
              <button
                onClick={() => setSearchParams({ page: page - 1, ...(activeCategory && { category: activeCategory }) })}
                disabled={page <= 1}
                className="px-4 py-2.5 rounded-xl border border-gray-250 hover:border-gray-400 text-xs font-bold text-gray-700 disabled:opacity-40 disabled:hover:border-gray-250 disabled:cursor-not-allowed bg-white hover:bg-gray-50 transition-all shadow-sm"
              >
                <i className="fa-solid fa-chevron-left mr-1.5"></i> Previous
              </button>
              <span className="text-xs text-gray-500 font-bold bg-white px-4 py-2.5 rounded-xl border border-gray-150">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setSearchParams({ page: page + 1, ...(activeCategory && { category: activeCategory }) })}
                disabled={page >= totalPages}
                className="px-4 py-2.5 rounded-xl border border-gray-250 hover:border-gray-400 text-xs font-bold text-gray-700 disabled:opacity-40 disabled:hover:border-gray-250 disabled:cursor-not-allowed bg-white hover:bg-gray-50 transition-all shadow-sm"
              >
                Next <i className="fa-solid fa-chevron-right ml-1.5"></i>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
