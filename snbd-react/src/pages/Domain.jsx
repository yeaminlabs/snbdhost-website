import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function DomainPage() {
  const [query, setQuery] = useState('')
  const [ext, setExt] = useState('.com')
  const [searched, setSearched] = useState(false)
  const [searchedQuery, setSearchedQuery] = useState('')

  const extPrices = {'.com':'৳1,200','.xyz':'৳99','.net':'৳1,400','.org':'৳1,300','.io':'৳4,500','.com.bd':'৳800','.bd':'৳800'}

  function handleSearch() {
    if (query.trim()) {
      setSearchedQuery(query.trim().replace(/\.[^.]+$/, ''))
      setSearched(true)
    }
  }

  function selectExt(e) {
    setExt(e)
  }

  return (
    <>
      {/* HERO + SEARCH */}
      <section className="bg-white pt-20 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            🌐 Register Your Domain Today
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-5">
            Find Your Perfect<br /><span className="text-[var(--brand-red)]">Domain Name</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
            Search from hundreds of domain extensions. Secure your brand online starting from just <strong className="text-gray-800">৳99/yr</strong>
          </p>

          <div className="bg-white rounded-2xl shadow-xl border border-[#E5E7EB] p-3 sm:p-4 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Search your domain name e.g. mysite.com"
                className="flex-1 px-4 py-3 text-base rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent text-gray-800 placeholder-gray-400"
              />
              <select
                value={ext}
                onChange={e => { setExt(e.target.value) }}
                className="sm:w-36 px-4 py-3 text-sm font-semibold rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent text-gray-500 bg-[#FFFFFF] cursor-pointer pr-8"
              >
                <option value=".com">.com</option>
                <option value=".net">.net</option>
                <option value=".org">.org</option>
                <option value=".xyz">.xyz</option>
                <option value=".io">.io</option>
                <option value=".com.bd">.com.bd</option>
                <option value=".bd">.bd</option>
              </select>
              <button
                onClick={handleSearch}
                className="bg-brand-red hover:bg-[var(--brand-red-dark)] text-white font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap flex items-center gap-2 justify-center"
              >
                <i className="fa-solid fa-magnifying-glass text-sm"></i>
                Search Domain
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {Object.entries(extPrices).map(([e, price]) => (
                <button
                  key={e}
                  onClick={() => selectExt(e)}
                  className={`ext-badge text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${ext === e ? 'bg-red-50 text-red-700 border-red-200' : 'bg-[#F8F9FB] text-gray-500 border-[#E5E7EB] hover:bg-red-50 hover:text-red-700 hover:border-red-200'}`}
                >
                  {e} <span className="text-[#9CA3AF]">{price}/yr</span>
                </button>
              ))}
            </div>
          </div>

          {searched && searchedQuery && (
            <div className="max-w-3xl mx-auto mt-5">
              <div className="search-result-card bg-[#FFFFFF] rounded-2xl shadow-xl border border-[#E5E7EB] overflow-hidden">
                <div className="bg-gray-50 border-b border-[#E5E7EB] px-5 py-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">Search Results for "<span className="text-[var(--brand-red)]">{searchedQuery}</span>"</span>
                  <span className="text-xs text-[#9CA3AF]">Showing 3 results</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {[{ext:'.com',price:'৳1,200'},{ext:'.net',price:'৳1,400'},{ext:'.xyz',price:'৳99'}].map(({ext:e,price}) => (
                    <div key={e} className="flex items-center justify-between px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-900 text-base">{searchedQuery}{e}</span>
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-green-100">
                          <i className="fa-solid fa-circle-check text-xs"></i> Available
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-gray-800">{price}<span className="text-xs font-normal text-[#9CA3AF]">/yr</span></span>
                        <a href="#" className="bg-brand-red hover:bg-[var(--brand-red-dark)] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">Register</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* DOMAIN PRICING TABLE */}
      <section className="section-subtle py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Domain Pricing</h2>
            <p className="text-lg text-gray-500">Transparent, competitive pricing with no hidden renewal fees</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#E5E7EB]">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg-subtle text-text-primary">
                    <th className="text-left px-6 py-4 font-bold text-sm uppercase tracking-wide">Extension</th>
                    <th className="text-center px-6 py-4 font-bold text-sm uppercase tracking-wide">Register (1yr)</th>
                    <th className="text-center px-6 py-4 font-bold text-sm uppercase tracking-wide">Renew (1yr)</th>
                    <th className="text-center px-6 py-4 font-bold text-sm uppercase tracking-wide">Transfer</th>
                    <th className="text-left px-6 py-4 font-bold text-sm uppercase tracking-wide hidden md:table-cell">Popular For</th>
                    <th className="text-center px-6 py-4 font-bold text-sm uppercase tracking-wide"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {ext:'.com',reg:'৳1,200',ren:'৳1,400',tra:'৳1,200',pop:'Business, personal brands',hot:false,bd:false},
                    {ext:'.net',reg:'৳1,400',ren:'৳1,600',tra:'৳1,400',pop:'Tech, networks',hot:false,bd:false},
                    {ext:'.org',reg:'৳1,300',ren:'৳1,500',tra:'৳1,300',pop:'NGOs, nonprofits',hot:false,bd:false},
                    {ext:'.xyz',reg:'৳99',ren:'৳599',tra:'৳499',pop:'Startups, portfolios',hot:true,bd:false},
                    {ext:'.io',reg:'৳4,500',ren:'৳5,000',tra:'৳4,500',pop:'Tech startups, SaaS',hot:false,bd:false},
                    {ext:'.info',reg:'৳700',ren:'৳900',tra:'৳700',pop:'Informational sites',hot:false,bd:false},
                    {ext:'.online',reg:'৳199',ren:'৳899',tra:'৳699',pop:'Online businesses',hot:false,bd:false},
                    {ext:'.store',reg:'৳299',ren:'৳1,299',tra:'৳999',pop:'eCommerce stores',hot:false,bd:false},
                    {ext:'.tech',reg:'৳599',ren:'৳1,999',tra:'৳1,499',pop:'Tech companies',hot:false,bd:false},
                    {ext:'.com.bd',reg:'৳800',ren:'৳800',tra:'৳800',pop:'Bangladesh businesses',hot:false,bd:true},
                    {ext:'.bd',reg:'৳800',ren:'৳800',tra:'৳800',pop:'Bangladesh brands',hot:false,bd:true},
                    {ext:'.net.bd',reg:'৳800',ren:'৳800',tra:'৳800',pop:'Bangladesh networks',hot:false,bd:true},
                  ].map(({ext:e,reg,ren,tra,pop,hot,bd}) => (
                    <tr key={e} className={`${bd ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-[#F0F1F4]'} transition-colors`}>
                      <td className="px-6 py-4">
                        <span className="font-black text-gray-900 text-base">{e}</span>
                        {hot && <span className="ml-2 bg-yellow-100 text-yellow-700 text-xs font-bold px-1.5 py-0.5 rounded">HOT</span>}
                        {bd && <span className="ml-2 text-sm">⭐</span>}
                      </td>
                      <td className={`px-6 py-4 text-center ${hot||bd ? 'font-bold text-[var(--brand-red)]' : 'font-semibold text-gray-800'}`}>{reg}</td>
                      <td className="px-6 py-4 text-center text-gray-500">{ren}</td>
                      <td className="px-6 py-4 text-center text-gray-500">{tra}</td>
                      <td className={`px-6 py-4 hidden md:table-cell ${bd ? 'text-gray-500 font-medium' : 'text-gray-500'}`}>{pop}</td>
                      <td className="px-6 py-4 text-center"><a href="#" className="text-[var(--brand-red)] font-semibold hover:underline text-xs">Register</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-red-50 border-t border-red-100 px-6 py-3 flex items-center gap-2">
              <span className="text-sm">⭐</span>
              <p className="text-xs text-red-700 font-medium">Bangladesh country-code domains (.com.bd, .bd, .net.bd) are highlighted in red — perfect for establishing your local online presence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FREE DOMAIN BANNER */}
      <section className="bg-brand-red py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="text-4xl mb-4">🎁</div>
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Get a FREE Domain with Every Hosting Plan</h2>
          <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">
            Purchase any hosting plan and get a free domain registration. <strong className="text-white">.xyz, .com.bd,</strong> or <strong className="text-white">.online</strong> — your choice. No strings attached.
          </p>
          <Link to="/hosting" className="inline-flex items-center gap-2 bg-[#FFFFFF] text-[var(--brand-red)] font-bold text-base px-8 py-4 rounded-xl hover:bg-red-50 transition-colors shadow-lg">
            <i className="fa-solid fa-server text-sm"></i>
            View Hosting Plans
          </Link>
        </div>
      </section>

      {/* DOMAIN TRANSFER */}
      <section className="section-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                <i className="fa-solid fa-arrow-right-arrow-left text-xs"></i> Domain Transfer
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Transfer Your Domain<br />to SNBD HOST</h2>
              <p className="text-lg text-gray-500 mb-8">Already have a domain elsewhere? Transfer it to SNBD HOST and enjoy a better experience at every step.</p>
              <ul className="space-y-4 mb-8">
                {[
                  {title:'Free 1-year extension on transfer',desc:'Your domain registration extends by 1 year, at no extra cost.'},
                  {title:'Same-day transfer processing',desc:'Most transfers are completed within hours, not days.'},
                  {title:'No downtime during transfer',desc:'Your website stays fully live throughout the entire process.'},
                  {title:'24/7 transfer support',desc:'Our domain specialists guide you every step of the way.'},
                  {title:'Unlock any registrar in minutes',desc:'We support transfers from all major registrars including GoDaddy, Namecheap, and more.'},
                ].map(({title,desc}) => (
                  <li key={title} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                      <i className="fa-solid fa-check text-[var(--brand-red)] text-xs"></i>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">{title}</span>
                      <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <a href="#" className="inline-flex items-center gap-2 bg-brand-red hover:bg-[var(--brand-red-dark)] text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start Transfer <i className="fa-solid fa-arrow-right text-sm"></i>
              </a>
            </div>
            <div className="bg-[#1e293b] rounded-2xl p-8 text-white shadow-2xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-list-ol text-xs text-white"></i>
                </div>
                <h3 className="text-lg font-bold">Transfer Steps</h3>
              </div>
              <div className="space-y-4">
                {[
                  {n:1,title:'Unlock your domain',desc:'Log in to your current registrar and disable the domain lock / registrar lock.',green:false},
                  {n:2,title:'Get the EPP / Auth code',desc:"Request the authorization (EPP) code from your current registrar. It's usually emailed to you.",green:false},
                  {n:3,title:'Submit transfer request at SNBD HOST',desc:'Enter your domain name and EPP code on our transfer page and complete payment.',green:false},
                  {n:4,title:'Approve email from old registrar',desc:'Check your inbox for a confirmation email and click approve to authorize the transfer.',green:false},
                  {n:null,title:'Domain Transferred ✓',desc:'Your domain is now managed under SNBD HOST with a free 1-year extension applied automatically.',green:true},
                ].map(({n,title,desc,green}) => (
                  <div key={title} className={`transfer-step flex items-start gap-4 p-3 rounded-xl ${green ? 'bg-green-900/30 border border-green-700/30' : ''}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full ${green ? 'bg-green-600' : 'bg-red-600'} flex items-center justify-center text-sm font-black`}>
                      {green ? <i className="fa-solid fa-check text-xs"></i> : n}
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${green ? 'text-green-400' : ''}`}>{title}</p>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY REGISTER */}
      <section className="section-subtle py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Why Register Your Domain with SNBD HOST?</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Everything you need to manage your domain name — included free, with every registration.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {emoji:'🔒',title:'WHOIS Privacy Protection',desc:'Keep your personal information private. Free WHOIS guard included with every domain registration — no extra charge.'},
              {emoji:'🔄',title:'Easy DNS Management',desc:'Full DNS control panel. Set A records, CNAME, MX, TXT, and more with ease — no technical expertise required.'},
              {emoji:'🛡️',title:'Domain Lock Protection',desc:'Prevent unauthorized transfers with domain lock — enabled by default on all newly registered domains.'},
              {emoji:'⚡',title:'Instant Activation',desc:'Domains are activated within minutes of registration. Start pointing your domain and building your site right away.'},
              {emoji:'📧',title:'Email Forwarding',desc:'Forward emails from your domain to any inbox. Set up professional email addresses like hello@yourdomain.com — included free.'},
              {emoji:'🤝',title:'24/7 Domain Support',desc:'Our domain experts are available 24/7 via live chat and support tickets to help you with any domain-related questions.'},
            ].map(({emoji,title,desc}) => (
              <div key={title} className="bg-bg-card border border-gray-200 rounded-2xl shadow-sm hover:border-brand-redSoft hover:shadow-md hover:-translate-y-0.5 transition-all p-6 hover-lift">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 text-xl">{emoji}</div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANGLADESH DOMAINS SPOTLIGHT */}
      <section className="section-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-5">
              🇧🇩 Bangladesh Country Domains
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Own Your Bangladeshi Digital Identity</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Register <strong className="text-gray-500">.com.bd</strong>, <strong className="text-gray-500">.bd</strong>, <strong className="text-gray-500">.net.bd</strong>, <strong className="text-gray-500">.org.bd</strong> domains and establish your local presence in Bangladesh.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {ext:'.com.bd',desc:'The go-to domain for commercial businesses operating in Bangladesh. Boost local trust and visibility.'},
              {ext:'.bd',desc:'The premium Bangladesh domain for brands and organizations. Short, memorable, and instantly recognized.',popular:true},
              {ext:'.net.bd',desc:'Ideal for ISPs, network companies, and telecommunications businesses operating in Bangladesh.'},
            ].map(({ext:e,desc,popular}) => (
              <div key={e} className={`bg-white rounded-2xl border-t-4 border-green-500 shadow-lg p-6 hover-lift ${popular ? 'relative' : ''}`}>
                {popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full shadow">Most Popular</span>
                  </div>
                )}
                <div className={`flex items-center justify-between mb-4 ${popular ? 'mt-2' : ''}`}>
                  <span className="text-3xl font-black text-gray-900">{e}</span>
                  <span className="text-2xl">🇧🇩</span>
                </div>
                <div className="text-2xl font-black text-[var(--brand-red)] mb-1">৳800<span className="text-sm font-normal text-[#9CA3AF]">/yr</span></div>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed">{desc}</p>
                <div className="space-y-2 mb-5">
                  {['Free WHOIS Privacy','DNS Management Included','Same Renewal Price'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                      <i className="fa-solid fa-check text-green-500 text-xs"></i> {f}
                    </div>
                  ))}
                </div>
                <a href="#" className="block text-center bg-brand-red hover:bg-[var(--brand-red-dark)] text-white font-bold text-sm px-4 py-3 rounded-xl transition-colors">Register Now</a>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-[#9CA3AF] mt-6">Bangladesh country-code domain registrations may require valid local business documentation. Our team will guide you through the process.</p>
        </div>
      </section>
    </>
  )
}
