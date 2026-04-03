import { useState } from 'react';

export default function Support() {
  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqs = [
    {
      q: "I Can't Connect to My Server/My Server is Unreachable, What Do I Do?",
      a: "There are a few things that are recommended to try if you're having trouble accessing your server including: checking the Server Status page here to see if there are any wider issues at SNBD Host, restarting the server via the Customer Control Panel, connecting to your server via VNC, using the 'Can't reach server' form, and watching our video about how to get your server back online here."
    },
    {
      q: "How Can I Check The Status of My Order?",
      a: "You can track your order status directly from the SNBD Host client portal under the 'Invoices' or 'Services' tab. Most VPS and Shared hosting plans are activated instantly upon payment."
    },
    {
      q: "How Do I Connect to My Server for the First Time?",
      a: "For Linux VPS, you can connect using SSH via Terminal (Mac/Linux) or PuTTY (Windows) using the credentials sent to your email. For Windows Servers, use the Remote Desktop Connection (RDP) application."
    },
    {
      q: "I Have Forgotten My Servers Password, How Do I Reset It?",
      a: "If you lose your root or admin password, you can easily reset it directly from the 'Server Management' section of your SNBD Host Control Panel without opening a ticket."
    },
    {
      q: "How Can I Close My SNBD Host Account or Cancel a Service?",
      a: "To cancel an active service, navigate to your client portal, select the specific product or service, and click 'Request Cancellation'. You can choose immediate cancellation or cancellation at the end of the billing cycle."
    },
    {
      q: "Can I Get a Refund?",
      a: "We offer a 7-day money-back guarantee strictly on Shared and Premium web hosting services. VPS and Dedicated Server setups are non-refundable once deployed due to the instant provisioning of dedicated resources."
    },
    {
      q: "Need Help With Billing or Service Management?",
      a: "For questions about invoices, payment methods like bKash/Nagad, or upgrading your plan, please browse our Billing Knowledge Base or submit a Sales ticket."
    },
    {
      q: "Need Help With Basic Server Management?",
      a: "We have extensive tutorials on installing cPanel, changing Linux kernels, setting up Python environments, and securing apache. Check the 'Troubleshooting' guides below."
    },
    {
      q: "Explore more server troubleshooting options",
      a: "Visit our dedicated Troubleshooting documentation hub for deep-dives into Nginx failures, DNS propagation delays, and memory leak diagnosis."
    }
  ];

  return (
    <div className="bg-[#f8f9fc] min-h-screen">
      {/* ===== HERO SECTION (SEARCH FIRST) ===== */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-24 sm:py-32 px-4 shadow-inner">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-10 tracking-tight">
            Hi, how can we help you?
          </h1>
          
          <div className="relative max-w-3xl mx-auto mb-6">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <i className="fa-solid fa-magnifying-glass text-gray-400 text-xl"></i>
            </div>
            <input 
              type="text" 
              className="w-full bg-white text-gray-900 border-none rounded-2xl pl-14 pr-6 py-5 text-lg shadow-xl focus:outline-none focus:ring-4 focus:ring-red-500/50 transition-all font-medium placeholder-gray-400" 
              placeholder="Search Questions, Keywords or Topics..."
            />
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-gray-400 font-medium">Search Suggestions:</span>
            <a href="#" className="text-gray-300 hover:text-white underline decoration-gray-600 hover:decoration-red-500 transition-colors">Reset Password</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="text-gray-300 hover:text-white underline decoration-gray-600 hover:decoration-red-500 transition-colors">Server Unreachable</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="text-gray-300 hover:text-white underline decoration-gray-600 hover:decoration-red-500 transition-colors">bKash Payment</a>
          </div>
        </div>
      </section>

      {/* ===== COMMON SOLUTIONS (FAQs) ===== */}
      <section className="py-20 px-4 bg-[#f8f9fc]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Common Solutions</h2>
            <p className="text-gray-400 font-medium tracking-widest uppercase mt-2 text-sm">- FAQs -</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 last:border-0">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors group"
                >
                  <span className={`font-bold text-[15px] pr-4 ${faqOpen === index ? 'text-red-600' : 'text-gray-800 group-hover:text-red-600 transition-colors'}`}>
                    {faq.q}
                  </span>
                  <i className={`fa-solid fa-chevron-right text-sm transition-transform duration-300 ${faqOpen === index ? 'rotate-90 text-red-600' : 'text-gray-400'}`}></i>
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${faqOpen === index ? 'max-h-[500px] py-4 bg-gray-50/50' : 'max-h-0'}`}
                >
                  <p className="text-gray-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.a }}></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FURTHER SOLUTIONS (HELP ARTICLES) ===== */}
      <section className="py-16 px-4 bg-[#f8f9fc]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Further Solutions</h2>
            <p className="text-gray-400 font-medium tracking-widest uppercase mt-2 text-sm">- Help articles -</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Getting Started */}
            <a href="#" className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all flex items-start gap-5 group">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 text-red-500 group-hover:bg-red-50 transition-colors shadow-inner border border-gray-100">
                <i className="fa-solid fa-rocket text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-red-600 transition-colors">Getting Started</h3>
                <p className="text-gray-500 text-sm leading-relaxed">New to SNBD Host? Get up and running quickly with our step-by-step guides and essential resources.</p>
              </div>
            </a>
            
            {/* Billing */}
            <a href="#" className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all flex items-start gap-5 group">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 text-gray-700 group-hover:bg-red-50 group-hover:text-red-500 transition-colors shadow-inner border border-gray-100">
                <i className="fa-solid fa-wallet text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-red-600 transition-colors">Billing & Service Management</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Need help with billing or managing your services? browse our articles for answers on invoices and local payments.</p>
              </div>
            </a>

            {/* Products & Services */}
            <a href="#" className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all flex items-start gap-5 group">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-500 group-hover:bg-red-50 group-hover:text-red-500 transition-colors shadow-inner border border-gray-100">
                <i className="fa-solid fa-cloud text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-red-600 transition-colors">Products & Services</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Looking for info on our products? Here you can find articles to help you understand SNBD Host's cloud offerings.</p>
              </div>
            </a>

            {/* Troubleshooting */}
            <a href="#" className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all flex items-start gap-5 group">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 text-orange-500 group-hover:bg-red-50 group-hover:text-red-500 transition-colors shadow-inner border border-gray-100">
                <i className="fa-solid fa-wrench text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-red-600 transition-colors">Troubleshooting</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Experiencing issues? Here you can find our troubleshooting articles for solutions to common configuration problems.</p>
              </div>
            </a>

            {/* Server Status */}
            <a href="#" className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all flex items-start gap-5 group">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 text-green-500 group-hover:bg-red-50 group-hover:text-red-500 transition-colors shadow-inner border border-gray-100">
                <i className="fa-solid fa-server text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2 group-hover:text-red-600 transition-colors">
                  Server Status <i className="fa-solid fa-arrow-up-right-from-square text-xs text-gray-400 group-hover:text-red-400"></i>
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">A link to the SNBD Host Status page where you can check for any outages or interruptions at our global data centers.</p>
              </div>
            </a>

            {/* YouTube */}
            <a href="#" className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all flex items-start gap-5 group">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 text-red-600 group-hover:bg-red-50 transition-colors shadow-inner border border-gray-100">
                <i className="fa-brands fa-youtube text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2 group-hover:text-red-600 transition-colors">
                  YouTube <i className="fa-solid fa-arrow-up-right-from-square text-xs text-gray-400 group-hover:text-red-400"></i>
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">Here is a link to the SNBD Host YouTube channel, which contains many helpful video tutorials for visual learners.</p>
              </div>
            </a>

            {/* Blog */}
            <a href="#" className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all flex items-start gap-5 group">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 text-emerald-500 group-hover:bg-red-50 group-hover:text-red-500 transition-colors shadow-inner border border-gray-100">
                <i className="fa-solid fa-comments text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2 group-hover:text-red-600 transition-colors">
                  Blog <i className="fa-solid fa-arrow-up-right-from-square text-xs text-gray-400 group-hover:text-red-400"></i>
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">A link to the SNBD Host Blog where you can find all the latest network news, customer stories, and hosting tips.</p>
              </div>
            </a>

            {/* Order Status */}
            <a href="#" className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all flex items-start gap-5 group">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 text-purple-500 group-hover:bg-red-50 group-hover:text-red-500 transition-colors shadow-inner border border-gray-100">
                <i className="fa-solid fa-cart-shopping text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2 group-hover:text-red-600 transition-colors">
                  Order Status <i className="fa-solid fa-arrow-up-right-from-square text-xs text-gray-400 group-hover:text-red-400"></i>
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">Here you can find a link to the order status page where you can track complex Dedicated Server provisioning.</p>
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* ===== DIDN'T FIND A SOLUTION? (GET IN TOUCH) ===== */}
      <section className="py-20 px-4 bg-[#f8f9fc] mb-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Didn't find a solution?</h2>
            <p className="text-gray-400 font-medium tracking-widest uppercase mt-2 text-sm">- Get in touch -</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="#" className="bg-white rounded-2xl p-10 text-center border border-gray-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all group">
              <div className="w-24 h-24 mx-auto border-2 border-transparent group-hover:border-red-100 bg-gray-50 group-hover:bg-red-50 rounded-2xl flex items-center justify-center mb-6 transition-all">
                <i className="fa-regular fa-comments text-5xl text-gray-400 group-hover:text-red-500 transition-colors"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Chat With Us</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Use chat when you need help with a quick or urgent question.</p>
            </a>

            <a href="#" className="bg-white rounded-2xl p-10 text-center border border-gray-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all group">
              <div className="w-24 h-24 mx-auto border-2 border-transparent group-hover:border-red-100 bg-gray-50 group-hover:bg-red-50 rounded-2xl flex items-center justify-center mb-6 transition-all">
                <i className="fa-regular fa-circle-question text-5xl text-gray-400 group-hover:text-red-500 transition-colors"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Submit a Ticket</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Submit a ticket for requests that are more complex, require technical investigation, or need advanced troubleshooting.</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
