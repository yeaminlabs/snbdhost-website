import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { pageMeta } from '../seo/pageMeta';
import { useCurrency } from '../context/CurrencyContext.jsx';
import { useState } from 'react';

export default function HomePage() {
  const { formatPrice } = useCurrency();
  return (
    <>
      <SEOHead {...pageMeta.home} />
      {/* ========== HERO SECTION ========== */}
      <section className="bg-white relative pt-16 pb-20 lg:pt-24 lg:pb-24 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-50/50 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            
            {/* HERO LEFT: Content */}
            <div className="w-full lg:w-[45%] text-left z-10 lg:pr-8">
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-100">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Proudly Hosted in Bangladesh
                </div>
                <div className="text-gray-300">|</div>
                <div className="inline-flex items-center gap-1.5 bg-red-50 text-primary text-xs font-bold px-3 py-1 rounded-full border border-red-100">
                  <i className="fa-solid fa-bolt"></i> BDIX Optimized Network
                </div>
              </div>

              <div className="text-primary font-bold text-sm tracking-wide uppercase mb-4 flex items-center gap-2">
                <i className="fa-solid fa-wand-magic-sparkles"></i> AI-Powered Hosting Platform
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-[64px] font-extrabold text-gray-900 leading-[1.05] mb-6 tracking-tight relative">
                Smart Hosting.<br />
                <span className="text-primary relative inline-block">
                  Powered by AI.
                  <i className="fa-solid fa-sparkles text-2xl absolute -top-2 -right-8 text-red-300 animate-pulse"></i>
                </span>
              </h1>

              <p className="text-lg text-gray-500 font-medium mb-10 leading-relaxed max-w-lg">
                Experience lightning-fast NVMe performance, AI automation with n8n, and enterprise-grade security. Deploy websites, apps, and workflows in seconds and scale without limits.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                <a href="#pricing" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white text-lg font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-red-200">
                  Start Hosting Now
                  <i className="fa-solid fa-arrow-right text-sm"></i>
                </a>
                <Link to="/offers" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 text-lg font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-sm">
                  Explore Products
                  <i className="fa-solid fa-arrow-right text-sm text-gray-400"></i>
                </Link>
              </div>

              {/* 2 Feature Badges */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <div className="flex items-center gap-3 bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-xl flex-1">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-700"><i className="fa-solid fa-shield-check"></i></div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">99.9% Uptime Guarantee</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-xl flex-1">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-700"><i className="fa-solid fa-rocket"></i></div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">BDIX Optimized Network</div>
                  </div>
                </div>
              </div>

              {/* Trust Section */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="text-sm font-bold text-gray-600 mb-2 sm:mb-0">Trusted by 10,000+ customers</div>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Customer" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                    <span className="text-gray-900 font-bold ml-1">4.8/5</span>
                  </div>
                </div>
              </div>

            </div>

            {/* HERO RIGHT: Complex CSS Dashboard Graphic */}
            <div className="w-full lg:w-[55%] relative h-[600px] hidden md:block mt-0 lg:-mt-10 lg:pl-8">
              {/* Connecting Lines (SVG behind elements) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ strokeDasharray: '4,4' }}>
                <path d="M 150 40 L 350 40 L 350 120" fill="none" stroke="#fca5a5" strokeWidth="2" className="animate-pulse" />
                <path d="M 500 60 L 500 120" fill="none" stroke="#fca5a5" strokeWidth="2" className="animate-pulse" />
                <path d="M 300 370 L 400 370 L 400 320" fill="none" stroke="#fca5a5" strokeWidth="2" className="animate-pulse" />
              </svg>

              {/* 1. Main Dashboard Window */}
              <div className="absolute top-[40px] left-[5%] right-[5%] h-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex overflow-hidden z-10">
                {/* Sidebar */}
                <div className="w-48 bg-[#111111] text-gray-400 flex flex-col p-4 text-xs font-medium">
                  <div className="font-bold text-white mb-6 text-sm flex items-center gap-2">
                    <div className="w-5 h-5 bg-primary rounded shadow-[0_0_10px_#D0021B] flex items-center justify-center"><i className="fa-solid fa-s text-[8px] text-white"></i></div>
                    SNBD HOST
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-white bg-gray-800 p-2 rounded-lg"><i className="fa-solid fa-house"></i> Overview</div>
                    <div className="flex items-center gap-2 p-2 hover:text-white"><i className="fa-solid fa-globe"></i> Websites</div>
                    <div className="flex items-center gap-2 p-2 hover:text-white"><i className="fa-solid fa-at"></i> Domains</div>
                    <div className="flex items-center gap-2 p-2 hover:text-white"><i className="fa-solid fa-server"></i> Hosting</div>
                    <div className="flex items-center gap-2 p-2 hover:text-white"><i className="fa-solid fa-database"></i> Databases</div>
                    <div className="flex items-center gap-2 p-2 text-white bg-gradient-to-r from-red-900/40 to-transparent border-l-2 border-primary"><i className="fa-solid fa-robot"></i> OpenClaw <span className="ml-auto bg-primary text-[8px] px-1.5 py-0.5 rounded text-white font-bold">NEW</span></div>
                  </div>
                </div>
                {/* Main Content Area */}
                <div className="flex-1 bg-[#F9FAFB] p-6 relative">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Welcome back, Yeamin 👋</h2>
                      <p className="text-xs text-gray-500">Here's what's happening with your hosting today.</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-white rounded-full border border-gray-200 flex items-center justify-center text-gray-500 shadow-sm"><i className="fa-solid fa-bell"></i></div>
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-200 shadow-sm"><img src="https://i.pravatar.cc/100?img=11" alt="User" /></div>
                    </div>
                  </div>
                  
                  {/* Top Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">Websites</div>
                      <div className="text-xl font-bold text-gray-900">12</div>
                      <div className="text-[10px] text-green-500 mt-1">Active</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">Disk Usage</div>
                      <div className="text-xl font-bold text-gray-900">32 GB <span className="text-xs text-gray-400">/ 100 GB</span></div>
                      <div className="text-[10px] text-blue-500 mt-1">32% Used</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">Bandwidth</div>
                      <div className="text-xl font-bold text-gray-900">512 GB <span className="text-xs text-gray-400">/ ∞</span></div>
                      <div className="text-[10px] text-green-500 mt-1">Unlimited</div>
                    </div>
                  </div>

                  {/* Chart Mockup */}
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm font-bold text-gray-900">Performance</div>
                      <div className="text-xs text-gray-500">Last 7 Days <i className="fa-solid fa-chevron-down ml-1"></i></div>
                    </div>
                    <div className="h-24 relative w-full flex items-end">
                      {/* CSS Line Chart Abstraction */}
                      <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#D0021B" stopOpacity="0.2"/>
                            <stop offset="100%" stopColor="#D0021B" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        <path d="M0,20 Q10,10 20,25 T40,15 T60,25 T80,5 T100,20 L100,30 L0,30 Z" fill="url(#chartGrad)"/>
                        <path d="M0,20 Q10,10 20,25 T40,15 T60,25 T80,5 T100,20" fill="none" stroke="#D0021B" strokeWidth="1.5"/>
                        <circle cx="20" cy="25" r="1.5" fill="#D0021B" />
                        <circle cx="40" cy="15" r="1.5" fill="#D0021B" />
                        <circle cx="60" cy="25" r="1.5" fill="#D0021B" />
                        <circle cx="80" cy="5" r="1.5" fill="#D0021B" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Floating AI Assistant Badge */}
              <div className="absolute top-[20px] left-[0%] bg-white border border-red-100 shadow-lg p-3 rounded-2xl flex items-center gap-3 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-8 h-8 bg-red-50 text-primary rounded-lg flex items-center justify-center text-sm"><i className="fa-solid fa-sparkles"></i></div>
                <div>
                  <div className="text-sm font-bold text-gray-900">AI Assistant</div>
                  <div className="text-xs text-gray-500">Your hosting, automated.</div>
                </div>
              </div>

              {/* 3. Floating AI Optimization */}
              <div className="absolute top-[0px] right-[10%] bg-gradient-to-r from-gray-900 to-black border border-gray-700 shadow-xl shadow-red-900/20 p-3 rounded-2xl flex items-center gap-3 z-20">
                <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm shadow-[0_0_15px_#D0021B]"><i className="fa-solid fa-chart-line"></i></div>
                <div>
                  <div className="text-sm font-bold text-white">AI Optimization</div>
                  <div className="text-xs text-gray-400">Performance Boosted</div>
                </div>
              </div>

              {/* 4. Floating Deploy with AI */}
              <div className="absolute bottom-[100px] right-[-5%] bg-white border border-gray-100 shadow-2xl p-5 rounded-3xl w-56 z-30">
                <div className="w-12 h-12 bg-red-50 text-primary rounded-2xl flex items-center justify-center text-xl mx-auto mb-3"><i className="fa-solid fa-robot"></i></div>
                <div className="text-center font-bold text-gray-900 mb-1">Deploy with AI</div>
                <div className="text-center text-[10px] text-gray-500 mb-4">Describe your project and<br/>AI will handle the rest.</div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-[10px] text-gray-400 mb-3">e.g. Portfolio website...</div>
                <button className="w-full bg-primary text-white text-xs font-bold py-2.5 rounded-lg mb-4 shadow-md shadow-red-200"><i className="fa-solid fa-wand-magic-sparkles mr-1"></i> Deploy Now</button>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[9px] text-gray-500"><i className="fa-solid fa-check text-green-500"></i> Setup Environment</div>
                  <div className="flex items-center gap-2 text-[9px] text-gray-500"><i className="fa-solid fa-check text-green-500"></i> Install Dependencies</div>
                  <div className="flex items-center gap-2 text-[9px] text-gray-500"><i className="fa-solid fa-check text-green-500"></i> Configure Settings</div>
                </div>
              </div>

              {/* 5. Floating AI Terminal */}
              <div className="absolute bottom-[50px] left-[-2%] bg-[#111] border border-gray-800 shadow-2xl p-4 rounded-2xl w-64 z-30 font-mono text-[10px]">
                <div className="flex gap-1.5 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  <div className="ml-2 text-gray-500">AI Terminal</div>
                </div>
                <div className="text-green-400 space-y-1">
                  <div><span className="text-gray-500">$</span> Analyzing your requirements...</div>
                  <div><span className="text-gray-500">$</span> Selecting optimal resources...</div>
                  <div><span className="text-gray-500">$</span> Configuring server...</div>
                  <div className="animate-pulse"><span className="text-gray-500">$</span> Deploying your application...</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========== EVERYTHING YOU NEED GRID ========== */}
      <section className="py-16 bg-[#F9FAFB] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 flex items-center justify-center gap-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Everything You Need. All in One Place.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/hosting" className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-4 hover:border-primary hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-red-50 text-primary rounded-xl flex items-center justify-center text-xl shrink-0"><i className="fa-solid fa-server"></i></div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Web Hosting</h3>
                <p className="text-xs text-gray-500 mb-3">Blazing fast NVMe hosting for any website.</p>
                <span className="text-sm font-bold text-primary group-hover:text-primary-dark">View Plans <i className="fa-solid fa-arrow-right text-xs"></i></span>
              </div>
            </Link>

            <Link to="/n8n-automation" className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-4 hover:border-primary hover:shadow-lg transition-all group relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-red-100 text-primary text-[10px] font-bold px-2 py-0.5 rounded">NEW</div>
              <div className="w-12 h-12 bg-red-50 text-primary rounded-xl flex items-center justify-center text-xl shrink-0"><i className="fa-solid fa-diagram-project"></i></div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">N8N Automation</h3>
                <p className="text-xs text-gray-500 mb-3">Automate workflows with n8n, easily.</p>
                <span className="text-sm font-bold text-primary group-hover:text-primary-dark">Explore <i className="fa-solid fa-arrow-right text-xs"></i></span>
              </div>
            </Link>

            <Link to="/openclaw" className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-4 hover:border-primary hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-[#6b21a8] text-white rounded-xl flex items-center justify-center text-xl shrink-0 shadow-[0_0_15px_rgba(107,33,168,0.4)]"><i className="fa-solid fa-robot"></i></div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">OpenClaw</h3>
                <p className="text-xs text-gray-500 mb-3">Advanced open-source security & AI solution.</p>
                <span className="text-sm font-bold text-[#6b21a8]">Learn More <i className="fa-solid fa-arrow-right text-xs"></i></span>
              </div>
            </Link>

            <Link to="/vps-server" className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-4 hover:border-blue-500 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl shrink-0"><i className="fa-solid fa-database"></i></div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">VPS & Servers</h3>
                <p className="text-xs text-gray-500 mb-3">Powerful VPS and dedicated servers for any scale.</p>
                <span className="text-sm font-bold text-blue-600">View Plans <i className="fa-solid fa-arrow-right text-xs"></i></span>
              </div>
            </Link>

            <Link to="/domain" className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-4 hover:border-green-500 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl shrink-0"><i className="fa-solid fa-globe"></i></div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Domains</h3>
                <p className="text-xs text-gray-500 mb-3">Find the perfect domain for your brand.</p>
                <span className="text-sm font-bold text-green-600">Search Now <i className="fa-solid fa-arrow-right text-xs"></i></span>
              </div>
            </Link>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex gap-4 opacity-70">
              <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center text-xl shrink-0"><i className="fa-solid fa-microchip"></i></div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">AI Tools</h3>
                <p className="text-xs text-gray-500 mb-3">AI tools to optimize, secure and grow your site.</p>
                <span className="text-sm font-bold text-orange-500">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== DIFFERENTIATOR BLOCKS (HOSTINGER STYLE) ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Block 1: LiteSpeed Web Hosting */}
            <div className="bg-gradient-to-br from-red-600 to-primary rounded-3xl p-10 md:p-14 text-white relative overflow-hidden shadow-2xl shadow-red-900/20 group">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl mb-8">
                  <i className="fa-brands fa-wordpress"></i>
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold mb-4">WordPress hosting,<br/>made blazingly fast.</h3>
                <p className="text-red-100 text-lg mb-10 max-w-md">Experience up to 10x faster load times with LiteSpeed Web Server, advanced caching, and NVMe SSDs tailored for WordPress.</p>
                <div className="mt-auto">
                  <Link to="/hosting" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                    See WordPress Plans <i className="fa-solid fa-arrow-right text-sm"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Block 2: OpenClaw Security */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-10 md:p-14 text-white relative overflow-hidden shadow-2xl shadow-black/20 group">
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary opacity-20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl mb-8 text-[#a855f7]">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold mb-4">Unbreakable Security<br/>with OpenClaw AI.</h3>
                <p className="text-gray-400 text-lg mb-10 max-w-md">Protect your infrastructure with our proprietary AI-driven security engine. Block attacks before they happen.</p>
                <div className="mt-auto">
                  <Link to="/openclaw" className="inline-flex items-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white font-bold px-6 py-3 rounded-xl transition-colors">
                    Discover OpenClaw <i className="fa-solid fa-arrow-right text-sm"></i>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========== PRICING SECTION (Relocated) ========== */}
      <section id="pricing" className="py-20 lg:py-28 bg-[#F9FAFB] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 text-lg">Choose the perfect plan for your needs. All plans include free SSL, free migration, and local support.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
            {/* Shared Hosting USA */}
            <div className="bg-white border border-gray-200 rounded-2xl transition-all hover:border-blue-500/30 hover:shadow-lg hover:-translate-y-1 p-8 flex flex-col">
              <div className="mb-6">
                <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                  <i className="fa-solid fa-flag-usa mr-1"></i>USA Datacenter
                </span>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-1">USA Shared</h3>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className="text-5xl font-extrabold text-gray-900">{formatPrice(187)}</span>
                  <span className="text-gray-400 font-medium">/mo</span>
                </div>
                <p className="text-sm text-gray-500 font-bold mt-2">Reliable hosting for global audiences</p>
              </div>
              <div className="border-t border-gray-100 pt-6 mb-6">
                <ul className="space-y-3">
                  {['5 GB NVMe SSD','100 GB Bandwidth','3 Websites Hosted','Free SSL Certificates','cPanel® Included'].map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <i className="fa-solid fa-check text-green-500 w-4"></i> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <a href="https://portal.snbdhost.com/store/usa-shared-hosting/basic" className="block w-full text-center border-2 border-gray-200 text-gray-900 font-bold py-3.5 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-colors">Select Plan</a>
              </div>
            </div>
            
            {/* Shared Hosting BDIX (Highlighted) */}
            <div className="bg-white border-2 border-primary rounded-2xl transition-all shadow-xl hover:-translate-y-1 p-8 flex flex-col relative lg:-mt-4 lg:-mb-4">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow">Most Popular</span>
              </div>
              <div className="mb-6 mt-2">
                <span className="inline-block bg-red-50 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                  <i className="fa-solid fa-bolt mr-1"></i>BDIX Optimized
                </span>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-1">BDIX Shared</h3>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className="text-5xl font-extrabold text-gray-900">{formatPrice(187)}</span>
                  <span className="text-gray-400 font-medium">/mo</span>
                </div>
                <p className="text-sm text-primary font-bold mt-2">Ultra-low latency for Bangladesh</p>
              </div>
              <div className="border-t border-gray-200 pt-6 mb-6">
                <ul className="space-y-3">
                  {['5 GB NVMe SSD','100 GB BDIX Bandwidth','3 Websites Hosted','Free SSL Certificates','cPanel® Included'].map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <i className="fa-solid fa-check text-primary w-4"></i> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <a href="https://portal.snbdhost.com/store/bdix-shared-hosting/basic" className="block w-full text-center bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-dark transition-colors shadow-md shadow-red-200">Select Plan</a>
              </div>
            </div>

            {/* SG VPS */}
            <div className="bg-[#121212] border border-gray-800 rounded-2xl transition-all hover:border-gray-600 hover:shadow-lg hover:-translate-y-1 p-8 flex flex-col">
              <div className="mb-6">
                <span className="inline-block bg-gray-800 text-gray-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                  <i className="fa-solid fa-server mr-1"></i>Singapore Datacenter
                </span>
                <h3 className="text-2xl font-extrabold text-white mb-1">SG VPS 2G</h3>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className="text-5xl font-extrabold text-white">{formatPrice(1547)}</span>
                  <span className="text-gray-500 font-medium">/mo</span>
                </div>
                <p className="text-sm text-gray-400 font-bold mt-2">Instant deploy Linux VPS with root access</p>
              </div>
              <div className="border-t border-gray-800 pt-6 mb-6">
                <ul className="space-y-3">
                  {['2-Core AMD EPYC™','2 GB DDR4 RAM','40 GB NVMe Storage','0.5 TB Bandwidth','Full Root Access'].map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-400">
                      <i className="fa-solid fa-check text-green-500 w-4"></i> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <a href="https://portal.snbdhost.com/store/sg-vps/sg-vps-2g" className="block w-full text-center border-2 border-gray-700 text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-colors">Deploy Server</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ALTERNATING FEATURE ROWS ========== */}
      <section className="py-24 bg-[#F9FAFB] border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Features</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">From idea to online success <br/>in just a few clicks.</h2>
          </div>

          {/* Row 1: Softaculous/1-Click */}
          <div className="flex flex-col md:flex-row items-center gap-16 mb-32">
            <div className="w-full md:w-1/2">
              <div className="relative h-[400px] w-full rounded-3xl bg-gradient-to-tr from-gray-200 to-gray-50 flex items-center justify-center shadow-inner overflow-hidden border border-gray-200">
                <div className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[size:20px_20px]"></div>
                {/* CSS App Installer Graphic */}
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 z-10 w-3/4 animate-float">
                  <div className="flex gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div><div className="w-3 h-3 rounded-full bg-yellow-400"></div><div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="font-bold text-gray-900 mb-4">1-Click Apps</div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="aspect-square bg-blue-50 rounded-xl flex items-center justify-center text-3xl text-blue-600"><i className="fa-brands fa-wordpress"></i></div>
                    <div className="aspect-square bg-orange-50 rounded-xl flex items-center justify-center text-3xl text-orange-600"><i className="fa-brands fa-magento"></i></div>
                    <div className="aspect-square bg-purple-50 rounded-xl flex items-center justify-center text-3xl text-purple-600"><i className="fa-brands fa-joomla"></i></div>
                    <div className="aspect-square bg-red-50 rounded-xl flex items-center justify-center text-3xl text-red-600"><i className="fa-brands fa-laravel"></i></div>
                    <div className="aspect-square bg-green-50 rounded-xl flex items-center justify-center text-3xl text-green-600"><i className="fa-brands fa-node-js"></i></div>
                    <div className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center text-3xl text-gray-600"><i className="fa-solid fa-plus"></i></div>
                  </div>
                  <button className="w-full bg-primary text-white font-bold py-3 rounded-xl mt-6">Install Application</button>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="text-primary font-bold text-sm uppercase mb-3">Softaculous Installer</div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Launch your dream site <br/>instantly.</h3>
              <p className="text-lg text-gray-600 mb-8">No technical skills? No problem. Install WordPress, Magento, Laravel, and over 400+ other applications with a single click. We handle the databases and configuration automatically.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-700 font-medium"><i className="fa-solid fa-check text-green-500 text-xl"></i> Automatic core updates</li>
                <li className="flex items-center gap-3 text-gray-700 font-medium"><i className="fa-solid fa-check text-green-500 text-xl"></i> Instant staging environments</li>
                <li className="flex items-center gap-3 text-gray-700 font-medium"><i className="fa-solid fa-check text-green-500 text-xl"></i> Daily automated backups</li>
              </ul>
              <a href="#pricing" className="text-primary font-bold hover:text-primary-dark underline decoration-2 underline-offset-4 transition-colors">View hosting plans <i className="fa-solid fa-arrow-right text-sm ml-1"></i></a>
            </div>
          </div>

          {/* Row 2: BDIX Speed */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16">
            <div className="w-full md:w-1/2">
              <div className="relative h-[400px] w-full rounded-3xl bg-gradient-to-br from-red-600 to-primary flex items-center justify-center shadow-2xl overflow-hidden">
                {/* Glowing speed graphic */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]"></div>
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl text-white w-3/4 z-10">
                  <div className="flex items-center justify-between mb-8 border-b border-white/20 pb-4">
                    <div className="font-bold">Page Load Speed</div>
                    <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">Excellent</div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2"><span className="text-red-100">SNBD HOST (NVMe + BDIX)</span> <span className="font-bold">0.8s</span></div>
                      <div className="w-full bg-black/20 rounded-full h-3"><div className="bg-white h-3 rounded-full w-[15%]"></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2"><span className="text-red-100">Standard Hosting</span> <span className="font-bold">3.2s</span></div>
                      <div className="w-full bg-black/20 rounded-full h-3"><div className="bg-gray-400 h-3 rounded-full w-[65%]"></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2"><span className="text-red-100">Overseas Servers</span> <span className="font-bold">5.5s</span></div>
                      <div className="w-full bg-black/20 rounded-full h-3"><div className="bg-red-400 h-3 rounded-full w-[95%]"></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="text-primary font-bold text-sm uppercase mb-3">BDIX Network</div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Blazing fast speed for <br/>local audiences.</h3>
              <p className="text-lg text-gray-600 mb-8">If your target audience is in Bangladesh, hosting overseas hurts your business. Our BDIX-connected infrastructure ensures your site loads instantly for local ISPs, boosting SEO and conversions.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-700 font-medium"><i className="fa-solid fa-bolt text-yellow-500 text-xl"></i> Enterprise NVMe SSD Storage</li>
                <li className="flex items-center gap-3 text-gray-700 font-medium"><i className="fa-solid fa-bolt text-yellow-500 text-xl"></i> 10 Gbps Network Uplink</li>
                <li className="flex items-center gap-3 text-gray-700 font-medium"><i className="fa-solid fa-bolt text-yellow-500 text-xl"></i> LiteSpeed Cache Integration</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ========== MASSIVE DARK INFRASTRUCTURE SECTION ========== */}
      <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
        {/* Abstract Glowing Backgrounds */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-3xl text-primary mb-8 shadow-[0_0_30px_rgba(208,2,27,0.2)]">
                <i className="fa-solid fa-earth-americas"></i>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Global infrastructure,<br/>local expertise.</h2>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">We operate out of Tier-III data centers in Bangladesh and the USA, providing redundant power, cooling, and network links to ensure your business stays online no matter what.</p>
              <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 rounded-full py-2 px-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <span className="text-white font-bold text-sm">All systems operational</span>
              </div>
            </div>

            {/* Dark Support Box */}
            <div className="bg-white/5 border border-white/10 p-10 rounded-[2rem] backdrop-blur-md relative overflow-hidden group hover:border-primary/50 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-primary text-4xl mb-6"><i className="fa-solid fa-headset"></i></div>
                <h3 className="text-2xl font-extrabold text-white mb-4">24/7 Expert Support</h3>
                <p className="text-gray-400 mb-8">Our team of server administrators is standing by via Live Chat and Ticket to resolve your issues within minutes, not days.</p>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center gap-3 text-white"><i className="fa-solid fa-clock text-primary"></i> 15-Minute Avg. Ticket Response</div>
                  <div className="flex items-center gap-3 text-white"><i className="fa-solid fa-comments text-primary"></i> Instant Live Chat</div>
                  <div className="flex items-center gap-3 text-white"><i className="fa-solid fa-language text-primary"></i> English & Bengali Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Massive Stats (Replaces the old Dark Stats Banner) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-white/10">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-2">10K+</div>
              <div className="text-primary font-bold uppercase tracking-widest text-xs">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-2">1M+</div>
              <div className="text-primary font-bold uppercase tracking-widest text-xs">Websites Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-2">99.9%</div>
              <div className="text-primary font-bold uppercase tracking-widest text-xs">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-2">24/7</div>
              <div className="text-primary font-bold uppercase tracking-widest text-xs">Server Monitoring</div>
            </div>
          </div>

        </div>
      </section>

      {/* ========== CONTROL CENTER & AUTOMATION ========== */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 font-bold px-4 py-1.5 rounded-full mb-6">
            <i className="fa-solid fa-sliders text-primary"></i> Complete Control
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Manage everything <br/>from one dashboard.</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
            From domains and SSL certificates to databases and n8n automation workflows, our unified control center puts the power in your hands. Industry-standard cPanel included free.
          </p>

          <div className="relative max-w-5xl mx-auto">
            {/* Dashboard Mockup Layering */}
            <div className="relative z-10 bg-[#F9FAFB] rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform hover:-translate-y-2 transition-transform duration-500">
              {/* Header */}
              <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="mx-auto bg-gray-100 text-gray-400 text-xs px-20 py-1 rounded-md flex items-center gap-2">
                  <i className="fa-solid fa-lock text-[10px]"></i> snbdhost.com/cpanel
                </div>
              </div>
              {/* Fake cPanel Body */}
              <div className="p-8 grid grid-cols-4 gap-6 text-left">
                <div className="col-span-1 border-r border-gray-200 pr-6 hidden md:block">
                  <div className="font-bold text-gray-900 mb-4">General Information</div>
                  <div className="space-y-4 text-xs text-gray-600">
                    <div><div className="text-gray-400">Current User</div><div className="font-bold">yeamin</div></div>
                    <div><div className="text-gray-400">Primary Domain</div><div className="font-bold text-primary">snbdhost.com</div></div>
                    <div><div className="text-gray-400">Shared IP Address</div><div className="font-bold">103.159.232.1</div></div>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between mb-1"><span>Disk Usage</span><span className="font-bold">45%</span></div>
                      <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-primary h-2 rounded-full w-[45%]"></div></div>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 md:col-span-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white border border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary cursor-pointer transition-colors">
                      <i className="fa-solid fa-folder-open text-3xl text-yellow-500 mb-2"></i>
                      <span className="text-xs font-bold text-gray-700">File Manager</span>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary cursor-pointer transition-colors">
                      <i className="fa-solid fa-database text-3xl text-blue-500 mb-2"></i>
                      <span className="text-xs font-bold text-gray-700">MySQL® Databases</span>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary cursor-pointer transition-colors">
                      <i className="fa-brands fa-wordpress text-3xl text-blue-800 mb-2"></i>
                      <span className="text-xs font-bold text-gray-700">WordPress Toolkit</span>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary cursor-pointer transition-colors">
                      <i className="fa-solid fa-envelope text-3xl text-gray-600 mb-2"></i>
                      <span className="text-xs font-bold text-gray-700">Email Accounts</span>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary cursor-pointer transition-colors relative overflow-hidden">
                      <div className="absolute -right-4 -top-4 w-12 h-12 bg-red-100 rounded-full"></div>
                      <i className="fa-solid fa-diagram-project text-3xl text-primary mb-2 relative z-10"></i>
                      <span className="text-xs font-bold text-gray-700 relative z-10">n8n Automation</span>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary cursor-pointer transition-colors">
                      <i className="fa-solid fa-shield-halved text-3xl text-purple-600 mb-2"></i>
                      <span className="text-xs font-bold text-gray-700">OpenClaw Security</span>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary cursor-pointer transition-colors">
                      <i className="fa-solid fa-lock text-3xl text-green-500 mb-2"></i>
                      <span className="text-xs font-bold text-gray-700">SSL/TLS Status</span>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary cursor-pointer transition-colors">
                      <i className="fa-solid fa-chart-line text-3xl text-indigo-500 mb-2"></i>
                      <span className="text-xs font-bold text-gray-700">Metrics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative background blob */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-red-200 rounded-full blur-[80px] -z-10"></div>
          </div>
        </div>
      </section>

      {/* ========== BOTTOM CTA BANNER ========== */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20" style={{ clipPath: 'polygon(20% 0%, 100% 0, 100% 100%, 0% 100%)' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Not sure which plan to choose?</h2>
            <p className="text-gray-400 text-lg">Our experts are here to help you find the perfect fit for your business.</p>
          </div>
          <div className="shrink-0 flex items-center gap-4">
            <Link to="/contact" className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl transition-colors shadow-xl">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

    </>
  )
}
