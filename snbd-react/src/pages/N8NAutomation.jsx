import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import JsonLd from '../components/JsonLd';
import { pageMeta } from '../seo/pageMeta';
import { useCurrency } from '../context/CurrencyContext.jsx';

export default function N8NAutomation() {
  const { formatPrice } = useCurrency();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(null);

  const packages = [
    { name: 'n8n 1G', priceM: '200', priceY: '2,400', desc: 'Ideal for personal use and simple API automations.', cpu: '1 Core CPU', ram: '1 GB RAM', ssd: '10 GB NVMe Storage', db: 'Database SQLite', mode: 'n8n Standard Mode', backup: 'Daily (1x) Backup Included', link: 'https://portal.snbdhost.com/store/n8n/n8n-1g' },
    { name: 'n8n 2G', priceM: '400', priceY: '4,800', desc: 'Perfect for n8n learners.', cpu: '1 Core CPU', ram: '2 GB RAM', ssd: '20 GB NVMe Storage', db: 'Database SQLite', mode: 'n8n Standard Mode', backup: 'Daily (1x) Backup Included', link: 'https://portal.snbdhost.com/store/n8n/n8n-2g' },
    { name: 'n8n 3G', priceM: '600', priceY: '7,200', desc: 'Recommended for production environments requiring stability.', cpu: '1.5 Core CPU', ram: '3 GB RAM', ssd: '30 GB NVMe Storage', db: 'Database PostgreSQL', mode: 'n8n Standard Mode', backup: 'Daily (1x) Backup Included', popular: true, link: 'https://portal.snbdhost.com/store/n8n/n8n-3g-2' },
    { name: 'n8n 4G', priceM: '800', priceY: '9,600', desc: 'Built for power users and more complex workflows.', cpu: '2 Core CPU', ram: '4 GB RAM', ssd: '40 GB NVMe Storage', db: 'Database PostgreSQL', mode: 'n8n Standard Mode', backup: 'Daily (1x) Backup Included', link: 'https://portal.snbdhost.com/store/n8n/n8n-4gb' },
    { name: 'n8n 6G', priceM: '1,200', priceY: '14,400', desc: 'Optimized for high-volume concurrent tasks using Queue Mode.', cpu: '3 Core CPU', ram: '6 GB RAM', worker: '10 Worker', ssd: '60 GB NVMe Storage', db: 'Database PostgreSQL', mode: 'n8n Queue Mode', backup: 'Daily (1x) Backup Included', link: 'https://portal.snbdhost.com/store/n8n/n8n-6g' },
    { name: 'n8n 8G', priceM: '1,600', priceY: '19,200', desc: 'Enterprise-grade hosting for mission-critical automation.', cpu: '4 Core CPU', ram: '8 GB RAM', worker: '20 Worker', ssd: '80 GB NVMe Storage', db: 'Database PostgreSQL', mode: 'n8n Queue Mode', backup: 'Daily (1x) Backup Included', link: 'https://portal.snbdhost.com/store/n8n/n8n-8g' }
  ];

  useEffect(() => {
    if (window.tsParticles) {
      window.tsParticles.load("tsparticles", {
        fpsLimit: 60,
        interactivity: {
          detectsOn: "window",
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["#cc0000", "#8b0000"],
          },
          links: {
            color: "#cc0000",
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.7,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 2 },
          },
        },
        detectRetina: true,
      });
    }
  }, []);

  const faqs = [
    {
      question: "Can n8n help reduce time spent managing social media?",
      answer: "Yes! Automatically schedule posts, reply to DMs, or track mentions across platforms using workflows. You can connect Instagram, Facebook, Twitter/X, LinkedIn and more through n8n's integrations and trigger actions based on events or schedules."
    },
    {
      question: "Is it possible to automate follow-up emails to customers who didn't complete checkout?",
      answer: "Absolutely! n8n can integrate with your WooCommerce or custom store, detect abandoned carts, and automatically send personalized follow-up emails via Gmail, SMTP, or any email service. You can set delays, conditions, and personalization — all without code."
    },
    {
      question: "Do I need coding skills to use n8n?",
      answer: "No coding skills required for most workflows! n8n has a visual drag-and-drop editor where you connect nodes to build workflows. However, if you want advanced logic, you can optionally write small JavaScript snippets for maximum flexibility."
    },
    {
      question: "How is this better than Zapier or other tools?",
      answer: "Unlike Zapier, n8n is self-hosted — meaning your data stays on YOUR server, not a third-party cloud. You also get unlimited workflows, no per-task pricing, and far more flexibility with custom logic. SNBD HOST provides fully managed n8n instances so you get all benefits without server management headaches."
    },
    {
      question: "What happens if something goes wrong in my workflow?",
      answer: "n8n has built-in error handling with retry logic, error workflows, and execution logs. You can see exactly what happened at each step. Our 24/7 support team is also available to help troubleshoot any workflow issues."
    }
  ];

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
    <div className="text-[#e2e8f0] font-sans selection:bg-brand-red selection:text-white min-h-screen relative bg-transparent">
      <SEOHead {...pageMeta.n8nAutomation} />
      <JsonLd data={faqSchema} />
      {/* Particles.js Container */}
      <div id="tsparticles" className="fixed inset-0 z-0 bg-[#0a0a0a]"></div>

      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          {/* ===== HERO & PRICING TOP ===== */}
          <section className="relative pt-20 pb-16 px-4 overflow-hidden border-b border-white/5 bg-transparent">
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute left-0 top-1/3 w-64 h-64 bg-brand-red/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto flex flex-col pt-10">
          
          {/* Headline */}
          <div className="mb-14 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-5xl font-semibold text-white tracking-tight mb-4 leading-tight">
              n8n Hosting
            </h1>
            <p className="text-[#a1a1aa] text-lg sm:text-xl font-light leading-relaxed mb-8">
              Managed n8n hosting without the complexity. Automate your workflows instantly on our highly optimized, private Docker instances.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-3 bg-[#111111] p-1.5 rounded-full border border-white/5 shadow-inner">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${billingCycle === 'monthly' ? 'bg-[#222222] text-white shadow-md' : 'text-[#71717a] hover:text-[#a1a1aa]'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${billingCycle === 'yearly' ? 'bg-[#222222] text-white shadow-md' : 'text-[#71717a] hover:text-[#a1a1aa]'}`}
              >
                Yearly <span className="text-[10px] bg-brand-red text-white px-1.5 py-0.5 rounded-sm ml-1 font-bold">SAVE</span>
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 w-full xl:w-[110%] xl:-ml-[5%]">
            
            {packages.map((pkg, idx) => (
              <div key={idx} className={`bg-[#111111] border ${pkg.popular ? 'border-brand-red/50 shadow-[0_0_40px_rgba(204,0,0,0.15)] md:-translate-y-4' : 'border-white/10 hover:border-white/20 shadow-2xl'} rounded-2xl p-6 md:p-8 flex flex-col transition-all relative`}>
                
                {pkg.popular && (
                  <div className="absolute top-0 right-6 -translate-y-1/2 bg-gradient-to-r from-brand-red to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Recommended
                  </div>
                )}

                <h3 className="text-xl font-semibold text-white mb-1">{pkg.name}</h3>
                <p className="text-sm text-[#71717a] mb-6 min-h-[40px]">{pkg.desc}</p>
                
                <div className="mb-6 h-16">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-white tracking-tight">{formatPrice(billingCycle === 'yearly' ? pkg.priceY : pkg.priceM)}</span>
                    <span className="text-[#71717a] text-sm mb-1">/{billingCycle === 'yearly' ? 'year' : 'mo'}</span>
                  </div>
                  {billingCycle === 'yearly' && <p className="text-sm text-[#a1a1aa] mt-1">~{formatPrice(pkg.priceM)} per month</p>}
                </div>
                
                <a href={pkg.link} className={`w-full block text-center px-6 py-3.5 font-semibold rounded-xl transition-all mb-8 ${pkg.popular ? 'bg-brand-red hover:bg-[#a30000] text-white shadow-lg shadow-brand-red/30' : 'bg-[#222222] border border-white/10 hover:bg-[#333333] text-white shadow-md'}`}>
                  Deploy Now
                </a>

                <p className="text-xs uppercase tracking-widest font-semibold text-[#71717a] mb-4">Instance Specs</p>
                <ul className="space-y-4 text-sm text-[#a1a1aa] flex-1">
                  <li className="flex items-start gap-3"><i className="fa-solid fa-microchip text-brand-red mt-1 text-[10px]"></i> {pkg.cpu}</li>
                  <li className="flex items-start gap-3"><i className="fa-solid fa-memory text-brand-red mt-1 text-[10px]"></i> <strong className={pkg.popular ? 'text-white' : ''}>{pkg.ram}</strong></li>
                  {pkg.worker && <li className="flex items-start gap-3"><i className="fa-solid fa-network-wired text-brand-red mt-1 text-[10px]"></i> {pkg.worker}</li>}
                  <li className="flex items-start gap-3"><i className="fa-solid fa-hard-drive text-brand-red mt-1 text-[10px]"></i> {pkg.ssd}</li>
                  <li className="flex items-start gap-3"><i className="fa-solid fa-database text-brand-red mt-1 text-[10px]"></i> {pkg.db}</li>
                  <li className="flex items-start gap-3"><i className="fa-solid fa-bolt text-brand-red mt-1 text-[10px]"></i> {pkg.mode}</li>
                  <li className="flex items-start gap-3"><i className="fa-solid fa-clock-rotate-left text-brand-red mt-1 text-[10px]"></i> {pkg.backup}</li>
                </ul>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ===== LOOKING FOR SOMETHING ELSE ===== */}
      <section className="py-10 border-b border-white/5 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-6 items-center">
          <h3 className="text-2xl font-semibold text-white">Looking for<br/>something else?</h3>
          
          <div className="flex items-center gap-4 bg-[#111111] border border-white/5 rounded-2xl p-4 hover:border-brand-red/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#222222] flex items-center justify-center text-xl text-[#a1a1aa]"><i className="fa-solid fa-server"></i></div>
            <div>
              <h4 className="text-white font-semibold mb-0.5">Custom VPS</h4>
              <p className="text-[#71717a] text-xs">Need bare-metal root access?</p>
            </div>
            <Link to="/vps-server" className="px-4 py-2 border border-white/10 text-white text-sm font-semibold rounded-lg ml-4 hover:bg-white/5 transition-colors">Compare</Link>
          </div>

          <div className="flex items-center gap-4 bg-[#111111] border border-white/5 rounded-2xl p-4 hover:border-brand-red/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#222222] flex items-center justify-center text-xl text-[#a1a1aa]"><i className="fa-solid fa-bolt"></i></div>
            <div>
              <h4 className="text-white font-semibold mb-0.5">BDIX Servers</h4>
              <p className="text-[#71717a] text-xs">Ultra-low local latency.</p>
            </div>
            <Link to="/bdix-servers" className="px-4 py-2 border border-white/10 text-white text-sm font-semibold rounded-lg ml-4 hover:bg-white/5 transition-colors">Compare</Link>
          </div>
        </div>
      </section>

      {/* ===== WHAT'S INCLUDED (GRID) ===== */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-3xl font-semibold text-white mb-12">What's included?</h2>

          <div className="bg-[#111111] rounded-2xl border border-white/5 overflow-x-auto shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="py-6 px-6 font-semibold text-[#a1a1aa] text-sm sticky left-0 bg-[#111111] min-w-[200px]">Feature details</th>
                  {packages.map(pkg => (
                    <th key={pkg.name} className={`py-6 px-4 font-semibold text-white text-center text-sm min-w-[120px] ${pkg.popular ? 'bg-brand-red/5' : ''}`}>
                      {pkg.name.replace('n8n ', '')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-[#d4d4d8]">
                
                {/* Category: Hardware */}
                <tr>
                  <td colSpan={packages.length + 1} className="py-4 px-6 text-xs uppercase tracking-widest font-semibold text-[#71717a] bg-[#1a1a1a]/50">Hardware & Resources</td>
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium sticky left-0 bg-[#111111]">vCPU Cores</td>
                  {packages.map(pkg => <td key={pkg.name} className={`py-4 px-4 text-center ${pkg.popular ? 'bg-brand-red/5' : ''}`}>{pkg.cpu.split(' ')[0]}</td>)}
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium sticky left-0 bg-[#111111]">Dedicated RAM</td>
                  {packages.map(pkg => <td key={pkg.name} className={`py-4 px-4 text-center ${pkg.popular ? 'bg-brand-red/5' : ''}`}>{pkg.ram}</td>)}
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium sticky left-0 bg-[#111111]">NVMe Storage</td>
                  {packages.map(pkg => <td key={pkg.name} className={`py-4 px-4 text-center ${pkg.popular ? 'bg-brand-red/5' : ''}`}>{pkg.ssd}</td>)}
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium sticky left-0 bg-[#111111]">Workers</td>
                  {packages.map(pkg => <td key={pkg.name} className={`py-4 px-4 text-center ${pkg.popular ? 'bg-brand-red/5' : ''}`}>{pkg.worker ? pkg.worker : 'None'}</td>)}
                </tr>

                {/* Category: Software */}
                <tr>
                  <td colSpan={packages.length + 1} className="py-4 px-6 text-xs uppercase tracking-widest font-semibold text-[#71717a] bg-[#1a1a1a]/50">Software & Core Features</td>
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium sticky left-0 bg-[#111111]">Database</td>
                  {packages.map(pkg => <td key={pkg.name} className={`py-4 px-4 text-center ${pkg.popular ? 'bg-brand-red/5' : ''}`}>{pkg.db.replace('Database ', '')}</td>)}
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium sticky left-0 bg-[#111111]">n8n Mode</td>
                  {packages.map(pkg => <td key={pkg.name} className={`py-4 px-4 text-center ${pkg.popular ? 'bg-brand-red/5' : ''}`}>{pkg.mode.replace('n8n ', '')}</td>)}
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium sticky left-0 bg-[#111111]">Unlimited Workflows</td>
                  {packages.map(pkg => <td key={pkg.name} className={`py-4 px-4 text-center ${pkg.popular ? 'bg-brand-red/5' : ''}`}><i className="fa-solid fa-check text-green-500"></i></td>)}
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium sticky left-0 bg-[#111111]">Custom Node Integrations</td>
                  {packages.map(pkg => <td key={pkg.name} className={`py-4 px-4 text-center ${pkg.popular ? 'bg-brand-red/5' : ''}`}><i className="fa-solid fa-check text-green-500"></i></td>)}
                </tr>

                {/* Category: Support */}
                <tr>
                  <td colSpan={packages.length + 1} className="py-4 px-6 text-xs uppercase tracking-widest font-semibold text-[#71717a] bg-[#1a1a1a]/50">Installation & Support</td>
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium sticky left-0 bg-[#111111]">Free Docker Installation</td>
                  {packages.map(pkg => <td key={pkg.name} className={`py-4 px-4 text-center ${pkg.popular ? 'bg-brand-red/5' : ''}`}><i className="fa-solid fa-check text-green-500"></i></td>)}
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium sticky left-0 bg-[#111111]">Managed OS Environment</td>
                  {packages.map(pkg => <td key={pkg.name} className={`py-4 px-4 text-center ${pkg.popular ? 'bg-brand-red/5' : ''}`}><i className="fa-solid fa-check text-green-500"></i></td>)}
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium sticky left-0 bg-[#111111]">24/7 Chat Support</td>
                  {packages.map(pkg => <td key={pkg.name} className={`py-4 px-4 text-center ${pkg.popular ? 'bg-brand-red/5' : ''}`}><i className="fa-solid fa-check text-green-500"></i></td>)}
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== FAQ ACCORDION SEC ===== */}
      <section className="py-20 px-4 border-t border-white/5 relative">
        {/* Glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-[#222222]/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-4">Frequently asked questions</h2>
            <p className="text-[#a1a1aa]">Everything you need to know about setting up and scaling n8n.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-semibold text-[#e2e8f0] text-base">{faq.question}</span>
                  <i className={`fa-solid fa-chevron-down text-xs text-[#a1a1aa] transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-white' : ''}`}></i>
                </button>
                <div className={`px-6 text-[#a1a1aa] text-sm overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'py-5 pt-0 border-t border-white/5 mt-0 opacity-100 max-h-[500px]' : 'max-h-0 opacity-0'}`}>
                  <p className="leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA PROMO BOX ===== */}
      <section className="pb-24 pt-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#151515] to-[#111111] border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            {/* Background elements */}
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-brand-red/20 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 flex-1">
              <h2 className="text-3xl font-semibold text-white mb-3">Questions about automation?</h2>
              <p className="text-[#a1a1aa] text-lg max-w-xl">
                Our team handles everything from initial spin-up to environment tuning. Talk to our technical sales reps today.
              </p>
            </div>
            
            <div className="relative z-10">
              <Link to="/support" className="inline-block whitespace-nowrap px-8 py-4 bg-white text-gray-900 border border-white/10 font-bold rounded-xl hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all transform hover:-translate-y-1">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
      
        </div>
      </div>
    </div>
  );
}
