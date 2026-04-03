import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="snbd-footer bg-white relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src="/logo.png" alt="SNBD HOST" className="h-8 w-auto" />
            </Link>
            <p className="text-[#555555] text-sm leading-relaxed">
              SNBD HOST is Bangladesh's leading web hosting provider, offering fast, secure, and affordable hosting solutions powered by cutting-edge infrastructure.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-9 h-9 bg-[#ECEEF2] border border-[#E5E7EB] rounded-lg flex items-center justify-center transition-all duration-200 text-[#555555] hover:bg-brand-red hover:text-white">
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>
              <a href="#" className="w-9 h-9 bg-[#ECEEF2] border border-[#E5E7EB] rounded-lg flex items-center justify-center transition-all duration-200 text-[#555555] hover:bg-brand-red hover:text-white">
                <i className="fa-brands fa-x-twitter text-sm"></i>
              </a>
              <a href="#" className="w-9 h-9 bg-[#ECEEF2] border border-[#E5E7EB] rounded-lg flex items-center justify-center transition-all duration-200 text-[#555555] hover:bg-brand-red hover:text-white">
                <i className="fa-brands fa-linkedin-in text-sm"></i>
              </a>
              <a href="#" className="w-9 h-9 bg-[#ECEEF2] border border-[#E5E7EB] rounded-lg flex items-center justify-center transition-all duration-200 text-[#555555] hover:bg-brand-red hover:text-white">
                <i className="fa-brands fa-youtube text-sm"></i>
              </a>
            </div>
          </div>

          {/* My Account */}
          <div>
            <h4 className="text-[#111111] font-bold text-xs uppercase tracking-widest mb-5">My Account</h4>
            <ul className="space-y-3">
              <li><a href="https://portal.snbdhost.com/clientarea.php" className="text-[#555555] text-sm hover:text-brand-red transition-colors">Start Page</a></li>
              <li><Link to="/hosting" className="text-[#555555] text-sm hover:text-brand-red transition-colors">Host Plan</Link></li>
              <li><Link to="/domain" className="text-[#555555] text-sm hover:text-brand-red transition-colors">Domains</Link></li>
              <li><a href="https://portal.snbdhost.com/clientarea.php?action=invoices" className="text-[#555555] text-sm hover:text-brand-red transition-colors">Invoices</a></li>
              <li><a href="https://portal.snbdhost.com/clientarea.php?action=services" className="text-[#555555] text-sm hover:text-brand-red transition-colors">My Services</a></li>
            </ul>
          </div>

          {/* Legals */}
          <div>
            <h4 className="text-[#111111] font-bold text-xs uppercase tracking-widest mb-5">Legals</h4>
            <ul className="space-y-3">
              <li><Link to="/terms" className="text-[#555555] text-sm hover:text-brand-red transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-[#555555] text-sm hover:text-brand-red transition-colors">Privacy &amp; Protection</Link></li>
              <li><a href="#" className="text-[#555555] text-sm hover:text-brand-red transition-colors">Domain Policy</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[#111111] font-bold text-xs uppercase tracking-widest mb-5">Support</h4>
            <ul className="space-y-3 mb-5">
              <li>
                <Link to="/support" className="flex flex-row items-center gap-2 text-[#555555] text-sm hover:text-brand-red transition-colors relative">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse"></span>
                  Live Support
                </Link>
              </li>
              <li><a href="https://portal.snbdhost.com/submitticket.php" className="text-[#555555] text-sm hover:text-brand-red transition-colors">Open a Ticket</a></li>
              <li><a href="https://portal.snbdhost.com/contact.php" className="text-[#555555] text-sm hover:text-brand-red transition-colors">Contact Us</a></li>
            </ul>
            
            <div className="bg-[#ECEEF2] border border-[#E5E7EB] rounded-xl p-4">
              <div className="text-[#9CA3AF] text-xs mb-1">Need help right now?</div>
              <Link to="/support" className="text-[#E31414] font-semibold text-sm">Chat with us →</Link>
            </div>
            
            <div className="mt-4">
              <a href="mailto:support@snbdhost.com" className="flex items-center gap-2 text-[#555555] text-sm hover:text-brand-red transition-colors border-b border-transparent hover:border-brand-red pb-0.5 w-max">
                <i className="fa-solid fa-envelope text-brand-red"></i> support@snbdhost.com
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#9CA3AF] text-sm">Copyright 2020–2026 SNBD HOST. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <span className="flex items-center gap-1.5 text-[#9CA3AF] text-sm">
                <i className="fa-solid fa-shield-halved text-green-500"></i> Secure Hosting
              </span>
              <span className="flex items-center gap-1.5 text-[#9CA3AF] text-sm">
                <i className="fa-solid fa-circle-check text-green-500"></i> 99.9% Uptime
              </span>
              <span className="flex items-center gap-1.5 text-sm">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block animate-pulse"></span>
                <span className="text-green-500 font-semibold">All systems operational</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
