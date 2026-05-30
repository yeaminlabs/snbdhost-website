import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

export default function Offers() {
  const navigate = useNavigate();

  const calculateTimeLeft = () => {
    // Target: June 1, 2026 00:00:00 Local Time
    const difference = +new Date('2026-06-01T00:00:00') - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format numbers with leading zeros
  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center relative overflow-hidden font-body px-4 selection:bg-red-500 selection:text-white">
      <SEOHead title="Offers Launching Soon | SNBD HOST" noIndex />
      
      {/* Premium Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.3),rgba(2,6,23,0.8))] -z-10"></div>
      
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10 -z-10"></div>

      {/* Main Container */}
      <div className="max-w-2xl w-full text-center z-10 relative">
        {/* Brand/Logo */}
        <div className="flex justify-center items-center gap-2 mb-8">
          <img src="/logo.png" alt="SNBD HOST" className="h-9" />
        </div>

        {/* Locked Badging */}
        <div className="inline-flex items-center gap-2 bg-red-950/40 border border-red-900/50 text-red-400 text-xs font-black uppercase tracking-widest px-4.5 py-2 rounded-full mb-6 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
          <span>Exclusive Promotions Locked</span>
          <i className="fa-solid fa-fire text-amber-500"></i>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-none">
          Our Special Deals are <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-500 to-orange-400">
            Launching Soon!
          </span>
        </h1>
        
        <p className="text-sm sm:text-base text-slate-400 mb-10 max-w-lg mx-auto font-medium">
          We are preparing supercharged hosting discounts and domain coupons. Mark your calendars — our offers will go live on June 01, 2026.
        </p>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-lg mx-auto mb-12">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center shadow-2xl"
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                {formatNumber(item.value)}
              </span>
              <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1.5">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg flex items-center gap-2 text-xs cursor-pointer"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Go Back
          </button>
          
          <Link
            to="/"
            className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all flex items-center gap-2 text-xs"
          >
            <i className="fa-solid fa-house"></i>
            Back to Home
          </Link>
        </div>
      </div>
      
      {/* Bottom Copyright */}
      <footer className="absolute bottom-6 text-[10px] text-slate-600 font-semibold tracking-wider uppercase">
        © 2026 SNBD HOST. All rights reserved.
      </footer>
    </div>
  );
}
