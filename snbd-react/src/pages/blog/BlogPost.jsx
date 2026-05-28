import { useParams, Link } from 'react-router-dom';
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

export default function BlogPost() {
  const { slug } = useParams();
  const { post, loading, error } = useBlogPost(slug);
  const { posts: related } = useBlogPosts({ limit: 3, category: post?.category });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#CC0000] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <i className="fa-solid fa-circle-xmark text-5xl text-red-200 mb-4"></i>
        <h1 className="text-2xl font-bold text-gray-700 mb-2">Post not found</h1>
        <p className="text-gray-400 mb-6">This article doesn't exist or has been removed.</p>
        <Link to="/blog" className="text-[#CC0000] font-semibold hover:underline">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const getAbsoluteImageUrl = (url) => {
    if (!url) return `${BASE_URL}/logo.png`;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
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

      {/* Hero */}
      <section className="bg-white border-b border-gray-100 pt-20 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#CC0000] transition-colors mb-8">
            <i className="fa-solid fa-arrow-left text-xs"></i> Back to Blog
          </Link>

          {post.category && (
            <span className="inline-block text-xs font-bold text-[#CC0000] bg-red-50 px-2.5 py-1 rounded-full mb-4 uppercase tracking-wide">
              {post.category}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="font-medium text-gray-700">{post.author || 'SNBD HOST Team'}</span>
            {post.published_at && <span>{formatDate(post.published_at)}</span>}
            <span>{readingTime(post.content)} min read</span>
          </div>
        </div>
      </section>

      {/* Featured image */}
      {post.featured_image_url && (
        <div className="max-w-4xl mx-auto px-4 -mb-8 mt-8">
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="w-full max-h-96 object-cover rounded-2xl shadow-sm"
          />
        </div>
      )}

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        <div
          className="prose prose-lg prose-gray max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-a:text-[#CC0000] prose-a:no-underline hover:prose-a:underline
            prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:text-gray-100
            prose-blockquote:border-[#CC0000] prose-blockquote:text-gray-500
            prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gray-100">
            {(Array.isArray(post.tags) ? post.tags : post.tags.split(',')).map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Social share */}
        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100">
          <span className="text-sm text-gray-400 font-medium">Share:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${BASE_URL}/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors"
          >
            <i className="fa-brands fa-x-twitter"></i> X
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${BASE_URL}/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <i className="fa-brands fa-facebook-f"></i> Facebook
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${BASE_URL}/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A66C2] text-white text-xs font-bold rounded-lg hover:bg-blue-800 transition-colors"
          >
            <i className="fa-brands fa-linkedin-in"></i> LinkedIn
          </a>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-[#f8f9fc] py-12 px-4 border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Related articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(p => (
                <Link
                  key={p.id}
                  to={`/blog/${p.slug}`}
                  className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
                >
                  {p.category && (
                    <span className="text-xs font-bold text-[#CC0000] uppercase tracking-wide block mb-2">
                      {p.category}
                    </span>
                  )}
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug hover:text-[#CC0000] transition-colors">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
