import { Link } from 'react-router-dom'

export default function OpenClaw() {
  return (
    <div className="bg-white text-black font-body selection:bg-red selection:text-white pb-32">
      
      {/* ========== SECTION 1: HERO ========== */}
      <section className="pt-24 pb-12 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-red/5 blur-[120px] pointer-events-none -z-10"></div>

        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          <h1 className="text-6xl sm:text-7xl font-black text-red tracking-tight mb-4 font-display">
            OpenClaw
          </h1>
          <p className="text-lg sm:text-2xl font-bold text-black mb-8">
            The AI That Actually Does Things
          </p>

          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            Manage your calendar instantly from WhatsApp and Telegram.
          </p>

          <a href="#pricing" className="inline-flex items-center justify-center bg-red text-white text-lg font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-red/20 hover:bg-[#a30000]">
            Start Free — No Setup Required
          </a>

        </div>
      </section>

      {/* ========== SECTION 2: SPONSOR LOGOS ========== */}
      <section className="py-12 bg-muted-light border-y border-gray-100">
        <div className="w-full text-center mb-6">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Built on infrastructure from</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-20 px-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
          <div className="flex items-center gap-2 font-black text-2xl text-black font-display">
            <i className="fa-solid fa-certificate"></i> OpenAI
          </div>
          <div className="flex items-center gap-2 font-black text-2xl text-black font-display">
            <i className="fa-solid fa-n"></i> NVIDIA
          </div>
          <div className="flex items-center gap-2 font-black text-2xl text-black font-display">
            <i className="fa-solid fa-caret-up"></i> Vercel
          </div>
          <div className="flex items-center gap-2 font-black text-2xl text-black font-display">
            <i className="fa-solid fa-layer-group"></i> Convex
          </div>
        </div>
      </section>

      {/* ========== SECTION 3: PRICING ========== */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          
          <h2 className="text-3xl font-bold text-black mb-12 text-center font-display">Pricing Plans</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Starter */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-black mb-1">Starter</h3>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-black text-black tracking-tighter">৳499</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <ul className="space-y-4 text-sm text-gray-600 mb-10 flex-1">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0"></div> 1vCPU & 1GB RAM</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0"></div> Essential WhatsApp Integration</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0"></div> Standard Response SLA</li>
              </ul>
              <button className="w-full bg-muted-light text-black font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors border border-gray-300">
                Start Starter Plan
              </button>
            </div>

            {/* Pro */}
            <div className="bg-white border-2 border-red rounded-3xl p-8 flex flex-col shadow-2xl scale-100 lg:scale-[1.03] z-10">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-red mb-1">Pro</h3>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-black text-black tracking-tighter">৳1299</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <ul className="space-y-4 text-sm text-gray-600 mb-10 flex-1">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red mt-1.5 shrink-0"></div> 2vCPU & 4GB RAM</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red mt-1.5 shrink-0"></div> Advanced Multi-Channel (Web/Chat)</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red mt-1.5 shrink-0"></div> Priority Queue Support</li>
              </ul>
              <button className="w-full bg-red text-white font-bold py-3.5 rounded-xl hover:bg-[#a30000] transition-colors">
                Start Pro
              </button>
            </div>

            {/* Business */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-black mb-1">Business</h3>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-black text-black tracking-tighter">৳3499</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <ul className="space-y-4 text-sm text-gray-600 mb-10 flex-1">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0"></div> 4vCPU & 8GB RAM</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0"></div> Advanced Local API Tethers</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0"></div> Dedicated Account Manager</li>
              </ul>
              <button className="w-full bg-muted-light text-black font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors border border-gray-300">
                Talk to Sales
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ========== SECTION 4: WHAT IT DOES ========== */}
      <section className="py-20 px-4 bg-muted-light border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-3xl font-bold text-black mb-12 font-display">What It Does</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Primary Feature Panel */}
            <div className="bg-white rounded-3xl p-10 lg:p-14 border border-gray-200 shadow-sm">
              <div className="text-red font-display text-2xl mb-4 font-black tracking-tight">Persistent Memory</div>
              <h3 className="text-3xl sm:text-4xl font-bold text-black mb-6 leading-tight">It inherently knows you, forever.</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                OpenClaw actively manages a secure, isolated embedded database of your preferences, schedules, notes, and contacts. It references past conversations seamlessly, never forcing you to repeat context.
              </p>
            </div>

            {/* Secondary Feature List */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h4 className="font-bold text-black text-lg mb-1">Full System API Control</h4>
                <p className="text-gray-600 text-sm">Read emails, interact with internal tools, and edit files safely via secured webhooks.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h4 className="font-bold text-black text-lg mb-1">SNBD High Availability</h4>
                <p className="text-gray-600 text-sm">Deployed on blazing-fast distributed nodes. Your memory and models are fully highly available.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h4 className="font-bold text-black text-lg mb-1">Native Browser Actions</h4>
                <p className="text-gray-600 text-sm">Instruct it to search live directories, fill redundant forms, and pull text directly from URLs.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h4 className="font-bold text-black text-lg mb-1">Community Plugins</h4>
                <p className="text-gray-600 text-sm">Extend logic endlessly with developer community skills integrating external SaaS tools.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========== SECTION 5: WORKS WITH EVERYTHING ========== */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          <h2 className="text-3xl font-bold text-black mb-4 font-display">Works With Everything</h2>
          <p className="text-gray-600 text-lg mb-12 font-medium">OpenClaw connects to the tools you're already using — no reconfiguration.</p>

          <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
            {[
              { icon: "fa-whatsapp", color: "text-[#25D366]", name: "WhatsApp" },
              { icon: "fa-telegram", color: "text-[#229ED9]", name: "Telegram" },
              { icon: "fa-discord", color: "text-[#5865F2]", name: "Discord" },
              { icon: "fa-slack", color: "text-[#E01E5A]", name: "Slack" },
              { icon: "fa-apple", color: "text-blue-500", name: "Apple App" },
              { icon: "fa-github", color: "text-gray-900", name: "GitHub" },
              { icon: "fa-envira", color: "text-green-500", name: "Notion" },
              { icon: "fa-atlassian", color: "text-blue-600", name: "Jira" },
            ].map((app, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-2xl hover:bg-muted-light transition-colors min-w-[120px] shadow-sm">
                <i className={`fa-brands ${app.icon} ${app.color} text-4xl mb-3`}></i>
                <span className="text-sm font-bold text-black">{app.name}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========== SECTION 6: PRESS / FEATURED IN ========== */}
      <section className="py-20 px-4 bg-muted-light border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          
          <h2 className="text-3xl font-bold text-black mb-12 font-display text-center">Featured In</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center relative overflow-hidden group hover:border-red transition-colors shadow-sm">
              <h3 className="font-black text-2xl mb-6 text-black tracking-tight">MacStories</h3>
              <p className="text-gray-800 text-lg font-medium italic leading-relaxed mb-6">
                "OpenClaw Showed Me What the Future of Personal Assistants Looks Like"
              </p>
              <div className="text-red text-sm font-bold uppercase tracking-widest">Federico Viticci</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center relative overflow-hidden group hover:border-red transition-colors shadow-sm">
              <h3 className="font-black text-2xl mb-6 text-black tracking-tight">StarryHope</h3>
              <p className="text-gray-800 text-lg font-medium italic leading-relaxed mb-6">
                "Why Developers Are Buying Hosted APIs to Run Their Own AI Agents"
              </p>
              <div className="text-red text-sm font-bold uppercase tracking-widest">Jim Mendenhall</div>
            </div>

          </div>
        </div>
      </section>

      {/* ========== SECTION 7: TESTIMONIALS ========== */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          
          <h2 className="text-3xl font-bold text-black mb-12 font-display text-center">What People Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-white border border-gray-200 rounded-3xl p-8 relative shadow-sm">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <p className="text-gray-800 leading-relaxed text-lg mb-8 font-medium">
                    "This is lifechanging. Deployed yesterday. All I have to say is wow. And I was using a custom Mac app and loved all of my text quirks, so..."
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted-light rounded-full flex items-center justify-center border border-gray-300 shadow-sm text-black font-bold">JD</div>
                  <div className="flex flex-col">
                    <span className="font-bold text-black">Jonathan Douglas</span>
                    <span className="text-red text-sm font-semibold">@jondouglas</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-8 relative shadow-sm">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <p className="text-gray-800 leading-relaxed text-lg mb-8 font-medium">
                    "OpenClaw is a game changer, the potential for custom extensions is huge, and already speeds up my process significantly."
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted-light rounded-full flex items-center justify-center border border-gray-300 shadow-sm text-black font-bold">M</div>
                  <div className="flex flex-col">
                    <span className="font-bold text-black">Master</span>
                    <span className="text-red text-sm font-semibold">@Master_M71</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========== SECTION 8: NEWSLETTER ========== */}
      <section className="py-16 px-4 mb-4">
        <div className="max-w-4xl mx-auto">
           <div className="bg-black rounded-3xl p-12 text-center shadow-xl">
              
              <h2 className="text-3xl font-bold text-white mb-4 font-display leading-tight">New integrations ship weekly. Get the changelog.</h2>
              <p className="text-gray-400 text-base mb-10 max-w-xl mx-auto font-medium">
                Stay updated with the latest API drops and community scripts. No spam, unsubscribe anytime.
              </p>

              <div className="max-w-md mx-auto flex items-center bg-white border border-transparent rounded-2xl overflow-hidden p-1.5 focus-within:ring-4 ring-red/30 shadow-lg">
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="flex-1 w-full px-5 outline-none text-base text-black bg-transparent border-none focus:ring-0"
                />
                <button className="bg-red text-white text-base font-bold px-8 py-4 rounded-xl hover:bg-[#a30000] transition-colors whitespace-nowrap">
                  Send Me Updates
                </button>
              </div>

           </div>
        </div>
      </section>



    </div>
  );
}
