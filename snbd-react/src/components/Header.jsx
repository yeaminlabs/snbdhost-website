import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serversMobileOpen, setServersMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src="/logo.png" alt="SNBD HOST" className="h-8 w-auto" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/hosting" className="nav-link">Hosting</Link>
            <Link to="/n8n-automation" className="nav-link">N8N Automation</Link>
            <Link to="/openclaw" className="nav-link">OpenClaw</Link>
            <Link to="/domain" className="nav-link">Domain</Link>
            
            {/* Servers Dropdown */}
            <div className="relative group">
              <button className="nav-link inline-flex items-center gap-1 cursor-pointer">
                Servers <i className="fa-solid fa-chevron-down text-xs transition-transform group-hover:rotate-180"></i>
              </button>
              <div className="snbd-dropdown-menu absolute top-full left-0 mt-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                <Link to="/vps-server" className="snbd-dropdown-item">
                  <i className="fa-solid fa-server text-brand-red w-4"></i> VPS Server
                </Link>
                <Link to="/bdix-servers" className="snbd-dropdown-item">
                  <i className="fa-solid fa-bolt text-brand-red w-4"></i> BDIX Servers
                </Link>
                <Link to="/openclaw" className="snbd-dropdown-item">
                  <i className="fa-solid fa-robot text-brand-red w-4"></i> OpenClaw VPS
                </Link>
              </div>
            </div>
            
            <a href="#" className="nav-link">Blog</a>
            <Link to="/support" className="nav-link">Support</Link>
            <Link to="/offers" className="nav-link nav-offers">Offers 🔥</Link>
          </div>

          {/* Right: Currency + Dashboard Button + Hamburger */}
          <div className="flex items-center gap-3 relative">
            {/* Currency Switcher (Design only) */}
            <div className="relative group hidden sm:inline-block">
              <button type="button" className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 transition-colors cursor-pointer">
                <span>৳ BDT</span>
                <i className="fa-solid fa-chevron-down text-[10px] text-gray-500"></i>
              </button>
              <div className="absolute top-full right-0 mt-2 w-28 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1 z-50 overflow-hidden transform origin-top-right group-hover:scale-100 scale-95">
                <button type="button" className="w-full text-left px-4 py-2.5 text-sm font-bold text-brand-red bg-red-50 flex justify-between items-center cursor-pointer">
                  <span>৳ BDT</span>
                  <i className="fa-solid fa-check text-xs"></i>
                </button>
                <button type="button" className="w-full text-left px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 flex justify-between items-center cursor-pointer transition-colors">
                  <span>$ USD</span>
                </button>
              </div>
            </div>

            <a href="https://portal.snbdhost.com/clientarea.php" className="inline-flex text-center justify-center items-center gap-2 bg-brand-red text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-red hover:bg-brand-redBright hover:-translate-y-px transition-all hidden sm:inline-flex">
              My Dashboard
            </a>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#555555] hover:text-[#111111] hover:bg-[#ECEEF2] transition-colors"
            >
              <i className="fa-solid fa-bars text-lg"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 py-3 space-y-1">
          <Link to="/hosting" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
            <i className="fa-solid fa-server w-4 text-[#CC0000]"></i> Hosting
          </Link>
          <Link to="/n8n-automation" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
            <i className="fa-solid fa-diagram-project w-4 text-[#CC0000]"></i> N8N Automation
          </Link>
          <Link to="/openclaw" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
            <i className="fa-solid fa-robot w-4 text-[#CC0000]"></i> OpenClaw
          </Link>
          <Link to="/domain" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
            <i className="fa-solid fa-globe w-4 text-[#CC0000]"></i> Domain
          </Link>
          
          {/* Servers Mobile Accordion */}
          <div>
            <button 
              onClick={() => setServersMobileOpen(!serversMobileOpen)}
              className="mobile-menu-link w-full justify-between"
            >
              <span className="flex items-center gap-2.5">
                <i className="fa-solid fa-database w-4 text-[#CC0000]"></i> Servers
              </span>
              <i className={`fa-solid fa-chevron-down text-xs transition-transform ${serversMobileOpen ? 'rotate-180' : ''}`}></i>
            </button>
            <div className={`pl-6 mt-1 space-y-1 ${serversMobileOpen ? 'block' : 'hidden'}`}>
              <Link to="/vps-server" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                <i className="fa-solid fa-server w-4"></i> VPS Server
              </Link>
              <Link to="/bdix-servers" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                <i className="fa-solid fa-bolt w-4"></i> BDIX Servers
              </Link>
              <Link to="/openclaw" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                <i className="fa-solid fa-robot w-4"></i> OpenClaw VPS
              </Link>
            </div>
          </div>
          
          <a href="#" className="mobile-menu-link"><i className="fa-solid fa-newspaper w-4 text-[#CC0000]"></i> Blog</a>
          <Link to="/support" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
            <i className="fa-solid fa-headset w-4 text-[#CC0000]"></i> Support
          </Link>
          <Link to="/offers" className="mobile-menu-link" style={{ color: '#E31414' }} onClick={() => setMobileMenuOpen(false)}>
            <i className="fa-solid fa-fire w-4"></i> Offers 🔥
          </Link>
          
          <div className="pt-2 pb-1 border-t border-gray-100 flex items-center justify-between gap-4 mt-2 mb-4">
            <div className="flex items-center bg-gray-100 rounded-lg p-1 w-full max-w-[140px]">
              <button className="flex-1 py-1.5 text-xs font-bold bg-white text-brand-red rounded-md shadow-sm">৳ BDT</button>
              <button className="flex-1 py-1.5 text-xs font-semibold text-gray-500 hover:text-gray-800">USD</button>
            </div>
          </div>
          
          <div className="pt-2 pb-1">
            <a href="https://portal.snbdhost.com/clientarea.php" className="text-center justify-center items-center gap-2 bg-brand-red text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-red hover:bg-brand-redBright hover:-translate-y-px transition-all block w-full">
              My Dashboard
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
