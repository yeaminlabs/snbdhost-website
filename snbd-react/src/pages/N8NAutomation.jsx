import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function N8NAutomation() {
  const [billingCycle, setBillingCycle] = useState('yearly');
  const [openFaq, setOpenFaq] = useState(null);

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

  return (
    <div className="text-[#e2e8f0] font-sans selection:bg-brand-red selection:text-white min-h-screen relative bg-transparent">
      
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight mb-4 leading-tight">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 w-full xl:w-[110%] xl:-ml-[5%]">
            
            {/* Starter (n8n 1G) */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col hover:border-white/20 transition-colors shadow-2xl">
              <h3 className="text-xl font-semibold text-white mb-1">Starter (1G)</h3>
              <p className="text-sm text-[#71717a] mb-6">Perfect for basic automations and small projects.</p>
              
              <div className="mb-6 h-16">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white tracking-tight">৳{billingCycle === 'yearly' ? '2400' : '250'}</span>
                  <span className="text-[#71717a] text-sm mb-1">/{billingCycle === 'yearly' ? 'year' : 'mo'}</span>
                </div>
                {billingCycle === 'yearly' && <p className="text-sm text-[#a1a1aa] mt-1">~৳200 per month</p>}
              </div>
              
              <a href="#" className="w-full block text-center px-6 py-3.5 bg-[#222222] border border-white/10 hover:bg-[#333333] text-white font-semibold rounded-xl transition-all shadow-md mb-8">
                Get Started
              </a>

              <p className="text-xs uppercase tracking-widest font-semibold text-[#71717a] mb-4">Top Features</p>
              <ul className="space-y-4 text-sm text-[#a1a1aa] flex-1">
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-red mt-1 text-[10px]"></i> 1 Core vCPU (Shared)</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-red mt-1 text-[10px]"></i> 1 GB Dedicated RAM</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-red mt-1 text-[10px]"></i> Unlimited Workflows</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-red mt-1 text-[10px]"></i> Community Edition</li>
              </ul>
            </div>

            {/* Popular (n8n 2G) */}
            <div className="bg-[#1a0a0a] border-2 border-red-500/50 rounded-2xl p-6 md:p-8 flex flex-col shadow-[0_0_40px_rgba(204,0,0,0.2)] relative transform md:-translate-y-4">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-red/5 to-transparent rounded-2xl pointer-events-none"></div>
              
              <div className="absolute top-0 right-6 -translate-y-1/2">
                <span className="bg-gradient-to-r from-brand-red to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  Most Popular
                </span>
              </div>

              <h3 className="text-xl font-semibold text-white mb-1">Power (2G)</h3>
              <p className="text-sm text-[#71717a] mb-6">Designed for growing business logic.</p>
              
              <div className="mb-6 h-16">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white tracking-tight">৳{billingCycle === 'yearly' ? '4800' : '450'}</span>
                  <span className="text-[#71717a] text-sm mb-1">/{billingCycle === 'yearly' ? 'year' : 'mo'}</span>
                </div>
                {billingCycle === 'yearly' && <p className="text-sm text-[#a1a1aa] mt-1">~৳400 per month</p>}
              </div>
              
              <a href="#" className="w-full block text-center px-6 py-3.5 bg-brand-red hover:bg-[#a30000] shadow-lg shadow-brand-red/30 text-white font-semibold rounded-xl transition-all mb-8">
                Get Started
              </a>

              <p className="text-xs uppercase tracking-widest font-semibold text-[#71717a] mb-4">Top Features</p>
              <ul className="space-y-4 text-sm text-[#a1a1aa] flex-1">
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-red mt-1 text-[10px]"></i> 1 Core vCPU (Shared)</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-red mt-1 text-[10px]"></i> <strong>2 GB Dedicated RAM</strong></li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-red mt-1 text-[10px]"></i> Unlimited Workflows</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-red mt-1 text-[10px]"></i> Priority Support</li>
              </ul>
            </div>

            {/* Premium (n8n 4G) */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col hover:border-white/20 transition-colors shadow-2xl">
              <h3 className="text-xl font-semibold text-white mb-1">Ultimate (4G)</h3>
              <p className="text-sm text-[#71717a] mb-6">Heavy workloads & advanced integrations.</p>
              
              <div className="mb-6 h-16">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white tracking-tight">৳{billingCycle === 'yearly' ? '9600' : '900'}</span>
                  <span className="text-[#71717a] text-sm mb-1">/{billingCycle === 'yearly' ? 'year' : 'mo'}</span>
                </div>
                {billingCycle === 'yearly' && <p className="text-sm text-[#a1a1aa] mt-1">~৳800 per month</p>}
              </div>
              
              <a href="#" className="w-full block text-center px-6 py-3.5 bg-[#222222] border border-white/10 hover:bg-[#333333] text-white font-semibold rounded-xl transition-all shadow-md mb-8">
                Get Started
              </a>

              <p className="text-xs uppercase tracking-widest font-semibold text-[#71717a] mb-4">Top Features</p>
              <ul className="space-y-4 text-sm text-[#a1a1aa] flex-1">
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-red mt-1 text-[10px]"></i> <strong>2 Core vCPU (Shared)</strong></li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-red mt-1 text-[10px]"></i> <strong>4 GB Dedicated RAM</strong></li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-red mt-1 text-[10px]"></i> Complex Workflow Capable</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-brand-red mt-1 text-[10px]"></i> AI Modules Supported</li>
              </ul>
            </div>

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
                  <th className="py-6 px-6 font-semibold text-[#a1a1aa] text-sm w-1/3">Feature details</th>
                  <th className="py-6 px-4 font-semibold text-white text-center text-sm w-[22%]">1G</th>
                  <th className="py-6 px-4 font-semibold text-white text-center text-sm w-[22%] bg-brand-red/5">2G</th>
                  <th className="py-6 px-4 font-semibold text-white text-center text-sm w-[22%]">4G</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-[#d4d4d8]">
                
                {/* Category: Hardware */}
                <tr>
                  <td colSpan="4" className="py-4 px-6 text-xs uppercase tracking-widest font-semibold text-[#71717a] bg-[#1a1a1a]/50">Hardware & Resources</td>
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium">vCPU Cores</td>
                  <td className="py-4 px-4 text-center">1</td>
                  <td className="py-4 px-4 text-center bg-brand-red/5">1</td>
                  <td className="py-4 px-4 text-center">2</td>
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium">Dedicated RAM</td>
                  <td className="py-4 px-4 text-center">1 GB</td>
                  <td className="py-4 px-4 text-center bg-brand-red/5">2 GB</td>
                  <td className="py-4 px-4 text-center">4 GB</td>
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium">Network Speed</td>
                  <td className="py-4 px-4 text-center">BDIX Peered</td>
                  <td className="py-4 px-4 text-center bg-brand-red/5">BDIX Peered</td>
                  <td className="py-4 px-4 text-center">BDIX Peered</td>
                </tr>

                {/* Category: Software */}
                <tr>
                  <td colSpan="4" className="py-4 px-6 text-xs uppercase tracking-widest font-semibold text-[#71717a] bg-[#1a1a1a]/50">Software & Core n8n Features</td>
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium">n8n Community Edition</td>
                  <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                  <td className="py-4 px-4 text-center bg-brand-red/5"><i className="fa-solid fa-check text-green-500"></i></td>
                  <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium">Unlimited Workflows</td>
                  <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                  <td className="py-4 px-4 text-center bg-brand-red/5"><i className="fa-solid fa-check text-green-500"></i></td>
                  <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium">Unlimited Executions</td>
                  <td className="py-4 px-4 text-center">Hardware Limit</td>
                  <td className="py-4 px-4 text-center bg-brand-red/5">Hardware Limit</td>
                  <td className="py-4 px-4 text-center">Hardware Limit</td>
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium">Custom Node Integrations</td>
                  <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                  <td className="py-4 px-4 text-center bg-brand-red/5"><i className="fa-solid fa-check text-green-500"></i></td>
                  <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                </tr>

                {/* Category: Support */}
                <tr>
                  <td colSpan="4" className="py-4 px-6 text-xs uppercase tracking-widest font-semibold text-[#71717a] bg-[#1a1a1a]/50">Installation & Support</td>
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium">Free Docker Installation</td>
                  <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                  <td className="py-4 px-4 text-center bg-brand-red/5"><i className="fa-solid fa-check text-green-500"></i></td>
                  <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium">Managed OS Environment</td>
                  <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                  <td className="py-4 px-4 text-center bg-brand-red/5"><i className="fa-solid fa-check text-green-500"></i></td>
                  <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium">24/7 Chat Support</td>
                  <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                  <td className="py-4 px-4 text-center bg-brand-red/5"><i className="fa-solid fa-check text-green-500"></i></td>
                  <td className="py-4 px-4 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                </tr>
                <tr className="hover:bg-[#222222] transition-colors">
                  <td className="py-4 px-6 font-medium">Manual Version Updates</td>
                  <td className="py-4 px-4 text-center">On Request</td>
                  <td className="py-4 px-4 text-center bg-brand-red/5">On Request</td>
                  <td className="py-4 px-4 text-center">On Request</td>
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
