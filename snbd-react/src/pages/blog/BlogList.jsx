import { useState } from 'react';
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

function PostCard({ post }) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {post.featured_image_url ? (
        <Link to={`/blog/${post.slug}`}>
          <img
            src={post.featured_image_url}
            alt={post.title}
            loading="lazy"
            className="w-full h-48 object-cover"
          />
        </Link>
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
          <i className="fa-solid fa-newspaper text-5xl text-[#CC0000]/20"></i>
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        {post.category && (
          <span className="inline-block text-xs font-bold text-[#CC0000] bg-red-50 px-2.5 py-1 rounded-full mb-3 uppercase tracking-wide">
            {post.category}
          </span>
        )}

        <h2 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
          <Link to={`/blog/${post.slug}`} className="hover:text-[#CC0000] transition-colors">
            {post.title}
          </Link>
        </h2>

        {post.excerpt && (
          <p className="text-sm text-gray-500 leading-relaxed flex-grow mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
          <span className="font-medium text-gray-600">{post.author || 'SNBD HOST Team'}</span>
          <div className="flex items-center gap-3">
            <span>{formatDate(post.published_at)}</span>
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
  const LIMIT = 9;

  const { posts, total, loading, error } = useBlogPosts({ page, limit: LIMIT });
  const totalPages = Math.ceil(total / LIMIT);

  return (
    <>
      <SEOHead {...pageMeta.blog} />

      {/* Hero */}
      <section className="bg-white border-b border-gray-100 pt-20 pb-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 text-[#CC0000] text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            <i className="fa-solid fa-newspaper"></i> SNBD HOST Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Hosting tips, tutorials & news
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Guides on web hosting, server management, WordPress, n8n automation, and Bangladesh tech news.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="bg-[#f8f9fc] py-16 px-4 min-h-[60vh]">
        <div className="max-w-7xl mx-auto">

          {loading && (
            <div className="flex justify-center items-center py-24">
              <div className="w-10 h-10 border-4 border-[#CC0000] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-24 text-gray-500">
              <i className="fa-solid fa-triangle-exclamation text-4xl text-red-300 mb-4 block"></i>
              <p>Could not load blog posts. Please try again later.</p>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-24 text-gray-400">
              <i className="fa-solid fa-newspaper text-5xl mb-4 block opacity-30"></i>
              <p className="text-lg font-medium text-gray-500">No posts yet</p>
              <p className="text-sm mt-1">Check back soon for hosting tips and tutorials.</p>
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-12">
              <button
                onClick={() => setSearchParams({ page: page - 1 })}
                disabled={page <= 1}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                ← Previous
              </button>
              <span className="px-4 py-2 text-sm text-gray-500">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setSearchParams({ page: page + 1 })}
                disabled={page >= totalPages}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
