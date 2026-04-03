import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Offers() {
  const [activeFilter, setActiveFilter] = useState('all');
  return (
    <>
<section className="text-white py-24 text-center relative overflow-hidden" style={{"background":"linear-gradient(135deg,#CC0000 0%,#991100 50%,#CC0000 100%)"}}>
    {/* Decorative dots overlay */}
    <div className="absolute inset-0 opacity-10" style={{"backgroundImage":"radial-gradient(circle at 2px 2px,#fff 1px,transparent 0)","backgroundSize":"32px 32px"}}></div>
    {/* Soft light blobs */}
    <div className="absolute top-0 left-0 w-80 h-80 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" style={{"background":"rgba(255,255,255,0.08)"}}></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" style={{"background":"rgba(0,0,0,0.15)"}}></div>

    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-full mb-6" style={{"background":"rgba(255,255,255,0.15)","border":"1px solid rgba(255,255,255,0.3)","color":"#fff"}}>
        🔥 Limited Time Offers
      </div>

      {/* Headline */}
      <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-5">
        Unbeatable Hosting Deals 🎯
      </h1>

      {/* Sub */}
      <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
        Lock in the lowest prices before they&rsquo;re gone. Flash sales, bundles, and exclusive discounts.
      </p>

      {/* Countdown */}
      <div className="mb-12">
        <p className="text-[#9CA3AF] text-xs font-bold uppercase tracking-widest mb-5">&#x23F0; FLASH SALE ENDS IN:</p>
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          <div className="countdown-box announcement-strip rounded-xl p-4 min-w-[72px] sm:min-w-[84px] text-center shadow-xl shadow-red-900/40">
            <div id="days"  className="text-3xl sm:text-4xl font-black leading-none">00</div>
            <div className="text-xs font-bold uppercase tracking-widest mt-1.5 text-red-200">Days</div>
          </div>
          <div className="text-red-500 text-3xl font-black leading-none">:</div>
          <div className="countdown-box announcement-strip rounded-xl p-4 min-w-[72px] sm:min-w-[84px] text-center shadow-xl shadow-red-900/40">
            <div id="hours" className="text-3xl sm:text-4xl font-black leading-none">00</div>
            <div className="text-xs font-bold uppercase tracking-widest mt-1.5 text-red-200">Hours</div>
          </div>
          <div className="text-red-500 text-3xl font-black leading-none">:</div>
          <div className="countdown-box announcement-strip rounded-xl p-4 min-w-[72px] sm:min-w-[84px] text-center shadow-xl shadow-red-900/40">
            <div id="mins"  className="text-3xl sm:text-4xl font-black leading-none">00</div>
            <div className="text-xs font-bold uppercase tracking-widest mt-1.5 text-red-200">Minutes</div>
          </div>
          <div className="text-red-500 text-3xl font-black leading-none">:</div>
          <div className="countdown-box announcement-strip rounded-xl p-4 min-w-[72px] sm:min-w-[84px] text-center shadow-xl shadow-red-900/40">
            <div id="secs"  className="text-3xl sm:text-4xl font-black leading-none">00</div>
            <div className="text-xs font-bold uppercase tracking-widest mt-1.5 text-red-200">Seconds</div>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="#featured-deals" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105 shadow-lg shadow-red-600/30">
          Grab Your Deal &#x1F525;
        </a>
        <a href="#all-offers" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl text-lg font-bold transition-all">
          Browse All Plans
        </a>
      </div>

    </div>
  </section>

  {/* ===================== FEATURED DEALS ===================== */}
  <section id="featured-deals" className="py-20" style={{"background":"#F0F1F4"}}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="text-center mb-14">
        <h2 className="text-4xl font-black text-gray-900">&#x1F525; Today&rsquo;s Best Deals</h2>
        <p className="text-gray-500 mt-3 text-lg">Hand-picked offers at prices that won&rsquo;t last long</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

        {/* Card 1: Starter Hosting Bundle */}
        <div className="bg-bg-card border border-gray-200 rounded-[18px] shadow-sm transition-all hover:border-brand-red/30 hover:shadow-lg hover:-translate-y-1 bg-[#FFFFFF] border-t-4 border-red-600 rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-5">
            <span className="announcement-strip text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wide">75% OFF</span>
            <span className="text-orange-500 text-xs font-semibold flex items-center gap-1">
              <i className="fas fa-clock text-xs"></i> Expires in 2d 14h
            </span>
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-3">Starter Hosting Bundle</h3>
          <div className="mb-6">
            <span className="text-[#9CA3AF] line-through text-sm">&#2547;396/yr</span>
            <div className="text-red-600 text-4xl font-black leading-tight mt-0.5">&#2547;99<span className="text-lg font-semibold text-[#9CA3AF]">/yr</span></div>
          </div>
          <ul className="space-y-2.5 mb-6">
            <li className="flex items-center gap-2.5 text-sm text-gray-500"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> 1 GB NVMe SSD Storage</li>
            <li className="flex items-center gap-2.5 text-sm text-gray-500"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> 50 GB Monthly Bandwidth</li>
            <li className="flex items-center gap-2.5 text-sm text-gray-500"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> Free .XYZ Domain</li>
            <li className="flex items-center gap-2.5 text-sm text-gray-500"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> Free SSL Certificate</li>
            <li className="flex items-center gap-2.5 text-sm text-gray-500"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> cPanel Control Panel</li>
            <li className="flex items-center gap-2.5 text-sm text-gray-500"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> 1-Click App Installer</li>
          </ul>
          <p className="text-[#9CA3AF] text-xs mb-5 italic">* Valid for new accounts only</p>
          <Link to="/hosting" className="block bg-red-600 hover:bg-red-700 text-white text-center w-full rounded-xl py-3.5 font-bold transition-colors">
            Claim Deal &rarr;
          </Link>
        </div>

        {/* Card 2: Professional Hosting — BEST VALUE (bigger) */}
        <div className="bg-bg-card border border-gray-200 rounded-[18px] shadow-sm transition-all hover:border-brand-red/30 hover:shadow-lg hover:-translate-y-1 best-value-card bg-[#FFFFFF] border-t-4 border-red-600 rounded-2xl shadow-2xl p-8 relative">
          <div className="absolute inset-0 rounded-2xl ring-2 ring-red-300 pointer-events-none"></div>
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wide">&#x2B50; Best Value</span>
            <span className="announcement-strip text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wide">65% OFF</span>
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-3">Professional Hosting + Free .COM</h3>
          <div className="mb-6">
            <span className="text-[#9CA3AF] line-through text-sm">&#2547;5,988/yr</span>
            <div className="flex items-center gap-3 mt-0.5 flex-wrap">
              <span className="text-red-600 text-4xl font-black leading-tight">&#2547;2,099<span className="text-lg font-semibold text-[#9CA3AF]">/yr</span></span>
              <span className="bg-green-100 text-green-700 text-xs font-black px-2.5 py-1 rounded-full whitespace-nowrap">SAVE &#2547;3,889</span>
            </div>
          </div>
          <ul className="space-y-2.5 mb-8">
            <li className="flex items-center gap-2.5 text-sm text-gray-500"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> 5 GB NVMe SSD Storage</li>
            <li className="flex items-center gap-2.5 text-sm text-gray-500"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> 100 GB Monthly Bandwidth</li>
            <li className="flex items-center gap-2.5 text-sm text-gray-500"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> Free .COM Domain <span className="text-[#9CA3AF] text-xs ml-1">(worth &#2547;1,200)</span></li>
            <li className="flex items-center gap-2.5 text-sm text-gray-500"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> Free SSL Certificate</li>
            <li className="flex items-center gap-2.5 text-sm text-gray-500"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> SSH Access</li>
            <li className="flex items-center gap-2.5 text-sm text-gray-500"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> cPanel Control Panel</li>
            <li className="flex items-center gap-2.5 text-sm text-gray-500"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> Priority Support</li>
          </ul>
          <Link to="/hosting" className="block bg-red-600 hover:bg-red-700 text-white text-center w-full rounded-xl py-4 font-bold transition-colors text-base">
            Claim Deal &rarr;
          </Link>
        </div>

        {/* Card 3: n8n Automation Starter */}
        <div className="bg-bg-card border border-gray-200 rounded-[18px] shadow-sm transition-all hover:border-brand-red/30 hover:shadow-lg hover:-translate-y-1 bg-[#FFFFFF] border-t-4 border-red-600 rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-5">
            <span className="announcement-strip text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wide">&#x1F916; 58% OFF</span>
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-3">n8n Automation Starter</h3>
          <div className="mb-6">
            <span className="text-[#9CA3AF] line-through text-sm">&#2547;4,800/yr</span>
            <div className="text-red-600 text-4xl font-black leading-tight mt-0.5">&#2547;2,000<span className="text-lg font-semibold text-[#9CA3AF]">/yr</span></div>
          </div>
          <ul className="space-y-2.5 mb-6">
            <li className="flex items-center gap-2.5 text-sm text-gray-500"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> 1 GB Dedicated RAM</li>
            <li className="flex items-center gap-2.5 text-sm text-gray-500"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> 1 vCPU Core</li>
            <li className="flex items-center gap-2.5 text-sm text-gray-500"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> Docker n8n Instance</li>
            <li className="flex items-center gap-2.5 text-sm text-gray-500"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> Free Setup &amp; Configuration</li>
            <li className="flex items-center gap-2.5 text-sm text-gray-500"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> 300+ App Integrations</li>
            <li className="flex items-center gap-2.5 text-sm text-gray-500"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> 24/7 Technical Support</li>
          </ul>
          <Link to="/n8n-automation" className="block bg-red-600 hover:bg-red-700 text-white text-center w-full rounded-xl py-3.5 font-bold transition-colors">
            Claim Deal &rarr;
          </Link>
        </div>

      </div>
    </div>
  </section>

  {/* ===================== ALL OFFERS ===================== */}
  <section id="all-offers" className="py-20" style={{"background":"#F8F9FB"}}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-gray-900">All Active Offers</h2>
        <p className="text-gray-500 mt-3 text-lg">Use these deals and promo codes at checkout</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-10" id="filter-tabs">
        <button onClick={() => setActiveFilter('all')} className={`filter-btn px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeFilter === 'all' ? 'announcement-strip' : 'bg-[#F0F1F4] text-gray-500 hover:bg-gray-200'}`}>All</button>
        <button onClick={() => setActiveFilter('hosting')} className={`filter-btn px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeFilter === 'hosting' ? 'announcement-strip' : 'bg-[#F0F1F4] text-gray-500 hover:bg-gray-200'}`}>Hosting</button>
        <button onClick={() => setActiveFilter('vps')} className={`filter-btn px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeFilter === 'vps' ? 'announcement-strip' : 'bg-[#F0F1F4] text-gray-500 hover:bg-gray-200'}`}>VPS &amp; Servers</button>
        <button onClick={() => setActiveFilter('domains')} className={`filter-btn px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeFilter === 'domains' ? 'announcement-strip' : 'bg-[#F0F1F4] text-gray-500 hover:bg-gray-200'}`}>Domains</button>
        <button onClick={() => setActiveFilter('n8n')} className={`filter-btn px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeFilter === 'n8n' ? 'announcement-strip' : 'bg-[#F0F1F4] text-gray-500 hover:bg-gray-200'}`}>n8n</button>
        <button onClick={() => setActiveFilter('bundles')} className={`filter-btn px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeFilter === 'bundles' ? 'announcement-strip' : 'bg-[#F0F1F4] text-gray-500 hover:bg-gray-200'}`}>Bundles</button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="offers-grid">

        {/* 1: Annual Hosting Discount */}
        <div data-category="hosting" className={`filter-card bg-bg-card border border-gray-200 rounded-[18px] shadow-sm transition-all hover:border-brand-red/30 hover:shadow-lg hover:-translate-y-1 bg-bg-card border border-gray-200 rounded-2xl shadow-sm hover:border-brand-redSoft hover:shadow-md hover:-translate-y-0.5 transition-all rounded-2xl p-6 hover:shadow-xl ${activeFilter === 'all' || activeFilter === 'hosting' ? 'block' : 'hidden'}`}>
          <div className="flex items-center justify-between mb-4">
            <span className="bg-red-100 text-red-600 text-xs font-black px-3 py-1.5 rounded-full uppercase">40% OFF</span>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Ongoing</span>
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-2">Annual Hosting Discount</h3>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed">Get 40% off when you pay annually on any shared hosting plan. Applies to all tiers.</p>
          <div className="flex items-center gap-2 mb-5">
            <div className="flex-1 bg-[#F0F1F4] rounded-lg px-4 py-2.5 font-mono text-sm font-bold text-gray-800 tracking-widest">ANNUAL40</div>
            <button className="copy-btn bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 flex-shrink-0" data-code="ANNUAL40">
              <i className="fas fa-clipboard text-xs"></i><span className="copy-label">Copy</span>
            </button>
          </div>
          <Link to="/hosting" className="block bg-red-600 hover:bg-red-700 text-white text-center w-full rounded-xl py-3 font-bold transition-colors text-sm">Get Offer</Link>
        </div>

        {/* 2: Free Domain with Hosting */}
        <div data-category="domains" className={`filter-card bg-bg-card border border-gray-200 rounded-[18px] shadow-sm transition-all hover:border-brand-red/30 hover:shadow-lg hover:-translate-y-1 bg-bg-card border border-gray-200 rounded-2xl shadow-sm hover:border-brand-redSoft hover:shadow-md hover:-translate-y-0.5 transition-all rounded-2xl p-6 hover:shadow-xl ${activeFilter === 'all' || activeFilter === 'domains' ? 'block' : 'hidden'}`}>
          <div className="flex items-center justify-between mb-4">
            <span className="bg-green-100 text-green-700 text-xs font-black px-3 py-1.5 rounded-full uppercase">FREE</span>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Ongoing</span>
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-2">Free Domain with Hosting</h3>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed">Register a .xyz or .com.bd domain free with any hosting plan purchase.</p>
          <div className="bg-gray-50 border border-[#E5E7EB] rounded-lg px-4 py-3 mb-5 text-sm text-gray-500 italic flex items-center gap-2">
            <i className="fas fa-magic text-[#9CA3AF]"></i> Applied automatically at checkout
          </div>
          <Link to="/hosting" className="block bg-red-600 hover:bg-red-700 text-white text-center w-full rounded-xl py-3 font-bold transition-colors text-sm">Get Offer</Link>
        </div>

        {/* 3: VPS First Month */}
        <div data-category="vps" className={`filter-card bg-bg-card border border-gray-200 rounded-[18px] shadow-sm transition-all hover:border-brand-red/30 hover:shadow-lg hover:-translate-y-1 bg-bg-card border border-gray-200 rounded-2xl shadow-sm hover:border-brand-redSoft hover:shadow-md hover:-translate-y-0.5 transition-all rounded-2xl p-6 hover:shadow-xl ${activeFilter === 'all' || activeFilter === 'vps' ? 'block' : 'hidden'}`}>
          <div className="flex items-center justify-between mb-4">
            <span className="bg-orange-100 text-orange-600 text-xs font-black px-3 py-1.5 rounded-full uppercase">30% OFF</span>
            <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">Expires: Apr 15, 2026</span>
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-2">VPS First Month Discount</h3>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed">Get your first month of any VPS plan at 30% off. All locations: USA, BD, Singapore.</p>
          <div className="flex items-center gap-2 mb-5">
            <div className="flex-1 bg-[#F0F1F4] rounded-lg px-4 py-2.5 font-mono text-sm font-bold text-gray-800 tracking-widest">VPS30</div>
            <button className="copy-btn bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 flex-shrink-0" data-code="VPS30">
              <i className="fas fa-clipboard text-xs"></i><span className="copy-label">Copy</span>
            </button>
          </div>
          <Link to="/vps-server" className="block bg-red-600 hover:bg-red-700 text-white text-center w-full rounded-xl py-3 font-bold transition-colors text-sm">Get Offer</Link>
        </div>

        {/* 4: n8n Annual Plan Bonus */}
        <div data-category="n8n" className="filter-card bg-bg-card border border-gray-200 rounded-[18px] shadow-sm transition-all hover:border-brand-red/30 hover:shadow-lg hover:-translate-y-1 bg-bg-card border border-gray-200 rounded-2xl shadow-sm hover:border-brand-redSoft hover:shadow-md hover:-translate-y-0.5 transition-all rounded-2xl p-6 hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-blue-100 text-blue-700 text-xs font-black px-3 py-1.5 rounded-full uppercase">2 Months Free</span>
            <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">Expires: Mar 31, 2026</span>
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-2">n8n Annual Plan Bonus</h3>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed">Pay for 10 months, get 12 months of n8n hosting. All plans included.</p>
          <div className="bg-gray-50 border border-[#E5E7EB] rounded-lg px-4 py-3 mb-5 text-sm text-gray-500 italic flex items-center gap-2">
            <i className="fas fa-magic text-[#9CA3AF]"></i> Applied at checkout
          </div>
          <Link to="/n8n-automation" className="block bg-red-600 hover:bg-red-700 text-white text-center w-full rounded-xl py-3 font-bold transition-colors text-sm">Get Offer</Link>
        </div>

        {/* 5: Hosting + n8n Combo */}
        <div data-category="bundles" className={`filter-card bg-bg-card border border-gray-200 rounded-[18px] shadow-sm transition-all hover:border-brand-red/30 hover:shadow-lg hover:-translate-y-1 bg-bg-card border border-gray-200 rounded-2xl shadow-sm hover:border-brand-redSoft hover:shadow-md hover:-translate-y-0.5 transition-all rounded-2xl p-6 hover:shadow-xl ${activeFilter === 'all' || activeFilter === 'bundles' ? 'block' : 'hidden'}`}>
          <div className="flex items-center justify-between mb-4">
            <span className="bg-purple-100 text-purple-700 text-xs font-black px-3 py-1.5 rounded-full uppercase">Bundle Deal</span>
            <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">Limited time</span>
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-2">Hosting + n8n Combo</h3>
          <p className="text-gray-500 text-sm mb-4 leading-relaxed">Get shared hosting + n8n 1G plan together at a bundled price. Save &#2547;1,200/yr.</p>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[#9CA3AF] line-through text-sm">&#2547;3,499/yr</span>
            <span className="text-red-600 text-2xl font-black">&#2547;2,299/yr</span>
          </div>
          <Link to="/hosting" className="block bg-red-600 hover:bg-red-700 text-white text-center w-full rounded-xl py-3 font-bold transition-colors text-sm">Get Offer</Link>
        </div>

        {/* 6: Free Website Migration */}
        <div data-category="hosting" className={`filter-card bg-bg-card border border-gray-200 rounded-[18px] shadow-sm transition-all hover:border-brand-red/30 hover:shadow-lg hover:-translate-y-1 bg-bg-card border border-gray-200 rounded-2xl shadow-sm hover:border-brand-redSoft hover:shadow-md hover:-translate-y-0.5 transition-all rounded-2xl p-6 hover:shadow-xl ${activeFilter === 'all' || activeFilter === 'hosting' ? 'block' : 'hidden'}`}>
          <div className="flex items-center justify-between mb-4">
            <span className="bg-green-100 text-green-700 text-xs font-black px-3 py-1.5 rounded-full uppercase">FREE</span>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Ongoing</span>
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-2">Free Website Migration</h3>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed">Switch to SNBD HOST and we&rsquo;ll migrate your entire website free &mdash; files, databases, emails.</p>
          <div className="bg-gray-50 border border-[#E5E7EB] rounded-lg px-4 py-3 mb-5 text-sm text-gray-500 italic flex items-center gap-2">
            <i className="fas fa-gift text-[#9CA3AF]"></i> No code needed &mdash; included automatically
          </div>
          <Link to="/support" className="block bg-red-600 hover:bg-red-700 text-white text-center w-full rounded-xl py-3 font-bold transition-colors text-sm">Get Offer</Link>
        </div>

        {/* 7: .XYZ Domain for ৳99 */}
        <div data-category="domains" className={`filter-card bg-bg-card border border-gray-200 rounded-[18px] shadow-sm transition-all hover:border-brand-red/30 hover:shadow-lg hover:-translate-y-1 bg-bg-card border border-gray-200 rounded-2xl shadow-sm hover:border-brand-redSoft hover:shadow-md hover:-translate-y-0.5 transition-all rounded-2xl p-6 hover:shadow-xl ${activeFilter === 'all' || activeFilter === 'domains' ? 'block' : 'hidden'}`}>
          <div className="flex items-center justify-between mb-4">
            <span className="bg-yellow-300 text-yellow-900 text-xs font-black px-3 py-1.5 rounded-full uppercase">&#2547;99</span>
            <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">While stocks last</span>
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-2">.XYZ Domain for &#2547;99/yr</h3>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed">Register your .xyz domain for just &#2547;99/yr &mdash; normally &#2547;599/yr. Great for startups.</p>
          <div className="flex items-center gap-2 mb-5">
            <div className="flex-1 bg-[#F0F1F4] rounded-lg px-4 py-2.5 font-mono text-sm font-bold text-gray-800 tracking-widest">XYZ99</div>
            <button className="copy-btn bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 flex-shrink-0" data-code="XYZ99">
              <i className="fas fa-clipboard text-xs"></i><span className="copy-label">Copy</span>
            </button>
          </div>
          <Link to="/domain" className="block bg-red-600 hover:bg-red-700 text-white text-center w-full rounded-xl py-3 font-bold transition-colors text-sm">Get Offer</Link>
        </div>

        {/* 8: Bangladesh VPS Launch */}
        <div data-category="vps" className={`filter-card bg-bg-card border border-gray-200 rounded-[18px] shadow-sm transition-all hover:border-brand-red/30 hover:shadow-lg hover:-translate-y-1 bg-bg-card border border-gray-200 rounded-2xl shadow-sm hover:border-brand-redSoft hover:shadow-md hover:-translate-y-0.5 transition-all rounded-2xl p-6 hover:shadow-xl ${activeFilter === 'all' || activeFilter === 'vps' ? 'block' : 'hidden'}`}>
          <div className="flex items-center justify-between mb-4">
            <span className="bg-bg-subtle text-text-primary text-xs font-black px-3 py-1.5 rounded-full uppercase">NEW</span>
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">Launch special</span>
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-2">Bangladesh VPS Launch Offer</h3>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed">Be first to try our new Bangladesh-based VPS. Special launch pricing from &#2547;500/mo.</p>
          <div className="bg-gray-50 border border-[#E5E7EB] rounded-lg px-4 py-3 mb-5 text-sm text-gray-500 italic flex items-center gap-2">
            <i className="fas fa-headset text-[#9CA3AF]"></i> Contact sales for pricing
          </div>
          <Link to="/support" className="block bg-red-600 hover:bg-red-700 text-white text-center w-full rounded-xl py-3 font-bold transition-colors text-sm">Get Offer</Link>
        </div>

        {/* 9: Student Hosting Package */}
        <div data-category="bundles" className={`filter-card bg-bg-card border border-gray-200 rounded-[18px] shadow-sm transition-all hover:border-brand-red/30 hover:shadow-lg hover:-translate-y-1 bg-bg-card border border-gray-200 rounded-2xl shadow-sm hover:border-brand-redSoft hover:shadow-md hover:-translate-y-0.5 transition-all rounded-2xl p-6 hover:shadow-xl ${activeFilter === 'all' || activeFilter === 'bundles' ? 'block' : 'hidden'}`}>
          <div className="flex items-center justify-between mb-4">
            <span className="bg-red-100 text-red-600 text-xs font-black px-3 py-1.5 rounded-full uppercase">50% OFF</span>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Ongoing</span>
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-2">Student Hosting Package</h3>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed">Special discounted hosting for students and educational institutions.</p>
          <div className="flex items-center gap-2 mb-5">
            <div className="flex-1 bg-[#F0F1F4] rounded-lg px-4 py-2.5 font-mono text-sm font-bold text-gray-800 tracking-widest">STUDENT50</div>
            <button className="copy-btn bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 flex-shrink-0" data-code="STUDENT50">
              <i className="fas fa-clipboard text-xs"></i><span className="copy-label">Copy</span>
            </button>
          </div>
          <Link to="/hosting" className="block bg-red-600 hover:bg-red-700 text-white text-center w-full rounded-xl py-3 font-bold transition-colors text-sm">Get Offer</Link>
        </div>

      </div>
    </div>
  </section>

  {/* ===================== REFERRAL PROGRAM ===================== */}
  <section className="py-20" style={{"background":"#F8F9FB"}}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="text-center mb-14">
        <h2 className="text-4xl font-black text-gray-900">Refer a Friend, Earn Rewards &#x1F4B0;</h2>
        <p className="text-gray-500 mt-3 text-lg max-w-2xl mx-auto">Share SNBD HOST with your network and earn <strong className="text-gray-800">&#2547;500</strong> for every successful referral</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        {/* Step 1 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E5E7EB] text-center hover:shadow-md transition-shadow">
          <div className="text-7xl font-black text-red-600 opacity-15 leading-none select-none mb-1">01</div>
          <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5 -mt-6 relative z-10">
            <i className="fas fa-link text-red-600 text-xl"></i>
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-3">Share Your Link</h3>
          <p className="text-gray-500 text-sm leading-relaxed">Get your unique referral link from the dashboard and share it with friends, clients, or your audience.</p>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E5E7EB] text-center hover:shadow-md transition-shadow">
          <div className="text-7xl font-black text-red-600 opacity-15 leading-none select-none mb-1">02</div>
          <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5 -mt-6 relative z-10">
            <i className="fas fa-user-plus text-red-600 text-xl"></i>
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-3">They Sign Up</h3>
          <p className="text-gray-500 text-sm leading-relaxed">When someone uses your link to purchase any plan, the referral is tracked automatically.</p>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E5E7EB] text-center hover:shadow-md transition-shadow">
          <div className="text-7xl font-black text-red-600 opacity-15 leading-none select-none mb-1">03</div>
          <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5 -mt-6 relative z-10">
            <i className="fas fa-coins text-red-600 text-xl"></i>
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-3">Earn &#2547;500</h3>
          <p className="text-gray-500 text-sm leading-relaxed">You earn &#2547;500 account credit for every successful referral. No limit on referrals!</p>
        </div>

      </div>

      <div className="text-center">
        <a href="#" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-red-600/20 mb-4">
          Join Referral Program
        </a>
        <p className="text-[#9CA3AF] italic text-sm mt-3">Our top referrers earn &#2547;10,000+ per month</p>
      </div>

    </div>
  </section>

  {/* ===================== SPECIAL PACKAGES ===================== */}
  <section className="py-20" style={{"background":"#F8F9FB"}}>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="text-center mb-14">
        <h2 className="text-4xl font-black text-gray-900">Special Packages</h2>
        <p className="text-gray-500 mt-3 text-lg">Tailored for specific needs and goals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Student Hosting */}
        <div className="rounded-2xl p-10 relative overflow-hidden" style={{"background":"linear-gradient(135deg,#8B0000 0%,#CC0000 100%)"}}>
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-500 rounded-full opacity-50"></div>
          <div className="absolute -bottom-16 -left-8 w-48 h-48 bg-red-700 rounded-full opacity-40"></div>
          <div className="relative">
            <div className="text-5xl mb-4">&#x1F393;</div>
            <h3 className="text-2xl font-black mb-1">Student Hosting</h3>
            <p className="text-red-200 text-sm font-semibold mb-7">50% OFF for verified students</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2.5 text-sm"><i className="fas fa-check text-red-300 text-xs flex-shrink-0"></i> Free .xyz domain</li>
              <li className="flex items-center gap-2.5 text-sm"><i className="fas fa-check text-red-300 text-xs flex-shrink-0"></i> Starter hosting</li>
              <li className="flex items-center gap-2.5 text-sm"><i className="fas fa-check text-red-300 text-xs flex-shrink-0"></i> cPanel access</li>
              <li className="flex items-center gap-2.5 text-sm"><i className="fas fa-check text-red-300 text-xs flex-shrink-0"></i> Free SSL</li>
            </ul>
            <p className="text-red-300 text-sm line-through mb-1">was &#2547;199/yr</p>
            <div className="text-4xl font-black mb-4">&#2547;99<span className="text-xl font-semibold text-red-200">/yr</span></div>
            <div className="bg-red-500 bg-opacity-60 rounded-lg px-4 py-2 font-mono text-sm font-bold tracking-widest inline-block mb-6">STUDENT50</div>
            <div>
              <Link to="/hosting" className="inline-block bg-[#FFFFFF] text-red-600 font-bold rounded-xl px-7 py-3 hover:bg-red-50 transition-colors">
                Apply Now
              </Link>
            </div>
          </div>
        </div>

        {/* Startup Package */}
        <div className="rounded-2xl p-10 relative overflow-hidden" style={{"background":"#ECEEF2","border":"1px solid #E5E7EB"}}>
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-gray-800 rounded-full opacity-60"></div>
          <div className="absolute -bottom-16 -left-8 w-56 h-56 bg-gray-800 rounded-full opacity-40"></div>
          <div className="relative">
            <div className="text-5xl mb-4">&#x1F680;</div>
            <h3 className="text-2xl font-black mb-1">Startup Package</h3>
            <p className="text-[#9CA3AF] text-sm font-semibold mb-7">Everything to launch your startup</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2.5 text-sm"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> 5 GB NVMe SSD</li>
              <li className="flex items-center gap-2.5 text-sm"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> Free .com domain</li>
              <li className="flex items-center gap-2.5 text-sm"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> Business email (5 accounts)</li>
              <li className="flex items-center gap-2.5 text-sm"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> SSL + cPanel</li>
              <li className="flex items-center gap-2.5 text-sm"><i className="fas fa-check text-red-500 text-xs flex-shrink-0"></i> n8n ready</li>
            </ul>
            <p className="text-gray-500 text-sm mb-1">worth &#2547;4,500+</p>
            <div className="text-4xl font-black mb-8">&#2547;2,499<span className="text-xl font-semibold text-gray-500">/yr</span></div>
            <Link to="/hosting" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl px-7 py-3 transition-colors">
              Launch My Startup
            </Link>
          </div>
        </div>

      </div>
    </div>
  </section>

  {/* ===================== NEWSLETTER ===================== */}
  <section className="text-white py-20" style={{"background":"linear-gradient(135deg,#CC0000 0%,#FF2222 50%,#CC0000 100%)"}}>
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-black mb-4">Never Miss a Deal</h2>
      <p className="text-red-100 text-lg mb-10 leading-relaxed">Subscribe and be first to know about flash sales, new features, and exclusive offers.</p>

      <div id="newsletter-form-wrap">
        <form id="newsletter-form" className="flex flex-col sm:flex-row max-w-lg mx-auto mb-4" noValidate>
          <input
            type="email"
            id="newsletter-email"
            placeholder="Enter your email address"
            className="flex-1 rounded-xl sm:rounded-r-none px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white text-sm font-medium mb-2 sm:mb-0"
            required
          />
          <button
            type="submit"
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl sm:rounded-l-none px-7 py-4 font-bold text-sm transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
        <p className="text-red-200 text-xs">No spam. Unsubscribe anytime.</p>
      </div>

      <div id="newsletter-success" className="hidden">
        <div className="inline-flex items-center gap-3 bg-[#FFFFFF] text-green-700 font-bold px-8 py-4 rounded-2xl text-base">
          <i className="fas fa-check-circle text-green-500 text-2xl"></i>
          You&rsquo;re subscribed! Watch your inbox.
        </div>
      </div>
    </div>
  </section>

  {/* ========== FOOTER ========== */}

    </>
  )
}
