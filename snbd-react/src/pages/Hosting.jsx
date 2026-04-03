import { useState } from 'react'

export default function HostingPage() {
  const [tab, setTab] = useState('annual')

  return (
    <>
      {/* HERO */}
      <section className="gradient-hero pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <span>⚡</span>
              <span>cPanel Hosting in Bangladesh</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight mb-6">
              Host smarter,<br />
              <span className="text-primary">faster,</span> and easier
            </h1>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
              <span className="badge-float inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"><i className="fa-brands fa-google text-xs"></i> Google</span>
              <span className="badge-float inline-flex items-center gap-1.5 bg-bg-subtle text-text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-md"><i className="fa-brands fa-apple text-xs"></i> Apple</span>
              <span className="badge-float inline-flex items-center gap-1.5 bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"><i className="fa-brands fa-facebook text-xs"></i> Facebook</span>
              <span className="badge-float inline-flex items-center gap-1.5 bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"><i className="fa-brands fa-tiktok text-xs"></i> TikTok</span>
              <span className="badge-float inline-flex items-center gap-1.5 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"><i className="fa-brands fa-firefox-browser text-xs"></i> Firefox</span>
              <span className="badge-float inline-flex items-center gap-1.5 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"><i className="fa-brands fa-spotify text-xs"></i> Spotify</span>
            </div>
            <p className="text-gray-500 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Your domain idea shouldn't live in your notes app forever. Pick a plan, launch your site, and grow with a host that scales with you.
            </p>
            <a href="#pricing" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
              Get Started <span className="text-xl">→</span>
            </a>
          </div>

          {/* Browser Preview */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-slate-nav rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-slate-800 px-5 py-3 flex items-center gap-3 border-b border-slate-700">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 bg-slate-700 rounded-md px-4 py-1.5 flex items-center gap-2">
                  <i className="fa-solid fa-lock text-green-400 text-xs"></i>
                  <span className="text-gray-400 text-xs font-mono">https://yourcoolwebsite.com/wp-admin</span>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                  {[
                    {label:'Storage Used',val:'2.4 GB',bar:'bg-primary',w:'w-2/5'},
                    {label:'Bandwidth',val:'18 GB',bar:'bg-red-500',w:'w-1/5'},
                    {label:'Active Sites',val:'3',extra:<div className="mt-1 text-green-400 text-xs font-medium">● All Online</div>},
                    {label:'Email Accounts',val:'12/25',bar:'bg-yellow-400',w:'w-1/2'},
                  ].map(({label,val,bar,w,extra}) => (
                    <div key={label} className="bg-slate-700/60 rounded-xl p-3 sm:p-4">
                      <div className="text-[#9CA3AF] text-xs mb-1">{label}</div>
                      <div className="text-white font-bold text-lg">{val}</div>
                      {bar && <div className="mt-2 bg-[#F0F1F4] rounded-full h-1.5"><div className={`${bar} h-1.5 rounded-full ${w}`}></div></div>}
                      {extra}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="inline-flex items-center gap-2 bg-green-900/40 border border-green-700/50 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full"><i className="fa-solid fa-shield-halved text-xs"></i> ✓ SSL Active</span>
                  <span className="inline-flex items-center gap-2 bg-red-900/40 border border-red-700/50 text-red-400 text-xs font-semibold px-3 py-1.5 rounded-full"><i className="fa-solid fa-chart-line text-xs"></i> 99.9% Uptime</span>
                  <span className="inline-flex items-center gap-2 bg-purple-900/40 border border-purple-700/50 text-purple-400 text-xs font-semibold px-3 py-1.5 rounded-full"><i className="fa-solid fa-bolt text-xs"></i> NVMe SSD Active</span>
                  <span className="inline-flex items-center gap-2 bg-orange-900/40 border border-orange-700/50 text-orange-400 text-xs font-semibold px-3 py-1.5 rounded-full"><i className="fa-solid fa-database text-xs"></i> Backup: Today 3:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="section-subtle py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">Transparent Pricing Made Simple.</h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">Get fast, secure shared hosting with cPanel, free SSL, weekly backups &amp; 24/7 support.</p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-bg-card border border-gray-200 rounded-full p-1 shadow-sm gap-1">
              <button
                onClick={() => setTab('annual')}
                className={`tab-btn px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${tab === 'annual' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >Annual</button>
              <button
                onClick={() => setTab('monthly')}
                className={`tab-btn px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${tab === 'monthly' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >Monthly</button>
            </div>
          </div>

          {tab === 'annual' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Starter Annual */}
              <div className="bg-bg-card border border-gray-200 rounded-2xl shadow-sm hover:border-brand-redSoft hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col">
                <div className="p-7 pb-5">
                  <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest mb-2">Starter</div>
                  <div className="inline-block bg-[#F0F1F4] text-gray-500 text-xs font-medium px-3 py-1 rounded-full mb-5">Personal website, portfolio, static blog</div>
                  <div className="flex items-end gap-2 mb-1"><span className="text-5xl font-black text-gray-900">৳99</span><span className="text-gray-500 font-medium mb-2">/yr</span></div>
                  <div className="text-sm text-[#9CA3AF] mb-6">Was <span className="line-through">৳199</span> — Save 50%</div>
                  <a href="https://my.snbdhost.com/cart.php" className="block w-full text-center border-2 border-primary text-primary font-bold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors duration-200">Get Started</a>
                </div>
                <div className="px-7 pb-7 pt-2 border-t border-[#E5E7EB] flex-1">
                  <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide mb-4 pt-4">What's included</p>
                  <ul className="space-y-2.5">
                    {['1 GB NVMe SSD Storage','50 GB Bandwidth (Hard Limit)','2 Websites (1 main domain)','5 Email Accounts','5 MySQL Databases','512 MB Memory (RAM)','USA-based data center','cPanel Control Panel','1-click App Installer (WordPress, Laravel, etc.)','Free SSL Certificate (Auto HTTPS)','Weekly Backup (files & databases)'].map(f=>(
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-500"><i className="fa-solid fa-circle-check text-green-500 mt-0.5 shrink-0"></i> {f}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Basic Annual FEATURED */}
              <div className="bg-primary rounded-2xl overflow-hidden flex flex-col relative shadow-2xl shadow-red-200 md:-mt-4 md:mb-0 z-10">
                <div className="bg-red-700 text-white text-xs font-bold text-center py-2 tracking-wide">Recommended ⭐ Most Popular</div>
                <div className="p-7 pb-5">
                  <div className="text-xs font-semibold text-red-200 uppercase tracking-widest mb-2">Basic</div>
                  <div className="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full mb-5">Small businesses, agencies with a few clients</div>
                  <div className="flex items-end gap-2 mb-1"><span className="text-5xl font-black text-white">৳199</span><span className="text-red-200 font-medium mb-2">/yr</span></div>
                  <div className="text-sm text-red-200 mb-6">Was <span className="line-through">৳399</span> — Save 50%</div>
                  <a href="https://my.snbdhost.com/cart.php" className="block w-full text-center bg-[#FFFFFF] text-primary font-bold py-3 rounded-xl hover:bg-[#F0F1F4] transition-colors duration-200 shadow-lg">Get Started</a>
                </div>
                <div className="px-7 pb-7 pt-2 border-t border-white/20 flex-1">
                  <p className="text-xs font-semibold text-red-200 uppercase tracking-wide mb-4 pt-4">What's included</p>
                  <ul className="space-y-2.5">
                    {['5 GB NVMe SSD Storage','100 GB Bandwidth (Hard Limit)','Host up to 3 Websites','25 Email Accounts','100 MySQL Databases','1 GB Memory (RAM)','USA-based data center','cPanel Control Panel','1-click App Installer (WordPress, Laravel, etc.)','Free SSL Certificate (Auto HTTPS)','Weekly Backup (files & databases)','SSH Access'].map(f=>(
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white"><i className="fa-solid fa-circle-check text-white mt-0.5 shrink-0"></i> {f}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Web Pro Annual */}
              <div className="bg-bg-card border border-gray-200 rounded-2xl shadow-sm hover:border-brand-redSoft hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col">
                <div className="p-7 pb-5">
                  <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest mb-2">Web Professional</div>
                  <div className="inline-block bg-[#F0F1F4] text-gray-500 text-xs font-medium px-3 py-1 rounded-full mb-5">High-traffic sites, mini-resellers, agencies</div>
                  <div className="flex items-end gap-2 mb-1"><span className="text-5xl font-black text-gray-900">৳399</span><span className="text-gray-500 font-medium mb-2">/yr</span></div>
                  <div className="text-sm text-[#9CA3AF] mb-6">Was <span className="line-through">৳799</span> — Save 50%</div>
                  <a href="https://my.snbdhost.com/cart.php" className="block w-full text-center border-2 border-primary text-primary font-bold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors duration-200">Get Started</a>
                </div>
                <div className="px-7 pb-7 pt-2 border-t border-[#E5E7EB] flex-1">
                  <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide mb-4 pt-4">What's included</p>
                  <ul className="space-y-2.5">
                    {['10 GB NVMe SSD Storage','200 GB Bandwidth (Hard Limit)','Host up to 5 Websites','Unlimited MySQL Databases','1.5 GB Memory (RAM)','USA-based data center','cPanel Control Panel','1-click App Installer (WordPress, Laravel, etc.)','Free SSL Certificate (Auto HTTPS)','Weekly Backup (files & databases)','Jailed SSH & SFTP Access'].map(f=>(
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-500"><i className="fa-solid fa-circle-check text-green-500 mt-0.5 shrink-0"></i> {f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {tab === 'monthly' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Starter Monthly */}
              <div className="bg-bg-card border border-gray-200 rounded-2xl shadow-sm hover:border-brand-redSoft hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col">
                <div className="p-7 pb-5">
                  <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest mb-2">Starter</div>
                  <div className="inline-block bg-[#F0F1F4] text-gray-500 text-xs font-medium px-3 py-1 rounded-full mb-5">Personal website, portfolio, static blog</div>
                  <div className="flex items-end gap-2 mb-1"><span className="text-5xl font-black text-gray-900">৳15</span><span className="text-gray-500 font-medium mb-2">/mo</span></div>
                  <div className="text-sm text-[#9CA3AF] mb-6">Billed monthly — save more annually</div>
                  <a href="https://my.snbdhost.com/cart.php" className="block w-full text-center border-2 border-primary text-primary font-bold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors duration-200">Get Started</a>
                </div>
                <div className="px-7 pb-7 pt-2 border-t border-[#E5E7EB] flex-1">
                  <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide mb-4 pt-4">What's included</p>
                  <ul className="space-y-2.5">
                    {['1 GB NVMe SSD Storage','50 GB Bandwidth (Hard Limit)','2 Websites (1 main domain)','5 Email Accounts','5 MySQL Databases','512 MB Memory (RAM)','USA-based data center','cPanel Control Panel','1-click App Installer','Free SSL Certificate','Weekly Backup'].map(f=>(
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-500"><i className="fa-solid fa-circle-check text-green-500 mt-0.5 shrink-0"></i> {f}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Basic Monthly FEATURED */}
              <div className="bg-primary rounded-2xl overflow-hidden flex flex-col relative shadow-2xl shadow-red-200 md:-mt-4 z-10">
                <div className="bg-red-700 text-white text-xs font-bold text-center py-2 tracking-wide">Recommended ⭐ Most Popular</div>
                <div className="p-7 pb-5">
                  <div className="text-xs font-semibold text-red-200 uppercase tracking-widest mb-2">Basic</div>
                  <div className="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full mb-5">Small businesses, agencies with a few clients</div>
                  <div className="flex items-end gap-2 mb-1"><span className="text-5xl font-black text-white">৳25</span><span className="text-red-200 font-medium mb-2">/mo</span></div>
                  <div className="text-sm text-red-200 mb-6">Billed monthly — save more annually</div>
                  <a href="https://my.snbdhost.com/cart.php" className="block w-full text-center bg-[#FFFFFF] text-primary font-bold py-3 rounded-xl hover:bg-[#F0F1F4] transition-colors duration-200 shadow-lg">Get Started</a>
                </div>
                <div className="px-7 pb-7 pt-2 border-t border-white/20 flex-1">
                  <p className="text-xs font-semibold text-red-200 uppercase tracking-wide mb-4 pt-4">What's included</p>
                  <ul className="space-y-2.5">
                    {['5 GB NVMe SSD Storage','100 GB Bandwidth (Hard Limit)','Host up to 3 Websites','25 Email Accounts','100 MySQL Databases','1 GB Memory (RAM)','USA-based data center','cPanel Control Panel','1-click App Installer','Free SSL Certificate','Weekly Backup','SSH Access'].map(f=>(
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white"><i className="fa-solid fa-circle-check text-white mt-0.5 shrink-0"></i> {f}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Web Pro Monthly */}
              <div className="bg-bg-card border border-gray-200 rounded-2xl shadow-sm hover:border-brand-redSoft hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col">
                <div className="p-7 pb-5">
                  <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest mb-2">Web Professional</div>
                  <div className="inline-block bg-[#F0F1F4] text-gray-500 text-xs font-medium px-3 py-1 rounded-full mb-5">High-traffic sites, mini-resellers, agencies</div>
                  <div className="flex items-end gap-2 mb-1"><span className="text-5xl font-black text-gray-900">৳45</span><span className="text-gray-500 font-medium mb-2">/mo</span></div>
                  <div className="text-sm text-[#9CA3AF] mb-6">Billed monthly — save more annually</div>
                  <a href="https://my.snbdhost.com/cart.php" className="block w-full text-center border-2 border-primary text-primary font-bold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors duration-200">Get Started</a>
                </div>
                <div className="px-7 pb-7 pt-2 border-t border-[#E5E7EB] flex-1">
                  <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide mb-4 pt-4">What's included</p>
                  <ul className="space-y-2.5">
                    {['10 GB NVMe SSD Storage','200 GB Bandwidth (Hard Limit)','Host up to 5 Websites','Unlimited MySQL Databases','1.5 GB Memory (RAM)','USA-based data center','cPanel Control Panel','1-click App Installer','Free SSL Certificate','Weekly Backup','Jailed SSH & SFTP Access'].map(f=>(
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-500"><i className="fa-solid fa-circle-check text-green-500 mt-0.5 shrink-0"></i> {f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 40% OFF BANNER */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Grab up to 40% off when you<br className="hidden sm:block" />
            purchase any plans annually!
          </h2>
          <p className="text-red-200 text-base sm:text-lg mb-8">Lock in the best price today. Annual plans renew at the same low rate.</p>
          <a href="#pricing" className="inline-flex items-center gap-2 bg-[#FFFFFF] text-primary font-bold text-base sm:text-lg px-8 py-4 rounded-full border-2 border-white hover:bg-transparent hover:text-white transition-all duration-200 shadow-lg">
            View Annual Plans
          </a>
        </div>
      </section>

      {/* ENTERPRISE PLANS */}
      <section className="section-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-[#F0F1F4] text-gray-500 text-xs font-semibold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">Enterprise Plans</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">Scale Without Limits</h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">Enterprise-grade hosting for high-traffic applications and growing agencies</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Plan A */}
            <div className="enterprise-card bg-bg-card border border-gray-200 rounded-2xl shadow-sm hover:border-brand-redSoft hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col hover:border-primary/30">
              <div className="p-7 border-b border-[#E5E7EB]">
                <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest mb-3">Plan A</div>
                <div className="flex items-end gap-2"><span className="text-4xl font-black text-gray-900">৳799</span><span className="text-gray-500 font-medium mb-1">/yr</span></div>
              </div>
              <div className="p-7 flex-1">
                <div className="space-y-3">
                  {[{icon:'fa-hard-drive',bg:'bg-red-50',color:'text-primary',label:'Storage',val:'40 GB NVMe SSD'},{icon:'fa-network-wired',bg:'bg-red-50',color:'text-red-500',label:'Bandwidth',val:'500 GB'},{icon:'fa-memory',bg:'bg-purple-50',color:'text-purple-500',label:'RAM',val:'3 GB'},{icon:'fa-globe',bg:'bg-green-50',color:'text-green-500',label:'Websites',val:'Up to 15'},{icon:'fa-terminal',bg:'bg-yellow-50',color:'text-yellow-600',label:'SSH Access',val:'Jailed SSH & SFTP'},{icon:'fa-location-dot',bg:'bg-[#F0F1F4]',color:'text-gray-500',label:'Location',val:'USA Based'},{icon:'fa-sliders',bg:'bg-orange-50',color:'text-orange-500',label:'Control Panel',val:'cPanel + Features'}].map(({icon,bg,color,label,val})=>(
                    <div key={label} className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center shrink-0`}><i className={`fa-solid ${icon} ${color} text-xs`}></i></div>
                      <div><div className="text-xs text-[#9CA3AF]">{label}</div><div className="text-sm font-semibold text-gray-500">{val}</div></div>
                    </div>
                  ))}
                  <div className="bg-gray-50 rounded-xl p-3 mt-2">
                    <div className="text-xs text-[#9CA3AF] mb-1">Security</div>
                    <div className="text-sm text-gray-500">Free Basic cPanel Security &amp; Protection</div>
                    <div className="text-sm text-gray-500 mt-1">Basic Spam Score Scan</div>
                  </div>
                </div>
              </div>
              <div className="px-7 pb-7"><a href="https://my.snbdhost.com/cart.php" className="block w-full text-center bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors duration-200 shadow-sm">Get Started</a></div>
            </div>
            {/* Plan B FEATURED */}
            <div className="enterprise-card bg-[#FFFFFF] rounded-2xl border-2 border-primary overflow-hidden flex flex-col relative shadow-xl shadow-red-100 md:-mt-4">
              <div className="bg-primary text-white text-xs font-bold text-center py-2.5 tracking-wide">⭐ Best Value Enterprise</div>
              <div className="p-7 border-b border-[#E5E7EB]">
                <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Plan B</div>
                <div className="flex items-end gap-2"><span className="text-4xl font-black text-gray-900">৳1299</span><span className="text-gray-500 font-medium mb-1">/yr</span></div>
              </div>
              <div className="p-7 flex-1">
                <div className="space-y-3">
                  {[{icon:'fa-hard-drive',bg:'bg-red-50',color:'text-primary',label:'Storage',val:'60 GB NVMe SSD'},{icon:'fa-network-wired',bg:'bg-red-50',color:'text-red-500',label:'Bandwidth',val:'700 GB (Hard Limit)'},{icon:'fa-memory',bg:'bg-purple-50',color:'text-purple-500',label:'RAM',val:'4 GB CloudLinux RAM'},{icon:'fa-globe',bg:'bg-green-50',color:'text-green-500',label:'Websites',val:'Up to 20 Separate'},{icon:'fa-terminal',bg:'bg-yellow-50',color:'text-yellow-600',label:'SSH Access',val:'Jailed SSH & SFTP'},{icon:'fa-location-dot',bg:'bg-[#F0F1F4]',color:'text-gray-500',label:'Location',val:'USA Based'},{icon:'fa-sliders',bg:'bg-orange-50',color:'text-orange-500',label:'Control Panel',val:'cPanel + Features'}].map(({icon,bg,color,label,val})=>(
                    <div key={label} className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center shrink-0`}><i className={`fa-solid ${icon} ${color} text-xs`}></i></div>
                      <div><div className="text-xs text-[#9CA3AF]">{label}</div><div className="text-sm font-semibold text-gray-500">{val}</div></div>
                    </div>
                  ))}
                  <div className="bg-red-50 rounded-xl p-3 mt-2 border border-red-100">
                    <div className="text-xs text-primary font-semibold mb-1">Premium Security</div>
                    <div className="text-sm text-gray-500 flex items-start gap-1.5"><i className="fa-solid fa-shield-halved text-primary text-xs mt-0.5 shrink-0"></i> Real-Time Malware &amp; Threat Protection</div>
                    <div className="text-sm text-gray-500 flex items-start gap-1.5 mt-1"><i className="fa-solid fa-envelope-circle-check text-primary text-xs mt-0.5 shrink-0"></i> Premium Anti-Spam &amp; Email Security</div>
                  </div>
                </div>
              </div>
              <div className="px-7 pb-7"><a href="https://my.snbdhost.com/cart.php" className="block w-full text-center bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors duration-200 shadow-sm">Get Started</a></div>
            </div>
            {/* Plan C */}
            <div className="enterprise-card bg-bg-card border border-gray-200 rounded-2xl shadow-sm hover:border-brand-redSoft hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col hover:border-primary/30">
              <div className="p-7 border-b border-[#E5E7EB]">
                <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest mb-3">Plan C</div>
                <div className="flex items-end gap-2"><span className="text-4xl font-black text-gray-900">৳1999</span><span className="text-gray-500 font-medium mb-1">/yr</span></div>
              </div>
              <div className="p-7 flex-1">
                <div className="space-y-3">
                  {[{icon:'fa-hard-drive',bg:'bg-red-50',color:'text-primary',label:'Storage',val:'100 GB NVMe SSD'},{icon:'fa-network-wired',bg:'bg-red-50',color:'text-red-500',label:'Bandwidth',val:'1 TB (Hard Limit)'},{icon:'fa-memory',bg:'bg-purple-50',color:'text-purple-500',label:'RAM',val:'8 GB'},{icon:'fa-globe',bg:'bg-green-50',color:'text-green-500',label:'Websites',val:'Unlimited (40+ sites)'},{icon:'fa-terminal',bg:'bg-yellow-50',color:'text-yellow-600',label:'SSH Access',val:'Jailed SSH & SFTP'},{icon:'fa-location-dot',bg:'bg-[#F0F1F4]',color:'text-gray-500',label:'Location',val:'USA Based'},{icon:'fa-sliders',bg:'bg-orange-50',color:'text-orange-500',label:'Control Panel',val:'cPanel + Features'}].map(({icon,bg,color,label,val})=>(
                    <div key={label} className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center shrink-0`}><i className={`fa-solid ${icon} ${color} text-xs`}></i></div>
                      <div><div className="text-xs text-[#9CA3AF]">{label}</div><div className="text-sm font-semibold text-gray-500">{val}</div></div>
                    </div>
                  ))}
                  <div className="bg-gray-50 rounded-xl p-3 mt-2">
                    <div className="text-xs text-[#9CA3AF] font-semibold mb-1">Premium Security</div>
                    <div className="text-sm text-gray-500 flex items-start gap-1.5"><i className="fa-solid fa-shield-halved text-gray-500 text-xs mt-0.5 shrink-0"></i> Real-Time Malware &amp; Threat Protection</div>
                    <div className="text-sm text-gray-500 flex items-start gap-1.5 mt-1"><i className="fa-solid fa-envelope-circle-check text-gray-500 text-xs mt-0.5 shrink-0"></i> Premium Anti-Spam &amp; Email Security</div>
                  </div>
                </div>
              </div>
              <div className="px-7 pb-7"><a href="https://my.snbdhost.com/cart.php" className="block w-full text-center bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors duration-200 shadow-sm">Get Started</a></div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS & PARTNERS */}
      <section className="section-subtle py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">
              We use Exclusive Licensed Tools<br className="hidden md:block" /> to make your web hosting journey easier
            </h2>
            <p className="text-gray-500 text-base sm:text-lg">Each package is included with:</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="tool-card bg-[#FFFFFF] rounded-2xl p-8 text-center shadow-sm border border-[#E5E7EB]">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-5"><span className="text-2xl font-black text-orange-600">cP</span></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">cPanel</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Industry standard control panel trusted by millions of web hosts worldwide</p>
              <div className="mt-4 inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full"><i className="fa-solid fa-certificate text-xs"></i> Licensed</div>
            </div>
            <div className="tool-card bg-[#FFFFFF] rounded-2xl p-8 text-center shadow-sm border border-[#E5E7EB]">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5"><i className="fa-solid fa-jet-fighter-up text-red-600 text-2xl"></i></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">JetBackup</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Advanced backup &amp; restore system with scheduled backups and one-click recovery</p>
              <div className="mt-4 inline-flex items-center gap-1.5 bg-red-50 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-full"><i className="fa-solid fa-certificate text-xs"></i> Licensed</div>
            </div>
            <div className="tool-card bg-[#FFFFFF] rounded-2xl p-8 text-center shadow-sm border border-[#E5E7EB]">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5"><i className="fa-solid fa-screwdriver-wrench text-green-600 text-2xl"></i></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Softaculous</h3>
              <p className="text-gray-500 text-sm leading-relaxed">1-click app installer supporting 500+ applications including WordPress, Laravel &amp; more</p>
              <div className="mt-4 inline-flex items-center gap-1.5 bg-green-50 text-green-600 text-xs font-semibold px-3 py-1.5 rounded-full"><i className="fa-solid fa-certificate text-xs"></i> Licensed</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[{bg:'bg-green-100',color:'text-green-600',title:'Auto Installer for 500+ Applications',sub:'WordPress, Laravel, Joomla & more'},{bg:'bg-red-100',color:'text-red-600',title:'Backup Scheduler & MultiPHP Management',sub:'Automated, reliable, restorable backups'},{bg:'bg-purple-100',color:'text-purple-600',title:'Powered by AI-driven Bots',sub:'Smart monitoring & threat detection'}].map(({bg,color,title,sub})=>(
              <div key={title} className="flex items-center gap-3 bg-[#FFFFFF] rounded-xl p-5 border border-[#E5E7EB] shadow-sm">
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center shrink-0`}><i className={`fa-solid fa-check ${color} text-sm`}></i></div>
                <div><div className="text-sm font-semibold text-gray-800">{title}</div><div className="text-xs text-[#9CA3AF] mt-0.5">{sub}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TRUST */}
      <section className="section-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">Why Thousands Trust SNBD HOST</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {[{emoji:'🚀',stat:'2,450+',label:'Active Websites Hosted'},{emoji:'⚡',stat:'99.9%',label:'Uptime Guarantee'},{emoji:'🌍',stat:'3',label:'Data Center Locations'},{emoji:'⭐',stat:'24/7',label:'Expert Support'}].map(({emoji,stat,label})=>(
              <div key={label} className="stat-card bg-[#FFFFFF] border-2 border-[#E5E7EB] hover:border-primary/20 rounded-2xl p-6 sm:p-8 text-center">
                <div className="text-3xl sm:text-4xl mb-3">{emoji}</div>
                <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">{stat}</div>
                <div className="text-sm text-gray-500 font-medium">{label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
            Join the growing community of businesses and developers who trust SNBD HOST for their hosting needs.
          </p>
        </div>
      </section>
    </>
  )
}
