import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import SEOHead from '../../components/SEOHead';

marked.setOptions({ breaks: true, gfm: true });

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  author: 'SNBD HOST Team',
  category: '',
  tags: '',
  featured_image_url: '',
  meta_title: '',
  meta_description: '',
  og_image: '',
  status: 'draft',
};

export default function PostEditor() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('write');

  const JSON_HEADERS = { 'Content-Type': 'application/json' };

  useEffect(() => {
    if (!isEditing) return;
    fetch(`/api/posts?status=all&limit=1000`, { credentials: 'include', headers: JSON_HEADERS })
      .then(r => r.json())
      .then(data => {
        const post = (data.posts || []).find(p => p.id === Number(id));
        if (post) {
          setForm({
            title: post.title || '',
            slug: post.slug || '',
            excerpt: post.excerpt || '',
            content: post.content || '',
            author: post.author || 'SNBD HOST Team',
            category: post.category || '',
            tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''),
            featured_image_url: post.featured_image_url || '',
            meta_title: post.meta_title || '',
            meta_description: post.meta_description || '',
            og_image: post.og_image || '',
            status: post.status || 'draft',
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  function update(field, value) {
    setForm(f => {
      const next = { ...f, [field]: value };
      if (field === 'title' && !isEditing) {
        next.slug = slugify(value);
      }
      return next;
    });
  }

  // Calculate live checklist checks
  const wordCount = form.content.split(/\s+/).filter(Boolean).length;
  const tagCount = form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean).length : 0;
  const hasH2 = /##\s+.+/.test(form.content);
  const hasInternalLink = /\[.*?\]\((https?:\/\/snbdhost\.com)?\/(hosting|reseller-hosting|vps-server|bdix-servers|domain|openclaw|n8n-automation|offers|support)\)/i.test(form.content);

  const checks = [
    { id: 'title-len', label: `Title: 50–70 chars (currently ${form.title.length})`, pass: form.title.length >= 50 && form.title.length <= 70 },
    { id: 'slug', label: 'Slug is keyword-rich & clean', pass: form.slug.trim().length > 0 },
    { id: 'meta-desc', label: `Meta desc: 150–160 chars (currently ${form.meta_description.length})`, pass: form.meta_description.length >= 150 && form.meta_description.length <= 160 },
    { id: 'og-image', label: 'OG Image URL set (no localhost)', pass: form.og_image.trim().length > 0 && !form.og_image.includes('localhost') },
    { id: 'feat-image', label: 'Featured Image URL set', pass: !!form.featured_image_url.trim() },
    { id: 'category', label: 'Category set', pass: !!form.category.trim() },
    { id: 'tags', label: `Tags: 3–5 items (currently ${tagCount})`, pass: tagCount >= 3 && tagCount <= 5 },
    { id: 'excerpt', label: 'Excerpt filled in (1–2 sentences)', pass: !!form.excerpt.trim() },
    { id: 'length', label: `Length: ≥600 words (currently ${wordCount})`, pass: wordCount >= 600 },
    { id: 'headings', label: 'Content has H2 heading (##)', pass: hasH2 },
    { id: 'links', label: 'Content has 1+ SNBD service link', pass: hasInternalLink },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required');
      return;
    }

    const allChecksPass = checks.every(c => c.pass);
    if (form.status === 'published' && !allChecksPass) {
      setError('Cannot publish: Please complete all critical SEO checks in the sidebar checklist before changing status to Published.');
      return;
    }

    setError('');
    setSaving(true);

    const payload = {
      ...form,
      slug: slugify(form.slug || form.title),
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    };

    try {
      const url = isEditing ? `/api/posts/${id}` : '/api/posts';
      const method = isEditing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, credentials: 'include', headers: JSON_HEADERS, body: JSON.stringify(payload) });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to save');
        return;
      }

      navigate('/admin');
    } catch {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#CC0000] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const previewHtml = DOMPurify.sanitize(marked.parse(form.content || ''));

  return (
    <>
      <SEOHead title={isEditing ? 'Edit Post' : 'New Post'} noIndex />
      <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col">

        {/* Top bar */}
        <header className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="text-gray-400 hover:text-white transition-colors">
              <i className="fa-solid fa-arrow-left text-sm"></i>
            </Link>
            <span className="text-sm font-bold text-gray-300">
              {isEditing ? 'Edit Post' : 'New Post'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={form.status}
              onChange={e => update('status', e.target.value)}
              className="bg-gray-800 border border-gray-700 text-gray-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#CC0000]"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="bg-[#CC0000] hover:bg-red-700 text-white text-sm font-bold px-4 py-1.5 rounded-lg transition-colors disabled:opacity-60"
            >
              {saving ? 'Saving…' : isEditing ? 'Update' : 'Publish'}
            </button>
          </div>
        </header>

        {error && (
          <div className="bg-red-900/30 border-b border-red-800 text-red-400 text-sm px-6 py-3">
            {error}
          </div>
        )}

        <div className="flex flex-1 overflow-hidden">
          {/* Main editor */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Title */}
            <div className="px-8 pt-8 pb-4 border-b border-gray-800">
              <input
                type="text"
                value={form.title}
                onChange={e => update('title', e.target.value)}
                placeholder="Post title…"
                className="w-full bg-transparent text-white text-3xl font-bold placeholder-gray-700 focus:outline-none"
              />
              <input
                type="text"
                value={form.excerpt}
                onChange={e => update('excerpt', e.target.value)}
                placeholder="Short excerpt (shown in blog listing)…"
                className="w-full bg-transparent text-gray-400 text-sm mt-2 placeholder-gray-700 focus:outline-none"
              />
            </div>

            {/* Write / Preview tabs */}
            <div className="flex border-b border-gray-800 px-6">
              {['write', 'preview'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                    activeTab === tab
                      ? 'text-white border-b-2 border-[#CC0000]'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-auto">
              {activeTab === 'write' ? (
                <textarea
                  value={form.content}
                  onChange={e => update('content', e.target.value)}
                  placeholder="Write your post in Markdown…

# Heading 1
## Heading 2

**Bold**, *italic*, `code`

- List item
- List item

[Link text](https://example.com)

```
code block
```"
                  className="w-full h-full bg-transparent text-gray-300 text-sm font-mono px-8 py-6 focus:outline-none resize-none leading-relaxed"
                />
              ) : (
                <div
                  className="px-8 py-6 prose prose-invert prose-sm max-w-none
                    prose-headings:text-white prose-a:text-[#CC0000]
                    prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                    prose-pre:bg-gray-800"
                  dangerouslySetInnerHTML={{ __html: previewHtml }}
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-72 border-l border-gray-800 bg-gray-900 overflow-y-auto flex-shrink-0 p-5 space-y-5">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">SEO Checklist</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  checks.every(c => c.pass) ? 'bg-green-900/40 text-green-400' : 'bg-gray-800 text-gray-300'
                }`}>
                  {checks.filter(c => c.pass).length} / {checks.length} Passed
                </span>
              </div>
              <div className="space-y-2 bg-gray-950/40 border border-gray-800 p-3 rounded-lg text-xs leading-relaxed max-h-56 overflow-y-auto">
                {checks.map(c => (
                  <div key={c.id} className="flex items-start gap-2">
                    {c.pass ? (
                      <i className="fa-solid fa-circle-check text-green-500 mt-0.5 shrink-0"></i>
                    ) : (
                      <i className="fa-solid fa-circle-xmark text-red-500/60 mt-0.5 shrink-0"></i>
                    )}
                    <span className={c.pass ? 'text-gray-300 animate-pulse-once' : 'text-gray-500'}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-800 pt-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Post details</h3>

              {[
                { label: 'Author', field: 'author', type: 'text', placeholder: 'SNBD HOST Team' },
                { label: 'Category', field: 'category', type: 'text', placeholder: 'e.g. WordPress, VPS, Tutorials' },
                { label: 'Tags (comma-separated)', field: 'tags', type: 'text', placeholder: 'e.g. hosting, speed, guide' },
                { label: 'Featured image URL', field: 'featured_image_url', type: 'url', placeholder: 'https://…' },
              ].map(({ label, field, type, placeholder }) => (
                <div key={field} className="mb-3">
                  <label className="block text-[10px] font-medium text-gray-400 mb-1">{label}</label>
                  <input
                    type={type}
                    value={form[field]}
                    onChange={e => update(field, e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#CC0000] transition-colors"
                  />
                </div>
              ))}
            </div>

            <div className="border-t border-gray-800 pt-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">SEO & Metadata</h3>

              <div className="mb-3">
                <label className="block text-[10px] font-medium text-gray-400 mb-1">Slug / URL Path</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={e => update('slug', e.target.value)}
                  placeholder="post-url-slug"
                  className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#CC0000] transition-colors"
                />
              </div>

              {[
                { label: 'Meta title', field: 'meta_title', placeholder: 'Overrides post title in search results' },
                { label: 'Meta description', field: 'meta_description', placeholder: '150–160 char description for Google', isTextarea: true },
                { label: 'OG image URL', field: 'og_image', placeholder: 'Social share preview image URL' },
              ].map(({ label, field, placeholder, isTextarea }) => (
                <div key={field} className="mb-3">
                  <label className="block text-[10px] font-medium text-gray-400 mb-1">{label}</label>
                  {isTextarea ? (
                    <textarea
                      value={form[field]}
                      onChange={e => update(field, e.target.value)}
                      placeholder={placeholder}
                      rows={3}
                      className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#CC0000] transition-colors resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={form[field]}
                      onChange={e => update(field, e.target.value)}
                      placeholder={placeholder}
                      className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#CC0000] transition-colors"
                    />
                  )}
                </div>
              ))}

              {form.meta_description !== undefined && (
                <p className={`text-[10px] mt-1 font-bold ${
                  form.meta_description.length >= 150 && form.meta_description.length <= 160
                    ? 'text-green-400'
                    : 'text-amber-400'
                }`}>
                  {form.meta_description.length} / 160 chars (aim for 150–160)
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
