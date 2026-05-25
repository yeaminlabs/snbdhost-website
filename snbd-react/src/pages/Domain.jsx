import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead';
import { pageMeta } from '../seo/pageMeta';
import JsonLd from '../components/JsonLd';
import { useCurrency } from '../context/CurrencyContext.jsx';

export default function DomainPage() {
  const { formatPrice } = useCurrency();
  const [query, setQuery] = useState('')
  const [ext, setExt] = useState('.com')
  const [searched, setSearched] = useState(false)
  const [searchedQuery, setSearchedQuery] = useState('')
  
  const [showBdModal, setShowBdModal] = useState(false)
  const [bdFormDetails, setBdFormDetails] = useState({ domain: '', name: '', email: '', phone: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedBdDomain, setSelectedBdDomain] = useState('')

  const [livePrices, setLivePrices] = useState(null)

  useEffect(() => {
    fetch('https://portal.snbdhost.com/pricing.json')
      .then(res => res.json())
      .then(data => {
        // Automatically detect if WHMCS exported in USD instead of BDT
        const isUsd = data['.com'] && parseFloat(data['.com'].reg) < 50;
        const exchangeRate = 123; // 1 / 0.00813
        
        if (isUsd) {
          const convertedData = {};
          for (let key in data) {
            convertedData[key] = {
              ext: data[key].ext,
              reg: parseFloat(data[key].reg) * exchangeRate,
              ren: parseFloat(data[key].ren) * exchangeRate,
              tra: parseFloat(data[key].tra) * exchangeRate,
            };
          }
          setLivePrices(convertedData);
        } else {
          setLivePrices(data);
        }
      })
      .catch(err => console.log('Failed to load dynamic pricing, using fallback.', err));
  }, []);

  const defaultExtPrices = {'.com':1200,'.xyz':99,'.net':1400,'.org':1300,'.io':4500,'.com.bd':800,'.bd':800}
  
  // Create an active set of prices for the badges at the top
  const activeExtPrices = livePrices 
    ? Object.keys(defaultExtPrices).reduce((acc, key) => ({
        ...acc, 
        [key]: livePrices[key] ? livePrices[key].reg : defaultExtPrices[key]
      }), {})
    : defaultExtPrices;

  function handleSearch() {
    if (query.trim()) {
      setSearchedQuery(query.trim().replace(/\.[^.]+$/, ''))
      setSearched(true)
    }
  }

  function selectExt(e) {
    setExt(e)
  }

  function handleRegisterClick(e, domainName, extension) {
    e.preventDefault();
    const bdDomains = ['.bd', '.com.bd', '.net.bd', '.org.bd'];
    
    if (bdDomains.includes(extension)) {
      setSelectedBdDomain(domainName + extension);
      setIsSubmitted(false);
      const initialDomain = (domainName === 'yourbrand' || domainName === 'yourdomain') ? extension : domainName + extension;
      setBdFormDetails({ domain: initialDomain, name: '', email: '', phone: '' });
      setShowBdModal(true);
    } else {
      window.location.href = `https://portal.snbdhost.com/cart.php?a=add&domain=register&query=${domainName}${extension}`;
    }
  }

  function handleBdSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <>
      <SEOHead {...pageMeta.domain} />
      {/* HERO + SEARCH */}
      <section className="bg-white pt-20 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            🌐 Register Your Domain Today
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
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
                className="bg-brand-red hover:bg-[#a30000] text-white font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap flex items-center gap-2 justify-center"
              >
                <i className="fa-solid fa-magnifying-glass text-sm"></i>
                Search Domain
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {Object.entries(activeExtPrices).map(([e, price]) => (
                <button
                  key={e}
                  onClick={() => selectExt(e)}
                  className={`ext-badge text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${ext === e ? 'bg-red-50 text-red-700 border-red-200' : 'bg-[#F8F9FB] text-gray-500 border-[#E5E7EB] hover:bg-red-50 hover:text-red-700 hover:border-red-200'}`}
                >
                  {e} <span className="text-[#9CA3AF]">{formatPrice(price)}/yr</span>
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
                  {['.com', '.net', '.xyz'].map((e) => {
                    const price = livePrices && livePrices[e] ? livePrices[e].reg : defaultExtPrices[e] || 99;
                    return (
                    <div key={e} className="flex items-center justify-between px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-900 text-base">{searchedQuery}{e}</span>
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-green-100">
                          <i className="fa-solid fa-circle-check text-xs"></i> Available
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-gray-800">{formatPrice(price)}<span className="text-xs font-normal text-[#9CA3AF]">/yr</span></span>
                        <button onClick={(event) => handleRegisterClick(event, searchedQuery, e)} className="bg-brand-red hover:bg-[#a30000] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">Register</button>
                      </div>
                    </div>
                  )})}
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
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Domain Pricing</h2>
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
                    {ext:'.com',dreg:1200,dren:1400,dtra:1200,pop:'Business, personal brands',hot:false,bd:false},
                    {ext:'.net',dreg:1400,dren:1600,dtra:1400,pop:'Tech, networks',hot:false,bd:false},
                    {ext:'.org',dreg:1300,dren:1500,dtra:1300,pop:'NGOs, nonprofits',hot:false,bd:false},
                    {ext:'.xyz',dreg:99,dren:599,dtra:499,pop:'Startups, portfolios',hot:true,bd:false},
                    {ext:'.io',dreg:4500,dren:5000,dtra:4500,pop:'Tech startups, SaaS',hot:false,bd:false},
                    {ext:'.info',dreg:700,dren:900,dtra:700,pop:'Informational sites',hot:false,bd:false},
                    {ext:'.online',dreg:199,dren:899,dtra:699,pop:'Online businesses',hot:false,bd:false},
                    {ext:'.store',dreg:299,dren:1299,dtra:999,pop:'eCommerce stores',hot:false,bd:false},
                    {ext:'.tech',dreg:599,dren:1999,dtra:1499,pop:'Tech companies',hot:false,bd:false},
                    {ext:'.com.bd',dreg:800,dren:800,dtra:800,pop:'Bangladesh businesses',hot:false,bd:true},
                    {ext:'.bd',dreg:800,dren:800,dtra:800,pop:'Bangladesh brands',hot:false,bd:true},
                    {ext:'.net.bd',dreg:800,dren:800,dtra:800,pop:'Bangladesh networks',hot:false,bd:true},
                  ].map(({ext:e,dreg,dren,dtra,pop,hot,bd}) => {
                    const reg = livePrices && livePrices[e] ? livePrices[e].reg : dreg;
                    const ren = livePrices && livePrices[e] ? livePrices[e].ren : dren;
                    const tra = livePrices && livePrices[e] ? livePrices[e].tra : dtra;
                    return (
                    <tr key={e} className={`${bd ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-[#F0F1F4]'} transition-colors`}>
                      <td className="px-6 py-4">
                        <span className="font-extrabold text-gray-900 text-base">{e}</span>
                        {hot && <span className="ml-2 bg-yellow-100 text-yellow-700 text-xs font-bold px-1.5 py-0.5 rounded">HOT</span>}
                        {bd && <span className="ml-2 text-sm">⭐</span>}
                      </td>
                      <td className={`px-6 py-4 text-center ${hot||bd ? 'font-bold text-[var(--brand-red)]' : 'font-semibold text-gray-800'}`}>{formatPrice(reg)}</td>
                      <td className="px-6 py-4 text-center text-gray-500">{formatPrice(ren)}</td>
                      <td className="px-6 py-4 text-center text-gray-500">{formatPrice(tra)}</td>
                      <td className={`px-6 py-4 hidden md:table-cell ${bd ? 'text-gray-500 font-medium' : 'text-gray-500'}`}>{pop}</td>
                      <td className="px-6 py-4 text-center"><button onClick={(event) => handleRegisterClick(event, 'yourdomain', e)} className="text-[var(--brand-red)] font-semibold hover:underline text-xs cursor-pointer">Register</button></td>
                    </tr>
                  )})}
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
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Get a FREE Domain with Every Hosting Plan</h2>
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
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Transfer Your Domain<br />to SNBD HOST</h2>
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
              <a href="#" className="inline-flex items-center gap-2 bg-brand-red hover:bg-[#a30000] text-white font-bold px-6 py-3 rounded-xl transition-colors">
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
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full ${green ? 'bg-green-600' : 'bg-red-600'} flex items-center justify-center text-sm font-extrabold`}>
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
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Why Register Your Domain with SNBD HOST?</h2>
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
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Own Your Bangladeshi Digital Identity</h2>
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
                  <span className="text-3xl font-extrabold text-gray-900">{e}</span>
                  <span className="text-2xl">🇧🇩</span>
                </div>
                <div className="text-2xl font-extrabold text-[var(--brand-red)] mb-1">{formatPrice(livePrices && livePrices[e] ? livePrices[e].reg : 800)}<span className="text-sm font-normal text-[#9CA3AF]">/yr</span></div>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed">{desc}</p>
                <div className="space-y-2 mb-5">
                  {['Free WHOIS Privacy','DNS Management Included','Same Renewal Price'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                      <i className="fa-solid fa-check text-green-500 text-xs"></i> {f}
                    </div>
                  ))}
                </div>
                <button onClick={(event) => handleRegisterClick(event, 'yourbrand', e)} className="w-full block text-center bg-brand-red hover:bg-[#a30000] text-white font-bold text-sm px-4 py-3 rounded-xl transition-colors cursor-pointer">Register Now</button>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-[#9CA3AF] mt-6">Bangladesh country-code domain registrations may require valid local business documentation. Our team will guide you through the process.</p>
        </div>
      </section>

      {/* BD DOMAIN MODAL */}
      {showBdModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-red-50 border-b border-red-100 px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-red-900 text-lg flex items-center gap-2">
                <span>🇧🇩</span> BD Domain Request
              </h3>
              <button onClick={() => setShowBdModal(false)} className="text-red-400 hover:text-red-700 transition-colors">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <div className="p-6">
              {isSubmitted ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fa-solid fa-check text-2xl text-green-600"></i>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Request Received!</h4>
                  <p className="text-gray-600">You will get a call in the next hour for details. Your domain order for <strong className="text-gray-900">{selectedBdDomain}</strong> has been booked.</p>
                  <button onClick={() => setShowBdModal(false)} className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl transition-colors">Close</button>
                </div>
              ) : (
                <form onSubmit={handleBdSubmit}>
                  <p className="text-sm text-gray-500 mb-5">
                    Bangladesh country-code domains require manual processing. Please fill out the form below.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">What domain did you choose?</label>
                      <input required type="text" value={bdFormDetails.domain} onChange={e => setBdFormDetails({...bdFormDetails, domain: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent text-gray-900" placeholder="e.g. mycompany.com.bd" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
                      <input required type="text" value={bdFormDetails.name} onChange={e => setBdFormDetails({...bdFormDetails, name: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent text-gray-900" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                      <input required type="tel" value={bdFormDetails.phone} onChange={e => setBdFormDetails({...bdFormDetails, phone: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent text-gray-900" placeholder="+88017XXXXXXXX" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                      <input required type="email" value={bdFormDetails.email} onChange={e => setBdFormDetails({...bdFormDetails, email: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent text-gray-900" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="mt-8 flex gap-3">
                    <button type="button" onClick={() => setShowBdModal(false)} className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl transition-colors">Cancel</button>
                    <button type="submit" className="flex-1 bg-brand-red hover:bg-[#a30000] text-white font-bold py-3 rounded-xl transition-colors">Submit Request</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
