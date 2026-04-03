export default function Terms() {
  return (
    <>


{/* ========== HEADER ========== */}
<div className="bg-gradient-to-br from-white via-brand-redPale to-white border-b border-gray-200 relative overflow-hidden py-16 md:py-20">
  <div className="absolute inset-0 opacity-5" style={{"backgroundImage":"radial-gradient(circle at 2px 2px, #CC0000 1px, transparent 0)","backgroundSize":"40px 40px"}}></div>
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none" style={{"background":"rgba(204,0,0,0.1)","filter":"blur(80px)"}}></div>
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
    <div className="inline-flex items-center gap-1.5 bg-brand-redSoft text-brand-red text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-brand-redSoft mb-4 mb-5">
      📋 Legal Agreement
    </div>
    <h1 className="text-3xl md:text-5xl font-extrabold text-text-primary tracking-tight leading-snug mb-4">Terms of Service</h1>
    <p className="text-lg text-text-secondary leading-relaxed max-w-lg mx-auto">Clear, practical rules for using our Services.</p>
  </div>
</div>

{/* ========== MAIN CONTENT ========== */}
<main className="flex-grow py-12" style={{"background":"#F8F9FB"}}>
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div className="bg-bg-card border border-gray-200 rounded-2xl shadow-sm hover:border-brand-redSoft hover:shadow-md hover:-translate-y-0.5 transition-all p-8 sm:p-12">
      
      <div className="prose prose-red max-w-none legal-content">
        <p className="text-lg text-gray-500">
          These Terms of Service ("Terms") govern your access to and use of SNBD HOST services, websites, and applications (the “Services”). By using our Services, you agree to be bound by these Terms. This page explains—in clear, practical language—how billing works, what is allowed, what is not, how we keep services reliable, and how we handle data and legal matters.
        </p>

        {/* Quick Info Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-[rgba(204,0,0,0.1)] rounded-xl p-5 border border-[rgba(204,0,0,0.2)]">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="fa-solid fa-server text-primary"></i> Servers</h4>
            <p className="text-sm text-gray-500">DeltaDNS network peering, CloudLinux isolation, LiteSpeed/Apache, Imunify360, and cPanel/WHM for efficient multi‑tenant hosting.</p>
          </div>
          <div className="bg-[rgba(204,0,0,0.1)] rounded-xl p-5 border border-[rgba(204,0,0,0.2)]">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="fa-solid fa-credit-card text-primary"></i> Billing</h4>
            <p className="text-sm text-gray-500">Invoices auto‑generate 7 days before renewal. Pay with bKash, Nagad, Rocket, cards, or Stripe. Receipts issued instantly.</p>
          </div>
          <div className="bg-[rgba(204,0,0,0.1)] rounded-xl p-5 border border-[rgba(204,0,0,0.2)]">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="fa-solid fa-shield text-primary"></i> Security</h4>
            <p className="text-sm text-gray-500">WAF, malware scanning, brute‑force protection, and TLS/SSL. Strong password and 2FA recommended for all panels.</p>
          </div>
        </div>

        <h3><span className="text-primary mr-2">1)</span> Eligibility</h3>
        <p>You must be at least 18 years old—or the age of majority in your jurisdiction—to register and use the Services. If you are under 18, a parent or legal guardian must contract the Services on your behalf. You agree to provide accurate, current information during signup and to keep it updated.</p>
        <div className="example-box">
          <strong>Example:</strong> A 17‑year‑old student may have their guardian open the account and manage billing until the student reaches legal age.
        </div>

        <h3><span className="text-primary mr-2">2)</span> Account Registration & Security</h3>
        <p>You are responsible for all activities that occur under your account, including cPanel logins, email setups, and file actions. Use strong, unique passwords and enable 2FA where available. If you suspect unauthorized access, notify support immediately at <a href="mailto:info@snbdhost.com" className="text-primary hover:underline">info@snbdhost.com</a>.</p>
        <div className="example-box">
          <strong>Example:</strong> If someone logs into your cPanel and deletes files using your password, we will help investigate and attempt restoration, but you are responsible for guarding credentials.
        </div>

        <h3><span className="text-primary mr-2">3)</span> Services Offered</h3>
        <p>We provide Shared Hosting, Reseller Hosting, VPS and Dedicated servers, Domain registration, SSL, email hosting, and managed solutions (including n8n automation hosting). Features or catalogs may evolve to improve performance, security, or compliance. We may add or remove features with or without prior notice, but we try to communicate changes that affect you.</p>
        <div className="example-box">
          <strong>Example:</strong> A WordPress site on BDIX‑01 can be moved to HEL‑01 during a capacity upgrade to improve performance. We aim to minimize downtime and give notice for impactful moves.
        </div>

        <h3><span className="text-primary mr-2">4)</span> Plans, Provisioning & cPanel Licensing</h3>
        <p>Shared/reseller plans run on multi‑tenant servers with cPanel/WHM. Licensing is handled by SNBD HOST; you must not attempt to extract, copy, or verify license keys independently. Access is for your workloads only and cannot be resold except via our reseller plans under their own rules.</p>
        <div className="example-box">
          <strong>Example:</strong> You may create cPanel accounts under a reseller plan for your clients, but you cannot redistribute our provider license or attempt to bypass licensing checks.
        </div>

        <h3><span className="text-primary mr-2">5)</span> Billing, Payment & Taxes</h3>
        <p>All Services are billed in advance on a recurring basis (monthly/annual or as selected). Supported methods include bKash, Nagad, Rocket, major cards, and Stripe (where available). You agree to pay all charges by the due date on the invoice. Prices are exclusive of taxes unless noted; payment processors may charge currency or gateway fees.</p>
        <p><strong>Late payment:</strong> If payment is not received by the due date, we may suspend the Service. Reactivation may require full settlement of dues and any applicable reactivation fee.</p>

        <h3><span className="text-primary mr-2">6)</span> Refunds & Cancellations</h3>
        <p>We offer a 3‑day credit‑back guarantee for Shared Hosting only. Not eligible: domain registrations/transfers, SSLs, VPS/dedicated, add‑ons, or accounts flagged for abuse. Request refunds via email within the window; refunds are returned to the original method where possible. Cancel anytime from your client dashboard; service continues until the end of the paid period unless a refund is granted.</p>
        <div className="example-box">
          <strong>Example:</strong> If you purchased Shared Hosting and it does not fit your needs within 3 days, you can switch to other packages or request credit. The domain fee (if any) is non‑refundable and domains remain registered to you.
        </div>

        <h3><span className="text-primary mr-2">7)</span> Acceptable Use Policy (AUP)</h3>
        <p>You may not host or distribute malware, phishing, spam, illegal or obscene content (including content violating Bangladeshi law), incitement to violence, hate speech, or copyright‑infringing materials. Cryptocurrency mining, DDoS tools, traffic generators, or abusive bots are prohibited unless expressly permitted in writing.</p>
        <p><strong>Enforcement:</strong> We may suspend/terminate accounts that violate the AUP without prior notice to protect the platform and other customers.</p>

        <h3><span className="text-primary mr-2">8)</span> Resource Limits & Fair Usage</h3>
        <p>Shared hosting uses pooled resources. To ensure stability, plans include limits on CPU, RAM, processes, I/O, inodes, and database connections. Heavy workloads (e.g., continuous import jobs, video transcodes) may be throttled or asked to migrate to VPS/Dedicated.</p>
        <div className="example-box">
          <strong>Example:</strong> A cron importing 10k products every minute may cause spikes. We can suggest staggering, limiting concurrency, or upgrading to a VPS.
        </div>

        <h3><span className="text-primary mr-2">9)</span> Email & Anti‑Spam</h3>
        <p>Bulk/unsolicited emails are disallowed. Per‑hour/domain limits may apply. SPF, DKIM, and DMARC should be configured for deliverability. If compromised scripts send spam, we may temporarily block sending until the site is cleaned and credentials are rotated.</p>
        <div className="example-box">
          <strong>Example:</strong> A contact form exploit sends thousands of emails. We quarantine the queue and notify you with cleanup instructions.
        </div>

        <h3><span className="text-primary mr-2">10)</span> Data Privacy & Compliance</h3>
        <p>Your data is processed per our Privacy Policy. We align with Bangladesh’s Digital Security Act 2018 and ICT Act 2006 (as amended 2013), and endeavor to support international frameworks like GDPR/CCPA for global users where applicable. We limit internal access to authorized personnel and use data strictly to operate, secure, and improve the Services.</p>

        <h3><span className="text-primary mr-2">11)</span> Data Location, Transfers & Backups</h3>
        <p>Operational data for BD customers may primarily reside on BDIX nodes in Bangladesh, with replicas or off‑site backups in other regions for resilience. Cross‑border transfers may occur for CDN, security filtering, or disaster recovery. Unless stated otherwise, shared hosting includes periodic backups on a best‑effort basis. Backups are not guaranteed; you must maintain your own copies.</p>
        <p><strong>RPO/RTO:</strong> Recovery objectives are best‑effort and depend on incident scope. Always keep critical off‑platform backups.</p>

        <h3><span className="text-primary mr-2">12)</span> Service Availability & SLA</h3>
        <p>We strive for 99.9% monthly uptime. Scheduled maintenance and unforeseen outages may occur. If uptime on a shared node falls below target due to SNBD HOST infrastructure issues, a service credit may be issued on request after verification. Exclusions include force majeure, third‑party failures, customer misconfigurations, and AUP violations.</p>

        <h3><span className="text-primary mr-2">13)</span> Maintenance, Upgrades & Migrations</h3>
        <p>We patch OS, kernels, PHP, MySQL/MariaDB, and cPanel regularly. We may migrate accounts to new hardware/POPs to improve performance and reliability. We try to notify you ahead of impactful actions; emergency work may proceed without prior notice to protect the platform.</p>

        <h3><span className="text-primary mr-2">14)</span> Security, Abuse & Incident Response</h3>
        <p>We implement network/server hardening and monitoring. You are responsible for securing your apps (updates, themes/plugins, passwords). On abuse reports (spam, phishing, malware), we isolate offending content, preserve evidence, notify affected parties, and coordinate remediation.</p>
        <div className="example-box">
          <strong>Example:</strong> After a theme vulnerability is exploited, we quarantine infected files, provide a report, and guide patching steps before re‑enablement.
        </div>

        <h3><span className="text-primary mr-2">15)</span> Software, Licenses & Third‑Party Tools</h3>
        <p>Platform software (cPanel/WHM, LiteSpeed/Apache, CloudLinux, Imunify360, etc.) is licensed to SNBD HOST or vendors. You must not copy, reverse engineer, or redistribute these components. Third‑party apps you install (e.g., WordPress plugins) are your responsibility, including licensing and updates. Nulled/pirated software is forbidden.</p>

        <h3><span className="text-primary mr-2">16)</span> Domains, DNS & WHOIS Accuracy</h3>
        <p>Domain registrations are subject to registry/ICANN policies. Keep WHOIS info accurate and updated. DNS changes can take time to propagate. Chargebacks on domain orders can result in lock/redemption fees before release.</p>
        <div className="example-box">
          <strong>Example:</strong> If you mistype nameservers and your site goes down, SLA credits do not apply because the outage stems from configuration, not infrastructure.
        </div>

        <h3><span className="text-primary mr-2">17)</span> Support Scope & Responsibilities</h3>
        <p>We cover platform availability (servers, control panel, mail transport, DNS hosted with us). Application‑level issues (site code, custom plugins) receive best‑effort guidance and logs, but we do not rewrite or maintain custom code unless you purchase a managed add‑on.</p>

        <h3><span className="text-primary mr-2">18)</span> Content Ownership, IP & Notice‑Takedown</h3>
        <p>You retain ownership of your content. You grant us a limited license to store, transmit, and back up your content solely to provide the Services. We respond to bona fide copyright notices and lawful content complaints. Repeat infringement may lead to suspension or termination.</p>

        <h3><span className="text-primary mr-2">19)</span> Suspension & Termination</h3>
        <p>We may suspend or terminate Services for non‑payment, abuse, legal violations, or activity harming SNBD HOST systems or customers. We strive to notify you via email/dashboards, except in urgent cases. Reinstatement is at our discretion once issues are resolved.</p>

        <h3><span className="text-primary mr-2">20)</span> Data Portability & Account Closure</h3>
        <p>You can export files/databases and generate full cPanel backups for migration. After cancellation, we may delete data following a short retention window. Keep your own off‑platform copies before closing the account. Minimal billing/security logs may be retained to comply with the law.</p>

        <h3><span className="text-primary mr-2">21)</span> Warranties & Disclaimers</h3>
        <p>Services are provided “as is” and “as available.” We disclaim implied warranties, including merchantability, fitness for a particular purpose, and non‑infringement, to the maximum extent allowed by law.</p>
        <div className="example-box">
          <strong>Example:</strong> We cannot guarantee that a specific plugin/theme will be compatible with a given PHP version on your site.
        </div>

        <h3><span className="text-primary mr-2">22)</span> Limitation of Liability</h3>
        <p>SNBD HOST is not liable for indirect, incidental, special, consequential, exemplary, or punitive damages, including lost profits or data. Our total liability for any claims in a three‑month period is limited to the amount you paid us for the affected Service during that period.</p>

        <h3><span className="text-primary mr-2">23)</span> Indemnification</h3>
        <p>You agree to indemnify and hold harmless SNBD HOST, its affiliates, officers, employees, and agents against claims, damages, liabilities, costs, and expenses arising from your use of the Services, your content, or your violation of these Terms or applicable law.</p>

        <h3><span className="text-primary mr-2">24)</span> Changes to Terms</h3>
        <p>We may update these Terms at any time. We will notify users via email and/or dashboard when material changes occur. Continued use of the Services after changes become effective means you accept the updated Terms.</p>

        <h3><span className="text-primary mr-2">25)</span> Governing Law & Dispute Resolution</h3>
        <p>These Terms are governed by the laws of the People’s Republic of Bangladesh. Exclusive jurisdiction and venue lie with the courts of Dhaka, Bangladesh. Before litigation, both parties will attempt good‑faith resolution via our support channels.</p>
        
        <p className="mt-8">If you have any questions, please contact <a href="mailto:info@snbdhost.com" className="text-primary hover:underline font-semibold">info@snbdhost.com</a>.</p>
      </div>

    </div>
  </div>
</main>

{/* ========== FOOTER ========== */}

    </>
  )
}
