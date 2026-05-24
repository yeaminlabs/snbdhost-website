import { useState } from 'react'
import SEOHead from '../components/SEOHead';
import { pageMeta } from '../seo/pageMeta';

const packages = [
  {
    id: '01',
    name: 'Starter',
    usaLink: 'https://portal.snbdhost.com/store/usa-shared-hosting/starter',
    bdixLink: 'https://portal.snbdhost.com/store/bdix-shared-hosting/starter',
    yearlyPrice: 397,
    monthlyPrice: 99,
    storage: '1 GB NVMe SSD',
    bandwidth: '50 GB',
    ram: '512 MB',
    cpu: '0.5 Core',
    websites: '1',
    emails: '10',
    databases: '3',
    ftp: '3',
    inodes: '50,000',
    io: '5 MB/s',
    ep: '15',
    ssh: 'No',
    malware: 'Weekly',
    backups: 'Weekly',
    freeDomain: false
  },
  {
    id: '02',
    name: 'Basic',
    usaLink: 'https://portal.snbdhost.com/store/usa-shared-hosting/basic',
    bdixLink: 'https://portal.snbdhost.com/store/bdix-shared-hosting/basic',
    yearlyPrice: 747,
    monthlyPrice: 187,
    storage: '5 GB NVMe SSD',
    bandwidth: '100 GB',
    ram: '1 GB',
    cpu: '1 Core',
    websites: '3',
    emails: '25',
    databases: '10',
    ftp: '10',
    inodes: '100,000',
    io: '10 MB/s',
    ep: '25',
    ssh: 'No',
    malware: 'Weekly',
    backups: 'Weekly',
    freeDomain: false
  },
  {
    id: '03',
    name: 'Professional',
    usaLink: 'https://portal.snbdhost.com/store/usa-shared-hosting/professional',
    bdixLink: 'https://portal.snbdhost.com/store/bdix-shared-hosting/professional',
    yearlyPrice: 1397,
    monthlyPrice: 349,
    storage: '10 GB NVMe SSD',
    bandwidth: '200 GB',
    ram: '1.5 GB',
    cpu: '1.5 Cores',
    websites: '5',
    emails: '50',
    databases: 'Unlimited',
    ftp: 'Unlimited',
    inodes: '200,000',
    io: '20 MB/s',
    ep: '35',
    ssh: 'Jailed SFTP',
    malware: 'Daily',
    backups: 'Daily (7 days)',
    freeDomain: false
  },
  {
    id: '04',
    name: 'Business',
    usaLink: 'https://portal.snbdhost.com/store/usa-shared-hosting/business',
    bdixLink: 'https://portal.snbdhost.com/store/bdix-shared-hosting/business',
    yearlyPrice: 2497,
    monthlyPrice: 624,
    storage: '20 GB NVMe SSD',
    bandwidth: '300 GB',
    ram: '2 GB',
    cpu: '2 Cores',
    websites: '10',
    emails: '100',
    databases: 'Unlimited',
    ftp: 'Unlimited',
    inodes: '300,000',
    io: '30 MB/s',
    ep: '50',
    ssh: 'Jailed SFTP',
    malware: 'Daily',
    backups: 'Daily (14 days)',
    freeDomain: false,
    recommended: true
  },
  {
    id: '05',
    name: 'Advanced',
    usaLink: 'https://portal.snbdhost.com/store/usa-shared-hosting/advanced',
    bdixLink: 'https://portal.snbdhost.com/store/bdix-shared-hosting/advanced',
    yearlyPrice: 3997,
    monthlyPrice: 999,
    storage: '40 GB NVMe SSD',
    bandwidth: '500 GB',
    ram: '3 GB',
    cpu: '3 Cores',
    websites: '15',
    emails: 'Unlimited',
    databases: 'Unlimited',
    ftp: 'Unlimited',
    inodes: '450,000',
    io: '50 MB/s',
    ep: '70',
    ssh: 'Jailed SFTP',
    malware: 'Real-time',
    backups: 'Daily (21 days)',
    freeDomain: true
  },
  {
    id: '06',
    name: 'Premium',
    usaLink: 'https://portal.snbdhost.com/store/usa-shared-hosting/premium',
    bdixLink: 'https://portal.snbdhost.com/store/bdix-shared-hosting/premium',
    yearlyPrice: 5997,
    monthlyPrice: 1499,
    storage: '60 GB NVMe SSD',
    bandwidth: '700 GB',
    ram: '4 GB',
    cpu: '4 Cores',
    websites: '20',
    emails: 'Unlimited',
    databases: 'Unlimited',
    ftp: 'Unlimited',
    inodes: '600,000',
    io: '75 MB/s',
    ep: '100',
    ssh: 'Jailed SFTP',
    malware: 'Real-time',
    backups: 'Daily + On-demand (30 days)',
    freeDomain: true,
    recommendedEnterprise: true
  },
  {
    id: '07',
    name: 'Enterprise',
    usaLink: 'https://portal.snbdhost.com/store/usa-shared-hosting/enterprise',
    bdixLink: 'https://portal.snbdhost.com/store/bdix-shared-hosting/en',
    yearlyPrice: 7997,
    monthlyPrice: 1999,
    storage: '80 GB NVMe SSD',
    bandwidth: '900 GB',
    ram: '6 GB',
    cpu: '5 Cores',
    websites: '30',
    emails: 'Unlimited',
    databases: 'Unlimited',
    ftp: 'Unlimited',
    inodes: '800,000',
    io: '100 MB/s',
    ep: '130',
    ssh: 'Jailed SFTP',
    malware: 'Real-time',
    backups: 'Daily + On-demand (45 days)',
    freeDomain: true
  },
  {
    id: '08',
    name: 'Ultimate',
    usaLink: 'https://portal.snbdhost.com/store/usa-shared-hosting/ultimate',
    bdixLink: 'https://portal.snbdhost.com/store/bdix-shared-hosting/unlimited',
    yearlyPrice: 10997,
    monthlyPrice: 2749,
    storage: '100 GB NVMe SSD',
    bandwidth: '1 TB',
    ram: '8 GB',
    cpu: '6 Cores',
    websites: 'Unlimited',
    emails: 'Unlimited',
    databases: 'Unlimited',
    ftp: 'Unlimited',
    inodes: '1,000,000',
    io: '150 MB/s',
    ep: '200',
    ssh: 'Jailed SFTP',
    malware: 'Real-time',
    backups: 'Daily + On-demand (60 days)',
    freeDomain: true
  }
];

export default function HostingPage() {
  const [billingTab, setBillingTab] = useState('annual');
  const [locationTab, setLocationTab] = useState('usa'); // 'usa' or 'bdix'

  const standardPackages = packages.slice(0, 4);
  const enterprisePackages = packages.slice(4, 8);

  const renderCard = (pkg, isEnterprise = false) => {
    const isRecommended = isEnterprise ? pkg.recommendedEnterprise : pkg.recommended;
    const price = billingTab === 'annual' ? pkg.yearlyPrice : pkg.monthlyPrice;
    const originalPrice = billingTab === 'annual' ? pkg.monthlyPrice * 12 : null;

    return (
      <div 
        key={pkg.id} 
        className={`${isRecommended ? 'bg-primary border-transparent shadow-2xl shadow-red-200 text-white transform -translate-y-2' : 'bg-bg-card border-gray-200 text-gray-900 shadow-sm hover:border-brand-redSoft hover:shadow-md hover:-translate-y-1'} 
          border rounded-2xl transition-all overflow-hidden flex flex-col relative z-10`}
      >
        {isRecommended && (
          <div className="bg-red-700 text-white text-xs font-bold text-center py-2 tracking-wide uppercase">
            Recommended ⭐ Most Popular
          </div>
        )}
        <div className={`p-6 xl:p-7 pb-5 ${isRecommended ? '' : 'border-b border-[#E5E7EB]'}`}>
          <div className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isRecommended ? 'text-red-200' : 'text-[#9CA3AF]'}`}>
            {locationTab.toUpperCase()} {pkg.name}
          </div>
          <div className="flex items-end gap-2 mb-1">
            <span className={`text-4xl xl:text-5xl font-extrabold ${isRecommended ? 'text-white' : 'text-gray-900'}`}>৳{price.toLocaleString()}</span>
            <span className={`font-medium mb-2 ${isRecommended ? 'text-red-200' : 'text-gray-500'}`}>
              /{billingTab === 'annual' ? 'yr' : 'mo'}
            </span>
          </div>
          {billingTab === 'annual' ? (
            <div className={`text-sm mb-6 ${isRecommended ? 'text-red-200' : 'text-[#9CA3AF]'}`}>
              Was <span className="line-through">৳{originalPrice.toLocaleString()}</span>
            </div>
          ) : (
            <div className={`text-sm mb-6 ${isRecommended ? 'text-red-200' : 'text-[#9CA3AF]'}`}>
              Billed monthly
            </div>
          )}
          
          <a href={locationTab === 'usa' ? pkg.usaLink : pkg.bdixLink} 
             className={`block w-full text-center font-bold py-3 rounded-xl transition-colors duration-200 
               ${isRecommended 
                 ? 'bg-white text-primary hover:bg-gray-100 shadow-lg' 
                 : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'}`}>
            Get Started
          </a>
        </div>
        
        <div className={`px-6 xl:px-7 pb-7 pt-5 flex-1 ${isRecommended ? 'border-t border-white/20' : ''}`}>
          <p className={`text-xs font-semibold uppercase tracking-wide mb-4 ${isRecommended ? 'text-red-200' : 'text-[#9CA3AF]'}`}>
            Top Features
          </p>
          <ul className="space-y-3">
            {[
              { icon: 'fa-hard-drive', text: pkg.storage },
              { icon: 'fa-network-wired', text: `${pkg.bandwidth} Bandwidth` },
              { icon: 'fa-memory', text: `${pkg.ram} RAM / ${pkg.cpu}` },
              { icon: 'fa-globe', text: `${pkg.websites} Websites` },
              { icon: 'fa-envelope', text: `${pkg.emails} Email Accounts` },
              { icon: 'fa-database', text: `${pkg.databases} MySQL Databases` },
              { icon: 'fa-microchip', text: `${pkg.ep} Entry Processes (EP)` },
              { icon: 'fa-file-lines', text: `${pkg.inodes} Inodes` },
              { icon: 'fa-shield-halved', text: `${pkg.malware} Malware Scan` },
              { icon: 'fa-rotate-left', text: pkg.backups },
            ].map((f, i) => (
              <li key={i} className={`flex items-start gap-3 text-sm ${isRecommended ? 'text-white' : 'text-gray-600'}`}>
                <i className={`fa-solid ${f.icon} mt-1 shrink-0 ${isRecommended ? 'text-white' : 'text-primary'}`}></i> 
                {f.text}
              </li>
            ))}
            {pkg.freeDomain && billingTab === 'annual' && (
              <li className={`flex items-start gap-3 text-sm font-bold ${isRecommended ? 'text-yellow-300' : 'text-green-600'}`}>
                <i className={`fa-solid fa-gift mt-1 shrink-0`}></i> 
                FREE .com Domain (1st Year)
              </li>
            )}
            <li className={`flex items-start gap-3 text-sm ${isRecommended ? 'text-white' : 'text-gray-600'}`}>
              <i className={`fa-solid fa-check mt-1 shrink-0 ${isRecommended ? 'text-white' : 'text-green-500'}`}></i> 
              cPanel, LSCache & Let's Encrypt SSL
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
      <SEOHead {...pageMeta.hosting} />
      {/* HERO */}
      <section className="gradient-hero pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <span>⚡</span>
              <span>cPanel Hosting in Bangladesh</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
              Host smarter,<br />
              <span className="text-primary">faster,</span> and easier
            </h1>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
              <span className="badge-float inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"><i className="fa-brands fa-google text-xs"></i> Google</span>
              <span className="badge-float inline-flex items-center gap-1.5 bg-bg-subtle text-text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-md"><i className="fa-brands fa-apple text-xs"></i> Apple</span>
              <span className="badge-float inline-flex items-center gap-1.5 bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"><i className="fa-brands fa-facebook text-xs"></i> Facebook</span>
            </div>
            <p className="text-gray-500 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Pick a plan, launch your site, and grow with a host that scales with you. Powered by NVMe SSDs and LSCache.
            </p>
            <a href="#pricing" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
              Get Started <span className="text-xl">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="section-subtle py-20 md:py-28">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Transparent Pricing. No Surprises.</h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">Choose the perfect plan. Start small, scale big.</p>
          </div>

          {/* Toggles */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-14">
            {/* Location Toggle */}
            <div className="inline-flex bg-bg-card border border-gray-200 rounded-full p-1 shadow-sm gap-1">
              <button
                onClick={() => setLocationTab('usa')}
                className={`tab-btn px-6 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${locationTab === 'usa' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <i className="fa-solid fa-flag-usa"></i> USA Servers
              </button>
              <button
                onClick={() => setLocationTab('bdix')}
                className={`tab-btn px-6 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${locationTab === 'bdix' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <i className="fa-solid fa-bolt"></i> BDIX Servers
              </button>
            </div>

            {/* Billing Toggle */}
            <div className="inline-flex bg-bg-card border border-gray-200 rounded-full p-1 shadow-sm gap-1">
              <button
                onClick={() => setBillingTab('annual')}
                className={`tab-btn px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${billingTab === 'annual' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Annual
              </button>
              <button
                onClick={() => setBillingTab('monthly')}
                className={`tab-btn px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${billingTab === 'monthly' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 max-w-7xl mx-auto">
            {standardPackages.map(pkg => renderCard(pkg, false))}
          </div>
        </div>
      </section>

      {/* ENTERPRISE PLANS */}
      <section className="section-white py-20 md:py-28">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-[#F0F1F4] text-gray-500 text-xs font-semibold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">Enterprise Class</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Scale Without Limits</h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">Enterprise-grade hosting for high-traffic applications, stores, and growing agencies.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 max-w-7xl mx-auto">
            {enterprisePackages.map(pkg => renderCard(pkg, true))}
          </div>
        </div>
      </section>

      {/* WHY TRUST */}
      <section className="section-subtle py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Why Thousands Trust SNBD HOST</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {[{emoji:'🚀',stat:'2,450+',label:'Active Websites Hosted'},{emoji:'⚡',stat:'99.9%',label:'Uptime Guarantee'},{emoji:'🌍',stat:'3',label:'Data Center Locations'},{emoji:'⭐',stat:'24/7',label:'Expert Support'}].map(({emoji,stat,label})=>(
              <div key={label} className="stat-card bg-[#FFFFFF] border-2 border-[#E5E7EB] hover:border-primary/20 rounded-2xl p-6 sm:p-8 text-center">
                <div className="text-3xl sm:text-4xl mb-3">{emoji}</div>
                <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1">{stat}</div>
                <div className="text-sm text-gray-500 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
