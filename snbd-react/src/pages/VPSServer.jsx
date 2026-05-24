import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import JsonLd from '../components/JsonLd';
import { pageMeta } from '../seo/pageMeta';

export default function VPSServer() {
  const [billingTab, setBillingTab] = useState('monthly');
  const [location, setLocation] = useState('sg');
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "Do I get full root access?",
      answer: "Yes, all our Linux VPS plans come with full root access, giving you complete control over your server environment and the ability to install any custom software."
    },
    {
      question: "Which operating systems do you support?",
      answer: "We support a wide range of Linux distributions including Ubuntu, Debian, CentOS, AlmaLinux, and Rocky Linux. You can install or reinstall them in 1-click from the dashboard."
    },
    {
      question: "Are the resources dedicated?",
      answer: "Yes, our KVM virtualization ensures that your RAM, CPU cores, and NVMe storage are strictly dedicated to your virtual server and never oversold."
    },
    {
      question: "Do you provide automated backups?",
      answer: "We provide automated weekly backups by default. You can also create manual snapshots instantly before making major changes to your server."
    }
  ];

  const sgPlans = [
    { name: 'SG VPS 2G', link: 'https://portal.snbdhost.com/store/sg-vps/sg-vps-2g', desc: 'Perfect for light web servers, VPNs, or personal projects.', priceM: 1547, priceY: 18567, cpu: 2, ram: '2 GB', disk: '40 GB', bw: '0.5 TB' },
    { name: 'SG VPS 4G', link: 'https://portal.snbdhost.com/store/sg-vps/sg-vps-4g', desc: 'Ideal for WordPress sites, small databases, and bot hosting.', priceM: 2857, priceY: 34287, cpu: 2, ram: '4 GB', disk: '80 GB', bw: '1 TB', popular: true },
    { name: 'SG VPS 8G', link: 'https://portal.snbdhost.com/store/sg-vps/sg-vps-8g', desc: 'Optimized for MERN stack apps, n8n automation, and staging.', priceM: 5087, priceY: 61047, cpu: 4, ram: '8 GB', disk: '160 GB', bw: '2 TB' },
    { name: 'SG VPS 16G', link: 'https://portal.snbdhost.com/store/sg-vps/sg-vps-16g', desc: 'Built for high-traffic websites, eCommerce, and production APIs.', priceM: 10087, priceY: 121047, cpu: 8, ram: '16 GB', disk: '320 GB', bw: '3 TB' },
    { name: 'SG VPS 24G', link: 'https://portal.snbdhost.com/store/sg-vps/sg-vps-24g', desc: 'Enterprise-grade power for heavy workloads and resource-intensive SaaS.', priceM: 15087, priceY: 181047, cpu: 12, ram: '24 GB', disk: '480 GB', bw: '4 TB' },
    { name: 'SG VPS 32G', link: 'https://portal.snbdhost.com/store/sg-vps/sg-vps-32g', desc: 'Maximum performance for massive databases and enterprise scale.', priceM: 20077, priceY: 240927, cpu: 16, ram: '32 GB', disk: '640 GB', bw: '5 TB' },
  ];

  const usaPlans = [
    { name: 'USA VPS 2G', desc: 'Ideal for lightweight automation and US-based proxy/VPN needs.', priceM: 897, priceY: 10797, cpu: 2, ram: '2 GB', disk: '40 GB', bw: '1 TB' },
    { name: 'USA VPS 4G', desc: 'Great for small application hosting and dev environments.', priceM: 1697, priceY: 20397, cpu: 3, ram: '4 GB', disk: '80 GB', bw: '2 TB', popular: true },
    { name: 'USA VPS 8G', desc: 'Optimized for production-grade web apps and databases.', priceM: 2997, priceY: 35997, cpu: 4, ram: '8 GB', disk: '160 GB', bw: '3 TB' },
    { name: 'USA VPS 16G', desc: 'High-performance computing for intensive data processing.', priceM: 5497, priceY: 65997, cpu: 8, ram: '16 GB', disk: '240 GB', bw: '4 TB' },
    { name: 'USA VPS 32G', desc: 'Maximum power for massive databases and enterprise scale.', priceM: 10897, priceY: 130797, cpu: 16, ram: '32 GB', disk: '360 GB', bw: '5 TB' },
  ];

  const activePlans = location === 'sg' ? sgPlans : usaPlans;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <div className="bg-[#0A0A0A] text-gray-200 font-body selection:bg-primary selection:text-white pb-20">
      <SEOHead {...pageMeta.vpsServer} />
      <JsonLd data={faqSchema} />
      {/* ========== SECTION 1: HERO ========== */}
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        
        <div className="w-full md:w-1/2">
          <div className="inline-flex items-center gap-2 text-gray-400 text-xs font-bold px-3 py-1.5 border border-gray-800 rounded-full mb-6 uppercase tracking-wider bg-gray-900/50">
            <div className={`w-2 h-2 rounded-full animate-pulse ${location === 'sg' ? 'bg-primary' : 'bg-blue-500'}`}></div>
            {location === 'sg' ? 'Singapore Datacenter (SG)' : 'USA Datacenter (US)'}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 transition-all duration-300">
            Instant Deploy {location === 'sg' ? 'Singapore' : 'USA'} VPS Hosting
          </h1>
          
          <ul className="space-y-4 mb-8 text-gray-400 font-medium text-lg">
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-check text-green-500"></i> 
              {location === 'sg' ? 'Low Latency Connectivity for Bangladesh' : 'Premium North American Uplink'}
            </li>
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-check text-green-500"></i> AMD EPYC™ High-Performance CPUs
            </li>
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-check text-green-500"></i> Full Root Access & DDoS Protection
            </li>
          </ul>
          
          <div className="flex items-center gap-6">
            <a href="#pricing" className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-red-900/20">
              View {location === 'sg' ? 'SG' : 'USA'} Plans
            </a>
            <div className="text-sm font-bold text-gray-500 flex items-center gap-2">
              <i className="fa-solid fa-bolt text-yellow-500"></i> Provisioned in 60s
            </div>
          </div>
        </div>

        {/* Hero Graphic: OS Grid */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="grid grid-cols-2 gap-4 w-full max-w-md relative z-10">
            {/* Grid styling to match screenshot */}
            <div className="absolute inset-0 border border-gray-800 rounded-3xl -z-10 scale-[1.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            {[
              { icon: 'fa-ubuntu', color: 'text-orange-500', name: 'Ubuntu' },
              { icon: 'fa-centos', color: 'text-purple-500', name: 'CentOS' },
              { icon: 'fa-fedora', color: 'text-blue-500', name: 'Fedora' },
              { icon: 'fa-linux', color: 'text-yellow-500', name: 'Debian' },
              { icon: 'fa-redhat', color: 'text-red-500', name: 'AlmaLinux' },
              { icon: 'fa-suse', color: 'text-green-500', name: 'Rocky' },
            ].map((os, idx) => (
              <div key={idx} className="bg-[#121212] border border-gray-800 rounded-xl p-4 flex items-center gap-4 hover:border-gray-600 transition-colors shadow-lg">
                <i className={`fa-brands ${os.icon} ${os.color} text-3xl`}></i>
                <div>
                  <div className="font-bold text-white text-sm">{os.name}</div>
                  <div className="text-xs text-green-500 flex items-center gap-1 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Ready
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: PRICING ========== */}
      <section id="pricing" className="py-24 px-4 bg-[#0A0A0A] border-y border-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10">Pick your Linux VPS hosting plan</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            
            {/* Location Toggle */}
            <div className="bg-[#1A1A1A] p-1 rounded-full inline-flex border border-gray-800 shadow-inner">
              <button 
                onClick={() => setLocation('sg')}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${location === 'sg' ? 'bg-primary shadow-sm text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <div className={`w-2 h-2 rounded-full ${location === 'sg' ? 'bg-white' : 'bg-transparent'}`}></div>
                Singapore (SG)
              </button>
              <button 
                onClick={() => setLocation('usa')}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${location === 'usa' ? 'bg-blue-600 shadow-sm text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <div className={`w-2 h-2 rounded-full ${location === 'usa' ? 'bg-white' : 'bg-transparent'}`}></div>
                United States (USA)
              </button>
            </div>

            {/* Billing Toggle */}
            <div className="bg-[#1A1A1A] p-1 rounded-full inline-flex border border-gray-800 shadow-inner">
              <button 
                onClick={() => setBillingTab('monthly')}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${billingTab === 'monthly' ? 'bg-gray-800 shadow-sm text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                1 Month
              </button>
              <button 
                onClick={() => setBillingTab('annual')}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${billingTab === 'annual' ? 'bg-gray-800 shadow-sm text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                12 Months <span className="ml-1 text-[10px] bg-red-900/50 text-red-400 px-2 py-0.5 rounded-full font-black">SAVE 15%</span>
              </button>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {activePlans.map((plan, idx) => (
              <div key={idx} className={`bg-[#121212] border ${plan.popular ? (location === 'sg' ? 'border-primary shadow-[0_0_20px_rgba(208,2,27,0.15)]' : 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]') : 'border-gray-800'} rounded-3xl p-6 flex flex-col relative hover:-translate-y-1 transition-transform duration-300`}>
                {plan.popular && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider ${location === 'sg' ? 'bg-primary' : 'bg-blue-600'}`}>
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-gray-500 mb-4 h-8">{plan.desc}</p>

                <div className="mb-6 border-b border-gray-800 pb-6">
                  <span className="text-3xl font-extrabold text-white">৳{billingTab === 'monthly' ? plan.priceM.toLocaleString() : plan.priceY.toLocaleString()}</span>
                  <span className="text-gray-500 font-medium">/{billingTab === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                
                <a href={plan.link || '#'} className={`block w-full text-center font-bold py-3.5 rounded-xl transition-colors mb-6 border ${plan.popular ? (location === 'sg' ? 'bg-primary hover:bg-primary-dark text-white border-transparent shadow-lg shadow-red-900/20' : 'bg-blue-600 hover:bg-blue-700 text-white border-transparent shadow-lg shadow-blue-900/20') : 'bg-transparent border-gray-700 hover:border-gray-500 text-white'}`}>
                  Deploy {plan.name}
                </a>
                
                <ul className="space-y-3 text-sm text-gray-400 flex-1">
                  <li className="flex items-center gap-3"><i className={`fa-solid fa-microchip w-4 ${location === 'sg' ? 'text-primary' : 'text-blue-500'}`}></i> <strong className="text-white">{plan.cpu} Core</strong> AMD EPYC™</li>
                  <li className="flex items-center gap-3"><i className={`fa-solid fa-memory w-4 ${location === 'sg' ? 'text-primary' : 'text-blue-500'}`}></i> <strong className="text-white">{plan.ram}</strong> DDR4 RAM</li>
                  <li className="flex items-center gap-3"><i className={`fa-solid fa-hard-drive w-4 ${location === 'sg' ? 'text-primary' : 'text-blue-500'}`}></i> <strong className="text-white">{plan.disk}</strong> NVMe Storage</li>
                  <li className="flex items-center gap-3"><i className={`fa-solid fa-network-wired w-4 ${location === 'sg' ? 'text-primary' : 'text-blue-500'}`}></i> <strong className="text-white">{plan.bw}</strong> Bandwidth</li>
                  <li className="flex items-center gap-3"><i className={`fa-solid fa-terminal w-4 ${location === 'sg' ? 'text-primary' : 'text-blue-500'}`}></i> Full Root Access</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 3: FEATURES (Discover Stability) ========== */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Discover stability and flexibility</h2>
            <p className="text-gray-400 leading-relaxed text-lg mb-8">
              Build your projects in a stable and robust environment. Enjoy dedicated resources and isolated hosting for maximum performance without interference.
            </p>
            <p className="text-gray-400 leading-relaxed text-lg mb-10">
              Our hardware node infrastructure utilizes AMD EPYC processors and NVMe SSDs in RAID10 for blazing fast read/write speeds.
            </p>
            <a href="#pricing" className="inline-block bg-white hover:bg-gray-200 text-black font-bold px-8 py-3.5 rounded-xl transition-colors">
              See all plans
            </a>
          </div>
          
          <div className="w-full lg:w-1/2">
            {/* CSS Graphic of a server dashboard */}
            <div className="bg-[#121212] border border-gray-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600"></div>
              
              <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-white"><i className="fa-solid fa-server"></i></div>
                  <div>
                    <div className="text-white font-bold text-sm">snbd-node-01</div>
                    <div className="text-xs text-green-500">Online</div>
                  </div>
                </div>
                <div className="text-gray-500 text-xs">Uptime: 99.99%</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0A0A0A] p-4 rounded-xl border border-gray-800">
                  <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">CPU Usage</div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-white">12%</span>
                    <span className="text-xs text-green-500 mb-1">Stable</span>
                  </div>
                  <div className="w-full bg-gray-900 h-1 mt-3 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[12%]"></div>
                  </div>
                </div>
                
                <div className="bg-[#0A0A0A] p-4 rounded-xl border border-gray-800">
                  <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">RAM Usage</div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-white">4.2<span className="text-base text-gray-400">GB</span></span>
                  </div>
                  <div className="w-full bg-gray-900 h-1 mt-3 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full w-[55%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: DEDICATED RESOURCES ========== */}
      <section className="py-20 px-4 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Get dedicated resources and full control for your Linux VPS</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#121212] border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition-colors">
              <div className="w-16 h-16 bg-[#1A1A1A] border border-gray-800 rounded-xl flex items-center justify-center text-2xl text-blue-400 mb-6">
                <i className="fa-solid fa-clock-rotate-left"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Snapshots & Backups</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Take manual snapshots of your server state before running updates, and restore instantly if anything breaks.
              </p>
            </div>
            
            <div className="bg-[#121212] border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition-colors">
              <div className="w-16 h-16 bg-[#1A1A1A] border border-gray-800 rounded-xl flex items-center justify-center text-2xl text-purple-400 mb-6">
                <i className="fa-solid fa-terminal"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Full Root Control</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Configure your server exactly how you want. Install custom software, modify kernel settings, and manage firewalls.
              </p>
            </div>
            
            <div className="bg-[#121212] border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition-colors">
              <div className="w-16 h-16 bg-[#1A1A1A] border border-gray-800 rounded-xl flex items-center justify-center text-2xl text-red-500 mb-6">
                <i className="fa-solid fa-microchip"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">High Performance</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Powered by AMD EPYC processors and enterprise NVMe SSD arrays to ensure the fastest processing speeds possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 5: GLOBAL NETWORK ========== */}
      <section className="py-24 px-4 bg-[#0A0A0A] border-y border-gray-900 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3">
            <div className="inline-flex items-center gap-2 text-gray-400 text-xs font-bold px-3 py-1.5 border border-gray-800 rounded-full mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              Global Infrastructure
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Reach your audience anywhere</h2>
            <p className="text-gray-400 mb-8">
              Deploy your Linux VPS in our premium USA data centers or our ultra-low latency BDIX connected servers in Dhaka, Bangladesh.
            </p>
            <a href="#pricing" className="inline-block bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
              Deploy Now
            </a>
          </div>
          
          <div className="w-full md:w-2/3 relative h-[300px] md:h-[400px]">
            {/* CSS abstract representation of a map / network nodes */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/40 via-[#0A0A0A] to-[#0A0A0A]"></div>
            
            {/* Nodes */}
            <div className="absolute top-[30%] left-[20%] group">
              <div className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10 relative cursor-pointer"></div>
              <div className="absolute top-6 -left-4 bg-gray-900 border border-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">USA (East)</div>
            </div>
            
            <div className="absolute top-[40%] left-[25%] group">
              <div className="w-3 h-3 bg-red-400 rounded-full shadow-[0_0_10px_rgba(248,113,113,0.8)] z-10 relative cursor-pointer"></div>
            </div>
            
            <div className="absolute top-[45%] right-[30%] group">
              <div className="w-5 h-5 bg-green-500 rounded-full shadow-[0_0_20px_#22c55e] z-10 relative cursor-pointer flex items-center justify-center">
                 <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>
              <div className="absolute top-8 -left-4 bg-gray-900 border border-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded whitespace-nowrap z-20">Dhaka, BD (BDIX)</div>
            </div>
            
            <div className="absolute top-[65%] right-[20%] group">
              <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_#D0021B] z-10 relative cursor-pointer flex items-center justify-center">
              </div>
              <div className="absolute top-6 -left-4 bg-gray-900 border border-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20">Singapore (SG)</div>
            </div>
            
            <div className="absolute top-[35%] right-[45%] group">
              <div className="w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)] z-10 relative cursor-pointer"></div>
            </div>
            
            {/* Connecting lines (svg abstraction) */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 20% 30% Q 40% 10% 70% 45%" fill="transparent" stroke="#fff" strokeWidth="1" strokeDasharray="5,5" />
              <path d="M 20% 30% Q 50% 70% 80% 65%" fill="transparent" stroke="#fff" strokeWidth="1" strokeDasharray="5,5" />
              <path d="M 70% 45% L 80% 65%" fill="transparent" stroke="#fff" strokeWidth="1" strokeDasharray="5,5" />
            </svg>
          </div>
        </div>
      </section>

      {/* ========== SECTION 6: TRUST ========== */}
      <section className="py-20 px-4 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-12 text-center">Tried and trusted VPS hosting company</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#121212] border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <i className="fa-solid fa-star text-green-500 text-xl"></i>
                <span className="text-white font-bold text-lg">Trustpilot</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                "Incredible VPS performance. The I/O speed from the NVMe drives is noticeably faster than my previous provider. BDIX latency is literally 2ms."
              </p>
            </div>
            
            <div className="bg-[#121212] border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <i className="fa-brands fa-google text-blue-400 text-xl"></i>
                <span className="text-white font-bold text-lg">Google Reviews</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                "Support is fantastic. Had an issue configuring my iptables and the tech support team pointed me to the right fix within 10 minutes."
              </p>
            </div>
            
            <div className="bg-[#121212] border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <i className="fa-solid fa-server text-purple-400 text-xl"></i>
                <span className="text-white font-bold text-lg">HostAdvice</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                "Best value for KVM VPS in Bangladesh. Uptime has been solid 100% for the last 6 months I've been monitoring. Highly recommended."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 7: GUARANTEE & FAQS ========== */}
      <section className="py-20 px-4 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto">
          
          {/* Guarantee Box */}
          <div className="bg-gradient-to-r from-[#1A1A1A] to-[#121212] border border-gray-800 rounded-[2rem] p-10 md:p-14 text-center shadow-2xl mb-24">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">30-day money-back guarantee</h2>
            <p className="text-gray-400 mb-8">
              We stand by our infrastructure. If you're not completely satisfied with your VPS performance, we'll refund your payment within 30 days.
            </p>
            <a href="#pricing" className="inline-block bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
              Get Started
            </a>
          </div>

          <h2 className="text-3xl font-extrabold text-white mb-8 text-center">Linux VPS FAQs</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`border-b ${openFaq === idx ? 'border-primary' : 'border-gray-800'}`}
              >
                <button 
                  onClick={() => setOpenFaq(idx === openFaq ? null : idx)}
                  className="w-full py-5 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-bold text-gray-200 text-lg pr-4">{faq.question}</span>
                  <div className={`w-6 h-6 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'text-primary rotate-180' : 'text-gray-600'}`}>
                    <i className="fa-solid fa-chevron-down text-sm"></i>
                  </div>
                </button>
                <div className={`text-gray-400 leading-relaxed transition-all duration-300 ease-in-out ${openFaq === idx ? 'pb-5 block' : 'h-0 pb-0 hidden'}`}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>

    </div>
  );
}
