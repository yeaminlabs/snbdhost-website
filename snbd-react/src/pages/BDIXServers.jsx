import { useState, useEffect } from 'react';

// Animated terminal lines
const TERMINAL_LINES = [
  { text: '$ ssh root@bdix.snbdhost.com', color: '#e5e7eb' },
  { text: 'Connected to SNBD HOST BDIX Node — Dhaka, BD', color: '#9ca3af' },
  { text: '', color: '' },
  { text: '$ ping 103.92.21.5 -c 4', color: '#e5e7eb' },
  { text: '64 bytes: icmp_seq=1 time=0.38 ms', color: '#4ade80' },
  { text: '64 bytes: icmp_seq=2 time=0.41 ms', color: '#4ade80' },
  { text: '64 bytes: icmp_seq=3 time=0.39 ms', color: '#4ade80' },
  { text: '--- avg ping: 0.39 ms  ✓ BDIX local ---', color: '#f87171' },
  { text: '', color: '' },
  { text: '$ nproc && free -h', color: '#e5e7eb' },
  { text: 'CPU Cores: 4    RAM: 4.0G / 4.0G free', color: '#4ade80' },
  { text: '', color: '' },
  { text: '$ df -h /dev/nvme0n1p1', color: '#e5e7eb' },
  { text: '/dev/nvme0n1  80G  12G  68G  15%  /   NVMe Gen4', color: '#4ade80' },
  { text: '', color: '' },
  { text: '$ uptime', color: '#e5e7eb' },
  { text: ' up 47 days — 99.9% SLA — BDIX ●ONLINE', color: '#f87171' },
];

function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= TERMINAL_LINES.length) return;
    const delay = TERMINAL_LINES[visibleLines].text === '' ? 100 : 320;
    const t = setTimeout(() => setVisibleLines(v => v + 1), delay);
    return () => clearTimeout(t);
  }, [visibleLines]);

  // Restart animation loop
  useEffect(() => {
    if (visibleLines < TERMINAL_LINES.length) return;
    const t = setTimeout(() => setVisibleLines(0), 3500);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <div style={{
      background: '#0d0d0d',
      border: '1px solid rgba(220,38,38,0.3)',
      borderRadius: '12px',
      overflow: 'hidden',
      fontFamily: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
      boxShadow: '0 0 40px rgba(220,38,38,0.15), 0 20px 60px rgba(0,0,0,0.6)',
    }}>
      {/* Terminal title bar */}
      <div style={{
        background: '#1a1a1a',
        borderBottom: '1px solid rgba(220,38,38,0.2)',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#dc2626', display: 'inline-block' }}></span>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#555', display: 'inline-block' }}></span>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#333', display: 'inline-block' }}></span>
        <span style={{ marginLeft: 'auto', color: '#666', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          root@bdix-node-01 ~ bash
        </span>
      </div>
      {/* Terminal body */}
      <div style={{ padding: '20px', minHeight: '320px', maxHeight: '340px', overflowY: 'hidden' }}>
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{
            color: line.color || 'transparent',
            fontSize: '13px',
            lineHeight: '1.7',
            whiteSpace: 'pre',
            minHeight: '1.7em',
          }}>
            {line.text}
          </div>
        ))}
        {visibleLines < TERMINAL_LINES.length && (
          <span style={{
            display: 'inline-block',
            width: '8px',
            height: '16px',
            background: '#dc2626',
            animation: 'blink 1s step-end infinite',
            verticalAlign: 'text-bottom',
          }}></span>
        )}
      </div>
    </div>
  );
}

// Static particle positions — no random so it's SSR safe
const PARTICLES = [
  { left: '8%',  top: '75%', size: 3, dur: 9,  del: 0   },
  { left: '18%', top: '85%', size: 2, dur: 11, del: 1.2 },
  { left: '27%', top: '90%', size: 4, dur: 8,  del: 2.5 },
  { left: '38%', top: '80%', size: 2, dur: 13, del: 0.8 },
  { left: '50%', top: '88%', size: 3, dur: 10, del: 3.1 },
  { left: '62%', top: '78%', size: 2, dur: 12, del: 1.9 },
  { left: '72%', top: '92%', size: 4, dur: 9,  del: 0.4 },
  { left: '83%', top: '83%', size: 2, dur: 11, del: 2.7 },
  { left: '91%', top: '87%', size: 3, dur: 8,  del: 1.5 },
  { left: '12%', top: '60%', size: 2, dur: 14, del: 4.0 },
  { left: '45%', top: '65%', size: 3, dur: 10, del: 0.6 },
  { left: '78%', top: '70%', size: 2, dur: 12, del: 3.3 },
  { left: '55%', top: '55%', size: 2, dur: 15, del: 2.0 },
  { left: '33%', top: '50%', size: 3, dur: 11, del: 1.0 },
  { left: '88%', top: '60%', size: 2, dur: 9,  del: 3.8 },
];

export default function BDIXServers() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "What is BDIX and why do I need it?",
      answer: "BDIX (Bangladesh Internet Exchange) is a local peering network. It allows inter-ISP traffic to stay within Bangladesh instead of routing internationally. This results in ultra-low latency (usually <1ms) and much faster download/upload speeds for local users."
    },
    {
      question: "Do these servers come with Root Access?",
      answer: "Yes, all BDIX VPS plans come with full administrator/root access. You have complete freedom to install any software, operating system (Ubuntu, CentOS, Debian, etc.), and control panel you desire."
    },
    {
      question: "Can I upgrade my plan later?",
      answer: "Absolutely! You can easily scale up your CPU, RAM, and Storage at any time directly from our client portal without any data loss or significant downtime."
    },
    {
      question: "Which Control Panels do you support?",
      answer: "We support all major control panels including cPanel/WHM, DirectAdmin, CyberPanel, and Webuzo. You can purchase a license alongside your server or install a free panel."
    }
  ];

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.2; }
          100% { transform: translateY(-420px) scale(0.4); opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.05; }
          50%       { opacity: 0.1; }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 0.4; }
          90%  { opacity: 0.1; }
          100% { transform: translateY(700px); opacity: 0; }
        }
      `}</style>

      <div className="bg-[#F4F5F7] min-h-screen">

        {/* ===== HERO SECTION ===== */}
        <section className="relative overflow-hidden" style={{ background: '#0a0a0a', paddingTop: '120px', paddingBottom: '80px' }}>

          {/* Animated grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #dc2626 0, #dc2626 1px, transparent 0, transparent 60px), repeating-linear-gradient(90deg, #dc2626 0, #dc2626 1px, transparent 0, transparent 60px)',
            backgroundSize: '60px 60px',
            animation: 'gridPulse 4s ease-in-out infinite',
            zIndex: 0,
          }}></div>

          {/* Scanline sweep */}
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.6), transparent)',
            animation: 'scanline 6s linear infinite',
            zIndex: 1,
          }}></div>

          {/* Floating particles */}
          {PARTICLES.map((p, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              background: i % 3 === 0 ? '#dc2626' : i % 3 === 1 ? '#fff' : '#991b1b',
              animation: `floatUp ${p.dur}s ease-in-out ${p.del}s infinite`,
              zIndex: 1,
            }}></div>
          ))}

          {/* Red glow orbs */}
          <div style={{ position: 'absolute', top: '20%', right: '15%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,38,38,0.16) 0%, transparent 70%)', zIndex: 0 }}></div>
          <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,38,38,0.1) 0%, transparent 70%)', zIndex: 0 }}></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 2 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left Content */}
              <div className="text-left text-white">
                {/* Live badge */}
                <div className="inline-flex items-center gap-2 mb-7 w-fit">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                  </span>
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-red-400">BDIX Live Network • Dhaka, BD</span>
                </div>

                <h1 className="font-black leading-[1.05] mb-4 tracking-tight" style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)' }}>
                  Sub-ms Ping.<br />
                  <span className="text-white">Max Local</span><br />
                  <span style={{ WebkitTextStroke: '2px #dc2626', color: 'transparent' }}>Speed.</span>
                </h1>

                {/* Red divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div style={{ height: 3, width: 56, background: '#dc2626' }}></div>
                  <div style={{ height: 3, width: 18, background: 'rgba(220,38,38,0.4)' }}></div>
                  <div style={{ height: 3, width: 8, background: 'rgba(220,38,38,0.2)' }}></div>
                </div>

                <p className="text-gray-400 mb-8 max-w-lg leading-relaxed" style={{ fontSize: '1.05rem' }}>
                  Host inside our <strong className="text-white">Tier-3 Dhaka</strong> data centers — directly peered on BDIX. Your local users get blazing NVMe speeds with <strong className="text-white">zero international hops</strong>.
                </p>

                {/* Stat pills */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    { val: '<1ms', label: 'Local Ping', red: true },
                    { val: '10Gbps', label: 'BDIX Core', red: false },
                    { val: '99.9%', label: 'Uptime SLA', red: false },
                  ].map(s => (
                    <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '10px 18px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.35rem', fontWeight: 900, color: s.red ? '#ef4444' : '#fff' }}>{s.val}</div>
                      <div style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <a href="#pricing" className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-black px-8 py-4 rounded-xl shadow-lg transition-all hover:-translate-y-0.5" style={{ fontSize: '1rem', boxShadow: '0 8px 24px rgba(220,38,38,0.35)' }}>
                    <i className="fa-solid fa-rocket"></i> View Plans &amp; Pricing
                  </a>
                  <span className="text-gray-500 text-sm">From <strong className="text-white text-xl">৳500</strong><span className="text-gray-600">/mo</span></span>
                </div>
              </div>

              {/* Right — Terminal Demo */}
              <div className="hidden lg:block">
                <TerminalDemo />
                {/* Below terminal — server info strip */}
                <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                  {[
                    { icon: 'fa-server', label: 'NVMe Gen4 SSD' },
                    { icon: 'fa-network-wired', label: 'BDIX Peered' },
                    { icon: 'fa-shield-halved', label: 'DDoS Protected' },
                  ].map(item => (
                    <div key={item.label} style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 8, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <i className={`fa-solid ${item.icon}`} style={{ color: '#dc2626', fontSize: 13 }}></i>
                      <span style={{ color: '#9ca3af', fontSize: 12, fontWeight: 600 }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom border */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, #dc2626 25%, #dc2626 75%, transparent)' }}></div>
        </section>

        {/* ===== PRICING CARDS ===== */}
        <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-16 z-20">
          <div className="text-center mb-12 hidden md:block">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Your VPS Tier</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Starter */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:border-red-200 transition-all flex flex-col relative group">
              <div className="h-1.5 w-full bg-red-100 absolute top-0 left-0 rounded-t-2xl group-hover:bg-red-500 transition-colors"></div>
              <h3 className="text-xl font-black text-gray-900 mb-1">BDIX Starter</h3>
              <p className="text-sm text-gray-500 font-medium mb-6">Perfect for small local sites.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-gray-900">৳500</span>
                <span className="text-gray-500 font-medium">/mo</span>
              </div>
              <a href="#" className="w-full block text-center bg-red-50 hover:bg-red-600 hover:text-white text-red-700 font-bold py-3.5 rounded-xl transition-colors mb-8">Deploy Now</a>
              <ul className="space-y-4 text-sm text-gray-600 font-medium flex-1">
                <li className="flex items-center gap-3"><i className="fa-solid fa-microchip text-red-500 w-4"></i> 1 Core vCPU</li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-memory text-red-500 w-4"></i> 1 GB RAM</li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-hard-drive text-red-500 w-4"></i> 20 GB NVMe</li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-network-wired text-red-500 w-4"></i> 500 GB Bandwidth</li>
              </ul>
            </div>

            {/* Pro */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:border-red-200 transition-all flex flex-col relative group">
              <div className="h-1.5 w-full bg-red-200 absolute top-0 left-0 rounded-t-2xl group-hover:bg-red-500 transition-colors"></div>
              <h3 className="text-xl font-black text-gray-900 mb-1">BDIX Pro</h3>
              <p className="text-sm text-gray-500 font-medium mb-6">For growing businesses.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-gray-900">৳900</span>
                <span className="text-gray-500 font-medium">/mo</span>
              </div>
              <a href="#" className="w-full block text-center bg-red-50 hover:bg-red-600 hover:text-white text-red-700 font-bold py-3.5 rounded-xl transition-colors mb-8">Deploy Now</a>
              <ul className="space-y-4 text-sm text-gray-600 font-medium flex-1">
                <li className="flex items-center gap-3"><i className="fa-solid fa-microchip text-red-500 w-4"></i> 2 Cores vCPU</li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-memory text-red-500 w-4"></i> 2 GB RAM</li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-hard-drive text-red-500 w-4"></i> 40 GB NVMe</li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-network-wired text-red-500 w-4"></i> 1 TB Bandwidth</li>
              </ul>
            </div>

            {/* Business (Popular) */}
            <div className="bg-white rounded-2xl p-8 border-2 border-red-500 shadow-2xl hover:-translate-y-2 transition-transform flex flex-col relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">Most Popular</div>
              <h3 className="text-xl font-black text-gray-900 mb-1 mt-2">BDIX Business</h3>
              <p className="text-sm text-gray-500 font-medium mb-6">High traffic web applications.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-gray-900">৳1,600</span>
                <span className="text-gray-500 font-medium">/mo</span>
              </div>
              <a href="#" className="w-full block text-center bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-200 font-bold py-3.5 rounded-xl transition-colors mb-8">Deploy Now</a>
              <ul className="space-y-4 text-sm text-gray-600 font-medium flex-1">
                <li className="flex items-center gap-3"><i className="fa-solid fa-microchip text-red-500 w-4"></i> 4 Cores vCPU</li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-memory text-red-500 w-4"></i> 4 GB RAM</li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-hard-drive text-red-500 w-4"></i> 80 GB NVMe</li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-network-wired text-red-500 w-4"></i> 2 TB Bandwidth</li>
              </ul>
            </div>

            {/* Ultra */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:border-red-200 transition-all flex flex-col relative group">
              <div className="h-1.5 w-full bg-red-300 absolute top-0 left-0 rounded-t-2xl group-hover:bg-red-500 transition-colors"></div>
              <h3 className="text-xl font-black text-gray-900 mb-1">BDIX Ultra</h3>
              <p className="text-sm text-gray-500 font-medium mb-6">Enterprise resource demands.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-gray-900">৳2,800</span>
                <span className="text-gray-500 font-medium">/mo</span>
              </div>
              <a href="#" className="w-full block text-center bg-red-50 hover:bg-red-600 hover:text-white text-red-700 font-bold py-3.5 rounded-xl transition-colors mb-8">Deploy Now</a>
              <ul className="space-y-4 text-sm text-gray-600 font-medium flex-1">
                <li className="flex items-center gap-3"><i className="fa-solid fa-microchip text-red-500 w-4"></i> 8 Cores vCPU</li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-memory text-red-500 w-4"></i> 8 GB RAM</li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-hard-drive text-red-500 w-4"></i> 160 GB NVMe</li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-network-wired text-red-500 w-4"></i> 4 TB Bandwidth</li>
              </ul>
            </div>
          </div>

          {/* Top Features Strip */}
          <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-6 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
            <h4 className="font-bold text-gray-900 text-lg whitespace-nowrap"><i className="fa-solid fa-fire text-red-500 mr-2"></i> Top VPS features include:</h4>
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-semibold text-gray-700">
              <li className="flex items-center gap-2"><i className="fa-solid fa-circle-check text-green-500"></i> Full Root Access</li>
              <li className="flex items-center gap-2"><i className="fa-solid fa-circle-check text-green-500"></i> Local Dhaka IP</li>
              <li className="flex items-center gap-2"><i className="fa-solid fa-circle-check text-green-500"></i> Free OS Reinstalls</li>
              <li className="flex items-center gap-2"><i className="fa-solid fa-circle-check text-green-500"></i> 99.9% Uptime SLA</li>
              <li className="flex items-center gap-2"><i className="fa-solid fa-circle-check text-green-500"></i> 24/7 Tech Support</li>
            </ul>
          </div>
        </section>

        {/* ===== SOFTWARE & CPANEL HIGHLIGHT ===== */}
        <section className="py-16 bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-6">Complete Control &amp; Software Flexibility</h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Take absolute command over your hosting environment. We provide industry-standard <strong>cPanel &amp; WHM</strong> (optional license) combined with Softaculous for 1-click installation of hundreds of scripts including WordPress, Joomla, and Magento.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <span className="bg-gray-100 text-gray-800 font-bold px-4 py-2 rounded-lg text-sm"><i className="fa-brands fa-ubuntu text-orange-500 mr-1.5"></i> Ubuntu</span>
                  <span className="bg-gray-100 text-gray-800 font-bold px-4 py-2 rounded-lg text-sm"><i className="fa-brands fa-centos text-purple-600 mr-1.5"></i> CentOS</span>
                  <span className="bg-gray-100 text-gray-800 font-bold px-4 py-2 rounded-lg text-sm"><i className="fa-brands fa-linux text-black mr-1.5"></i> Debian</span>
                  <span className="bg-gray-100 text-gray-800 font-bold px-4 py-2 rounded-lg text-sm"><i className="fa-brands fa-redhat text-red-600 mr-1.5"></i> AlmaLinux</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-red-50 rounded-2xl p-6 border border-red-100 flex flex-col items-center justify-center text-center">
                  <div className="text-5xl text-orange-600 mb-4"><i className="fa-brands fa-cpanel"></i></div>
                  <h4 className="font-bold text-gray-900">cPanel Optimized</h4>
                  <p className="text-sm text-gray-500 mt-2">Manage files, databases, and emails easily.</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col items-center justify-center text-center">
                  <div className="text-4xl mb-4 text-gray-700"><i className="fa-brands fa-docker"></i></div>
                  <h4 className="font-bold text-gray-900">Container Ready</h4>
                  <p className="text-sm text-gray-500 mt-2">Deploy Docker containers with ease.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== DETAILED COMPARISON TABLE ===== */}
        <section className="py-24 bg-[#F4F5F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-4">Compare VPS Specifications</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Dive into the deep technical details to find the exact configuration your application demands.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="py-5 px-6 font-bold text-gray-900 text-base">Features &amp; Specs</th>
                    <th className="py-5 px-4 font-bold text-gray-900 text-center">Starter</th>
                    <th className="py-5 px-4 font-bold text-gray-900 text-center">Pro</th>
                    <th className="py-5 px-4 font-bold text-gray-900 text-center">Business <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded ml-1">Popular</span></th>
                    <th className="py-5 px-4 font-bold text-gray-900 text-center">Ultra</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                  <tr className="bg-gray-50/50">
                    <td colSpan="5" className="py-3 px-6 font-bold text-gray-900 tracking-wider uppercase text-xs">Hardware Resources</td>
                  </tr>
                  <tr className="hover:bg-red-50/30 transition-colors">
                    <td className="py-4 px-6 font-semibold">CPU Cores</td>
                    <td className="py-4 px-4 text-center">1 Core</td>
                    <td className="py-4 px-4 text-center">2 Cores</td>
                    <td className="py-4 px-4 text-center font-bold text-red-700">4 Cores</td>
                    <td className="py-4 px-4 text-center text-red-700 font-bold">8 Cores</td>
                  </tr>
                  <tr className="hover:bg-red-50/30 transition-colors">
                    <td className="py-4 px-6 font-semibold">Guaranteed RAM</td>
                    <td className="py-4 px-4 text-center">1 GB</td>
                    <td className="py-4 px-4 text-center">2 GB</td>
                    <td className="py-4 px-4 text-center font-bold text-red-700">4 GB</td>
                    <td className="py-4 px-4 text-center text-red-700 font-bold">8 GB</td>
                  </tr>
                  <tr className="hover:bg-red-50/30 transition-colors">
                    <td className="py-4 px-6 font-semibold">NVMe Storage (Gen4)</td>
                    <td className="py-4 px-4 text-center">20 GB</td>
                    <td className="py-4 px-4 text-center">40 GB</td>
                    <td className="py-4 px-4 text-center font-bold text-red-700">80 GB</td>
                    <td className="py-4 px-4 text-center text-red-700 font-bold">160 GB</td>
                  </tr>

                  <tr className="bg-gray-50/50">
                    <td colSpan="5" className="py-3 px-6 font-bold text-gray-900 tracking-wider uppercase text-xs">Network &amp; Connectivity</td>
                  </tr>
                  <tr className="hover:bg-red-50/30 transition-colors">
                    <td className="py-4 px-6 font-semibold">BDIX Bandwidth</td>
                    <td className="py-4 px-4 text-center text-green-600 font-bold">Unmetered</td>
                    <td className="py-4 px-4 text-center text-green-600 font-bold">Unmetered</td>
                    <td className="py-4 px-4 text-center text-green-600 font-bold">Unmetered</td>
                    <td className="py-4 px-4 text-center text-green-600 font-bold">Unmetered</td>
                  </tr>
                  <tr className="hover:bg-red-50/30 transition-colors">
                    <td className="py-4 px-6 font-semibold">Public Internet</td>
                    <td className="py-4 px-4 text-center">500 GB</td>
                    <td className="py-4 px-4 text-center">1 TB</td>
                    <td className="py-4 px-4 text-center">2 TB</td>
                    <td className="py-4 px-4 text-center">4 TB</td>
                  </tr>
                  <tr className="hover:bg-red-50/30 transition-colors">
                    <td className="py-4 px-6 font-semibold">Dedicated IPv4</td>
                    <td className="py-4 px-4 text-center">1 Included</td>
                    <td className="py-4 px-4 text-center">1 Included</td>
                    <td className="py-4 px-4 text-center">1 Included</td>
                    <td className="py-4 px-4 text-center">1 Included</td>
                  </tr>

                  <tr className="bg-gray-50/50">
                    <td colSpan="5" className="py-3 px-6 font-bold text-gray-900 tracking-wider uppercase text-xs">Management &amp; Support</td>
                  </tr>
                  <tr className="hover:bg-red-50/30 transition-colors">
                    <td className="py-4 px-6 font-semibold">Root Access</td>
                    <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                    <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                    <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                    <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                  </tr>
                  <tr className="hover:bg-red-50/30 transition-colors">
                    <td className="py-4 px-6 font-semibold">VPS Panel Console</td>
                    <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                    <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                    <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                    <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                  </tr>
                  <tr className="hover:bg-red-50/30 transition-colors">
                    <td className="py-4 px-6 font-semibold">DDoS Protection</td>
                    <td className="py-4 px-4 text-center text-gray-400">Add-on</td>
                    <td className="py-4 px-4 text-center text-gray-400">Add-on</td>
                    <td className="py-4 px-4 text-center font-bold"><i className="fa-solid fa-shield-halved text-green-500 mr-2"></i> Included</td>
                    <td className="py-4 px-4 text-center font-bold"><i className="fa-solid fa-shield-halved text-green-500 mr-2"></i> Included</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ===== VALUE PROPS CARDS ===== */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center p-6 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Bulletproof Security</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Hardware firewalls, isolated environments, and dedicated monitoring ensure your system is secure against local threats.</p>
              </div>
              <div className="text-center p-6 hover:-translate-y-2 transition-transform duration-300 border-x border-gray-100/50">
                <div className="w-16 h-16 mx-auto bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm">
                  <i className="fa-solid fa-gauge-high"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">10Gbps Core Network</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Our Dhaka data centers are wired with redundant 10Gbps fiber rings ensuring massive throughput during peak traffic spikes.</p>
              </div>
              <div className="text-center p-6 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm">
                  <i className="fa-solid fa-headset"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Expert Support</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Local support engineers available around the clock via live chat and tickets to resolve your technical roadblocks instantly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ SECTION ===== */}
        <section className="py-24 bg-[#F4F5F7]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">Got questions about our BDIX hosting capabilities? We've got answers.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl border ${openFaq === idx ? 'border-red-300 shadow-md' : 'border-gray-200'} overflow-hidden transition-all duration-300`}
                >
                  <button
                    onClick={() => setOpenFaq(idx === openFaq ? null : idx)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                  >
                    <span className="font-bold text-gray-900 text-lg">{faq.question}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${openFaq === idx ? 'bg-red-100 text-red-600 rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                      <i className="fa-solid fa-chevron-down text-sm"></i>
                    </div>
                  </button>
                  <div className={`px-6 text-gray-600 leading-relaxed transition-all duration-300 ease-in-out ${openFaq === idx ? 'py-5 border-t border-gray-100 block' : 'h-0 py-0 hidden'}`}>
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-24 relative overflow-hidden text-center text-white" style={{ background: '#0a0a0a' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(220,38,38,0.18) 0%, transparent 70%)' }}></div>
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #dc2626 0, #dc2626 1px, transparent 0, transparent 40px), repeating-linear-gradient(90deg, #dc2626 0, #dc2626 1px, transparent 0, transparent 40px)', backgroundSize: '40px 40px' }}></div>
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-red-400">Servers Online</span>
            </div>
            <h2 className="text-4xl font-black mb-6">Unleash Your Local Potential</h2>
            <p className="text-xl text-gray-400 mb-10">Stop routing local users to Singapore. Move to Dhaka and watch your metrics soar.</p>
            <a href="#pricing" className="inline-block bg-white text-gray-900 hover:bg-gray-100 hover:-translate-y-1 font-bold px-10 py-4 rounded-xl transition-all shadow-xl text-lg">
              Deploy BDIX Server Now
            </a>
          </div>
        </section>

      </div>
    </>
  );
}
