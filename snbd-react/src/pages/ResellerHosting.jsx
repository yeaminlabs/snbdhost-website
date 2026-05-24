import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import JsonLd from '../components/JsonLd';
import { pageMeta } from '../seo/pageMeta';

export default function ResellerHosting() {
  const [billingTab, setBillingTab] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(0);

  const packages = [
    { name: 'US RS 01', priceM: 500, priceY: 4797, storage: '20GB', bw: '500GB', accounts: 10, ram: '1GB', cpu: '1 Core' },
    { name: 'US RS 02', priceM: 1000, priceY: 9597, storage: '40GB', bw: '1TB', accounts: 20, ram: '1GB', cpu: '1 Core' },
    { name: 'US RS 03', priceM: 1500, priceY: 14397, storage: '60GB', bw: '1.5TB', accounts: 30, ram: '2GB', cpu: '2 Cores', popular: true },
    { name: 'US RS 04', priceM: 2000, priceY: 19197, storage: '80GB', bw: '2TB', accounts: 50, ram: '3GB', cpu: '2 Cores' },
    { name: 'US RS 05', priceM: 2500, priceY: 23997, storage: '100GB', bw: '3TB', accounts: 70, ram: '3GB', cpu: '3 Cores' },
    { name: 'US RS 06', priceM: 3000, priceY: 28797, storage: '120GB', bw: '5TB', accounts: 100, ram: '3GB', cpu: '3 Cores' },
  ];

  const addons = [
    { name: 'Dedicated IPv4', desc: 'Dedicated IP address for reseller or clients', priceM: '500', priceY: '5,997' },
    { name: 'Extra Storage (20GB)', desc: 'Additional 20GB NVMe SSD storage', priceM: '500', priceY: '5,997' },
    { name: 'Extra Bandwidth (500GB)', desc: 'Additional 500GB monthly bandwidth', priceM: '300', priceY: '3,597' },
    { name: 'WHMCS License', desc: 'Billing automation software', priceM: '5,000', priceY: '60,000' },
    { name: 'Extended Backup', desc: 'Increase backup retention to 90 days', priceM: '500', priceY: '5,997' },
    { name: 'Malware Removal', desc: 'Professional malware cleanup (one-time)', priceM: '1,000', priceY: 'N/A' },
    { name: 'cPanel Migration', desc: 'Professional migration service (per site)', priceM: '250', priceY: 'N/A' },
    { name: 'Dedicated Migration', desc: 'Full server migration assistance', priceM: 'Quote', priceY: 'N/A' },
  ];

  const faqs = [
    { question: "Is it completely white-labeled?", answer: "Yes, our reseller hosting is 100% white-labeled. You get your own private nameservers (ns1.yourdomain.com), and the control panel uses generic branding so your clients will never know about SNBD HOST." },
    { question: "Can I oversell resources?", answer: "Yes, overselling is allowed on all our reseller packages. You can allocate more disk space and bandwidth to your clients than what is actually included in your master plan, allowing you to maximize profits." },
    { question: "Do you help with migration?", answer: "Yes! We offer free conditional migrations for standard cPanel to cPanel transfers. For highly complex or massive server migrations, we have premium migration add-ons available." },
    { question: "Are my clients isolated from each other?", answer: "Absolutely. We use CloudLinux LVE to strictly isolate each cPanel account you create. If one of your clients gets a traffic spike or runs a bad script, it will not affect the performance of your other clients." }
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
    <div className="bg-[#F9FAFB] text-gray-900 font-body selection:bg-primary selection:text-white pb-20">
      <SEOHead {...pageMeta.resellerHosting} />
      <JsonLd data={faqSchema} />
      {/* ========== HERO ========== */}
      <section className="pt-24 pb-16 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            100% White-Labeled
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Start your own web hosting business
          </h1>
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            High-performance USA reseller hosting powered by LiteSpeed, NVMe SSDs, and strict CloudLinux isolation. Keep 100% of your profits.
          </p>
        </div>
      </section>

      {/* ========== PRICING CARDS ========== */}
      <section className="py-20 px-4 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
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
                Annually
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {packages.map((pkg, idx) => (
              <div key={idx} className={`bg-white border ${pkg.popular ? 'border-primary shadow-xl shadow-red-100 transform md:-translate-y-2' : 'border-gray-200 shadow-sm'} rounded-3xl p-6 relative flex flex-col hover:shadow-md transition-shadow`}>
                {pkg.popular && (
                  <div className="absolute top-0 right-6 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                    RECOMMENDED
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-4">{pkg.name}</h3>
                <div className="mb-6 border-b border-gray-100 pb-6">
                  <span className="text-4xl font-extrabold text-gray-900">৳{billingTab === 'monthly' ? pkg.priceM : pkg.priceY}</span>
                  <span className="text-gray-500 font-medium">/{billingTab === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                <button className={`w-full text-center font-bold py-3.5 rounded-xl transition-colors mb-6 border ${pkg.popular ? 'bg-primary hover:bg-primary-dark text-white border-transparent shadow-md shadow-red-200' : 'bg-[#F4F5F7] hover:bg-gray-200 text-gray-900 border-gray-200'}`}>
                  Select Plan
                </button>
                <div className="text-sm font-bold text-gray-900 mb-4">Core Limits</div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center justify-between"><span className="flex items-center gap-2"><i className="fa-solid fa-hard-drive text-gray-400"></i> NVMe Storage</span> <strong>{pkg.storage}</strong></li>
                  <li className="flex items-center justify-between"><span className="flex items-center gap-2"><i className="fa-solid fa-wifi text-gray-400"></i> Bandwidth</span> <strong>{pkg.bw}</strong></li>
                  <li className="flex items-center justify-between"><span className="flex items-center gap-2"><i className="fa-solid fa-users text-gray-400"></i> Max cPanel Accs</span> <strong>{pkg.accounts}</strong></li>
                  <li className="flex items-center justify-between"><span className="flex items-center gap-2"><i className="fa-solid fa-microchip text-gray-400"></i> LVE CPU per Acc</span> <strong>{pkg.cpu}</strong></li>
                  <li className="flex items-center justify-between"><span className="flex items-center gap-2"><i className="fa-solid fa-memory text-gray-400"></i> LVE RAM per Acc</span> <strong>{pkg.ram}</strong></li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FULL COMPARISON TABLE ========== */}
      <section className="py-20 px-4 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">Full Technical Specifications</h2>
          
          <div className="overflow-x-auto pb-4">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr>
                  <th className="p-4 bg-gray-50 border-b-2 border-gray-200 font-bold text-gray-900 sticky left-0 z-20 min-w-[200px]">Feature</th>
                  {packages.map(pkg => (
                    <th key={pkg.name} className="p-4 bg-gray-50 border-b-2 border-gray-200 font-bold text-primary text-center whitespace-nowrap">{pkg.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                
                {/* CloudLinux LVE */}
                <tr className="bg-gray-100"><td colSpan={7} className="p-3 font-bold text-gray-900 sticky left-0 z-10"><i className="fa-brands fa-linux text-primary mr-2"></i> CloudLinux LVE Limits (Per cPanel)</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">PMEM (RAM)</td><td className="p-4 text-center">1GB</td><td className="p-4 text-center">1GB</td><td className="p-4 text-center">2GB</td><td className="p-4 text-center">3GB</td><td className="p-4 text-center">3GB</td><td className="p-4 text-center">3GB</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">CPU Cores</td><td className="p-4 text-center">1 Core</td><td className="p-4 text-center">1 Core</td><td className="p-4 text-center">2 Cores</td><td className="p-4 text-center">2 Cores</td><td className="p-4 text-center">3 Cores</td><td className="p-4 text-center">3 Cores</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">I/O Speed</td><td className="p-4 text-center">10 MB/s</td><td className="p-4 text-center">10 MB/s</td><td className="p-4 text-center">15 MB/s</td><td className="p-4 text-center">15 MB/s</td><td className="p-4 text-center">20 MB/s</td><td className="p-4 text-center">20 MB/s</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">Entry Processes (EP)</td><td className="p-4 text-center">20</td><td className="p-4 text-center">20</td><td className="p-4 text-center">25</td><td className="p-4 text-center">25</td><td className="p-4 text-center">30</td><td className="p-4 text-center">30</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">Inodes per cPanel</td><td className="p-4 text-center">50,000</td><td className="p-4 text-center">75,000</td><td className="p-4 text-center">100,000</td><td className="p-4 text-center">125,000</td><td className="p-4 text-center">150,000</td><td className="p-4 text-center">200,000</td></tr>

                {/* PHP Limits */}
                <tr className="bg-gray-100"><td colSpan={7} className="p-3 font-bold text-gray-900 sticky left-0 z-10"><i className="fa-brands fa-php text-blue-500 mr-2"></i> PHP Limits</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">memory_limit</td><td className="p-4 text-center">256MB</td><td className="p-4 text-center">512MB</td><td className="p-4 text-center">768MB</td><td className="p-4 text-center">1GB</td><td className="p-4 text-center">2GB</td><td className="p-4 text-center">4GB</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">max_execution_time</td><td className="p-4 text-center">60s</td><td className="p-4 text-center">60s</td><td className="p-4 text-center">120s</td><td className="p-4 text-center">120s</td><td className="p-4 text-center">300s</td><td className="p-4 text-center">300s</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">upload_max_filesize</td><td className="p-4 text-center">64MB</td><td className="p-4 text-center">128MB</td><td className="p-4 text-center">256MB</td><td className="p-4 text-center">512MB</td><td className="p-4 text-center">1GB</td><td className="p-4 text-center">2GB</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">PHP Versions</td><td colSpan={6} className="p-4 text-center text-gray-600 font-medium">Selectable: 5.6 through 8.3</td></tr>

                {/* Database & Email */}
                <tr className="bg-gray-100"><td colSpan={7} className="p-3 font-bold text-gray-900 sticky left-0 z-10"><i className="fa-solid fa-database text-yellow-500 mr-2"></i> Database & Email</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">Max Database Size</td><td className="p-4 text-center">250MB</td><td className="p-4 text-center">500MB</td><td className="p-4 text-center">1GB</td><td className="p-4 text-center">2GB</td><td className="p-4 text-center">5GB</td><td className="p-4 text-center">10GB</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">Databases & Emails</td><td colSpan={6} className="p-4 text-center text-green-600 font-bold">Unlimited on all plans</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">SpamAssassin & DKIM</td><td colSpan={6} className="p-4 text-center text-green-600 font-bold"><i className="fa-solid fa-check"></i> Enabled</td></tr>

                {/* Server Tech */}
                <tr className="bg-gray-100"><td colSpan={7} className="p-3 font-bold text-gray-900 sticky left-0 z-10"><i className="fa-solid fa-server text-purple-500 mr-2"></i> Web Server & Security</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">Web Server</td><td colSpan={2} className="p-4 text-center text-gray-600">LiteSpeed Standard</td><td colSpan={4} className="p-4 text-center font-bold text-primary">LiteSpeed Enterprise</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">HTTP/3 (QUIC) & Brotli</td><td colSpan={6} className="p-4 text-center text-green-600 font-bold"><i className="fa-solid fa-check"></i> Included</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">DDoS Protection</td><td colSpan={2} className="p-4 text-center text-gray-600">Basic</td><td colSpan={3} className="p-4 text-center font-medium text-orange-500">Advanced</td><td className="p-4 text-center font-bold text-red-500">Enterprise</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">Imunify360 & Malware Scan</td><td colSpan={5} className="p-4 text-center text-gray-600">Daily Scan</td><td className="p-4 text-center font-bold text-green-600">Real-time</td></tr>

                {/* Backups */}
                <tr className="bg-gray-100"><td colSpan={7} className="p-3 font-bold text-gray-900 sticky left-0 z-10"><i className="fa-solid fa-clock-rotate-left text-orange-500 mr-2"></i> JetBackup 5 Configuration</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">Backup Frequency</td><td colSpan={5} className="p-4 text-center text-gray-600">Daily</td><td className="p-4 text-center font-bold text-primary">Daily + Hourly</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">Retention</td><td colSpan={2} className="p-4 text-center">30 Days</td><td colSpan={2} className="p-4 text-center">14 Days</td><td className="p-4 text-center text-primary font-bold">30 Days</td><td className="p-4 text-center text-primary font-bold">45 Days</td></tr>
                
                {/* WHM */}
                <tr className="bg-gray-100"><td colSpan={7} className="p-3 font-bold text-gray-900 sticky left-0 z-10"><i className="fa-solid fa-cogs text-gray-700 mr-2"></i> WHM Access & Branding</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">White Label Branding</td><td colSpan={6} className="p-4 text-center text-green-600 font-bold">100% (Private Nameservers)</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">Create Packages</td><td colSpan={6} className="p-4 text-center text-green-600 font-bold">Unlimited</td></tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50"><td className="p-4 bg-white sticky left-0 font-medium">API Access</td><td colSpan={6} className="p-4 text-center text-green-600 font-bold">WHM & cPanel APIs Enabled</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========== ADDONS SECTION ========== */}
      <section className="py-20 px-4 bg-[#F4F5F7]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">Reseller Add-ons</h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">Enhance your hosting business with dedicated IPs, automated billing software, and premium migration services.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addons.map((addon, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{addon.name}</h3>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">{addon.desc}</p>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="font-extrabold text-gray-900">৳{addon.priceM} <span className="text-xs text-gray-500 font-medium">/mo</span></span>
                  <button className="text-xs font-bold text-primary hover:text-primary-dark">Add to cart <i className="fa-solid fa-arrow-right ml-1"></i></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQS ========== */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`bg-[#F9FAFB] rounded-2xl border ${openFaq === idx ? 'border-primary shadow-sm' : 'border-gray-200'} overflow-hidden transition-all duration-300`}>
                <button onClick={() => setOpenFaq(idx === openFaq ? null : idx)} className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none">
                  <span className="font-bold text-gray-900 text-lg pr-4">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'bg-red-100 text-primary rotate-180' : 'bg-white border border-gray-200 text-gray-500'}`}>
                    <i className="fa-solid fa-chevron-down text-sm"></i>
                  </div>
                </button>
                <div className={`px-6 text-gray-600 leading-relaxed transition-all duration-300 ease-in-out ${openFaq === idx ? 'py-5 border-t border-gray-200 block' : 'h-0 py-0 hidden'}`}>
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
