import React from 'react';
import SEOHead from '../components/SEOHead';

export default function DevUpdates() {
  const meta = {
    title: 'SNBD HOST | Developer Updates & Changelog',
    description: 'Keep track of the latest features, bug fixes, and improvements made to the SNBD HOST platform.',
    url: 'https://snbdhost.com/dev-updates',
  };

  const updates = [
    {
      version: 'v3.5.0 (Client Portal / WHMCS)',
      date: 'May 2026',
      type: 'Major Update',
      highlights: [
        'Fixed the blank password reset page caused by a z-index conflict with the particles.js canvas.',
        'Added missing .auth-page flex-alignment override in legacy pwreset.tpl.',
        'Launched public Developer Updates page (Changelog v3.0 to v3.5) on the client portal.',
        'Updated dashboard announcement banner to reflect the v3.5 release and link to changelog.',
      ]
    },
    {
      version: 'Website v1.2.0 (SNBD React)',
      date: 'May 2026',
      type: 'Feature & SEO',
      highlights: [
        'Implemented SEO and Marketing Checklists in the admin panel.',
        'Fixed FAQPage schema validation issues on /bdix-servers.',
        'Resolved em-dash parsing issue in FAQ schema on /n8n-automation.',
        'Launched unified Developer Updates page combining website and portal changelogs.'
      ]
    }
  ];

  return (
    <>
      <SEOHead {...meta} />
      
      {/* HERO */}
      <section className="bg-white pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            🛠️ Developer Changelog
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
            Platform <span className="text-[var(--brand-red)]">Updates</span>
          </h1>
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
            We are constantly improving SNBD HOST. Here is a timeline of our latest features, fixes, and architectural updates across our Main Website and Client Portal.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section-subtle py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {updates.map((update, idx) => (
              <div key={idx} className="relative pl-8 sm:pl-32 py-6 group">
                {/* Timeline line */}
                <div className="absolute left-4 sm:left-28 top-0 bottom-0 w-0.5 bg-gray-200 group-last:bg-transparent"></div>
                
                {/* Timeline dot */}
                <div className="absolute left-4 sm:left-28 top-10 w-4 h-4 rounded-full bg-brand-red border-4 border-red-100 -translate-x-[7px]"></div>
                
                {/* Date for desktop */}
                <div className="hidden sm:block absolute left-0 top-9 w-20 text-right">
                  <span className="text-sm font-bold text-gray-500">{update.date}</span>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 hover:shadow-lg hover:border-red-100 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="sm:hidden text-xs font-bold text-brand-red mb-1">{update.date}</div>
                      <h3 className="text-2xl font-bold text-gray-900">{update.version}</h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                      {update.type === 'Major Update' ? <i className="fa-solid fa-rocket text-brand-red"></i> : <i className="fa-solid fa-wrench text-gray-500"></i>}
                      {update.type}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {update.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center mt-0.5">
                          <i className="fa-solid fa-check text-brand-red text-[10px]"></i>
                        </div>
                        <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-red py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Experiencing an issue?</h2>
          <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">
            Our support team is available 24/7. If you've found a bug that isn't listed here, please let us know.
          </p>
          <a href="https://portal.snbdhost.com/submitticket.php" className="inline-flex items-center gap-2 bg-[#FFFFFF] text-[var(--brand-red)] font-bold text-base px-8 py-4 rounded-xl hover:bg-red-50 transition-colors shadow-lg">
            <i className="fa-solid fa-life-ring text-sm"></i>
            Open a Ticket
          </a>
        </div>
      </section>
    </>
  );
}
