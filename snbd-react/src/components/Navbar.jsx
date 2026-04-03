import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CURRENCIES = [
  { code: 'BDT', symbol: '৳', flag: '🇧🇩', label: 'Bangladeshi Taka' },
  { code: 'USD', symbol: '$', flag: '🇺🇸', label: 'US Dollar' },
  { code: 'CAD', symbol: 'CA$', flag: '🇨🇦', label: 'Canadian Dollar' },
]

function CurrencySwitcher() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(CURRENCIES[0])
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors border border-gray-200 hover:border-gray-300"
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span>{selected.code}</span>
        <i className={`fa-solid fa-chevron-down text-[10px] text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}></i>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg shadow-gray-200/60 py-1.5 z-50">
          <div className="px-3 py-1.5 mb-1 border-b border-gray-100">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Select Currency</span>
          </div>
          {CURRENCIES.map(c => (
            <button
              key={c.code}
              onClick={() => { setSelected(c); setOpen(false) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-gray-50 ${selected.code === c.code ? 'bg-red-50 text-red-700 font-semibold' : 'text-gray-700'}`}
            >
              <span className="text-lg leading-none">{c.flag}</span>
              <div className="text-left">
                <div className="font-semibold">{c.code} <span className="font-normal text-gray-400">({c.symbol})</span></div>
                <div className="text-xs text-gray-400">{c.label}</div>
              </div>
              {selected.code === c.code && (
                <i className="fa-solid fa-check text-red-600 text-xs ml-auto"></i>
              )}
            </button>
          ))}
          <div className="px-3 pt-2 pb-1.5 mt-1 border-t border-gray-100">
            <span className="text-[10px] text-gray-400 leading-tight block">💡 Prices shown for display only. Billing in BDT.</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [serversOpen, setServersOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
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
              <button className="nav-link inline-flex items-center gap-1">
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
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <CurrencySwitcher />
            </div>
            <a
              href="https://portal.snbdhost.com/clientarea.php"
              className="inline-flex text-center justify-center items-center gap-2 bg-brand-red text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-red hover:bg-brand-redBright hover:-translate-y-px transition-all hidden sm:inline-flex"
            >
              My Dashboard
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-[#555555] hover:text-[#111111] hover:bg-[#ECEEF2] transition-colors"
            >
              <i className="fa-solid fa-bars text-lg"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${mobileOpen ? '' : 'hidden'} lg:hidden`}>
        <div className="px-4 py-3 space-y-1">
          <Link to="/hosting" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-server w-4 text-[#CC0000]"></i> Hosting
          </Link>
          <Link to="/n8n-automation" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-diagram-project w-4 text-[#CC0000]"></i> N8N Automation
          </Link>
          <Link to="/openclaw" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-robot w-4 text-[#CC0000]"></i> OpenClaw
          </Link>
          <Link to="/domain" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-globe w-4 text-[#CC0000]"></i> Domain
          </Link>

          {/* Servers Mobile Accordion */}
          <div>
            <button
              onClick={() => setServersOpen(!serversOpen)}
              className="mobile-menu-link w-full justify-between"
            >
              <span className="flex items-center gap-2.5">
                <i className="fa-solid fa-database w-4 text-[#CC0000]"></i> Servers
              </span>
              <i className={`fa-solid fa-chevron-down text-xs transition-transform ${serversOpen ? 'rotate-180' : ''}`}></i>
            </button>
            <div className={`${serversOpen ? '' : 'hidden'} pl-6 mt-1 space-y-1`}>
              <Link to="/vps-server" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>
                <i className="fa-solid fa-server w-4"></i> VPS Server
              </Link>
              <Link to="/bdix-servers" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>
                <i className="fa-solid fa-bolt w-4"></i> BDIX Servers
              </Link>
              <Link to="/openclaw" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>
                <i className="fa-solid fa-robot w-4"></i> OpenClaw VPS
              </Link>
            </div>
          </div>

          <a href="#" className="mobile-menu-link">
            <i className="fa-solid fa-newspaper w-4 text-[#CC0000]"></i> Blog
          </a>
          <Link to="/support" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-headset w-4 text-[#CC0000]"></i> Support
          </Link>
          <Link to="/offers" className="mobile-menu-link" style={{ color: '#E31414' }} onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-fire w-4"></i> Offers 🔥
          </Link>
          <div className="pt-2 pb-1">
            <a
              href="https://portal.snbdhost.com/clientarea.php"
              className="inline-flex text-center justify-center items-center gap-2 bg-brand-red text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-red hover:bg-brand-redBright hover:-translate-y-px transition-all block text-center w-full"
            >
              My Dashboard
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
