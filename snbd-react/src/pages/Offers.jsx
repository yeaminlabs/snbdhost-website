import { Link } from 'react-router-dom';
import { useState, useCallback } from 'react';

// Reusable Promo Code Pill Component
function PromoPill({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="flex-1 bg-muted border border-gray-200 rounded-lg px-4 py-3 font-mono text-sm font-bold text-dark tracking-widest text-center shadow-sm">
        {code}
      </div>
      <button 
        onClick={handleCopy}
        className="bg-primary hover:bg-[#a30000] text-white text-sm px-4 py-3 rounded-lg font-bold transition-colors flex items-center justify-center min-w-[90px] flex-shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
      >
        {copied ? (
          <span className="flex items-center gap-1.5"><i className="fas fa-check text-xs"></i> Copied</span>
        ) : (
          <span className="flex items-center gap-1.5"><i className="fas fa-copy text-xs"></i> Copy</span>
        )}
      </button>
    </div>
  );
}

export default function Offers() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  return (
    <div className="bg-light font-body font-sans text-dark selection:bg-primary selection:text-white pb-32">
      
      {/* ===================== SECTION 1: HERO ===================== */}
      <section className="bg-primary text-white pt-28 pb-20 text-center px-4 relative">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <div className="inline-flex items-center text-xs font-bold px-4 py-1.5 rounded-full mb-6 bg-white border border-white/20 text-primary uppercase tracking-widest shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            Limited Time Offers
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 font-heading tracking-tight">
            Flash Sale — Hosting from ৳99/yr
          </h1>

          <p className="text-red-100/90 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed font-semibold">
            Prices locked until December 31st. No renewal surprises.
          </p>

          <a href="#all-offers" className="inline-flex items-center justify-center bg-dark hover:bg-black text-white px-10 py-5 rounded-xl text-lg font-bold transition-all shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            See All Deals
          </a>

        </div>
      </section>

      {/* ===================== SECTION 2: FEATURED DEAL ===================== */}
      <section className="py-20 bg-muted px-4 border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-dark font-heading tracking-tight">Featured Deal</h2>
            <p className="text-gray-500 mt-2 text-lg font-medium">The absolute best value bundle of the season.</p>
          </div>

          <div className="bg-white border-2 border-primary rounded-3xl p-8 lg:p-12 shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
            {/* Left Specs */}
            <div className="flex-1 w-full">
              <span className="bg-primary text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block">Best Value</span>
              <h3 className="text-3xl lg:text-4xl font-black text-dark mb-6 font-heading tracking-tight">Professional Hosting + Free .COM</h3>
              
              <ul className="space-y-4 mb-10 text-gray-700 font-medium text-[15px]">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div> 5 GB NVMe SSD Storage Built for Speed</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div> 100 GB Monthly BDIX Bandwidth Payload</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div> Free Automated SSL & cPanel Authority</li>
              </ul>

              <div>
                <span className="text-gray-400 line-through text-lg font-medium block mb-0.5">৳5,988/yr</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-primary text-5xl lg:text-6xl font-black tracking-tighter">৳2,099</span>
                  <span className="text-gray-400 font-bold text-xl">/yr</span>
                </div>
              </div>
            </div>

            {/* Right CTA */}
            <div className="flex flex-col items-center justify-center w-full md:w-auto bg-muted p-8 lg:p-10 rounded-2xl border border-gray-200 min-w-[280px]">
              <div className="text-center mb-6">
                <div className="text-dark font-black text-3xl mb-1 tracking-tight">Save 65%</div>
                <div className="text-gray-500 text-sm font-semibold">Offer ends December 31st</div>
              </div>
              <Link to="/hosting" className="block bg-primary hover:bg-[#a30000] text-white text-center w-full rounded-xl py-4 lg:py-5 font-bold transition-colors shadow-[0_2px_12px_rgba(0,0,0,0.08)] text-lg">
                Claim Offer
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ===================== SECTION 3: ALL ACTIVE OFFERS ===================== */}
      <section id="all-offers" className="py-24 px-4 bg-light">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-dark font-heading tracking-tight border-b-2 border-primary/20 pb-4 inline-block">All Active Offers</h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-14">
            {[
              { id: 'all', label: 'All' },
              { id: 'hosting', label: 'Hosting' },
              { id: 'vps', label: 'VPS & Servers' },
              { id: 'domains', label: 'Domains' },
              { id: 'n8n', label: 'n8n' },
              { id: 'bundles', label: 'Bundles' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)} 
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeFilter === tab.id ? 'bg-dark text-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]' : 'bg-muted text-gray-600 hover:bg-gray-200 border border-transparent'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* 1: Starter Hosting Bundle */}
            <div className={`bg-white border border-gray-200 rounded-3xl p-8 flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.08)] ${activeFilter === 'all' || activeFilter === 'hosting' ? 'block' : 'hidden'}`}>
              <div className="flex items-center justify-between mb-6">
                <span className="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">75% OFF</span>
              </div>
              <h3 className="text-xl font-black text-dark mb-3 font-heading">Starter Hosting Bundle</h3>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-6 font-medium">Perfect for small portfolios and low-traffic personal sites.</p>
              
              <div className="mb-10">
                <span className="text-gray-400 line-through text-sm block mb-1 font-medium">৳396/yr</span>
                <span className="text-dark text-5xl font-black tracking-tighter">৳99<span className="text-lg font-bold text-gray-400">/yr</span></span>
              </div>
              
              <div className="flex-1"></div>
              <Link to="/hosting" className="block bg-primary hover:bg-[#a30000] text-white text-center w-full rounded-xl py-3.5 font-bold transition-colors mt-auto shadow-[0_2px_12px_rgba(0,0,0,0.08)]">Claim Offer</Link>
            </div>

            {/* 2: Annual Hosting Discount */}
            <div className={`bg-white border border-gray-200 rounded-3xl p-8 flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.08)] ${activeFilter === 'all' || activeFilter === 'hosting' ? 'block' : 'hidden'}`}>
              <div className="flex items-center justify-between mb-6">
                <span className="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">40% OFF</span>
              </div>
              <h3 className="text-xl font-black text-dark mb-3 font-heading">Annual Hosting Discount</h3>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-6 font-medium">Get 40% off when you pay annually on any shared hosting plan.</p>
              
              <div className="flex-1"></div>
              <PromoPill code="ANNUAL40" />
              <Link to="/hosting" className="block bg-primary hover:bg-[#a30000] text-white text-center w-full rounded-xl py-3.5 font-bold transition-colors shadow-[0_2px_12px_rgba(0,0,0,0.08)]">Claim Offer</Link>
            </div>

            {/* 3: Free Domain */}
            <div className={`bg-white border border-gray-200 rounded-3xl p-8 flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.08)] ${activeFilter === 'all' || activeFilter === 'domains' || activeFilter === 'bundles' ? 'block' : 'hidden'}`}>
              <div className="flex items-center justify-between mb-6">
                <span className="bg-success text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">FREE</span>
              </div>
              <h3 className="text-xl font-black text-dark mb-3 font-heading">Free Domain with Hosting</h3>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-6 font-medium">Register a .xyz or .com.bd domain entirely for free when packaged with any hosting tier.</p>
              
              <div className="flex-1"></div>
              <div className="bg-muted border border-gray-200 rounded-lg px-4 py-4 mb-6 text-sm text-gray-500 font-bold flex items-center justify-center text-center">
                Applied automatically at checkout
              </div>
              <Link to="/hosting" className="block bg-primary hover:bg-[#a30000] text-white text-center w-full rounded-xl py-3.5 font-bold transition-colors shadow-[0_2px_12px_rgba(0,0,0,0.08)]">Claim Offer</Link>
            </div>

            {/* 4: VPS First Month */}
            <div className={`bg-white border border-gray-200 rounded-3xl p-8 flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.08)] ${activeFilter === 'all' || activeFilter === 'vps' ? 'block' : 'hidden'}`}>
              <div className="flex items-center justify-between mb-6">
                <span className="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">30% OFF</span>
              </div>
              <h3 className="text-xl font-black text-dark mb-3 font-heading">VPS First Month Discount</h3>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-6 font-medium">Test drive our hyper-fast localized VPS instances. Get your first month at 30% off.</p>
              
              <div className="flex-1"></div>
              <PromoPill code="VPS30" />
              <Link to="/vps-server" className="block bg-primary hover:bg-[#a30000] text-white text-center w-full rounded-xl py-3.5 font-bold transition-colors shadow-[0_2px_12px_rgba(0,0,0,0.08)]">Claim Offer</Link>
            </div>

            {/* 5: n8n Bonus */}
            <div className={`bg-white border border-gray-200 rounded-3xl p-8 flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.08)] ${activeFilter === 'all' || activeFilter === 'n8n' ? 'block' : 'hidden'}`}>
              <div className="flex items-center justify-between mb-6">
                <span className="bg-success text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">2 MONTHS FREE</span>
              </div>
              <h3 className="text-xl font-black text-dark mb-3 font-heading">n8n Annual Plan Bonus</h3>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-6 font-medium">Pay for 10 months upfront, and we will grant you 12 full months of dedicated n8n hosting.</p>
              
              <div className="flex-1"></div>
              <div className="bg-muted border border-gray-200 rounded-lg px-4 py-4 mb-6 text-sm text-gray-500 font-bold flex items-center justify-center text-center">
                Applied automatically at checkout
              </div>
              <Link to="/n8n-automation" className="block bg-primary hover:bg-[#a30000] text-white text-center w-full rounded-xl py-3.5 font-bold transition-colors shadow-[0_2px_12px_rgba(0,0,0,0.08)]">Claim Offer</Link>
            </div>

            {/* 6: .XYZ Deal */}
            <div className={`bg-white border border-gray-200 rounded-3xl p-8 flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.08)] ${activeFilter === 'all' || activeFilter === 'domains' ? 'block' : 'hidden'}`}>
              <div className="flex items-center justify-between mb-6">
                <span className="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">DISCOUNT</span>
              </div>
              <h3 className="text-xl font-black text-dark mb-3 font-heading">.XYZ Domain for ৳99</h3>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-6 font-medium">Register your standard .xyz domain for just ৳99/yr — normally ৳599/yr. Limited redemptions.</p>
              
              <div className="flex-1"></div>
              <PromoPill code="XYZ99" />
              <Link to="/domain" className="block bg-primary hover:bg-[#a30000] text-white text-center w-full rounded-xl py-3.5 font-bold transition-colors shadow-[0_2px_12px_rgba(0,0,0,0.08)]">Claim Offer</Link>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== SECTION 4: REFERRAL PROGRAM ===================== */}
      <section className="py-24 bg-muted px-4 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-dark font-heading mb-4 tracking-tight">Refer a Friend, Earn ৳500</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto font-medium">No cap on referrals. Paid out on every confirmed signup.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-transparent hover:border-primary/20 transition-colors">
              <div className="text-6xl font-black text-primary mb-6">1</div>
              <h3 className="text-xl font-black text-dark mb-3">Get Your Link</h3>
              <p className="text-gray-500 text-[15px] leading-relaxed font-medium">Generate your unique tracking link directly from the client dashboard.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-transparent hover:border-primary/20 transition-colors">
              <div className="text-6xl font-black text-primary mb-6">2</div>
              <h3 className="text-xl font-black text-dark mb-3">Share & Invite</h3>
              <p className="text-gray-500 text-[15px] leading-relaxed font-medium">Have your friends, customers, or audience click through to purchase any plan.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-transparent hover:border-primary/20 transition-colors">
              <div className="text-6xl font-black text-primary mb-6">3</div>
              <h3 className="text-xl font-black text-dark mb-3">Collect Cash</h3>
              <p className="text-gray-500 text-[15px] leading-relaxed font-medium">Earn an automatic ৳500 account yield per valid registration.</p>
            </div>

          </div>

          <div className="text-center">
            <a href="#" className="inline-block bg-primary hover:bg-[#a30000] text-white font-bold px-10 py-5 rounded-xl text-lg transition-colors shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-transparent">
              Get Your Referral Link
            </a>
          </div>

        </div>
      </section>

      {/* ===================== SECTION 5: SPECIAL PACKAGES ===================== */}
      <section className="py-24 bg-light px-4">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-dark font-heading tracking-tight">Special Packages</h2>
            <p className="text-gray-600 mt-3 text-lg font-medium">High utility configurations for specific use cases.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Student Hosting */}
            <div className="bg-white border-[3px] border-primary rounded-3xl p-10 lg:p-12 shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex flex-col relative">
              <div className="mb-6">
                <span className="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">STUDENT EXCLUSIVE</span>
              </div>
              <h3 className="text-3xl font-black text-dark mb-3 font-heading tracking-tight">Student Hosting</h3>
              <p className="text-gray-600 text-[15px] font-medium mb-8 leading-relaxed">Verified students receive an aggressive discount targeting early deployments. Build portfolios cheap.</p>
              
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-[15px] font-semibold text-dark"><div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div> Free .xyz domain registration</li>
                <li className="flex items-center gap-3 text-[15px] font-semibold text-dark"><div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div> Starter tier storage capability</li>
                <li className="flex items-center gap-3 text-[15px] font-semibold text-dark"><div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div> Full cPanel control access</li>
              </ul>

              <div className="mt-auto">
                <div className="text-gray-400 text-sm line-through mb-1 font-bold">৳199/yr</div>
                <div className="text-5xl font-black text-dark mb-8 tracking-tighter">৳99<span className="text-xl font-bold text-gray-500">/yr</span></div>
                
                <PromoPill code="STUDENT50" />
                <Link to="/hosting" className="block bg-dark hover:bg-black text-white font-bold rounded-xl px-7 py-4 text-center transition-colors shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                  Apply Now
                </Link>
              </div>
            </div>

            {/* Startup Package */}
            <div className="bg-muted border border-gray-200 rounded-3xl p-10 lg:p-12 shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex flex-col">
              <div className="mb-6">
                <span className="bg-dark text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">BUSINESS IN A BOX</span>
              </div>
              <h3 className="text-3xl font-black text-dark mb-3 font-heading tracking-tight">Startup Package</h3>
              <p className="text-gray-600 text-[15px] font-medium mb-8 leading-relaxed">Everything needed to establish and launch a digital startup presence immediately.</p>
              
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-[15px] font-semibold text-dark"><div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div> 5 GB NVMe Enterprise SSD</li>
                <li className="flex items-center gap-3 text-[15px] font-semibold text-dark"><div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div> Free primary .com domain</li>
                <li className="flex items-center gap-3 text-[15px] font-semibold text-dark"><div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div> 5 custom business emails</li>
              </ul>

              <div className="mt-auto">
                <div className="text-red-600 text-sm mb-1 font-bold">Value exceeds ৳4,500/yr</div>
                <div className="text-5xl font-black text-dark mb-8 tracking-tighter">৳2,499<span className="text-xl font-bold text-gray-500">/yr</span></div>
                <Link to="/hosting" className="block bg-primary hover:bg-[#a30000] text-white font-bold rounded-xl px-7 py-4 text-center transition-colors mt-auto shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                  Launch My Startup
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== SECTION 6: NEWSLETTER ===================== */}
      <section className="py-24 bg-dark px-4 border-t-4 border-primary">
        <div className="max-w-3xl mx-auto text-center">
          
          <h2 className="text-4xl font-black text-white mb-6 font-heading tracking-tight">Flash sales go fast. Get 24hr early access.</h2>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6">
            <input
              type="email"
              placeholder="name@company.com"
              className="flex-1 rounded-xl px-6 py-4 text-dark bg-white focus:outline-none focus:ring-4 ring-primary/50 text-[15px] font-semibold shadow-inner"
              required
            />
            <button
              type="button"
              className="bg-primary hover:bg-white hover:text-primary text-white rounded-xl px-8 py-4 font-black transition-colors whitespace-nowrap shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-transparent hover:border-primary"
            >
              Get Early Access
            </button>
          </form>
          
          <p className="text-gray-400 text-sm font-medium">No spam. Unsubscribe any time.</p>

        </div>
      </section>

    </div>
  );
}
