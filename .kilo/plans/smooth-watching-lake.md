# Plan: Servers Dropdown Navigation + BDIX/VPS/OpenClaw Pages

## Context
The site currently has a standalone "Servers" link in the nav bar pointing to `servers.html`, which contains both Cloud VPS and Dedicated Server content. The goal is to:
1. Replace the "Servers" nav link with a dropdown containing: VPS Server, BDIX Servers, OpenClaw VPS
2. Rename `servers.html` → `vps-server.html` (VPS-focused content)
3. Create new `bdix-servers.html` (BDIX hosting page)
4. Link "OpenClaw VPS" dropdown item to existing `openclaw.html`

## Tasks

### Task 1: Rename `servers.html` → `vps-server.html`
- `git mv servers.html vps-server.html`
- Update the page title to "VPS Server — SNBD HOST"
- Keep all existing VPS content (USA/Bangladesh/Singapore tabs, pricing cards, features strip, add-ons, comparison table, footer)
- Remove the Dedicated Servers section (lines ~616-954) to make this a pure VPS page
- Update internal nav links within the file to point to `vps-server.html` instead of `servers.html`

### Task 2: Create `bdix-servers.html`
New page for BDIX (Bangladesh Internet Exchange) hosting. Design: premium Tailwind with glassmorphism, matching index.html hero aesthetics.

**Structure:**
- Same head/Tailwind config/font setup as other pages
- **Navbar**: Updated dropdown nav (same across all pages)
- **Hero Section**: "BDIX Connected VPS" badge, headline about ultra-low latency Bangladesh connectivity, animated badge with pulse, stats row (<5ms latency, NVMe SSD, BDIX Direct, 99.9% Uptime)
- **Features Section**: 4-6 cards highlighting BDIX advantages — Direct BDIX Peering, Ultra-Low Latency, Bangladesh Datacenter, NVMe Storage, Local Support, DDoS Protection
- **Pricing Section**: 4 cards using existing BD VPS pricing from servers.html:
  - BDIX Starter: ৳500/mo — 1 Core, 1GB RAM, 20GB NVMe, 500GB BW
  - BDIX Pro: ৳900/mo — 2 Cores, 2GB RAM, 40GB NVMe, 1TB BW
  - BDIX Business: ৳1,600/mo — 4 Cores, 4GB RAM, 80GB NVMe, 2TB BW (Most Popular, featured card)
  - BDIX Ultra: ৳2,800/mo — 8 Cores, 8GB RAM, 160GB NVMe, 4TB BW
- **Why BDIX Section**: Comparison/infographic showing BDIX vs regular international routing latency
- **CTA Banner**: "Get Started with BDIX VPS"
- **Footer**: Same footer as other pages

### Task 3: Update Navigation on ALL 8 HTML Pages
Replace the standalone "Servers" `<a>` link with a hover dropdown menu.

**Desktop dropdown approach:**
```html
<!-- Servers Dropdown (Desktop) -->
<div class="relative group">
  <button class="px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors rounded-md flex items-center gap-1">
    Servers <i class="fa-solid fa-chevron-down text-[10px] transition-transform group-hover:rotate-180"></i>
  </button>
  <div class="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
    <a href="vps-server.html" class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
      <i class="fa-solid fa-server text-gray-400 w-4"></i> VPS Server
    </a>
    <a href="bdix-servers.html" class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
      <i class="fa-solid fa-bolt text-gray-400 w-4"></i> BDIX Servers
    </a>
    <a href="openclaw.html" class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
      <i class="fa-solid fa-paw text-gray-400 w-4"></i> OpenClaw VPS
    </a>
  </div>
</div>
```

**Mobile dropdown approach (accordion-style):**
```html
<div>
  <button id="servers-mobile-btn" class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors">
    <span class="flex items-center gap-2"><i class="fa-solid fa-database w-4 text-gray-400"></i> Servers</span>
    <i class="fa-solid fa-chevron-down text-xs transition-transform" id="servers-mobile-arrow"></i>
  </button>
  <div id="servers-mobile-dropdown" class="hidden pl-6 space-y-1 mt-1">
    <a href="vps-server.html" class="block px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors">VPS Server</a>
    <a href="bdix-servers.html" class="block px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors">BDIX Servers</a>
    <a href="openclaw.html" class="block px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors">OpenClaw VPS</a>
  </div>
</div>
```

**Pages to update (all 8):**
1. `index.html` — also fix dead `href="#"` links to actual pages
2. `vps-server.html` (renamed from servers.html) — mark dropdown active state
3. `hosting.html`
4. `domain.html`
5. `openclaw.html`
6. `support.html`
7. `offers.html`
8. `n8n-automation.html`

**Active state handling:**
- On `vps-server.html` and `bdix-servers.html`: desktop button gets `text-red-600`, corresponding dropdown item gets `bg-red-50 text-red-600`
- On `openclaw.html`: The existing standalone OpenClaw nav link already handles active state; dropdown is supplementary

**Per-page nav style adaptation:**
- `index.html`: Uses `space-x-7` and `nav-link` CSS class — adapt dropdown to match
- `hosting.html`: Uses `gap-1` and `fixed` nav — adapt accordingly
- Other pages: Use `space-x-1` or `gap-1` — straightforward replacement

### Task 4: Mobile Menu JavaScript
Add to each page's existing mobile menu JS block:
```javascript
const serversBtn = document.getElementById('servers-mobile-btn');
const serversDrop = document.getElementById('servers-mobile-dropdown');
const serversArrow = document.getElementById('servers-mobile-arrow');
if (serversBtn) {
  serversBtn.addEventListener('click', () => {
    serversDrop.classList.toggle('hidden');
    serversArrow.classList.toggle('rotate-180');
  });
}
```

## File Changes Summary
| Action | File | Description |
|--------|------|-------------|
| RENAME | `servers.html` → `vps-server.html` | Git rename, remove dedicated server section |
| CREATE | `bdix-servers.html` | New BDIX VPS page with premium design |
| MODIFY | `index.html` | Update nav + fix dead links |
| MODIFY | `vps-server.html` | Update nav, title, remove DS section |
| MODIFY | `hosting.html` | Update nav |
| MODIFY | `domain.html` | Update nav |
| MODIFY | `openclaw.html` | Update nav |
| MODIFY | `support.html` | Update nav |
| MODIFY | `offers.html` | Update nav |
| MODIFY | `n8n-automation.html` | Update nav |

## Verification
1. Open all 8 pages — verify dropdown on hover (desktop) and accordion on tap (mobile)
2. Verify all 3 dropdown links navigate correctly
3. Verify active states on `vps-server.html` and `bdix-servers.html`
4. Verify `bdix-servers.html` has premium aesthetics matching index.html quality
5. Verify `vps-server.html` no longer contains dedicated server content
6. Verify no broken internal links (except Blog → `blog.html` which is out of scope)
