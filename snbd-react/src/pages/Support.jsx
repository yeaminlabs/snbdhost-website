import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import JsonLd from '../components/JsonLd';
import { pageMeta } from '../seo/pageMeta';

// Icons dictionary mapping category names to FontAwesome icons
const CATEGORY_ICONS = {
  'hosting': 'fa-server text-blue-500',
  'shared hosting': 'fa-server text-blue-500',
  'reseller hosting': 'fa-users text-teal-500',
  'vps server': 'fa-microchip text-indigo-500',
  'vps': 'fa-microchip text-indigo-500',
  'domain': 'fa-globe text-emerald-500',
  'billing': 'fa-wallet text-amber-500',
  'support': 'fa-circle-question text-purple-500',
  'general': 'fa-circle-question text-purple-500',
  'n8n automation': 'fa-robot text-orange-500',
  'automation': 'fa-robot text-orange-500',
};

const CATEGORY_DESCS = {
  'hosting': 'cPanel hosting, LiteSpeed, backups, and SSL guides.',
  'shared hosting': 'cPanel hosting, LiteSpeed, backups, and SSL guides.',
  'reseller hosting': 'Manage WHM accounts, client limits, and private nameservers.',
  'vps server': 'Root access configuration, OS installation, and SSH keys.',
  'vps': 'Root access configuration, OS installation, and SSH keys.',
  'domain': 'Register, transfer, point DNS, and configure nameservers.',
  'billing': 'Invoices, local payments (bKash/Nagad), and subscriptions.',
  'n8n automation': 'Set up workflows, schedule tasks, and connect external APIs.',
  'automation': 'Set up workflows, schedule tasks, and connect external APIs.',
  'general': 'General account information and policies.'
};

export default function Support() {
  const [searchVal, setSearchVal] = useState('');
  const [categories, setCategories] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);
  const [pluginActive, setPluginActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/support/kb?search=${encodeURIComponent(searchVal.trim())}`);
    } else {
      navigate('/support/kb');
    }
  };

  useEffect(() => {
    async function loadKbData() {
      try {
        // 1. Check if KB plugin is active
        const statusRes = await fetch('/api/plugins/snbd-knowledge-base/status');
        const statusData = await statusRes.json();
        
        if (statusData.active) {
          setPluginActive(true);
          
          // 2. Fetch categories
          const catRes = await fetch('/api/plugins/snbd-knowledge-base/categories');
          const catData = await catRes.json();
          setCategories(catData.categories || []);

          // 3. Fetch popular articles (gets top 5 articles)
          const artRes = await fetch('/api/plugins/snbd-knowledge-base/articles?limit=5');
          const artData = await artRes.json();
          setPopularArticles((artData.articles || []).slice(0, 5));
        }
      } catch (err) {
        console.error('KB Plugin offline, using fallback FAQs.');
        setPluginActive(false);
      } finally {
        setLoading(false);
      }
    }
    
    loadKbData();
  }, []);

  // Static Fallbacks if plugin is offline
  const fallbackCategories = [
    { name: 'Getting Started', key: 'general', desc: 'New to SNBD Host? Set up your account and get running.' },
    { name: 'Shared Hosting', key: 'hosting', desc: 'cPanel, LiteSpeed cache, free SSL, and emails guides.' },
    { name: 'VPS Server', key: 'vps', desc: 'Manage your KVM virtual servers, root access, and backups.' },
    { name: 'Billing & Payments', key: 'billing', desc: 'Local payments (bKash/Nagad/Rocket) and invoice settings.' },
    { name: 'Domain Registration', key: 'domain', desc: 'Register domain extensions (.com, .bd, .xyz) and point DNS.' },
    { name: 'n8n Automation', key: 'automation', desc: 'Automate business workflows and connect third-party APIs.' }
  ];

  const fallbackArticles = [
    { title: "I Can't Connect to My Server/My Server is Unreachable, What Do I Do?", slug: "server-unreachable", category: "VPS Server" },
    { title: "How Can I Check The Status of My Order?", slug: "check-order-status", category: "Billing" },
    { title: "How Do I Connect to My Server for the First Time?", slug: "first-ssh-connection", category: "VPS Server" },
    { title: "I Have Forgotten My Server's Password, How Do I Reset It?", slug: "reset-root-password", category: "VPS Server" },
    { title: "Can I Get a Refund?", slug: "refund-policy", category: "Billing" }
  ];

  const getIcon = (catName) => {
    const key = catName.toLowerCase();
    return CATEGORY_ICONS[key] || 'fa-circle-question text-red-500';
  };

  const getDesc = (catName) => {
    const key = catName.toLowerCase();
    return CATEGORY_DESCS[key] || 'Search tutorials, features, and troubleshooting guides.';
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (pluginActive ? popularArticles : fallbackArticles).map(f => ({
      '@type': 'Question',
      name: f.title || f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.summary || "Browse our detailed article in the help center for step-by-step instructions." },
    })),
  };

  return (
    <div className="bg-[#f8f9fc] min-h-screen">
      <SEOHead {...pageMeta.support} />
      <JsonLd data={faqSchema} />
      
      {/* ===== HERO SECTION ===== */}
      <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-black pt-36 pb-20 px-4 text-center border-b border-gray-800 shadow-inner">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 tracking-tight">
            How can we help?
          </h1>
          
          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto mb-6 shadow-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="fa-solid fa-magnifying-glass text-gray-400 text-lg"></i>
            </div>
            <input 
              type="text" 
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full bg-white text-gray-900 border-none rounded-xl pl-12 pr-6 py-4.5 text-base focus:outline-none focus:ring-3 focus:ring-red-500/40 transition-all font-medium placeholder-gray-400 shadow-inner" 
              placeholder="Search the Knowledge Base..."
            />
          </form>
          
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-gray-400 font-medium">Popular searches:</span>
            <Link to="/support/kb?search=reset%20password" className="text-gray-300 hover:text-white underline decoration-gray-600 hover:decoration-red-500 transition-colors">Reset Password</Link>
            <span className="text-gray-600">|</span>
            <Link to="/support/kb?search=ssh" className="text-gray-300 hover:text-white underline decoration-gray-600 hover:decoration-red-500 transition-colors">SSH Connection</Link>
            <span className="text-gray-600">|</span>
            <Link to="/support/kb?search=bkash" className="text-gray-300 hover:text-white underline decoration-gray-600 hover:decoration-red-500 transition-colors">bKash Payment</Link>
          </div>
        </div>
      </section>

      {/* ===== TWO-COLUMN CONTENT ===== */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: HELP TOPICS (Col 8) */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-3 flex items-center gap-2">
                <i className="fa-solid fa-folder-open text-[#CC0000]"></i> Help Topics
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {pluginActive ? (
                  categories.map(cat => (
                    <Link
                      key={cat}
                      to={`/support/kb?category=${encodeURIComponent(cat)}`}
                      className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-red-200 hover:-translate-y-0.5 transition-all flex items-start gap-4 group"
                    >
                      <div className="w-11 h-11 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-red-50 transition-colors">
                        <i className={`fa-solid ${getIcon(cat)} text-lg`}></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm mb-1.5 group-hover:text-[#CC0000] transition-colors">{cat}</h3>
                        <p className="text-gray-500 text-xs leading-relaxed">{getDesc(cat)}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  fallbackCategories.map(cat => {
                    const kbCategory = cat.name === 'Getting Started' ? 'General' : 
                                       cat.name === 'Billing & Payments' ? 'Billing' : cat.name;
                    return (
                      <Link
                        key={cat.name}
                        to={`/support/kb?category=${encodeURIComponent(kbCategory)}`}
                        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-red-200 hover:-translate-y-0.5 transition-all flex items-start gap-4 group"
                      >
                        <div className="w-11 h-11 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-red-50 transition-colors">
                          <i className={`fa-solid ${getIcon(cat.key)} text-lg`}></i>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm mb-1.5 group-hover:text-[#CC0000] transition-colors">{cat.name}</h3>
                          <p className="text-gray-500 text-xs leading-relaxed">{cat.desc}</p>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: POPULAR ARTICLES & CONTACT (Col 4) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Popular Articles Box */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-3 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                  <i className="fa-solid fa-fire text-amber-500"></i> Popular Articles
                </h3>
                
                <ul className="space-y-3.5">
                  {pluginActive && popularArticles.length > 0 ? (
                    popularArticles.map(art => (
                      <li key={art.id}>
                        <Link 
                          to={`/support/kb/${art.slug}`}
                          className="text-xs text-gray-600 hover:text-[#CC0000] hover:underline font-medium leading-relaxed block"
                        >
                          {art.title}
                        </Link>
                      </li>
                    ))
                  ) : (
                    fallbackArticles.map((art, idx) => (
                      <li key={idx}>
                        <Link 
                          to="/support/kb"
                          className="text-xs text-gray-600 hover:text-[#CC0000] hover:underline font-medium leading-relaxed block"
                        >
                          {art.title}
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              {/* Need Support Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
                <div className="w-12 h-12 bg-red-50 text-[#CC0000] border border-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-regular fa-comments text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">Need Support?</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-5">
                  Can't find the answer you're looking for? Don't worry, our team is online 24/7/365 to help!
                </p>
                <div className="flex flex-col gap-2">
                  <a 
                    href="https://portal.snbdhost.com/submitticket.php" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full bg-[#CC0000] hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md"
                  >
                    Open Support Ticket
                  </a>
                  <a 
                    href="https://wa.me/8801841528073" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ===== STATUS BANNER ===== */}
      <section className="bg-white border-t border-gray-200 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-gray-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>All global services operational.</span>
          </div>
          <div className="flex gap-4">
            <a href="https://status.snbdhost.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#CC0000] font-bold">Server Status Page</a>
            <span className="text-gray-300">|</span>
            <Link to="/support/kb" className="text-gray-500 hover:text-[#CC0000] font-bold">Search Help Desk</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
