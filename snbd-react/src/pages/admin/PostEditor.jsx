import { useState, useEffect, useRef, useCallback } from 'react';
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

const CATEGORIES = ['WordPress', 'VPS', 'Tutorials', 'Hosting', 'Domain', 'Security', 'News', 'Offers'];

const TOOLBAR_ACTIONS = [
  { icon: 'fa-bold',          label: 'Bold',            syntax: '**',      wrap: true  },
  { icon: 'fa-italic',        label: 'Italic',          syntax: '_',       wrap: true  },
  { icon: 'fa-strikethrough', label: 'Strike',          syntax: '~~',      wrap: true  },
  { icon: 'fa-code',          label: 'Inline code',     syntax: '`',       wrap: true  },
  { sep: true },
  { icon: 'fa-heading',       label: 'H2',              prefix: '## '              },
  { icon: 'fa-heading',       label: 'H3',              prefix: '### ',    small: true },
  { sep: true },
  { icon: 'fa-list-ul',       label: 'Bullet list',     prefix: '- '               },
  { icon: 'fa-list-ol',       label: 'Numbered list',   prefix: '1. '              },
  { icon: 'fa-quote-left',    label: 'Blockquote',      prefix: '> '               },
  { sep: true },
  { icon: 'fa-link',          label: 'Link',            template: '[Link text](https://)', cursor: 11 },
  { icon: 'fa-image',         label: 'Image',           template: '![Alt text](https://)', cursor: 12 },
  { icon: 'fa-minus',         label: 'Divider',         prefix: '\n---\n'          },
  { sep: true },
  { icon: 'fa-square-code',   label: 'Code block',      block: '```\ncode here\n```' },
];

function insertMarkdown(textarea, action, setContent) {
  const { selectionStart: ss, selectionEnd: se, value } = textarea;
  const selected = value.substring(ss, se);
  let newVal, newCursor;

  if (action.wrap) {
    const s = action.syntax;
    if (selected) {
      newVal = value.substring(0, ss) + s + selected + s + value.substring(se);
      newCursor = se + s.length * 2;
    } else {
      newVal = value.substring(0, ss) + s + s + value.substring(se);
      newCursor = ss + s.length;
    }
  } else if (action.prefix) {
    const lineStart = value.lastIndexOf('\n', ss - 1) + 1;
    newVal = value.substring(0, lineStart) + action.prefix + value.substring(lineStart);
    newCursor = ss + action.prefix.length;
  } else if (action.template) {
    newVal = value.substring(0, ss) + action.template + value.substring(se);
    newCursor = ss + action.cursor;
  } else if (action.block) {
    const prefix = ss > 0 ? '\n' : '';
    newVal = value.substring(0, ss) + prefix + action.block + '\n' + value.substring(se);
    newCursor = ss + prefix.length + action.block.length + 1;
  }

  setContent(newVal);
  setTimeout(() => {
    textarea.focus();
    textarea.setSelectionRange(newCursor, newCursor);
  }, 0);
}

// ── SEO Score Ring ─────────────────────────────────────────────────────────────
function ScoreRing({ passed, total }) {
  const pct = total === 0 ? 0 : Math.round((passed / total) * 100);
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = circ * (pct / 100);
  const color = pct >= 80 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: 72, height: 72 }}>
      <svg width="72" height="72" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="36" cy="36" r={r} fill="none" stroke="#1f2937" strokeWidth="6" />
        <circle
          cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.4s ease, stroke 0.4s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-base font-black" style={{ color }}>{pct}%</span>
      </div>
    </div>
  );
}

// ── Collapsible Panel ──────────────────────────────────────────────────────────
function Panel({ title, icon, children, defaultOpen = true, badge }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-800/60 hover:bg-gray-800 transition-colors text-left"
      >
        <span className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider">
          <i className={`fa-solid ${icon} text-[#CC0000]`} />
          {title}
          {badge !== undefined && (
            <span className="bg-gray-700 text-gray-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>
          )}
        </span>
        <i className={`fa-solid fa-chevron-${open ? 'up' : 'down'} text-gray-500 text-[10px]`} />
      </button>
      {open && <div className="p-4 space-y-3 bg-gray-900/40">{children}</div>}
    </div>
  );
}

// ── Field Component ────────────────────────────────────────────────────────────
function Field({ label, hint, charLimit, children }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{label}</label>
        {hint && <span className="text-[10px] text-gray-600">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

export default function PostEditor() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  const [form, setForm]       = useState(emptyForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');
  const [activeTab, setActiveTab] = useState('write');
  const [splitView, setSplitView] = useState(false);
  const [saved, setSaved]     = useState(false);

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

  const slugify = (text) =>
    text.toString().toLowerCase()
      .replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');

  function update(field, value) {
    setForm(f => {
      const next = { ...f, [field]: value };
      if (field === 'title' && !isEditing) next.slug = slugify(value);
      return next;
    });
    setSaved(false);
  }

  // Live checks
  const wordCount  = form.content.split(/\s+/).filter(Boolean).length;
  const tagList    = form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  const hasH2      = /##\s+.+/.test(form.content);
  const hasInternalLink = /\[.*?\]\((https?:\/\/snbdhost\.com)?\//.test(form.content);

  const checks = [
    { id: 'title-len',   label: `Title length (50–70 chars)`,       detail: `${form.title.length} chars`, pass: form.title.length >= 50 && form.title.length <= 70,   critical: true  },
    { id: 'slug',        label: 'Keyword-rich slug',                 detail: form.slug || '—',            pass: form.slug.trim().length > 0,                           critical: true  },
    { id: 'meta-desc',   label: 'Meta description (150–160 chars)', detail: `${form.meta_description.length} chars`, pass: form.meta_description.length >= 150 && form.meta_description.length <= 160, critical: true },
    { id: 'og-image',    label: 'OG Image URL (no localhost)',       detail: '',                          pass: form.og_image.trim().length > 0 && !form.og_image.includes('localhost'), critical: true },
    { id: 'feat-image',  label: 'Featured Image URL',                detail: '',                         pass: !!form.featured_image_url.trim(),                       critical: false },
    { id: 'category',    label: 'Category selected',                 detail: form.category || '—',        pass: !!form.category.trim(),                                critical: false },
    { id: 'tags',        label: 'Tags (3–5)',                        detail: `${tagList.length} tags`,    pass: tagList.length >= 3 && tagList.length <= 5,            critical: false },
    { id: 'excerpt',     label: 'Excerpt filled in',                 detail: '',                         pass: !!form.excerpt.trim(),                                  critical: false },
    { id: 'length',      label: 'Content ≥ 600 words',              detail: `${wordCount} words`,        pass: wordCount >= 600,                                      critical: false },
    { id: 'headings',    label: 'Has H2 heading (##)',               detail: '',                         pass: hasH2,                                                  critical: false },
    { id: 'links',       label: '1+ SNBD internal link',            detail: '',                         pass: hasInternalLink,                                         critical: false },
  ];

  const passedCount = checks.filter(c => c.pass).length;

  async function handleSubmit(isDraft = false) {
    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required.');
      return;
    }
    const status = isDraft ? 'draft' : form.status;
    if (status === 'published' && !checks.every(c => c.pass)) {
      setError('Please pass all SEO checks before publishing.');
      return;
    }

    setError('');
    setSaving(true);

    const payload = {
      ...form,
      status,
      slug: slugify(form.slug || form.title),
      tags: tagList,
    };

    try {
      const url    = isEditing ? `/api/posts/${id}` : '/api/posts';
      const method = isEditing ? 'PUT' : 'POST';
      const res    = await fetch(url, { method, credentials: 'include', headers: JSON_HEADERS, body: JSON.stringify(payload) });
      const data   = await res.json();
      if (!res.ok) { setError(data.error || 'Failed to save'); return; }
      setSaved(true);
      if (!isDraft) navigate('/admin');
    } catch {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  }

  const handleToolbarAction = useCallback((action) => {
    if (textareaRef.current) {
      insertMarkdown(textareaRef.current, action, (val) => update('content', val));
    }
  }, [form.content]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#030712', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #CC0000', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  const previewHtml = DOMPurify.sanitize(marked.parse(form.content || ''));
  const titleLen    = form.title.length;
  const metaLen     = form.meta_description.length;

  return (
    <>
      <SEOHead title={isEditing ? 'Edit Post — Admin' : 'New Post — Admin'} noIndex />

      <style>{`
        .pe-root { min-height: 100vh; background: #030712; color: #e5e7eb; font-family: 'Inter', system-ui, sans-serif; display: flex; flex-direction: column; }
        .pe-header { background: #0a0f1a; border-bottom: 1px solid #1e2740; padding: 0 20px; height: 56px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; gap: 12px; }
        .pe-header-left { display: flex; align-items: center; gap: 12px; }
        .pe-back { display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 8px; background: #111827; border: 1px solid #1f2937; color: #9ca3af; text-decoration: none; transition: all .15s; font-size: 13px; }
        .pe-back:hover { background: #1f2937; color: #fff; }
        .pe-title-badge { font-size: 13px; font-weight: 700; color: #f3f4f6; letter-spacing: -.01em; }
        .pe-status-chip { display: flex; align-items: center; gap: 6px; padding: 0 10px; height: 30px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; border: none; cursor: pointer; transition: all .15s; }
        .pe-status-draft { background: #1f2937; color: #9ca3af; }
        .pe-status-published { background: rgba(34,197,94,.15); color: #22c55e; }
        .pe-btn { display: inline-flex; align-items: center; gap: 6px; height: 34px; padding: 0 14px; border-radius: 8px; font-size: 12px; font-weight: 700; border: none; cursor: pointer; transition: all .15s; }
        .pe-btn-ghost { background: #111827; color: #9ca3af; border: 1px solid #1f2937; }
        .pe-btn-ghost:hover { background: #1f2937; color: #e5e7eb; }
        .pe-btn-save { background: #1f2937; color: #e5e7eb; border: 1px solid #374151; }
        .pe-btn-save:hover { background: #374151; }
        .pe-btn-publish { background: #CC0000; color: #fff; box-shadow: 0 0 20px rgba(204,0,0,.3); }
        .pe-btn-publish:hover { background: #e31414; transform: translateY(-1px); }
        .pe-btn:disabled { opacity: .5; cursor: not-allowed; transform: none !important; }
        .pe-body { flex: 1; display: flex; overflow: hidden; }
        .pe-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
        .pe-title-area { padding: 36px 48px 20px; border-bottom: 1px solid #0f172a; flex-shrink: 0; }
        .pe-title-input { width: 100%; background: transparent; border: none; outline: none; font-size: 30px; font-weight: 800; color: #f9fafb; line-height: 1.2; letter-spacing: -.02em; caret-color: #CC0000; placeholder-color: #374151; resize: none; }
        .pe-excerpt-input { width: 100%; background: transparent; border: none; outline: none; font-size: 14px; color: #6b7280; line-height: 1.6; margin-top: 8px; caret-color: #CC0000; }
        .pe-tabs { display: flex; align-items: center; gap: 2px; padding: 0 48px; border-bottom: 1px solid #0f172a; background: #030712; flex-shrink: 0; }
        .pe-tab { padding: 12px 16px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; border: none; background: transparent; cursor: pointer; color: #4b5563; border-bottom: 2px solid transparent; transition: all .15s; margin-bottom: -1px; }
        .pe-tab.active { color: #fff; border-bottom-color: #CC0000; }
        .pe-tab:hover:not(.active) { color: #9ca3af; }
        .pe-tabs-right { margin-left: auto; display: flex; align-items: center; gap: 8px; }
        .pe-wordcount { font-size: 11px; color: #4b5563; font-weight: 500; }
        .pe-wordcount.good { color: #22c55e; }
        .pe-toolbar { display: flex; align-items: center; gap: 2px; padding: 8px 48px; background: #030712; border-bottom: 1px solid #0f172a; flex-wrap: wrap; flex-shrink: 0; }
        .pe-toolbar-btn { display: flex; align-items: center; justify-content: center; width: 30px; height: 28px; border-radius: 6px; border: none; background: transparent; color: #6b7280; cursor: pointer; font-size: 12px; transition: all .12s; position: relative; }
        .pe-toolbar-btn:hover { background: #1f2937; color: #e5e7eb; }
        .pe-toolbar-btn.small-icon { font-size: 9px; }
        .pe-toolbar-sep { width: 1px; height: 20px; background: #1f2937; margin: 0 4px; }
        .pe-editor-area { flex: 1; overflow: hidden; display: flex; }
        .pe-textarea { flex: 1; background: transparent; border: none; outline: none; resize: none; color: #d1d5db; font-size: 14.5px; line-height: 1.85; font-family: 'JetBrains Mono', 'Fira Code', 'Fira Mono', monospace; padding: 28px 48px; caret-color: #CC0000; tab-size: 2; }
        .pe-preview { flex: 1; overflow-y: auto; padding: 28px 48px; }
        .pe-preview-pane { flex: 1; border-left: 1px solid #0f172a; overflow-y: auto; padding: 28px 36px; }
        .pe-prose { max-width: 100%; }
        .pe-prose h1,.pe-prose h2,.pe-prose h3,.pe-prose h4 { color: #f9fafb; font-weight: 800; margin: 1.5em 0 .6em; line-height: 1.25; letter-spacing: -.02em; }
        .pe-prose h1 { font-size: 2em; }
        .pe-prose h2 { font-size: 1.45em; border-bottom: 1px solid #1f2937; padding-bottom: .4em; }
        .pe-prose h3 { font-size: 1.2em; }
        .pe-prose p { color: #d1d5db; line-height: 1.8; margin: .9em 0; }
        .pe-prose a { color: #CC0000; text-decoration: underline; }
        .pe-prose strong { color: #f9fafb; }
        .pe-prose em { color: #e5e7eb; }
        .pe-prose code { background: #1f2937; color: #f87171; padding: 2px 6px; border-radius: 4px; font-size: .85em; font-family: monospace; }
        .pe-prose pre { background: #111827; border: 1px solid #1f2937; border-radius: 10px; padding: 1.2em 1.5em; overflow-x: auto; margin: 1.2em 0; }
        .pe-prose pre code { background: transparent; color: #a5f3fc; padding: 0; border-radius: 0; }
        .pe-prose ul,.pe-prose ol { padding-left: 1.5em; color: #d1d5db; line-height: 1.8; }
        .pe-prose blockquote { border-left: 3px solid #CC0000; padding-left: 1em; color: #9ca3af; font-style: italic; margin: 1em 0; }
        .pe-prose hr { border: none; border-top: 1px solid #1f2937; margin: 2em 0; }
        .pe-prose img { max-width: 100%; border-radius: 10px; }
        .pe-sidebar { width: 300px; background: #060d1a; border-left: 1px solid #0f172a; overflow-y: auto; flex-shrink: 0; display: flex; flex-direction: column; gap: 12px; padding: 16px; }
        .pe-field-input { width: 100%; background: #111827; border: 1px solid #1f2937; color: #e5e7eb; border-radius: 8px; padding: 8px 12px; font-size: 12.5px; outline: none; transition: border-color .15s; box-sizing: border-box; }
        .pe-field-input:focus { border-color: #CC0000; }
        .pe-field-textarea { width: 100%; background: #111827; border: 1px solid #1f2937; color: #e5e7eb; border-radius: 8px; padding: 8px 12px; font-size: 12.5px; outline: none; transition: border-color .15s; resize: vertical; min-height: 72px; box-sizing: border-box; line-height: 1.5; }
        .pe-field-textarea:focus { border-color: #CC0000; }
        .pe-field-select { width: 100%; background: #111827; border: 1px solid #1f2937; color: #e5e7eb; border-radius: 8px; padding: 8px 12px; font-size: 12.5px; outline: none; transition: border-color .15s; cursor: pointer; box-sizing: border-box; appearance: none; }
        .pe-field-select:focus { border-color: #CC0000; }
        .pe-char-bar { height: 3px; border-radius: 999px; background: #1f2937; margin-top: 5px; overflow: hidden; }
        .pe-char-fill { height: 100%; border-radius: 999px; transition: width .2s, background .2s; }
        .pe-check-item { display: flex; align-items: flex-start; gap: 8px; padding: 6px 0; border-bottom: 1px solid #0f172a; }
        .pe-check-item:last-child { border-bottom: none; }
        .pe-check-icon { flex-shrink: 0; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8px; margin-top: 1px; }
        .pe-check-icon.pass { background: rgba(34,197,94,.15); color: #22c55e; }
        .pe-check-icon.fail { background: rgba(239,68,68,.1); color: #ef4444; }
        .pe-check-icon.fail.critical { background: rgba(239,68,68,.2); }
        .pe-check-label { font-size: 11.5px; line-height: 1.4; flex: 1; }
        .pe-check-label.pass { color: #6b7280; }
        .pe-check-label.fail { color: #d1d5db; }
        .pe-check-detail { font-size: 10px; color: #4b5563; }
        .pe-error { background: rgba(220,38,38,.1); border: 1px solid rgba(220,38,38,.3); color: #f87171; font-size: 12px; padding: 10px 20px; flex-shrink: 0; display: flex; align-items: center; gap: 8px; }
        .pe-saved { background: rgba(34,197,94,.1); border: 1px solid rgba(34,197,94,.2); color: #22c55e; font-size: 12px; padding: 10px 20px; flex-shrink: 0; display: flex; align-items: center; gap: 8px; }
        .pe-google-preview { background: #fff; border-radius: 10px; padding: 14px 16px; }
        .pe-gp-url { font-size: 11px; color: #1a0dab; margin-bottom: 2px; }
        .pe-gp-title { font-size: 18px; color: #1a0dab; font-weight: 400; line-height: 1.3; margin-bottom: 4px; font-family: Arial, sans-serif; }
        .pe-gp-desc { font-size: 12.5px; color: #545454; line-height: 1.58; font-family: Arial, sans-serif; }
        .pe-split-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #374151; padding: 8px 36px; border-bottom: 1px solid #0f172a; background: #060d1a; flex-shrink: 0; }
      `}</style>

      <div className="pe-root">

        {/* ── TOP BAR ── */}
        <header className="pe-header">
          <div className="pe-header-left">
            <Link to="/admin" className="pe-back">
              <i className="fa-solid fa-arrow-left" />
            </Link>
            <span className="pe-title-badge">
              {isEditing ? '✏️ Edit Post' : '✨ New Post'}
            </span>
            <button
              type="button"
              onClick={() => update('status', form.status === 'draft' ? 'published' : 'draft')}
              className={`pe-status-chip ${form.status === 'published' ? 'pe-status-published' : 'pe-status-draft'}`}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
              {form.status === 'published' ? 'Published' : 'Draft'}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {saved && (
              <span style={{ fontSize: 11, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 4 }}>
                <i className="fa-solid fa-check" /> Saved
              </span>
            )}
            <button
              type="button"
              onClick={() => setSplitView(v => !v)}
              className={`pe-btn pe-btn-ghost`}
              title="Toggle split view"
            >
              <i className="fa-solid fa-table-columns" />
              {splitView ? 'Single' : 'Split'}
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSubmit(true)}
              className="pe-btn pe-btn-save"
            >
              <i className="fa-solid fa-floppy-disk" />
              Save Draft
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSubmit(false)}
              className="pe-btn pe-btn-publish"
            >
              {saving
                ? <><i className="fa-solid fa-spinner fa-spin" /> Saving…</>
                : form.status === 'published'
                  ? <><i className="fa-solid fa-cloud-arrow-up" /> Update</>
                  : <><i className="fa-solid fa-rocket" /> Publish</>}
            </button>
          </div>
        </header>

        {/* ── ALERTS ── */}
        {error && (
          <div className="pe-error">
            <i className="fa-solid fa-circle-exclamation" />
            {error}
            <button onClick={() => setError('')} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 13 }}>✕</button>
          </div>
        )}
        {saved && !error && (
          <div className="pe-saved">
            <i className="fa-solid fa-circle-check" />
            Draft saved successfully.
          </div>
        )}

        {/* ── BODY ── */}
        <div className="pe-body">

          {/* ── MAIN COLUMN ── */}
          <div className="pe-main">

            {/* Title + Excerpt */}
            <div className="pe-title-area">
              <textarea
                value={form.title}
                onChange={e => { update('title', e.target.value); e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                placeholder="Post title…"
                rows={1}
                style={{ height: 'auto', overflow: 'hidden' }}
                className="pe-title-input"
              />
              <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, color: titleLen >= 50 && titleLen <= 70 ? '#22c55e' : titleLen > 0 ? '#f59e0b' : '#4b5563', fontWeight: 600 }}>
                  {titleLen} chars
                </span>
                {titleLen > 0 && titleLen < 50 && <span style={{ fontSize: 11, color: '#f59e0b' }}>({50 - titleLen} more for optimal)</span>}
                {titleLen > 70 && <span style={{ fontSize: 11, color: '#ef4444' }}>({titleLen - 70} over limit)</span>}
              </div>
              <input
                type="text"
                value={form.excerpt}
                onChange={e => update('excerpt', e.target.value)}
                placeholder="Short excerpt shown on blog listing (1–2 sentences)…"
                className="pe-excerpt-input"
              />
            </div>

            {/* Tabs + Word count */}
            <div className="pe-tabs">
              {!splitView && ['write', 'preview'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`pe-tab ${activeTab === tab ? 'active' : ''}`}>
                  <i className={`fa-solid ${tab === 'write' ? 'fa-pen-nib' : 'fa-eye'} mr-1.5`} />
                  {tab}
                </button>
              ))}
              {splitView && (
                <span style={{ fontSize: 11, color: '#4b5563', fontWeight: 600, paddingTop: 12, paddingBottom: 12 }}>
                  <i className="fa-solid fa-table-columns mr-1" /> Split view
                </span>
              )}
              <div className="pe-tabs-right">
                <span className={`pe-wordcount ${wordCount >= 600 ? 'good' : ''}`}>
                  <i className="fa-solid fa-align-left" style={{ marginRight: 4 }} />
                  {wordCount.toLocaleString()} words
                  {wordCount < 600 && <span style={{ color: '#6b7280' }}> / 600 min</span>}
                </span>
              </div>
            </div>

            {/* Markdown Toolbar */}
            {(!splitView && activeTab === 'write') || splitView ? (
              <div className="pe-toolbar">
                {TOOLBAR_ACTIONS.map((a, i) =>
                  a.sep
                    ? <div key={i} className="pe-toolbar-sep" />
                    : (
                      <button
                        key={i}
                        type="button"
                        title={a.label}
                        onClick={() => handleToolbarAction(a)}
                        className={`pe-toolbar-btn${a.small ? ' small-icon' : ''}`}
                      >
                        <i className={`fa-solid ${a.icon}`} />
                        {a.small && <sup style={{ fontSize: 8, marginLeft: 1, verticalAlign: 'super' }}>3</sup>}
                      </button>
                    )
                )}
              </div>
            ) : null}

            {/* Editor / Preview */}
            <div className="pe-editor-area">
              {splitView ? (
                <>
                  <textarea
                    ref={textareaRef}
                    value={form.content}
                    onChange={e => update('content', e.target.value)}
                    placeholder={`Write in Markdown…\n\n## Start with a heading\n\nYour content here…`}
                    className="pe-textarea"
                    spellCheck
                  />
                  <div className="pe-preview-pane">
                    <div className="pe-prose" dangerouslySetInnerHTML={{ __html: previewHtml }} />
                  </div>
                </>
              ) : activeTab === 'write' ? (
                <textarea
                  ref={textareaRef}
                  value={form.content}
                  onChange={e => update('content', e.target.value)}
                  placeholder={`Write in Markdown…\n\n## Start with a heading\n\nYour content here…`}
                  className="pe-textarea"
                  style={{ width: '100%' }}
                  spellCheck
                />
              ) : (
                <div className="pe-preview" style={{ width: '100%' }}>
                  <div className="pe-prose" dangerouslySetInnerHTML={{ __html: previewHtml }} />
                </div>
              )}
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="pe-sidebar">

            {/* SEO Score */}
            <div style={{ background: '#0a0f1a', border: '1px solid #1e2740', borderRadius: 12, padding: '16px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <ScoreRing passed={passedCount} total={checks.length} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#f9fafb', marginBottom: 2 }}>SEO Score</div>
                <div style={{ fontSize: 11, color: '#6b7280' }}>{passedCount} / {checks.length} checks passed</div>
                {passedCount === checks.length && (
                  <div style={{ fontSize: 11, color: '#22c55e', marginTop: 4, fontWeight: 600 }}>
                    <i className="fa-solid fa-party-horn mr-1" /> Ready to publish!
                  </div>
                )}
              </div>
            </div>

            {/* SEO Checklist */}
            <Panel title="SEO Checklist" icon="fa-chart-line" defaultOpen={true} badge={`${passedCount}/${checks.length}`}>
              {checks.map(c => (
                <div key={c.id} className="pe-check-item">
                  <div className={`pe-check-icon ${c.pass ? 'pass' : `fail${c.critical ? ' critical' : ''}`}`}>
                    <i className={`fa-solid ${c.pass ? 'fa-check' : 'fa-xmark'}`} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className={`pe-check-label ${c.pass ? 'pass' : 'fail'}`}>
                      {c.label}
                      {c.critical && !c.pass && <span style={{ fontSize: 9, background: 'rgba(239,68,68,.2)', color: '#ef4444', borderRadius: 3, padding: '1px 4px', marginLeft: 4, fontWeight: 700 }}>CRITICAL</span>}
                    </div>
                    {c.detail && <div className="pe-check-detail">{c.detail}</div>}
                  </div>
                </div>
              ))}
            </Panel>

            {/* Post Details */}
            <Panel title="Post Details" icon="fa-pen-ruler" defaultOpen={true}>
              <Field label="Author">
                <input type="text" value={form.author} onChange={e => update('author', e.target.value)} className="pe-field-input" placeholder="SNBD HOST Team" />
              </Field>
              <Field label="Category">
                <select value={form.category} onChange={e => update('category', e.target.value)} className="pe-field-select">
                  <option value="">Select category…</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Tags" hint="comma-separated, 3–5">
                <input type="text" value={form.tags} onChange={e => update('tags', e.target.value)} className="pe-field-input" placeholder="hosting, speed, wordpress" />
                <div style={{ marginTop: 5, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {tagList.map(t => (
                    <span key={t} style={{ background: '#1f2937', color: '#9ca3af', fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20 }}>
                      #{t}
                    </span>
                  ))}
                </div>
              </Field>
              <Field label="URL Slug">
                <div style={{ display: 'flex', alignItems: 'center', background: '#111827', border: '1px solid #1f2937', borderRadius: 8, overflow: 'hidden', transition: 'border-color .15s' }}>
                  <span style={{ fontSize: 11, color: '#4b5563', padding: '0 8px', borderRight: '1px solid #1f2937', whiteSpace: 'nowrap' }}>/blog/</span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={e => update('slug', slugify(e.target.value))}
                    className="pe-field-input"
                    style={{ border: 'none', borderRadius: 0, background: 'transparent', paddingLeft: 8 }}
                    placeholder="post-slug"
                  />
                </div>
              </Field>
            </Panel>

            {/* Media */}
            <Panel title="Media" icon="fa-image" defaultOpen={false}>
              <Field label="Featured Image URL" hint="for blog listing">
                <input type="url" value={form.featured_image_url} onChange={e => update('featured_image_url', e.target.value)} className="pe-field-input" placeholder="https://…" />
                {form.featured_image_url && (
                  <img src={form.featured_image_url} alt="Featured preview" style={{ width: '100%', borderRadius: 8, marginTop: 8, objectFit: 'cover', height: 100 }} onError={e => e.target.style.display = 'none'} />
                )}
              </Field>
              <Field label="OG / Social Image URL" hint="1200×630 px recommended">
                <input type="url" value={form.og_image} onChange={e => update('og_image', e.target.value)} className="pe-field-input" placeholder="https://… (no localhost)" />
                {form.og_image && !form.og_image.includes('localhost') && (
                  <img src={form.og_image} alt="OG preview" style={{ width: '100%', borderRadius: 8, marginTop: 8, objectFit: 'cover', height: 80 }} onError={e => e.target.style.display = 'none'} />
                )}
              </Field>
            </Panel>

            {/* SEO Metadata */}
            <Panel title="SEO & Metadata" icon="fa-magnifying-glass" defaultOpen={false}>
              <Field label="Meta Title" hint="leave blank to inherit">
                <input type="text" value={form.meta_title} onChange={e => update('meta_title', e.target.value)} className="pe-field-input" placeholder="Overrides post title in search" />
              </Field>
              <Field label="Meta Description">
                <textarea
                  value={form.meta_description}
                  onChange={e => update('meta_description', e.target.value)}
                  className="pe-field-textarea"
                  placeholder="150–160 char description for Google…"
                  rows={3}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontSize: 10, color: metaLen >= 150 && metaLen <= 160 ? '#22c55e' : metaLen > 0 ? '#f59e0b' : '#4b5563', fontWeight: 600 }}>
                    {metaLen} / 160
                  </span>
                  <span style={{ fontSize: 10, color: '#4b5563' }}>aim: 150–160</span>
                </div>
                <div className="pe-char-bar">
                  <div className="pe-char-fill" style={{
                    width: `${Math.min(100, (metaLen / 160) * 100)}%`,
                    background: metaLen >= 150 && metaLen <= 160 ? '#22c55e' : metaLen > 160 ? '#ef4444' : '#f59e0b',
                  }} />
                </div>
              </Field>
            </Panel>

            {/* Google Preview */}
            <Panel title="Google Preview" icon="fa-google" defaultOpen={false}>
              <div className="pe-google-preview">
                <div className="pe-gp-url">snbdhost.com › blog › {form.slug || 'post-slug'}</div>
                <div className="pe-gp-title">{form.meta_title || form.title || 'Post Title'}</div>
                <div className="pe-gp-desc">
                  {form.meta_description || form.excerpt || 'Meta description will appear here in Google search results.'}
                </div>
              </div>
              <p style={{ fontSize: 10, color: '#4b5563', marginTop: 6, lineHeight: 1.5 }}>
                Preview is approximate. Actual appearance may vary.
              </p>
            </Panel>

            {/* Markdown Cheatsheet */}
            <Panel title="Markdown Reference" icon="fa-book-open" defaultOpen={false}>
              {[
                ['# Title',       'H1 Heading'],
                ['## Subtitle',   'H2 Heading'],
                ['**bold**',      'Bold text'],
                ['*italic*',      'Italic text'],
                ['`code`',        'Inline code'],
                ['[Link](url)',   'Hyperlink'],
                ['![Alt](url)',   'Image'],
                ['> quote',       'Blockquote'],
                ['---',           'Horizontal rule'],
                ['- item',        'Bullet list'],
                ['1. item',       'Numbered list'],
              ].map(([md, desc]) => (
                <div key={md} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #0f172a', fontSize: 11 }}>
                  <code style={{ color: '#a5f3fc', fontFamily: 'monospace' }}>{md}</code>
                  <span style={{ color: '#6b7280' }}>{desc}</span>
                </div>
              ))}
            </Panel>

          </aside>
        </div>
      </div>
    </>
  );
}
