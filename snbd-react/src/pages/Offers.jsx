import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import JsonLd from '../components/JsonLd';
import { pageMeta } from '../seo/pageMeta';
import { useCurrency } from '../context/CurrencyContext';

export default function Offers() {
  const { formatPrice } = useCurrency();
  const [billingTab, setBillingTab] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(0);
  const [openDiscountTab, setOpenDiscountTab] = useState(0);

  const faqs = [
    {
      question: "Do many hosting and domain promo codes are currently available?",
      answer: "Yes, we regularly update our active promo codes. You can find the best current deals directly on this page or applied automatically at checkout."
    },
    {
      question: "Are there any special discounts for new clients signing up?",
      answer: "Absolutely. All our first-time customers receive our introductory pricing, which is up to 75% off the regular renewal rate."
    },
    {
      question: "What is the maximum discount I can get with a SNBD HOST coupon?",
      answer: "During special sales events, you can save up to 80% on long-term hosting plans, plus get a free domain name for the first year."
    },
    {
      question: "Can I use multiple coupon codes on a single order?",
      answer: "No, our system only accepts one coupon code per transaction. We recommend choosing the code that provides the highest overall discount for your cart."
    },
    {
      question: "Do you have any discount for students or non-profits?",
      answer: "We occasionally run student promotions. Please contact our support team with your .edu email or non-profit documentation for custom pricing."
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
    <div className="bg-white text-gray-900 font-body selection:bg-primary selection:text-white pb-20">
      <SEOHead {...pageMeta.offers} />
      <JsonLd data={faqSchema} />
      {/* ========== SECTION 1: HERO ========== */}
      <section className="pt-32 pb-16 px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl sm:text-5xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] mb-6">
            SNBD HOST coupon codes and promotions
          </h1>
          <p className="text-lg text-gray-600 mb-6 font-medium">
            Save up to 75% on web hosting. Secure your brand's online future today.
          </p>
          <ul className="space-y-3 mb-8 text-gray-700 font-medium">
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-check text-green-500"></i> Fast & Secure
            </li>
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-check text-green-500"></i> 24/7 Expert Support
            </li>
          </ul>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a href="#plans" className="bg-primary hover:bg-primary-dark text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg shadow-red-200">
              Claim deal
            </a>
            <div className="flex flex-col text-xs font-bold text-gray-500">
              <div className="flex text-green-500 text-lg gap-0.5 mb-1">
                <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
              </div>
              Trustpilot rating 4.9/5
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="relative w-[400px] h-[400px]">
             {/* Decorative abstract elements replacing the person image */}
             <div className="absolute top-10 right-10 w-32 h-32 bg-red-100 rounded-3xl transform rotate-12 flex items-center justify-center shadow-lg text-primary font-extrabold text-3xl">
               -75%
             </div>
             <div className="absolute bottom-10 left-10 w-40 h-24 bg-white border border-gray-100 rounded-2xl shadow-2xl flex flex-col items-center justify-center z-10">
               <div className="flex text-yellow-400 text-sm gap-1 mb-2">
                 <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
               </div>
               <span className="text-xs font-bold text-gray-800">Trusted by 10,000+</span>
             </div>
             <div className="absolute inset-0 bg-gray-50 rounded-full -z-10 shadow-inner"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] text-gray-200">
               <i className="fa-solid fa-server"></i>
             </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: SPECIAL DISCOUNTS ========== */}
      <section className="py-20 bg-[#F4F5F7]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-5/12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">Special discounts for hosting and VPS plans</h2>
            
            <div className="space-y-2">
              {[
                { title: "Hosting", text: "Secure, reliable, and fast shared hosting tailored for small to medium websites. Includes cPanel, LSCache, and free SSL." },
                { title: "VPS Hosting", text: "Dedicated resources with full root access. Scale your NVMe storage and RAM instantly." },
                { title: "BDIX Hosting", text: "Ultra-low latency for Bangladeshi traffic connected directly to the BDIX network." }
              ].map((item, idx) => (
                <div key={idx} className={`border-b ${openDiscountTab === idx ? 'border-primary' : 'border-gray-300'}`}>
                  <button 
                    onClick={() => setOpenDiscountTab(idx)}
                    className="w-full text-left py-6 flex justify-between items-center font-bold text-lg text-gray-900"
                  >
                    {item.title}
                    <i className={`fa-solid fa-chevron-${openDiscountTab === idx ? 'up' : 'down'} text-sm text-gray-400`}></i>
                  </button>
                  {openDiscountTab === idx && (
                    <div className="pb-6 text-gray-600 leading-relaxed text-sm pr-8">
                      {item.text}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <a href="#plans" className="inline-block bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-md">
                Claim discount
              </a>
            </div>
          </div>

          <div className="w-full lg:w-7/12">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex gap-6">
               <div className="w-1/3 space-y-3 hidden sm:block">
                 <div className="h-8 bg-gray-100 rounded-lg w-full"></div>
                 <div className="h-8 bg-gray-100 rounded-lg w-3/4"></div>
                 <div className="h-8 bg-gray-100 rounded-lg w-5/6"></div>
                 <div className="h-8 bg-red-50 border border-red-100 rounded-lg w-full"></div>
                 <div className="h-8 bg-gray-100 rounded-lg w-2/3"></div>
               </div>
               <div className="w-full sm:w-2/3 space-y-4">
                 <div className="bg-gray-50 border border-gray-100 h-32 rounded-xl flex items-center justify-center p-6 text-center shadow-sm">
                   <div>
                     <div className="text-4xl font-extrabold text-primary mb-1">99.9%</div>
                     <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Uptime Record</div>
                   </div>
                 </div>
                 <div className="bg-gray-50 border border-gray-100 h-48 rounded-xl p-6 relative shadow-sm">
                   <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Traffic Insights</div>
                   <div className="flex items-end gap-2 h-20 w-full opacity-60">
                     <div className="w-1/6 bg-blue-200 h-1/3 rounded-t-sm"></div>
                     <div className="w-1/6 bg-blue-300 h-1/2 rounded-t-sm"></div>
                     <div className="w-1/6 bg-blue-400 h-3/4 rounded-t-sm"></div>
                     <div className="w-1/6 bg-blue-500 h-full rounded-t-sm"></div>
                     <div className="w-1/6 bg-primary h-5/6 rounded-t-sm"></div>
                     <div className="w-1/6 bg-red-400 h-full rounded-t-sm"></div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 3: PICK YOUR PERFECT PLAN ========== */}
      <section id="plans" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">Pick your perfect plan</h2>
          
          <div className="flex justify-center mb-12">
            <div className="bg-[#F4F5F7] p-1 rounded-full inline-flex border border-gray-200 shadow-inner">
              <button 
                onClick={() => setBillingTab('monthly')}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${billingTab === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-800'}`}
              >
                1 Month
              </button>
              <button 
                onClick={() => setBillingTab('annual')}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${billingTab === 'annual' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-800'}`}
              >
                12 Months <span className="ml-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-extrabold">SAVE 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            {/* Starter */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Starter</h3>
              <p className="text-sm text-gray-500 mb-6">Everything you need to create your first website.</p>
              
              <div className="mb-6">
                <span className="text-sm text-gray-400 line-through block mb-1">{formatPrice(129)}/mo</span>
                <span className="text-4xl font-extrabold text-gray-900">{formatPrice(billingTab === 'monthly' ? 99 : 79)}</span>
                <span className="text-gray-500 font-medium">/mo</span>
              </div>
              
              <button className="w-full text-center bg-[#F4F5F7] hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl transition-colors mb-8 border border-gray-200">
                Add to cart
              </button>
              
              <div className="text-sm font-bold text-gray-900 mb-4">Top features</div>
              <ul className="space-y-4 text-sm text-gray-600 flex-1">
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-green-500 mt-0.5"></i> 1 Website</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-green-500 mt-0.5"></i> 1 GB NVMe SSD</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-green-500 mt-0.5"></i> 50 GB Bandwidth</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-green-500 mt-0.5"></i> Free SSL</li>
              </ul>
            </div>

            {/* Basic (Highlighted) */}
            <div className="bg-white border-2 border-primary rounded-3xl p-8 flex flex-col shadow-2xl relative transform md:-translate-y-4">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Basic</h3>
              <p className="text-sm text-gray-500 mb-6">Level up with more power and enhanced features.</p>
              
              <div className="mb-6">
                <span className="text-sm text-gray-400 line-through block mb-1">{formatPrice(249)}/mo</span>
                <span className="text-4xl font-extrabold text-gray-900">{formatPrice(billingTab === 'monthly' ? 187 : 149)}</span>
                <span className="text-gray-500 font-medium">/mo</span>
              </div>
              
              <button className="w-full text-center bg-primary hover:bg-primary-dark text-white shadow-md shadow-red-200 font-bold py-3.5 rounded-xl transition-colors mb-8">
                Add to cart
              </button>
              
              <div className="text-sm font-bold text-gray-900 mb-4">Top features</div>
              <ul className="space-y-4 text-sm text-gray-600 flex-1">
                <li className="flex items-start gap-3 font-bold text-gray-900"><i className="fa-solid fa-check text-primary mt-0.5"></i> 3 Websites</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-primary mt-0.5"></i> 5 GB NVMe SSD</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-primary mt-0.5"></i> 100 GB Bandwidth</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-primary mt-0.5"></i> Free SSL</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-primary mt-0.5"></i> Free Weekly Backups</li>
              </ul>
            </div>

            {/* Professional */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Professional</h3>
              <p className="text-sm text-gray-500 mb-6">Optimized for small businesses and growing agencies.</p>
              
              <div className="mb-6">
                <span className="text-sm text-gray-400 line-through block mb-1">{formatPrice(449)}/mo</span>
                <span className="text-4xl font-extrabold text-gray-900">{formatPrice(billingTab === 'monthly' ? 349 : 279)}</span>
                <span className="text-gray-500 font-medium">/mo</span>
              </div>
              
              <button className="w-full text-center bg-[#F4F5F7] hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl transition-colors mb-8 border border-gray-200">
                Add to cart
              </button>
              
              <div className="text-sm font-bold text-gray-900 mb-4">Top features</div>
              <ul className="space-y-4 text-sm text-gray-600 flex-1">
                <li className="flex items-start gap-3 font-bold text-gray-900"><i className="fa-solid fa-check text-green-500 mt-0.5"></i> 5 Websites</li>
                <li className="flex items-start gap-3 font-bold text-gray-900"><i className="fa-solid fa-check text-green-500 mt-0.5"></i> 10 GB NVMe SSD</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-green-500 mt-0.5"></i> 200 GB Bandwidth</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-green-500 mt-0.5"></i> Daily Backups</li>
                <li className="flex items-start gap-3"><i className="fa-solid fa-check text-green-500 mt-0.5"></i> Jailed SFTP</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ========== SECTION 4: HOW TO REDEEM ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12">How to redeem SNBD HOST coupons</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-[#F8F9FA] p-8 rounded-2xl">
              <div className="text-primary text-xl font-extrabold mb-4">01</div>
              <h3 className="font-bold text-gray-900 mb-2">Choose your hosting plan and go to cart</h3>
              <p className="text-sm text-gray-600">Select the plan that best fits your needs, configure your domain name, and proceed to the checkout page.</p>
            </div>
            <div className="bg-[#F8F9FA] p-8 rounded-2xl">
              <div className="text-primary text-xl font-extrabold mb-4">02</div>
              <h3 className="font-bold text-gray-900 mb-2">Click "Have a promo code?" to apply discount</h3>
              <p className="text-sm text-gray-600">Locate the promo code field in your order summary box, paste your coupon, and click validate.</p>
            </div>
            <div className="bg-[#F8F9FA] p-8 rounded-2xl">
              <div className="text-primary text-xl font-extrabold mb-4">03</div>
              <h3 className="font-bold text-gray-900 mb-2">Enjoy your amazing discount</h3>
              <p className="text-sm text-gray-600">Your total price will instantly drop. Complete your payment securely and your hosting will deploy immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 5: MONEY-BACK GUARANTEE ========== */}
      <section className="py-12 bg-white px-4">
        <div className="max-w-4xl mx-auto bg-[#F4F5F7] rounded-3xl p-10 md:p-14 text-center border border-gray-200 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">30-day money-back guarantee</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Not completely satisfied? We'll refund your hosting payment within the first 30 days of purchase—no questions asked. Domain name purchases are non-refundable.
          </p>
          <a href="#plans" className="inline-block bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-md">
            Get started
          </a>
        </div>
      </section>

      {/* ========== SECTION 6: TRUST BADGES ========== */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4 opacity-70">
          <div className="flex flex-col items-center gap-1 grayscale hover:grayscale-0 transition-all">
            <span className="font-bold text-gray-800 text-lg flex items-center gap-1"><i className="fa-solid fa-star text-green-500"></i> Trustpilot</span>
            <div className="flex text-green-500 text-sm"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
          </div>
          <div className="flex flex-col items-center gap-1 grayscale hover:grayscale-0 transition-all">
            <span className="font-bold text-gray-800 text-lg flex items-center gap-1"><i className="fa-brands fa-google text-blue-500"></i> Google</span>
            <div className="flex text-green-500 text-sm"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
          </div>
          <div className="flex flex-col items-center gap-1 grayscale hover:grayscale-0 transition-all">
            <span className="font-bold text-gray-800 text-lg">HostAdvice</span>
            <div className="flex text-green-500 text-sm"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i></div>
          </div>
          <div className="flex flex-col items-center gap-1 grayscale hover:grayscale-0 transition-all">
            <span className="font-bold text-gray-800 text-lg">WHTop</span>
            <div className="flex text-green-500 text-sm"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 7: FAQS ========== */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">SNBD HOST coupon codes FAQs</h2>
          <p className="text-center text-gray-500 mb-10">Find answers to frequently asked questions about our current deals and coupons.</p>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`border-b ${openFaq === idx ? 'border-primary' : 'border-gray-200'}`}
              >
                <button 
                  onClick={() => setOpenFaq(idx === openFaq ? null : idx)}
                  className="w-full py-5 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-bold text-gray-900 text-lg pr-4">{faq.question}</span>
                  <div className={`w-6 h-6 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'text-primary rotate-180' : 'text-gray-400'}`}>
                    <i className="fa-solid fa-chevron-down text-sm"></i>
                  </div>
                </button>
                <div className={`text-gray-600 leading-relaxed transition-all duration-300 ease-in-out ${openFaq === idx ? 'pb-5 block' : 'h-0 pb-0 hidden'}`}>
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


