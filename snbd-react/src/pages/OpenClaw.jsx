import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import JsonLd from '../components/JsonLd';
import { pageMeta } from '../seo/pageMeta';

export default function OpenClaw() {
  const [billingTab, setBillingTab] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "Do I need technical skills to use OpenClaw?",
      answer: "Not at all. With SNBD HOST's 1-click deployment, OpenClaw is installed and configured automatically. You simply log in and connect your apps via the visual interface."
    },
    {
      question: "Can I use OpenClaw with my own local LLM models?",
      answer: "Yes. OpenClaw supports direct API connections to locally hosted models (like Llama 3) or external providers (OpenAI, Anthropic, etc.)."
    },
    {
      question: "Is my data completely secure and private?",
      answer: "100%. Unlike hosted SaaS platforms, your OpenClaw instance runs entirely on your SNBD HOST server. Your prompts, customer data, and API keys never leave your node."
    },
    {
      question: "What happens if my agent needs more resources?",
      answer: "You can seamlessly scale your VPS up from the SNBD HOST dashboard without any data loss. Upgrades take less than 60 seconds."
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
    <div className="bg-[#F8F9FA] text-gray-900 font-body selection:bg-primary selection:text-white pb-20">
      <SEOHead {...pageMeta.openclaw} />
      <JsonLd data={faqSchema} />
      {/* ========== SECTION 1: HERO ========== */}
      <section className="pt-28 pb-16 px-4 relative overflow-hidden flex flex-col items-center">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-red-100/50 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center z-10 mb-12">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            OpenClaw AI v2.0
          </div>
          
          <h1 className="text-5xl sm:text-5xl md:text-5xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-[1.1]">
            Your own AI agent.<br/> Private, always on & <span className="text-primary">live in 60 seconds.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-medium">
            Connect OpenClaw to WhatsApp, Slack, and your internal databases without writing a single line of code.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a href="#pricing" className="bg-primary hover:bg-primary-dark text-white text-lg font-bold px-10 py-4 rounded-xl shadow-lg shadow-red-200 transition-all duration-300">
              Get Started Now
            </a>
            <a href="#features" className="text-gray-600 font-bold hover:text-primary transition-colors px-6 py-4">
              See all features →
            </a>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-gray-500">
            Excellent <span className="text-green-500 text-lg">★★★★★</span> Trustpilot 4.9/5
          </div>
        </div>

        {/* Hero Mockup */}
        <div className="w-full max-w-5xl mx-auto z-10">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[450px]">
            {/* Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="ml-4 bg-white border border-gray-200 rounded px-3 py-1 text-xs text-gray-500 font-mono flex-1 text-center">
                openclaw.yourdomain.com
              </div>
            </div>
            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 hidden md:block">
                <div className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <i className="fa-solid fa-robot text-primary"></i> OpenClaw
                </div>
                <div className="space-y-1">
                  {['Dashboard', 'Workflows', 'Integrations', 'API Keys', 'Settings'].map((item, i) => (
                    <div key={item} className={`px-3 py-2 rounded-lg text-sm font-semibold ${i === 1 ? 'bg-white text-primary shadow-sm border border-gray-100' : 'text-gray-600 hover:bg-gray-100'}`}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              {/* Main Chat Area */}
              <div className="flex-1 bg-[#F9FAFB] p-6 flex flex-col justify-end relative">
                <div className="absolute top-6 left-6 text-xl font-bold text-gray-300">Active Workflow: Customer Support</div>
                
                <div className="space-y-6 max-w-3xl mx-auto w-full">
                  <div className="flex justify-end">
                    <div className="bg-primary text-white rounded-2xl rounded-tr-sm px-5 py-3 shadow-sm max-w-md">
                      Retrieve the latest order status for email: john@example.com
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm max-w-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="fa-solid fa-robot text-primary"></i> <span className="font-bold text-xs">OpenClaw Agent</span>
                      </div>
                      <p className="text-sm">I found the order in the database.</p>
                      <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mt-3 text-xs font-mono text-gray-600">
                        Status: SHIPPED<br/>Tracking: fedex_18392019<br/>ETA: Tomorrow, 2:00 PM
                      </div>
                      <p className="text-sm mt-3">Would you like me to send an SMS update to the customer via Twilio?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: HIGHLIGHTS ========== */}
      <section id="features" className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-14 h-14 bg-red-50 text-primary rounded-xl flex items-center justify-center text-xl mx-auto mb-5">
              <i className="fa-regular fa-folder-open"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">100% Open Source</h3>
            <p className="text-sm text-gray-500 leading-relaxed">The code is fully open-source and ready for the deepest audits. Absolutely no black boxes.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-14 h-14 bg-red-50 text-primary rounded-xl flex items-center justify-center text-xl mx-auto mb-5">
              <i className="fa-solid fa-puzzle-piece"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Complete Integration</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Easily connect with WhatsApp, Telegram, Discord, and Slack out of the box in seconds.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-14 h-14 bg-red-50 text-primary rounded-xl flex items-center justify-center text-xl mx-auto mb-5">
              <i className="fa-solid fa-lock"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Maximum Privacy</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Your data stays on your server. Nothing leaves your SNBD node without your explicit permission.</p>
          </div>
        </div>
      </section>

      {/* ========== SECTION 3: PRICING ========== */}
      <section id="pricing" className="py-20 px-4 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">Pick your plan</h2>
          
          <div className="flex justify-center mb-12">
            <div className="bg-[#F4F5F7] p-1 rounded-full inline-flex shadow-inner border border-gray-200">
              <button 
                onClick={() => setBillingTab('monthly')}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${billingTab === 'monthly' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-800'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingTab('annual')}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${billingTab === 'annual' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-800'}`}
              >
                Annual <span className="ml-1 text-xs bg-red-100 text-primary px-2 py-0.5 rounded-full">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { name: 'Claw Starter', priceM: '997', priceY: '11,997', cpu: 2, ram: 4, disk: 40, link: 'https://portal.snbdhost.com/store/ai-agent-hosting/claw-starter' },
              { name: 'Claw Pro', priceM: '1,597', priceY: '19,197', cpu: 4, ram: 8, disk: 80, popular: true, link: 'https://portal.snbdhost.com/store/ai-agent-hosting/claw-pro' },
              { name: 'Claw Elite', priceM: '2,597', priceY: '31,197', cpu: 8, ram: 16, disk: 160, link: 'https://portal.snbdhost.com/store/ai-agent-hosting/claw-elite' },
              { name: 'Claw Enterprise', priceM: '4,797', priceY: '57,597', cpu: 16, ram: 32, disk: 320, link: 'https://portal.snbdhost.com/store/ai-agent-hosting/claw-enterprise' },
            ].map((plan, idx) => (
              <div key={idx} className={`bg-white border ${plan.popular ? 'border-primary border-2 shadow-xl shadow-red-100 transform md:-translate-y-4 relative' : 'border-gray-200 shadow-sm'} rounded-3xl p-6 flex flex-col hover:shadow-md transition-shadow`}>
                {plan.popular && (
                  <div className="absolute top-0 right-6 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                    RECOMMENDED
                  </div>
                )}
                
                <h3 className={`text-xl font-bold mb-4 ${plan.popular ? 'text-primary' : 'text-gray-900'}`}>{plan.name}</h3>
                
                <div className="mb-6 border-b border-gray-100 pb-6">
                  <span className="text-3xl font-extrabold text-gray-900">৳{billingTab === 'monthly' ? plan.priceM : plan.priceY}</span>
                  <span className="text-gray-500 font-medium">/{billingTab === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                
                <a href={plan.link} className={`w-full text-center font-bold py-3.5 rounded-xl transition-colors mb-6 border ${plan.popular ? 'bg-primary hover:bg-primary-dark text-white border-transparent shadow-md shadow-red-200' : 'bg-[#F4F5F7] hover:bg-gray-200 text-gray-900 border-gray-200'}`}>
                  Select Plan
                </a>
                
                <div className="text-sm font-bold text-gray-900 mb-4">Top Features</div>
                <ul className="space-y-4 text-sm text-gray-600 flex-1">
                  <li className="flex items-start gap-3"><i className={`fa-solid fa-check mt-0.5 ${plan.popular ? 'text-primary' : 'text-green-500'}`}></i> {plan.cpu} Core High-Performance CPU</li>
                  <li className="flex items-start gap-3"><i className={`fa-solid fa-check mt-0.5 ${plan.popular ? 'text-primary' : 'text-green-500'}`}></i> {plan.ram} GB Dedicated RAM</li>
                  <li className="flex items-start gap-3"><i className={`fa-solid fa-check mt-0.5 ${plan.popular ? 'text-primary' : 'text-green-500'}`}></i> {plan.disk} GB NVMe Storage</li>
                  <li className="flex items-start gap-3"><i className={`fa-solid fa-check mt-0.5 ${plan.popular ? 'text-primary' : 'text-green-500'}`}></i> Automated One-Click Deployment</li>
                  <li className="flex items-start gap-3"><i className={`fa-solid fa-check mt-0.5 ${plan.popular ? 'text-primary' : 'text-green-500'}`}></i> Pre-configured Nginx Reverse Proxy</li>
                  <li className="flex items-start gap-3"><i className={`fa-solid fa-check mt-0.5 ${plan.popular ? 'text-primary' : 'text-green-500'}`}></i> Node.js 22 & OpenClaw Global Environment</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: 3 EASY STEPS ========== */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Deploy OpenClaw in 3 easy steps</h2>
          <p className="text-gray-500 mb-12">SNBD HOST's auto-installer sets everything up for you. No server administration required.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-left shadow-sm relative overflow-hidden">
              <div className="text-5xl font-extrabold text-gray-50 absolute -bottom-4 -right-2">1</div>
              <div className="w-10 h-10 bg-red-50 text-primary rounded-full flex items-center justify-center font-extrabold mb-4 z-10 relative">1</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 relative z-10">Select Hosting plan</h3>
              <p className="text-gray-500 text-sm relative z-10">Choose between the Starter or Pro plan depending on the complexity of your workflows.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-left shadow-sm relative overflow-hidden">
              <div className="text-5xl font-extrabold text-gray-50 absolute -bottom-4 -right-2">2</div>
              <div className="w-10 h-10 bg-red-50 text-primary rounded-full flex items-center justify-center font-extrabold mb-4 z-10 relative">2</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 relative z-10">Choose data center</h3>
              <p className="text-gray-500 text-sm relative z-10">Select from our USA or local BDIX data centers to minimize latency for your user base.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-left shadow-sm relative overflow-hidden">
              <div className="text-5xl font-extrabold text-gray-50 absolute -bottom-4 -right-2">3</div>
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-extrabold mb-4 z-10 relative">3</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 relative z-10">OpenClaw is ready</h3>
              <p className="text-gray-500 text-sm relative z-10">Within 60 seconds, your private dashboard is live. Log in and start building workflows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 5: CAROUSEL ========== */}
      <section className="py-20 bg-white border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">One agent. Endless workflows.</h2>
            <p className="text-gray-500">Automate your entire business logic.</p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary"><i className="fa-solid fa-arrow-left"></i></button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary"><i className="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-8 px-4 sm:px-8 snap-x hide-scrollbar">
          {[
            { icon: 'fa-headset', title: 'Customer Support', desc: 'Auto-reply to tickets using your knowledge base and docs.' },
            { icon: 'fa-database', title: 'Database Sync', desc: 'Pull customer data from MySQL and push updates to HubSpot automatically.' },
            { icon: 'fa-envelope-open-text', title: 'Email Triage', desc: 'Read incoming emails, categorize them, and draft responses for approval.' },
            { icon: 'fa-calendar-check', title: 'Appointment Booking', desc: 'Manage Google Calendar events via natural language WhatsApp messages.' },
            { icon: 'fa-file-invoice', title: 'Invoice Generation', desc: 'Trigger PDF invoice creation when Stripe payments succeed.' },
            { icon: 'fa-magnifying-glass-chart', title: 'Data Scraping', desc: 'Extract competitor pricing from websites every morning and save to Sheets.' },
          ].map((item, i) => (
            <div key={i} className="min-w-[280px] bg-[#F9FAFB] border border-gray-200 rounded-2xl p-6 snap-center hover:border-red-200 hover:bg-white hover:shadow-lg transition-all cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-primary text-xl mb-4">
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== SECTION 6: COMPARISON TABLE ========== */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">OpenClaw on SNBD HOST vs. others</h2>
          
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 p-6 items-center">
              <div className="font-bold text-gray-500 uppercase tracking-widest text-xs">Features</div>
              <div className="font-extrabold text-lg text-primary text-center">SNBD HOST</div>
              <div className="font-bold text-gray-600 text-center">Other Cloud SaaS</div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {[
                { f: 'Deploy and setup', snbd: '1-click Auto-Install', other: 'Manual CLI Configuration' },
                { f: 'Pricing predictability', snbd: 'Fixed Monthly Flat Fee', other: 'Unpredictable Token Costs' },
                { f: 'Data privacy', snbd: '100% Locally Hosted', other: 'Shared API Endpoints' },
                { f: 'Hardware Access', snbd: 'Dedicated NVMe & vCPU', other: 'Shared / Throttled' },
                { f: 'Integrations', snbd: '300+ Tools Out of the Box', other: 'Custom coding required' },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 p-6 items-center hover:bg-gray-50 transition-colors">
                  <div className="font-bold text-gray-800 text-sm">{row.f}</div>
                  <div className="text-center font-bold text-green-600 text-sm flex items-center justify-center gap-2">
                    <i className="fa-solid fa-check"></i> {row.snbd}
                  </div>
                  <div className="text-center text-gray-500 text-sm flex items-center justify-center gap-2">
                    <i className="fa-solid fa-xmark text-red-400"></i> {row.other}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 7: WHY HOSTINGER / SNBD GRID ========== */}
      <section className="py-20 px-4 bg-[#F4F5F7]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">Why deploy OpenClaw with SNBD HOST?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'fa-bolt', title: 'Fast Deploy', desc: 'Our custom OS templates install OpenClaw environments instantly without bash scripts.' },
              { icon: 'fa-shield-halved', title: 'Enterprise Security', desc: 'Imunify360 firewall and DDoS protection shield your AI endpoints.' },
              { icon: 'fa-code', title: 'Developer APIs', desc: 'Access your node via secure jailed SSH and fully document REST APIs.' },
              { icon: 'fa-server', title: 'High Availability', desc: 'Built on clustered NVMe storage arrays ensuring your agent never goes offline.' },
              { icon: 'fa-lock', title: 'Premium SSL', desc: 'Auto-renewing Let\'s Encrypt SSL secures all webhook payloads automatically.' },
              { icon: 'fa-user-tie', title: '24/7 Expert Team', desc: 'Our sysadmins are awake 24/7 in Dhaka to support your infrastructure needs.' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-primary mb-4">
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 8: CTA BANNER ========== */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-gray-900 rounded-[2rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary rounded-full blur-[80px] opacity-30"></div>
          
          <div className="relative z-10 max-w-md text-left mb-8 md:mb-0">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Set up your OpenClaw today</h2>
            <p className="text-gray-400 mb-8 text-lg">Get a private AI that actually works for your business. No setup fees.</p>
            <a href="#pricing" className="inline-block bg-primary hover:bg-red-600 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg">
              Get Started Now
            </a>
          </div>
          
          {/* Abstract Graphic representing the 'N' or OpenClaw */}
          <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
            <div className="absolute inset-0 bg-primary rounded-3xl transform rotate-12 shadow-2xl"></div>
            <div className="absolute inset-0 bg-gray-800 rounded-3xl border border-gray-700 shadow-inner flex items-center justify-center transform -rotate-6">
              <i className="fa-solid fa-robot text-5xl md:text-5xl text-primary drop-shadow-[0_0_15px_rgba(208,2,27,0.5)]"></i>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 9: FAQS ========== */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">OpenClaw on SNBD HOST FAQs</h2>
          
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
                  <span className="font-bold text-gray-900 text-lg pr-4">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'bg-red-100 text-primary rotate-180' : 'bg-gray-100 text-gray-500'}`}>
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

    </div>
  );
}
