import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';

// ─── Tool definitions ─────────────────────────────────────────────────────────

const TOOLS = [
  {
    key: 'gtm',
    name: 'Google Tag Manager',
    badge: 'RECOMMENDED',
    badgeColor: 'bg-green-900/40 text-green-400',
    icon: '🏷️',
    color: 'blue',
    desc: 'The best way to manage all your marketing tags from one place. Enable GTM and add GA4, Ads, Facebook Pixel etc. through the GTM dashboard instead of enabling them individually here.',
    idLabel: 'Container ID',
    idPlaceholder: 'GTM-XXXXXXX',
    idPattern: /^GTM-[A-Z0-9]{4,8}$/,
    idHint: 'Format: GTM-XXXXXXX  (find in GTM dashboard → Admin → Container Settings)',
    detectFn: () => !!(window.google_tag_manager),
    detectLabel: 'window.google_tag_manager',
    setupUrl: 'https://tagmanager.google.com/',
    docsUrl: 'https://support.google.com/tagmanager/answer/6103696',
    warning: null,
  },
  {
    key: 'ga4',
    name: 'Google Analytics 4',
    badge: 'FREE',
    badgeColor: 'bg-blue-900/40 text-blue-400',
    icon: '📊',
    color: 'blue',
    desc: 'Track website traffic, user behaviour, goal conversions, and audience demographics. Required for understanding what pages perform best.',
    idLabel: 'Measurement ID',
    idPlaceholder: 'G-XXXXXXXXXX',
    idPattern: /^G-[A-Z0-9]+$/,
    idHint: 'Format: G-XXXXXXXXXX  (GA4 → Admin → Data Streams → your stream → Measurement ID)',
    detectFn: () => !!(window.gtag) || (Array.isArray(window.dataLayer) && window.dataLayer.length > 0),
    detectLabel: 'window.gtag / window.dataLayer',
    setupUrl: 'https://analytics.google.com/',
    docsUrl: 'https://support.google.com/analytics/answer/9304153',
    warning: 'If GTM is enabled, add GA4 through GTM instead.',
  },
  {
    key: 'gads',
    name: 'Google Ads Conversion Tracking',
    badge: 'PAID ADS',
    badgeColor: 'bg-amber-900/40 text-amber-400',
    icon: '🎯',
    color: 'amber',
    desc: 'Track which ad clicks lead to sign-ups or purchases. Essential if you run Google Search or Display campaigns. Without this, you cannot optimise your ad spend.',
    idLabel: 'Conversion ID',
    idPlaceholder: 'AW-XXXXXXXXXX',
    idPattern: /^AW-[0-9]+$/,
    idHint: 'Format: AW-XXXXXXXXXX  (Google Ads → Tools → Conversions → tag setup)',
    detectFn: () => !!(window.gtag),
    detectLabel: 'window.gtag',
    setupUrl: 'https://ads.google.com/',
    docsUrl: 'https://support.google.com/google-ads/answer/1722054',
    warning: 'If GTM is enabled, add Google Ads through GTM instead.',
  },
  {
    key: 'fbpixel',
    name: 'Facebook / Meta Pixel',
    badge: 'PAID ADS',
    badgeColor: 'bg-amber-900/40 text-amber-400',
    icon: '👍',
    color: 'indigo',
    desc: 'Track visitors who came from Facebook or Instagram ads. Powers retargeting — showing ads to people who visited your site. Also enables Lookalike Audiences.',
    idLabel: 'Pixel ID',
    idPlaceholder: '1234567890123456',
    idPattern: /^[0-9]{10,20}$/,
    idHint: 'Numeric only, 15–16 digits  (Meta Business Suite → Events Manager → your Pixel → Settings)',
    detectFn: () => !!(window.fbq),
    detectLabel: 'window.fbq',
    setupUrl: 'https://business.facebook.com/events_manager',
    docsUrl: 'https://www.facebook.com/business/help/952192354843755',
    warning: null,
  },
  {
    key: 'clarity',
    name: 'Microsoft Clarity',
    badge: 'FREE',
    badgeColor: 'bg-blue-900/40 text-blue-400',
    icon: '🔥',
    color: 'purple',
    desc: 'Free heatmaps, session recordings, and click maps. See exactly where users click, scroll, and drop off. No data limit, completely free. Pairs well with GA4.',
    idLabel: 'Project ID',
    idPlaceholder: 'abcdef1234',
    idPattern: /^[a-z0-9]{8,14}$/,
    idHint: 'Lowercase alphanumeric, ~10 chars  (clarity.microsoft.com → your project → Settings → Installation)',
    detectFn: () => !!(window.clarity),
    detectLabel: 'window.clarity',
    setupUrl: 'https://clarity.microsoft.com/',
    docsUrl: 'https://docs.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup',
    warning: null,
  },
  {
    key: 'hotjar',
    name: 'Hotjar',
    badge: 'FREEMIUM',
    badgeColor: 'bg-orange-900/40 text-orange-400',
    icon: '🧭',
    color: 'orange',
    desc: 'Heatmaps, session recordings, and on-site surveys. Free plan covers 35 sessions/day. Good alternative to Clarity if you want surveys and feedback polls.',
    idLabel: 'Site ID',
    idPlaceholder: '1234567',
    idPattern: /^[0-9]{5,10}$/,
    idHint: 'Numeric only  (Hotjar → Settings → Tracking Code → find hjid=XXXXXXX)',
    detectFn: () => !!(window.hj) || !!(window._hjSettings),
    detectLabel: 'window.hj / window._hjSettings',
    setupUrl: 'https://www.hotjar.com/',
    docsUrl: 'https://help.hotjar.com/hc/en-us/articles/115009336727',
    warning: 'Using both Hotjar and Clarity is redundant — pick one.',
  },
  {
    key: 'linkedin',
    name: 'LinkedIn Insight Tag',
    badge: 'PAID ADS',
    badgeColor: 'bg-amber-900/40 text-amber-400',
    icon: '💼',
    color: 'cyan',
    desc: 'Track LinkedIn ad conversions and retarget visitors on LinkedIn. Only useful if you run LinkedIn ad campaigns targeting B2B customers.',
    idLabel: 'Partner ID',
    idPlaceholder: '1234567',
    idPattern: /^[0-9]{5,10}$/,
    idHint: 'Numeric only  (LinkedIn Campaign Manager → Account Assets → Insight Tag → See tag)',
    detectFn: () => !!(window.lintrk),
    detectLabel: 'window.lintrk',
    setupUrl: 'https://www.linkedin.com/campaignmanager/',
    docsUrl: 'https://www.linkedin.com/help/lms/answer/a415218',
    warning: null,
  },
  {
    key: 'tiktok',
    name: 'TikTok Pixel',
    badge: 'PAID ADS',
    badgeColor: 'bg-amber-900/40 text-amber-400',
    icon: '🎵',
    color: 'pink',
    desc: 'Track TikTok ad conversions and build retargeting audiences. Only necessary if you run TikTok for Business ad campaigns.',
    idLabel: 'Pixel ID',
    idPlaceholder: 'ABCDEFG1234567890',
    idPattern: /^[A-Z0-9]{10,25}$/,
    idHint: 'Uppercase alphanumeric  (TikTok Ads Manager → Assets → Events → Web Events → your pixel)',
    detectFn: () => !!(window.ttq),
    detectLabel: 'window.ttq',
    setupUrl: 'https://ads.tiktok.com/',
    docsUrl: 'https://ads.tiktok.com/help/article?aid=10021',
    warning: null,
  },
];

const COLOR_MAP = {
  blue:   { ring: 'ring-blue-800',   icon: 'text-blue-400'   },
  amber:  { ring: 'ring-amber-800',  icon: 'text-amber-400'  },
  indigo: { ring: 'ring-indigo-800', icon: 'text-indigo-400' },
  purple: { ring: 'ring-purple-800', icon: 'text-purple-400' },
  orange: { ring: 'ring-orange-800', icon: 'text-orange-400' },
  cyan:   { ring: 'ring-cyan-800',   icon: 'text-cyan-400'   },
  pink:   { ring: 'ring-pink-800',   icon: 'text-pink-400'   },
};

const DEFAULT_CONFIG = {
  gtm:        { enabled: false, id: '' },
  ga4:        { enabled: false, id: '' },
  gads:       { enabled: false, id: '' },
  fbpixel:    { enabled: false, id: '' },
  clarity:    { enabled: false, id: '' },
  hotjar:     { enabled: false, id: '' },
  linkedin:   { enabled: false, id: '' },
  tiktok:     { enabled: false, id: '' },
  customHead: { enabled: false, code: '' },
};

// ─── Live checker ─────────────────────────────────────────────────────────────

const CHECKER_ITEMS = [
  {
    id: 'api-reachable',
    label: 'Marketing config API reachable',
    run: async () => {
      try {
        const r = await fetch('/api/marketing-config', { cache: 'no-store' });
        return r.ok ? { pass: true, note: 'API responded OK ✓' } : { pass: false, note: `HTTP ${r.status} — is the server running?` };
      } catch { return { pass: false, note: 'Cannot reach /api/marketing-config — run: npm run server' }; }
    },
  },
  {
    id: 'at-least-one-tool',
    label: 'At least one tracking tool enabled',
    run: async () => {
      try {
        const r    = await fetch('/api/marketing-config', { cache: 'no-store' });
        const cfg  = await r.json();
        const keys = ['gtm','ga4','gads','fbpixel','clarity','hotjar','linkedin','tiktok','customHead'];
        const on   = keys.filter(k => cfg[k]?.enabled && (cfg[k].id || cfg[k].code));
        return on.length > 0
          ? { pass: true,  note: `${on.length} tool(s) enabled: ${on.join(', ')} ✓` }
          : { pass: false, note: 'No tracking tools configured — add at least GA4 or GTM' };
      } catch { return { pass: false, note: 'Could not read config' }; }
    },
  },
  {
    id: 'gtm-loaded',
    label: 'Google Tag Manager detected on page',
    run: async () => {
      const ok = !!(window.google_tag_manager);
      return ok
        ? { pass: true,  note: 'GTM container found in window ✓' }
        : { pass: false, note: 'GTM not detected — either not enabled, or reload the page after saving' };
    },
  },
  {
    id: 'ga4-loaded',
    label: 'Google Analytics 4 detected on page',
    run: async () => {
      const ok = !!(window.gtag) || (Array.isArray(window.dataLayer) && window.dataLayer.length > 0);
      return ok
        ? { pass: true,  note: 'gtag / dataLayer found ✓' }
        : { pass: false, note: 'GA4 not detected — enable it and save, then reload this page' };
    },
  },
  {
    id: 'fbpixel-loaded',
    label: 'Facebook Pixel detected on page',
    run: async () => {
      const ok = !!(window.fbq);
      return ok
        ? { pass: true,  note: 'window.fbq found ✓' }
        : { pass: false, note: 'Pixel not detected — enable it and save, then reload this page' };
    },
  },
  {
    id: 'clarity-loaded',
    label: 'Microsoft Clarity detected on page',
    run: async () => {
      const ok = !!(window.clarity);
      return ok
        ? { pass: true,  note: 'window.clarity found ✓' }
        : { pass: false, note: 'Clarity not detected — enable it and save, then reload this page' };
    },
  },
  {
    id: 'gtm-warning',
    label: 'No duplicate tags (GTM + direct tags)',
    run: async () => {
      try {
        const r   = await fetch('/api/marketing-config', { cache: 'no-store' });
        const cfg = await r.json();
        if (!cfg.gtm?.enabled) return { pass: true, note: 'GTM not enabled — no conflict possible' };
        const directEnabled = ['ga4','gads'].filter(k => cfg[k]?.enabled && cfg[k].id);
        return directEnabled.length > 0
          ? { pass: false, note: `GTM is on AND ${directEnabled.join(', ')} are also directly enabled — this causes double-counting. Disable direct tags and add them through GTM.` }
          : { pass: true,  note: 'GTM is on, no conflicting direct tags ✓' };
      } catch { return { pass: false, note: 'Could not read config' }; }
    },
  },
  {
    id: 'fb-test-mode',
    label: 'Facebook Pixel Events Manager test',
    run: async () => {
      const ok = !!(window.fbq);
      return {
        pass: ok,
        note: ok
          ? 'Pixel loaded — go to Meta Events Manager → Test Events to verify PageView fires ✓'
          : 'Pixel not loaded — enable Facebook Pixel and save first',
      };
    },
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function MarketingTools() {
  const token   = localStorage.getItem('snbd_admin_token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const [config,   setConfig]   = useState(DEFAULT_CONFIG);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [saved,    setSaved]    = useState(false);
  const [error,    setError]    = useState('');

  // Checker state
  const [checking,     setChecking]     = useState(false);
  const [checkResults, setCheckResults] = useState(null);
  const [checkProg,    setCheckProg]    = useState(0);
  const [checkLabel,   setCheckLabel]   = useState('');

  // Fetch current config
  useEffect(() => {
    fetch('/api/marketing-config', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => { setConfig(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function setField(key, field, value) {
    setConfig(prev => {
      const base = prev || DEFAULT_CONFIG;
      return { ...base, [key]: { ...(base[key] || {}), [field]: value } };
    });
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/marketing-config', { method: 'PUT', headers, body: JSON.stringify(config) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setError(`Save failed: ${e.message}`);
    } finally {
      setSaving(false);
    }
  }

  const runChecker = useCallback(async () => {
    if (checking) return;
    setChecking(true);
    setCheckResults(null);
    setCheckProg(0);

    const results = {};
    for (let i = 0; i < CHECKER_ITEMS.length; i++) {
      const item = CHECKER_ITEMS[i];
      setCheckLabel(item.label);
      setCheckProg(Math.round((i / CHECKER_ITEMS.length) * 100));
      try {
        results[item.id] = { ...(await item.run()), label: item.label };
      } catch {
        results[item.id] = { pass: false, note: 'Unexpected error', label: item.label };
      }
      await new Promise(r => setTimeout(r, 250));
    }

    setCheckProg(100);
    setCheckLabel('');
    setCheckResults(results);
    setChecking(false);
  }, [checking]);

  // ── GTM conflict warning ───────────────────────────────────────────────────
  const gtmOn = config?.gtm?.enabled;
  const conflictingDirect = gtmOn ? ['ga4', 'gads'].filter(k => config?.[k]?.enabled && config?.[k]?.id) : [];

  // ── Stats ─────────────────────────────────────────────────────────────────
  const enabledCount  = config ? TOOLS.filter(t => config[t.key]?.enabled && (config[t.key]?.id || config[t.key]?.code)).length : 0;
  const checkPassCount = checkResults ? Object.values(checkResults).filter(r => r.pass).length  : 0;
  const checkFailCount = checkResults ? Object.values(checkResults).filter(r => !r.pass).length : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#CC0000] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <SEOHead title="Marketing Tools" noIndex />
      <div className="min-h-screen bg-gray-950 text-gray-200">

        {/* Top bar */}
        <header className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="text-gray-400 hover:text-white transition-colors">
              <i className="fa-solid fa-arrow-left text-sm"></i>
            </Link>
            <span className="text-sm font-bold text-gray-300">Marketing Tools</span>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-xs text-green-400 flex items-center gap-1">
                <i className="fa-solid fa-circle-check"></i> Saved
              </span>
            )}
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 bg-[#CC0000] hover:bg-red-700 disabled:opacity-60 text-white text-sm font-bold px-4 py-1.5 rounded-lg transition-colors"
            >
              {saving ? (
                <><span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin"></span> Saving…</>
              ) : (
                <><i className="fa-solid fa-floppy-disk"></i> Save All</>
              )}
            </button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">

          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-lg mb-6">
              <i className="fa-solid fa-triangle-exclamation mr-2"></i>{error}
            </div>
          )}

          {/* Hero */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-xl font-bold text-white mb-1">Marketing & Analytics Tools</h1>
                <p className="text-sm text-gray-400">Toggle each tool, enter your ID, and click Save All. Scripts are injected automatically into every page.</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-[#CC0000]">{enabledCount}</div>
                <div className="text-xs text-gray-500">tools active</div>
              </div>
            </div>

            {/* GTM recommendation banner */}
            <div className="mt-4 bg-blue-900/20 border border-blue-800/40 rounded-xl px-4 py-3 flex items-start gap-3">
              <i className="fa-solid fa-lightbulb text-blue-400 mt-0.5 flex-shrink-0"></i>
              <p className="text-xs text-blue-300 leading-relaxed">
                <strong>Recommended approach:</strong> Enable Google Tag Manager only. Then add GA4, Google Ads, Facebook Pixel etc. through the GTM dashboard. This way you never need to redeploy to add new tracking — manage everything from GTM's UI.
              </p>
            </div>

            {/* GTM conflict warning */}
            {conflictingDirect.length > 0 && (
              <div className="mt-3 bg-amber-900/20 border border-amber-800/40 rounded-xl px-4 py-3 flex items-start gap-3">
                <i className="fa-solid fa-triangle-exclamation text-amber-400 mt-0.5 flex-shrink-0"></i>
                <p className="text-xs text-amber-300 leading-relaxed">
                  <strong>Conflict detected:</strong> GTM is enabled and {conflictingDirect.join(', ').toUpperCase()} are also directly enabled. This will fire those scripts twice and cause double-counting in analytics. Disable {conflictingDirect.join(', ')} here and add them through GTM instead.
                </p>
              </div>
            )}

            {/* Live checker button */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={runChecker}
                disabled={checking}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  checking ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                }`}
              >
                {checking ? (
                  <><span className="w-3.5 h-3.5 border-2 border-gray-400 border-t-white rounded-full animate-spin"></span> Checking…</>
                ) : (
                  <><i className="fa-solid fa-bolt text-[#CC0000]"></i> Run Live Checker</>
                )}
              </button>
              <span className="text-xs text-gray-600">Detects which tools are actually firing on this page right now</span>
            </div>

            {checking && (
              <div className="mt-3 bg-gray-800 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-gray-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#CC0000] rounded-full animate-pulse"></span>
                    {checkLabel}
                  </span>
                  <span className="text-xs text-gray-600">{checkProg}%</span>
                </div>
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#CC0000] rounded-full transition-all duration-300" style={{ width: `${checkProg}%` }} />
                </div>
              </div>
            )}
          </div>

          {/* Checker results */}
          {checkResults && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden mb-6">
              <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-bolt text-[#CC0000]"></i>
                  <h2 className="text-sm font-bold text-white">Live Checker Results</h2>
                  <span className="text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded-full font-bold">{checkPassCount} pass</span>
                  {checkFailCount > 0 && <span className="text-xs bg-red-900/40 text-red-400 px-2 py-0.5 rounded-full font-bold">{checkFailCount} fail</span>}
                </div>
                <button onClick={() => setCheckResults(null)} className="text-gray-600 hover:text-gray-400">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="divide-y divide-gray-800/60">
                {Object.entries(checkResults).map(([id, r]) => (
                  <div key={id} className={`flex items-start gap-3 px-5 py-3 ${r.pass ? '' : 'bg-red-950/10'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${r.pass ? 'bg-green-600' : 'bg-red-700'}`}>
                      <i className={`fa-solid ${r.pass ? 'fa-check' : 'fa-xmark'} text-white`} style={{ fontSize: 9 }}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-300">{r.label}</p>
                      <p className={`text-xs mt-0.5 ${r.pass ? 'text-gray-500' : 'text-red-400'}`}>{r.note}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${r.pass ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}>
                      {r.pass ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tool cards */}
          <div className="space-y-4 mb-8">
            {TOOLS.map(tool => {
              const cfg      = config?.[tool.key] || { enabled: false, id: '' };
              const col = COLOR_MAP[tool.color] || COLOR_MAP.blue;
              const isValid  = cfg.id ? tool.idPattern.test(cfg.id.trim()) : false;
              const isLive   = cfg.enabled ? tool.detectFn() : null;

              return (
                <div
                  key={tool.key}
                  className={`bg-gray-900 border rounded-xl overflow-hidden transition-all ${
                    cfg.enabled ? 'border-gray-700' : 'border-gray-800 opacity-70'
                  }`}
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between px-5 py-4 gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-9 h-9 rounded-xl bg-gray-800 ring-1 ${col.ring} flex items-center justify-center flex-shrink-0 text-lg`}>
                        {tool.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-white">{tool.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tool.badgeColor}`}>{tool.badge}</span>
                          {cfg.enabled && (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                              isLive ? 'bg-green-900/40 text-green-400' : 'bg-gray-800 text-gray-500'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`}></span>
                              {isLive ? 'Live on page' : 'Saved — reload to detect'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{tool.desc.split('.')[0]}.</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setField(tool.key, 'enabled', !cfg.enabled)}
                      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${cfg.enabled ? 'bg-[#CC0000]' : 'bg-gray-700'}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${cfg.enabled ? 'left-[22px]' : 'left-0.5'}`}></span>
                    </button>
                  </div>

                  {/* Expanded content when enabled */}
                  {cfg.enabled && (
                    <div className="border-t border-gray-800 px-5 py-4 space-y-3">
                      <p className="text-xs text-gray-400 leading-relaxed">{tool.desc}</p>

                      {/* Warning */}
                      {tool.warning && (
                        <div className="bg-amber-900/20 border border-amber-800/30 rounded-lg px-3 py-2 flex items-start gap-2">
                          <i className="fa-solid fa-triangle-exclamation text-amber-400 text-xs mt-0.5 flex-shrink-0"></i>
                          <p className="text-xs text-amber-300">{tool.warning}</p>
                        </div>
                      )}

                      {/* ID input */}
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">{tool.idLabel}</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={cfg.id || ''}
                            onChange={e => setField(tool.key, 'id', e.target.value)}
                            placeholder={tool.idPlaceholder}
                            className={`flex-1 bg-gray-800 border rounded-lg px-3 py-2 text-sm font-mono text-gray-200 focus:outline-none transition-colors ${
                              cfg.id ? (isValid ? 'border-green-700 focus:border-green-600' : 'border-red-700 focus:border-red-600') : 'border-gray-700 focus:border-[#CC0000]'
                            }`}
                          />
                          {cfg.id && (
                            <div className={`flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0 ${isValid ? 'bg-green-900/40 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                              <i className={`fa-solid ${isValid ? 'fa-check' : 'fa-xmark'} text-sm`}></i>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1 font-mono">{tool.idHint}</p>
                      </div>

                      {/* Detect hint */}
                      <p className="text-xs text-gray-600">
                        Browser signal: <code className="font-mono text-gray-500">{tool.detectLabel}</code>
                      </p>

                      {/* Links */}
                      <div className="flex items-center gap-4 pt-1">
                        <a href={tool.setupUrl} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-[#CC0000] hover:underline flex items-center gap-1">
                          Open {tool.name.split(' ')[0]} dashboard
                          <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: 9 }}></i>
                        </a>
                        <a href={tool.docsUrl} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1">
                          Setup guide
                          <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: 9 }}></i>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Custom head code */}
            <div className={`bg-gray-900 border rounded-xl overflow-hidden ${config?.customHead?.enabled ? 'border-gray-700' : 'border-gray-800 opacity-70'}`}>
              <div className="flex items-center justify-between px-5 py-4 gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-9 h-9 rounded-xl bg-gray-800 ring-1 ring-gray-700 flex items-center justify-center text-lg flex-shrink-0">
                    {'</>'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">Custom &lt;head&gt; Code</span>
                      <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full font-bold">ADVANCED</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Paste any script or tag that goes in &lt;head&gt; — Intercom, Crisp, Drift, custom pixels, etc.</p>
                  </div>
                </div>
                <button
                  onClick={() => setField('customHead', 'enabled', !config?.customHead?.enabled)}
                  className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${config?.customHead?.enabled ? 'bg-[#CC0000]' : 'bg-gray-700'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${config?.customHead?.enabled ? 'left-[22px]' : 'left-0.5'}`}></span>
                </button>
              </div>
              {config?.customHead?.enabled && (
                <div className="border-t border-gray-800 px-5 py-4 space-y-3">
                  <div className="bg-amber-900/20 border border-amber-800/30 rounded-lg px-3 py-2 flex items-start gap-2">
                    <i className="fa-solid fa-shield-halved text-amber-400 text-xs mt-0.5 flex-shrink-0"></i>
                    <p className="text-xs text-amber-300">Paste only code from trusted sources. Custom code is injected directly into every page's &lt;head&gt; without sanitisation.</p>
                  </div>
                  <textarea
                    value={config?.customHead?.code || ''}
                    onChange={e => setField('customHead', 'code', e.target.value)}
                    rows={6}
                    placeholder={'<!-- Paste your <script> or <link> tag here -->\n<script>\n  // e.g. Intercom, Crisp, Drift, custom pixels\n</script>'}
                    className="w-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-mono rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#CC0000] transition-colors resize-none leading-relaxed"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Save button (bottom) */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white">Save & apply changes</p>
              <p className="text-xs text-gray-500 mt-0.5">Changes are injected into every page on next request — no rebuild needed.</p>
            </div>
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 bg-[#CC0000] hover:bg-red-700 disabled:opacity-60 text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors"
            >
              {saving ? 'Saving…' : <><i className="fa-solid fa-floppy-disk mr-1"></i> Save All</>}
            </button>
          </div>

          {/* Quick-reference ID guide */}
          <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800">
              <h2 className="text-sm font-bold text-white"><i className="fa-solid fa-circle-info text-[#CC0000] mr-2"></i>Where to find each ID</h2>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'GTM',         id: 'GTM-XXXXXXX',      where: 'GTM dashboard → Admin → Container Settings → Container ID' },
                { name: 'GA4',         id: 'G-XXXXXXXXXX',     where: 'GA4 → Admin → Data Streams → your stream → Measurement ID' },
                { name: 'Google Ads',  id: 'AW-XXXXXXXXXX',    where: 'Google Ads → Tools → Conversions → Tag setup → Global site tag' },
                { name: 'FB Pixel',    id: '1234567890123456',  where: 'Meta Business Suite → Events Manager → your Pixel → Settings → Pixel ID' },
                { name: 'Clarity',     id: 'abc123xyz',         where: 'clarity.microsoft.com → your project → Settings → Installation code' },
                { name: 'Hotjar',      id: '1234567',           where: 'Hotjar → Settings → Tracking Code → find hjid=XXXXXXX in snippet' },
                { name: 'LinkedIn',    id: '1234567',           where: 'LinkedIn Campaign Manager → Account Assets → Insight Tag → See tag' },
                { name: 'TikTok',      id: 'ABCDEF1234567890',  where: 'TikTok Ads Manager → Assets → Events → Web Events → your pixel' },
              ].map(r => (
                <div key={r.name} className="bg-gray-800 rounded-lg px-3 py-2.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-white">{r.name}</span>
                    <code className="text-xs font-mono text-[#CC0000] bg-gray-900 px-1.5 py-0.5 rounded">{r.id}</code>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{r.where}</p>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </>
  );
}
