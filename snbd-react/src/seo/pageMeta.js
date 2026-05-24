export const BASE_URL = 'https://snbdhost.com';

export const pageMeta = {
  home: {
    title: "Bangladesh's #1 Web Hosting Provider",
    description:
      "SNBD HOST offers NVMe SSD web hosting, VPS servers, and domain registration in Bangladesh. BDIX-optimized, 99.9% uptime, 24/7 expert support.",
    canonical: `${BASE_URL}/`,
  },
  hosting: {
    title: "Shared Web Hosting Bangladesh — NVMe SSD cPanel Hosting",
    description:
      "Fast and affordable shared web hosting in Bangladesh with NVMe SSD, LiteSpeed, cPanel, and free SSL. Plans from ৳99/mo. BDIX-optimized servers.",
    canonical: `${BASE_URL}/hosting`,
  },
  resellerHosting: {
    title: "Reseller Hosting Bangladesh — White Label cPanel Hosting",
    description:
      "Start your own hosting business with SNBD HOST reseller hosting. WHM, unlimited cPanel accounts, CloudLinux isolation, free WHMCS license.",
    canonical: `${BASE_URL}/reseller-hosting`,
  },
  domain: {
    title: "Domain Registration Bangladesh — .com .bd .xyz Domains",
    description:
      "Register .com, .bd, .xyz and 50+ domain extensions at the lowest prices in Bangladesh. Free WHOIS privacy, DNS management, and email forwarding included.",
    canonical: `${BASE_URL}/domain`,
  },
  vpsServer: {
    title: "VPS Server Bangladesh — KVM Linux VPS Singapore & USA",
    description:
      "High-performance KVM Linux VPS servers in Singapore and USA. AMD EPYC CPUs, NVMe SSD storage, full root access, and 10Gbps uplink from ৳897/mo.",
    canonical: `${BASE_URL}/vps-server`,
  },
  bdixServers: {
    title: "BDIX Server Bangladesh — Ultra-Fast Local VPS Hosting",
    description:
      "BDIX-peered servers with sub-millisecond ping in Dhaka, Bangladesh. Ideal for streaming, gaming, and local content delivery. From ৳500/mo.",
    canonical: `${BASE_URL}/bdix-servers`,
  },
  openclaw: {
    title: "OpenClaw — Deploy Your Own AI Agent in 60 Seconds",
    description:
      "OpenClaw is an open-source AI agent platform hosted on SNBD HOST. Private, always-on, and live in 60 seconds. Customer support, automation, and more.",
    canonical: `${BASE_URL}/openclaw`,
  },
  n8nAutomation: {
    title: "n8n Automation Hosting Bangladesh — Managed n8n Server",
    description:
      "Managed n8n workflow automation hosting on SNBD HOST. Instant setup, dedicated RAM, BDIX peering, unlimited workflows from ৳250/mo.",
    canonical: `${BASE_URL}/n8n-automation`,
  },
  offers: {
    title: "Web Hosting Offers & Discount Codes Bangladesh",
    description:
      "Latest SNBD HOST promo codes and limited-time offers on web hosting, VPS servers, and domains in Bangladesh. Save up to 75%.",
    canonical: `${BASE_URL}/offers`,
  },
  support: {
    title: "Customer Support — SNBD HOST Help Center",
    description:
      "Get 24/7 support from SNBD HOST. Browse our knowledge base, open a support ticket, or chat live. Response time under 15 minutes.",
    canonical: `${BASE_URL}/support`,
  },
  blog: {
    title: "Blog — Web Hosting Tips, Tutorials & Bangladesh Tech News",
    description:
      "The SNBD HOST blog: web hosting tutorials, server management guides, WordPress tips, n8n automation how-tos, and Bangladesh tech news.",
    canonical: `${BASE_URL}/blog`,
  },
  privacy: {
    title: "Privacy Policy — SNBD HOST",
    description:
      "Read the SNBD HOST privacy policy. Learn how we collect, use, and protect your personal data. GDPR and CCPA compliant.",
    canonical: `${BASE_URL}/privacy`,
  },
  terms: {
    title: "Terms of Service — SNBD HOST",
    description:
      "Review SNBD HOST's terms of service governing the use of all hosting, domain, VPS, and server products. Bangladesh law jurisdiction.",
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
