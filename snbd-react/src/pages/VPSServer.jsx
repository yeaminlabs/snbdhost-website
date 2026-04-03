import { useState } from 'react';

export default function VPSServer() {
  const [activeTab, setActiveTab] = useState('us');
  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const usPlans = [
    { name: "VPS Starter", price: "৳800", cpu: "1 Core", ram: "1 GB", ssd: "25 GB", bw: "1 TB", ip: "1", popular: false },
    { name: "VPS Pro", price: "৳1,500", cpu: "2 Cores", ram: "2 GB", ssd: "50 GB", bw: "2 TB", ip: "1", popular: false },
    { name: "VPS Business", price: "৳2,800", cpu: "4 Cores", ram: "4 GB", ssd: "100 GB", bw: "4 TB", ip: "1", popular: true },
    { name: "VPS Ultra", price: "৳5,200", cpu: "8 Cores", ram: "8 GB", ssd: "200 GB", bw: "8 TB", ip: "2", popular: false }
  ];

  const bdPlans = [
    { name: "BD VPS Starter", price: "৳500", cpu: "1 Core", ram: "1 GB", ssd: "20 GB", bw: "500 GB", ip: "1", popular: false },
    { name: "BD VPS Pro", price: "৳900", cpu: "2 Cores", ram: "2 GB", ssd: "40 GB", bw: "1 TB", ip: "1", popular: false },
    { name: "BD VPS Business", price: "৳1,600", cpu: "4 Cores", ram: "4 GB", ssd: "80 GB", bw: "2 TB", ip: "1", popular: true },
    { name: "BD VPS Ultra", price: "৳2,800", cpu: "8 Cores", ram: "8 GB", ssd: "160 GB", bw: "4 TB", ip: "2", popular: false }
  ];

  const sgPlans = [
    { name: "SG VPS Starter", price: "৳1,000", cpu: "1 Core", ram: "1 GB", ssd: "25 GB", bw: "1 TB", ip: "1", popular: false },
    { name: "SG VPS Pro", price: "৳1,800", cpu: "2 Cores", ram: "2 GB", ssd: "50 GB", bw: "2 TB", ip: "1", popular: false },
    { name: "SG VPS Business", price: "৳3,200", cpu: "4 Cores", ram: "4 GB", ssd: "100 GB", bw: "4 TB", ip: "1", popular: true },
    { name: "SG VPS Ultra", price: "৳5,800", cpu: "8 Cores", ram: "8 GB", ssd: "200 GB", bw: "8 TB", ip: "2", popular: false }
  ];

  const renderPlans = (plans) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans.map((plan, idx) => (
        <div key={idx} className={`bg-white rounded-2xl p-6 relative flex flex-col hover:-translate-y-1 transition-transform duration-300 ${plan.popular ? 'border-2 border-red-600 shadow-xl' : 'border border-gray-200 shadow-lg'}`}>
          {plan.popular && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider">
              Most Popular
            </div>
          )}
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-red-600">
                <i className="fa-brands fa-linux text-xl"></i>
             </div>
             <div>
               <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">KVM Cloud</span>
               <h3 className="text-lg font-black text-gray-900 leading-none">{plan.name}</h3>
             </div>
          </div>
          
          <div className="mb-6">
            <span className="text-4xl font-black text-gray-900">{plan.price}</span>
            <span className="text-gray-500 text-sm font-medium">/mo</span>
          </div>
          
          <hr className="border-gray-100 mb-6" />
          
          <ul className="space-y-4 flex-1 mb-8">
            <li className="flex items-start gap-3 text-sm">
              <i className="fa-solid fa-check text-green-500 mt-1"></i>
              <span className="text-gray-600"><strong className="text-gray-900">{plan.cpu}</strong> Fast vCPU</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <i className="fa-solid fa-check text-green-500 mt-1"></i>
              <span className="text-gray-600"><strong className="text-gray-900">{plan.ram}</strong> Dedicated RAM</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <i className="fa-solid fa-check text-green-500 mt-1"></i>
              <span className="text-gray-600"><strong className="text-gray-900">{plan.ssd}</strong> Enterprise NVMe</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <i className="fa-solid fa-check text-green-500 mt-1"></i>
              <span className="text-gray-600"><strong className="text-gray-900">{plan.bw}</strong> Premium Bandwidth</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <i className="fa-solid fa-check text-green-500 mt-1"></i>
              <span className="text-gray-600"><strong className="text-gray-900">{plan.ip}</strong> IPv4 Address</span>
            </li>
          </ul>
          
          <a href="#" className={`block text-center font-bold py-3.5 rounded-xl transition-all ${plan.popular ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200'}`}>
            Buy Now
          </a>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-[#f8f9fc] min-h-screen">
      {/* ===== HEADER HERO SECTION ===== */}
      <section className="relative bg-gray-900 pt-28 pb-48 text-white z-0 overflow-hidden">
        {/* Subtle texture / glow */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
           <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-red-600 blur-[150px] opacity-40"></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-600 blur-[150px] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-800/80 border border-gray-700 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Enterprise KVM Cloud Server
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            Scalable VPS <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Hosting</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Experience raw performance with full root access, specialized NVMe storage, and scalable infrastructure tailored for total authority.
          </p>

          <div className="flex justify-center mb-8">
            <div className="bg-gray-800/80 p-1.5 rounded-full backdrop-blur-sm border border-gray-700 shadow-xl inline-flex">
              <button onClick={() => setActiveTab('us')} className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'us' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                🇺🇸 USA
              </button>
              <button onClick={() => setActiveTab('bd')} className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'bd' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                🇧🇩 Bangladesh
              </button>
              <button onClick={() => setActiveTab('sg')} className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'sg' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                🇸🇬 Singapore
              </button>
            </div>
          </div>
        </div>
        
        {/* WAVY DIVIDER (Absolute bottom) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[80px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.34,196.38,103.1,239.31,92.51,280.64,72.64,321.39,56.44Z" fill="#f8f9fc"></path>
          </svg>
        </div>
      </section>

      {/* ===== OVERLAPPING PRICING CARDS ===== */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 mb-20">
        {activeTab === 'us' && renderPlans(usPlans)}
        {activeTab === 'bd' && renderPlans(bdPlans)}
        {activeTab === 'sg' && renderPlans(sgPlans)}
      </section>

      {/* ===== WHY CHOOSE SNBD VPS (Right Aligned List) ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 rounded-2xl bg-gradient-to-tr from-gray-900 to-gray-800 p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-red-500/20 blur-[80px]"></div>
                <img src="https://illustrations.popsy.co/amber/server.svg" alt="Cloud API" className="relative z-10 w-full opacity-90 drop-shadow-xl" style={{ filter: 'brightness(1.2)' }} />
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-3">Power & Reliability</h2>
              <h3 className="text-4xl font-black text-gray-900 mb-8 leading-tight">Top Reasons To Buy Cloud VPS</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                    <i className="fa-solid fa-bolt text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Dedicated Resources</h4>
                    <p className="text-gray-600 leading-relaxed">Unlike shared hosting, your RAM, CPU, and SSD resources are 100% dedicated to your instance. Zero neighbor interference.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                    <i className="fa-solid fa-terminal text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Absolute Root Access</h4>
                    <p className="text-gray-600 leading-relaxed">Gain total control. Install custom software, modify server-level configurations, and deploy specialized web stacks instantly.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                    <i className="fa-solid fa-shield-halved text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Advanced Security</h4>
                    <p className="text-gray-600 leading-relaxed">Built-in firewalls, isolated environments, and hardware-level DdoS protection keeping your critical applications online.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTROL PANELS & OS OPTIONS BLOCK ===== */}
      <section className="py-24 bg-gray-50 border-t border-b border-gray-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <h2 className="text-3xl font-black text-gray-900 mb-4">Powerful Control Panels</h2>
             <p className="text-gray-500 mb-12 max-w-2xl mx-auto">Manage your VPS environments efficiently using the industry's most popular visual dashboards.</p>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all text-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/CPanel_logo.svg" alt="cPanel" className="h-10 mx-auto mb-4" />
                    <h4 className="font-bold text-gray-900 mb-1">cPanel / WHM</h4>
                    <p className="text-sm text-gray-500">The global standard</p>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all text-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Plesk_logo.png" alt="Plesk" className="h-8 mx-auto mb-5 object-contain" />
                    <h4 className="font-bold text-gray-900 mb-1">Plesk Panel</h4>
                    <p className="text-sm text-gray-500">For Windows & Linux</p>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all text-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/DirectAdmin_logo.svg" alt="DirectAdmin" className="h-10 mx-auto mb-4" />
                    <h4 className="font-bold text-gray-900 mb-1">DirectAdmin</h4>
                    <p className="text-sm text-gray-500">Lightweight & Fast</p>
                 </div>
             </div>
             
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Supported Operating Systems</h3>
             <div className="flex flex-wrap justify-center gap-4">
                 <div className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-xl shadow-sm">
                    <i className="fa-brands fa-ubuntu text-[#E95420] text-xl"></i>
                    <span className="font-bold text-gray-700">Ubuntu</span>
                 </div>
                 <div className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-xl shadow-sm">
                    <i className="fa-brands fa-centos text-[#262577] text-xl"></i>
                    <span className="font-bold text-gray-700">CentOS</span>
                 </div>
                 <div className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-xl shadow-sm">
                    <i className="fa-brands fa-linux text-gray-900 text-xl"></i>
                    <span className="font-bold text-gray-700">Debian</span>
                 </div>
                 <div className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-xl shadow-sm">
                    <i className="fa-brands fa-linux text-blue-500 text-xl"></i>
                    <span className="font-bold text-gray-700">AlmaLinux</span>
                 </div>
             </div>
         </div>
      </section>

      {/* ===== EXTENSIVE VPS COMPARISON TABLE ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-gray-900 mb-4">Detailed Technical Specs</h2>
              <p className="text-lg text-gray-500">Compare all SNBD Host cloud instances to find exactly what you need.</p>
           </div>
           
           <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-200">
             <table className="w-full text-left border-collapse min-w-[800px]">
               <thead>
                 <tr className="bg-gray-900 text-white">
                   <th className="py-5 px-6 font-bold text-sm uppercase tracking-wider">Features</th>
                   <th className="py-5 px-6 font-bold text-center">Starter</th>
                   <th className="py-5 px-6 font-bold text-center">Pro</th>
                   <th className="py-5 px-6 font-bold text-center bg-red-600">Business (Best)</th>
                   <th className="py-5 px-6 font-bold text-center">Ultra</th>
                 </tr>
               </thead>
               <tbody className="bg-white">
                 <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                   <td className="py-4 px-6 font-medium text-gray-900">Virtual CPUs (Cores)</td>
                   <td className="py-4 px-6 text-center text-gray-600">1 Core</td>
                   <td className="py-4 px-6 text-center text-gray-600">2 Cores</td>
                   <td className="py-4 px-6 text-center text-gray-900 font-bold bg-red-50/30">4 Cores</td>
                   <td className="py-4 px-6 text-center text-gray-600">8 Cores</td>
                 </tr>
                 <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                   <td className="py-4 px-6 font-medium text-gray-900">Dedicated RAM</td>
                   <td className="py-4 px-6 text-center text-gray-600">1 GB</td>
                   <td className="py-4 px-6 text-center text-gray-600">2 GB</td>
                   <td className="py-4 px-6 text-center text-gray-900 font-bold bg-red-50/30">4 GB</td>
                   <td className="py-4 px-6 text-center text-gray-600">8 GB</td>
                 </tr>
                 <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                   <td className="py-4 px-6 font-medium text-gray-900">NVMe SSD Storage</td>
                   <td className="py-4 px-6 text-center text-gray-600">up to 25 GB</td>
                   <td className="py-4 px-6 text-center text-gray-600">up to 50 GB</td>
                   <td className="py-4 px-6 text-center text-gray-900 font-bold bg-red-50/30">up to 100 GB</td>
                   <td className="py-4 px-6 text-center text-gray-600">up to 200 GB</td>
                 </tr>
                 <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                   <td className="py-4 px-6 font-medium text-gray-900">Premium Bandwidth</td>
                   <td className="py-4 px-6 text-center text-gray-600">up to 1 TB</td>
                   <td className="py-4 px-6 text-center text-gray-600">up to 2 TB</td>
                   <td className="py-4 px-6 text-center text-gray-900 font-bold bg-red-50/30">up to 4 TB</td>
                   <td className="py-4 px-6 text-center text-gray-600">up to 8 TB</td>
                 </tr>
                 <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                   <td className="py-4 px-6 font-medium text-gray-900">Port Speed</td>
                   <td className="py-4 px-6 text-center text-gray-600">1 Gbps</td>
                   <td className="py-4 px-6 text-center text-gray-600">1 Gbps</td>
                   <td className="py-4 px-6 text-center text-gray-900 font-bold bg-red-50/30">1 Gbps</td>
                   <td className="py-4 px-6 text-center text-gray-600">1 Gbps</td>
                 </tr>
                 <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                   <td className="py-4 px-6 font-medium text-gray-900">Full Root Access</td>
                   <td className="py-4 px-6 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                   <td className="py-4 px-6 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                   <td className="py-4 px-6 text-center bg-red-50/30"><i className="fa-solid fa-check text-green-500"></i></td>
                   <td className="py-4 px-6 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                 </tr>
                 <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                   <td className="py-4 px-6 font-medium text-gray-900">KVM Virtualization</td>
                   <td className="py-4 px-6 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                   <td className="py-4 px-6 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                   <td className="py-4 px-6 text-center bg-red-50/30"><i className="fa-solid fa-check text-green-500"></i></td>
                   <td className="py-4 px-6 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                 </tr>
                 <tr className="hover:bg-gray-50 transition-colors">
                   <td className="py-4 px-6 font-medium text-gray-900">99.9% Uptime SLA</td>
                   <td className="py-4 px-6 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                   <td className="py-4 px-6 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                   <td className="py-4 px-6 text-center bg-red-50/30"><i className="fa-solid fa-check text-green-500"></i></td>
                   <td className="py-4 px-6 text-center"><i className="fa-solid fa-check text-green-500"></i></td>
                 </tr>
               </tbody>
             </table>
           </div>
        </div>
      </section>

      {/* ===== ICON GRID FEATURES ===== */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
               <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mx-auto mb-6 text-2xl">
                 <i className="fa-solid fa-server"></i>
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">Enterprise Hardware</h3>
               <p className="text-gray-500">Powered by the latest generation Intel & AMD EPYC processors delivering unmatched speeds.</p>
            </div>
            <div className="text-center">
               <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mx-auto mb-6 text-2xl">
                 <i className="fa-solid fa-gauge-high"></i>
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Provisioning</h3>
               <p className="text-gray-500">Your cloud server is brought online and ready to accept SSH connections in under 60 seconds.</p>
            </div>
            <div className="text-center">
               <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mx-auto mb-6 text-2xl">
                 <i className="fa-solid fa-headset"></i>
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Expert Support</h3>
               <p className="text-gray-500">Our cloud engineers are available round the clock to ensure your infrastructure runs flawlessly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ACCORDION ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-500">Everything you need to know about SNBD Cloud VPS hosting.</p>
           </div>
           
           <div className="space-y-4">
             {[
               { q: "What is VPS Hosting?", a: "VPS (Virtual Private Server) hosting provides you with a dedicated slice of a physical server. You get guaranteed resources (CPU, RAM, Storage) and full root access, unlike shared hosting where resources are split dynamically among users." },
               { q: "Do I get full root/admin access?", a: "Yes. All our cloud VPS instances come with complete root-level access for Linux, and Administrator access for Windows instances, allowing you to install any software or dependencies." },
               { q: "How long does deployment take?", a: "Automated provisioning means your server will be online and accessible via SSH in under 60 seconds after your payment is verified." },
               { q: "Can I upgrade my VPS later?", a: "Absolutely. Our cloud infrastructure is built for scalability. You can upgrade your vCPU, RAM, or storage seamlessly directly from your control panel without any data loss." },
               { q: "Is VPS hosting managed or unmanaged?", a: "By default, our instances are self-managed so developers have total freedom. However, we do offer fully managed add-on plans if you require our engineers to handle patching, security, and optimization." }
             ].map((faq, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                   <button 
                     onClick={() => toggleFaq(idx)} 
                     className="w-full text-left px-6 py-5 bg-white hover:bg-gray-50 flex items-center justify-between font-bold text-gray-900 transition-colors"
                   >
                     {faq.q}
                     <i className={`fa-solid fa-chevron-down transition-transform duration-300 ${faqOpen === idx ? 'rotate-180 text-red-600' : 'text-gray-400'}`}></i>
                   </button>
                   <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${faqOpen === idx ? 'max-h-80 py-5 bg-gray-50 border-t border-gray-100' : 'max-h-0'}`}>
                     <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                   </div>
                </div>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
}
