export const BASE_URL = 'https://snbdhost.com';

// OG images: place 1200×630 px files in public/og/ then they become https://snbdhost.com/og/xxx.jpg
// Until you create them, each page falls back to /logo.png (set in SEOHead default)

export const pageMeta = {
  home: {
    title: "SNBD HOST — Bangladesh's #1 Web Hosting",  // 50 chars → 62 with suffix ✅
    description:
      "SNBD HOST offers NVMe SSD web hosting, VPS servers, and domain registration in Bangladesh. BDIX-optimized, 99.9% uptime, and 24/7 expert support.",
    canonical: `${BASE_URL}/`,
    ogImage: `${BASE_URL}/og/home.jpg`,
  },
  hosting: {
    title: "Shared Hosting Bangladesh — NVMe SSD & cPanel", // 46 chars → 58 ✅
    description:
      "Fast shared web hosting in Bangladesh with NVMe SSD, LiteSpeed, cPanel, and free SSL. BDIX-optimized servers, 99.9% uptime. Plans from ৳99/mo.",
    canonical: `${BASE_URL}/hosting`,
    ogImage: `${BASE_URL}/og/hosting.jpg`,
  },
  resellerHosting: {
    title: "Reseller Hosting Bangladesh — White Label WHM", // 46 chars → 58 with suffix ✅
    description:
      "Start your own hosting business with SNBD HOST. Reseller plans include WHM, unlimited cPanel accounts, CloudLinux isolation, and free WHMCS.",
    canonical: `${BASE_URL}/reseller-hosting`,
    ogImage: `${BASE_URL}/og/reseller.jpg`,
  },
  domain: {
    title: "Domain Registration Bangladesh — .com .bd .xyz", // 47 chars → 59 with suffix ✅
    description:
      "Register .com, .bd, .xyz and 50+ domain extensions at the lowest prices in Bangladesh. Free WHOIS privacy, DNS management, and email forwarding.",
    canonical: `${BASE_URL}/domain`,
    ogImage: `${BASE_URL}/og/domain.jpg`,
  },
  vpsServer: {
    title: "VPS Server Bangladesh — KVM Linux VPS Hosting", // 46 chars → 58 ✅
    description:
      "High-performance KVM Linux VPS in Singapore and USA. AMD EPYC CPUs, NVMe SSD, full root access, 10Gbps uplink, and instant provisioning from ৳897/mo.",
    canonical: `${BASE_URL}/vps-server`,
    ogImage: `${BASE_URL}/og/vps.jpg`,
  },
  bdixServers: {
    title: "BDIX Server Bangladesh — Ultra-Fast Local VPS", // 46 chars → 58 with suffix ✅
    description:
      "BDIX-peered servers with sub-millisecond ping inside Dhaka, Bangladesh. Ideal for streaming, gaming, and local content delivery. From ৳500/mo.",
    canonical: `${BASE_URL}/bdix-servers`,
    ogImage: `${BASE_URL}/og/bdix.jpg`,
  },
  openclaw: {
    title: "OpenClaw — Deploy Your Own Private AI Agent", // 43 chars → 55 ✅
    description:
      "OpenClaw is a private, always-on AI agent platform hosted on SNBD HOST. Deploy your own AI assistant for customer support, automation, and more in 60 seconds.",
    canonical: `${BASE_URL}/openclaw`,
    ogImage: `${BASE_URL}/og/openclaw.jpg`,
  },
  n8nAutomation: {
    title: "n8n Automation Hosting Bangladesh — Managed n8n", // 47 chars → 59 ✅
    description:
      "Managed n8n workflow automation hosting on SNBD HOST. Instant setup, dedicated RAM, BDIX peering, and unlimited workflows starting from ৳250/mo.",
    canonical: `${BASE_URL}/n8n-automation`,
    ogImage: `${BASE_URL}/og/n8n.jpg`,
  },
  offers: {
    title: "Web Hosting Offers & Discount Codes Bangladesh", // 47 chars → 59 with suffix ✅
    description:
      "Latest SNBD HOST promo codes and limited-time deals on web hosting, VPS servers, and domain registration in Bangladesh. Save up to 75% today.",
    canonical: `${BASE_URL}/offers`,
    ogImage: `${BASE_URL}/og/offers.jpg`,
  },
  support: {
    title: "Customer Support — SNBD HOST Help Center", // 41 chars → 53 with suffix ✅
    description:
      "Get 24/7 expert support from SNBD HOST. Browse our knowledge base, open a support ticket, or chat live with our team. Average response under 15 minutes.",
    canonical: `${BASE_URL}/support`,
    ogImage: `${BASE_URL}/og/support.jpg`,
  },
  blog: {
    title: "Blog — Web Hosting Tips & Bangladesh Tech News", // 47 chars → 59 with suffix ✅
    description:
      "The SNBD HOST blog: web hosting tutorials, server management guides, WordPress tips, n8n automation how-tos, and Bangladesh tech news.",
    canonical: `${BASE_URL}/blog`,
    ogImage: `${BASE_URL}/og/blog.jpg`,
  },
  privacy: {
    title: "Privacy Policy — SNBD HOST",
    description:
      "Read the SNBD HOST privacy policy. Learn how we collect, use, and protect your personal data in line with GDPR and CCPA requirements.",
    canonical: `${BASE_URL}/privacy`,
  },
  terms: {
    title: "Terms of Service — SNBD HOST",
    description:
      "Review SNBD HOST's terms of service governing the use of all hosting, VPS, domain, and server products. Governed by Bangladesh law.",
    canonical: `${BASE_URL}/terms`,
  },
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SNBD HOST',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "Bangladesh's leading web hosting provider with NVMe SSD servers, BDIX connectivity, and 24/7 local support.",
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BD',
    addressLocality: 'Dhaka',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    availableLanguage: ['English', 'Bengali'],
  },
  sameAs: [
    'https://www.facebook.com/snbdhost',
    'https://twitter.com/snbdhost',
  ],
};
