import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-light relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2.5 bg-white border border-gray-200 rounded-full shadow-sm text-dark text-sm font-semibold px-4 py-2 mb-8">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            Bangladesh's Fastest BDIX Hosting — Priced in Taka, Built for Local Speed.
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-dark leading-[1.1] mb-6 tracking-tight font-heading">
            Deploy faster with <span className="text-primary">production-grade</span> infrastructure.
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 font-medium max-w-2xl mx-auto mb-10 leading-relaxed font-body">
            NVMe SSD hosting, instant deployment, 99.9% uptime, and direct BDIX peering. Built by developers, for developers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a href="#pricing" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-[#AA0000] text-white text-lg font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5">
              Check Hosting Plans
              <i className="fa-solid fa-arrow-right text-sm"></i>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-600">
            <span className="flex items-center gap-2"><i className="fa-solid fa-circle-check text-green-500"></i> Free SSL</span>
            <span className="flex items-center gap-2"><i className="fa-solid fa-circle-check text-green-500"></i> Local Support</span>
            <span className="flex items-center gap-2"><i className="fa-solid fa-circle-check text-green-500"></i> BDIX Peered</span>
          </div>
        </div>
      </section>

      {/* SINGLE DIFFERENTIATOR STATEMENT */}
      <section className="py-12 bg-muted border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xl sm:text-2xl font-bold text-dark font-heading leading-relaxed">
            We deliver ultra-low latency and unparalleled speed across Bangladesh with dedicated NVMe drives and premium BDIX connectivity.
          </p>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-20 lg:py-28 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mb-4 font-heading">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 text-lg font-body">Choose the perfect plan for your needs. All plans include free SSL, free migration, and local support.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
            {/* Starter */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 p-8 flex flex-col font-body">
              <div className="mb-6">
                <span className="inline-block bg-muted text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                  <i className="fa-solid fa-bolt mr-1"></i>Starter
                </span>
                <h3 className="text-2xl font-black text-dark mb-1 font-heading">Starter Plan</h3>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className="text-5xl font-black text-dark font-heading">৳490</span>
                  <span className="text-gray-400 font-medium">/mo</span>
                </div>
                <p className="text-sm text-primary font-bold mt-2">BDIX-optimized, 99.9% uptime SLA</p>
              </div>
              <div className="border-t border-gray-200 pt-6 mb-6">
                <ul className="space-y-3">
                  {['10 GB NVMe SSD','Unlimited Bandwidth','2-Core CPU Limit','Free SSL Certificates','cPanel® Included'].map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <i className="fa-solid fa-check text-green-500 w-4"></i> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <a href="#" className="block w-full text-center border-2 border-gray-300 text-dark font-bold py-3.5 rounded-xl hover:border-primary hover:text-primary transition-colors">Select Plan</a>
              </div>
            </div>
            
            {/* Professional (Highlighted) */}
            <div className="bg-white border-2 border-primary rounded-2xl transition-all shadow-xl hover:-translate-y-1 p-8 flex flex-col relative lg:-mt-4 lg:-mb-4 font-body">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow">Most Popular</span>
              </div>
              <div className="mb-6 mt-2">
                <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                  <i className="fa-solid fa-star mr-1"></i>Professional
                </span>
                <h3 className="text-2xl font-black text-dark mb-1 font-heading">Pro Plan</h3>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className="text-5xl font-black text-dark font-heading">৳2500</span>
                  <span className="text-gray-400 font-medium">/mo</span>
                </div>
                <p className="text-sm text-primary font-bold mt-2">Premium AMD EPYC, 99.9% uptime SLA</p>
              </div>
              <div className="border-t border-gray-200 pt-6 mb-6">
                <ul className="space-y-3">
                  {['50 GB NVMe SSD','Unlimited Bandwidth','4-Core CPU Limit','Free .COM Domain','Free SSL & Migration','cPanel® Included'].map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <i className="fa-solid fa-check text-primary w-4"></i> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <a href="#" className="block w-full text-center bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-[#AA0000] transition-colors shadow-md">Select Plan</a>
              </div>
            </div>

            {/* Enterprise */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 p-8 flex flex-col font-body">
              <div className="mb-6">
                <span className="inline-block bg-muted text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                  <i className="fa-solid fa-building mr-1"></i>Enterprise
                </span>
                <h3 className="text-2xl font-black text-dark mb-1 font-heading">Enterprise Plan</h3>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className="text-5xl font-black text-dark font-heading">৳4550</span>
                  <span className="text-gray-400 font-medium">/mo</span>
                </div>
                <p className="text-sm text-primary font-bold mt-2">Maximum Resources & Priority Support</p>
              </div>
              <div className="border-t border-gray-200 pt-6 mb-6">
                <ul className="space-y-3">
                  {['100 GB NVMe SSD','Unlimited Bandwidth','8-Core CPU Limit','Free .COM Domain','Free SSL & Migration','cPanel® Included'].map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <i className="fa-solid fa-check text-green-500 w-4"></i> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <a href="#" className="block w-full text-center border-2 border-gray-300 text-dark font-bold py-3.5 rounded-xl hover:border-primary hover:text-primary transition-colors">Select Plan</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE PROOF (2 COLUMNS) */}
      <section className="py-20 lg:py-28 bg-muted font-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Highlighted Feature */}
            <div className="bg-white rounded-3xl p-10 lg:p-14 shadow-xl border border-gray-200">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-3xl mb-8">
                <i className="fa-solid fa-server"></i>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mb-6 font-heading">Why choose SNBD Host?</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Generic global hosts route your local traffic across the world, creating latency that hurts your business. We operate our own infrastructure deeply integrated with the BDIX network to ensure your Bangladeshi customers experience instantaneous load times. 
              </p>
              <div className="inline-flex items-center gap-3 bg-muted px-5 py-3 rounded-xl border border-gray-200">
                <span className="text-green-500 font-black text-xl">{'<'} 10ms</span>
                <span className="text-gray-600 font-semibold text-sm">Local Ping Response</span>
              </div>
            </div>

            {/* Secondary List */}
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary text-xl shadow-sm shrink-0 border border-gray-200">
                  <i className="fa-solid fa-microchip"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark mb-2 font-heading">Enterprise AMD EPYC Hardware</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">We utilize top-tier enterprise processors ensuring compute resources are never bottlenecked during high-traffic events.</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary text-xl shadow-sm shrink-0 border border-gray-200">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark mb-2 font-heading">Isolated Carrier-Grade Security</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Each account operates within its own isolated CloudLinux environment, meaning neighboring traffic never affects you.</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary text-xl shadow-sm shrink-0 border border-gray-200">
                  <i className="fa-solid fa-headset"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark mb-2 font-heading">Taka Pricing & Local Support</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Pay effortlessly in BDT using local payment gateways without forex hassles. We speak your language.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / UPTIME STAT (Restyled LiteSpeed Section) */}
      <section className="py-20 lg:py-24 bg-light font-body border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-4xl mx-auto mb-8">
            <i className="fa-solid fa-bolt"></i>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark leading-tight mb-6 font-heading">Powered by LiteSpeed Web Server</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-12">
            Our servers utilize LiteSpeed technology, proven to be up to 9x faster than standard Apache. Coupled with our NVMe drives, your websites inherently support HTTP/3 and built-in advanced caching right out of the box, handling traffic spikes effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-3 bg-white border border-gray-200 text-dark font-bold px-6 py-3.5 rounded-xl shadow-sm">
              <span className="text-primary text-xl"><i className="fa-solid fa-gauge-high"></i></span>
              <span>9x Faster than Apache</span>
            </div>
            <div className="flex items-center gap-3 bg-white border border-gray-200 text-dark font-bold px-6 py-3.5 rounded-xl shadow-sm">
              <span className="text-green-500 text-xl"><i className="fa-solid fa-network-wired"></i></span>
              <span>HTTP/3 Support</span>
            </div>
            <div className="flex items-center gap-3 bg-white border border-gray-200 text-dark font-bold px-6 py-3.5 rounded-xl shadow-sm">
              <span className="text-yellow-500 text-xl"><i className="fa-solid fa-database"></i></span>
              <span>Built-in LSCache</span>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 lg:py-28 bg-muted font-body relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark leading-tight mb-6 font-heading">
            Ready to upgrade your infrastructure?
          </h2>
          <p className="text-gray-600 text-lg mb-10">
            Join thousands of Bangladeshi developers building on SNBD Host. Get started today and deploy in seconds.
          </p>
          <a href="#pricing" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-[#AA0000] text-white text-lg font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5">
            Check Hosting Plans
            <i className="fa-solid fa-arrow-right text-sm"></i>
          </a>
        </div>
      </section>

    </>
  )
}
