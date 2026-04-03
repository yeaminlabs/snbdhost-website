export default function Privacy() {
  return (
    <>


{/* ========== HEADER ========== */}
<div className="bg-gradient-to-br from-white via-brand-redPale to-white border-b border-gray-200 relative overflow-hidden py-16 md:py-20">
  <div className="absolute inset-0 opacity-5" style={{"backgroundImage":"radial-gradient(circle at 2px 2px, #CC0000 1px, transparent 0)","backgroundSize":"40px 40px"}}></div>
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none" style={{"background":"rgba(204,0,0,0.1)","filter":"blur(80px)"}}></div>
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
    <div className="inline-flex items-center gap-1.5 bg-brand-redSoft text-brand-red text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-brand-redSoft mb-4 mb-6">
      🔐 Data Protection
    </div>
    <h1 className="text-3xl md:text-5xl font-extrabold text-text-primary tracking-tight leading-snug mb-4">Privacy &amp; Protection</h1>
    <p className="text-lg text-text-secondary leading-relaxed max-w-lg mx-auto">Uncompromising security for your digital assets.</p>
  </div>
</div>

{/* ========== MAIN CONTENT ========== */}
<main className="flex-grow py-12" style={{"background":"#F8F9FB"}}>
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div className="rounded-2xl p-8 sm:p-12" style={{"background":"#FFFFFF","border":"1px solid #E5E7EB"}}>
      
      <div className="prose max-w-none legal-content">
        <div className="highlight-box shadow-sm">
          <p className="text-lg flex items-center gap-3">
            <i className="fa-solid fa-shield-halved text-2xl" style={{"color":"var(--brand-red-bright)"}}></i>
            <span><strong>Our Commitment:</strong> Your data is protected by industry-leading, state-of-the-art security measures. SNBD HOST fully complies with GDPR, CCPA, and strict international data protection protocols.</span>
          </p>
        </div>

        <p className="text-lg" style={{"color":"#555555"}}>
          At SNBD HOST, we consider the privacy and security of your digital footprint to be our highest priority. This Privacy &amp; Data Protection Policy outlines how we safeguard the information entrusted to us, ensuring complete transparency while establishing that your infrastructure is highly secure, continuously monitored, and protected against unauthorized intrusion.
        </p>

        <h3><span style={{"color":"var(--brand-red-bright)"}} className="mr-2">1.</span> Information We Collect</h3>
        <p>To provide you with enterprise-grade hosting services, we collect necessary account and technical data. This includes:</p>
        <ul>
          <li><strong>Account &amp; Billing Information:</strong> Your name, email address, physical address, and required payment processing information to maintain your active subscriptions.</li>
          <li><strong>Technical Infrastructure Data:</strong> IP addresses, browser types, server logs, network telemetry, and authentication records necessary for the continuous operation and security of our nodes.</li>
          <li><strong>Communication Records:</strong> Transcripts of live chats, support tickets, and direct email correspondence used exclusively to provide customer service resolutions.</li>
        </ul>

        <h3><span style={{"color":"var(--brand-red-bright)"}} className="mr-2">2.</span> How We Protect Your Data</h3>
        <p>SNBD HOST utilizes military-grade encryption regimens, highly resilient firewalls, and isolated CloudLinux environments. All personal and financial payloads are transmitted securely via TLS 1.3 cryptographic protocols. We implement rigorous access controls, meaning our internal engineering and support staff only have access to the absolute minimum data required to assist you or maintain network stability.</p>

        <h3><span style={{"color":"var(--brand-red-bright)"}} className="mr-2">3.</span> How We Utilize Information for Platform Evolution</h3>
        <p>The primary purpose of collecting information is to provision, secure, and deliver your web hosting services effectively. By operating on SNBD HOST systems, we process technical payloads to ensure 99.9% uptime and mitigate DDoS attacks.</p>
        <p>Furthermore, in our pursuit of developing next-generation hosting technologies, SNBD HOST responsibly utilizes aggregated customer metrics and server telemetry to train and enhance our internal machine learning algorithms. This allows us to intelligently improve routing and optimize our platform performance.</p>

        <h3><span style={{"color":"var(--brand-red-bright)"}} className="mr-2">4.</span> Third-Party Data Sharing &amp; Non-Sale Policy</h3>
        <p><strong>SNBD HOST does not, and will never, sell your personal data to third-party data brokers, marketing lists, or external advertisers.</strong></p>
        <p>However, to facilitate a global, high-performance hosting architecture, we are required to securely share specific functional data with trusted third-party sub-processors. These encompass our payment gateways (e.g., Stripe), domain registrars (ICANN compliance), cybersecurity scanning vendors (e.g., Imunify360), and edge CDN providers.</p>

        <h3><span style={{"color":"var(--brand-red-bright)"}} className="mr-2">5.</span> Global Compliance: GDPR, CCPA &amp; Data Rights</h3>
        <p>Yes, we are globally compliant. Your digital sovereignty is guaranteed regardless of your jurisdiction. Under international frameworks such as the GDPR and CCPA, you retain full rights over your personal data.</p>
        <ul>
          <li><strong>Right to Access:</strong> You may request a comprehensive export of all personal data tied to your SNBD HOST account.</li>
          <li><strong>Right to Rectification:</strong> You may correct or amend inaccurate details within your client portal instantly.</li>
          <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> You may request the absolute deletion of your account and associated personal data, provided there are no pending invoices or outstanding legal hold requirements.</li>
        </ul>

        <h3><span style={{"color":"var(--brand-red-bright)"}} className="mr-2">6.</span> Cookie Policy &amp; Tracking Technologies</h3>
        <p>We utilize first-party cookies to authenticate your session within our client area and to prevent Cross-Site Request Forgery (CSRF) attacks. We additionally deploy analytical tracking to understand aggregated user behavior across our marketing assets. You may configure your browser to reject non-essential tracking cookies at any time.</p>

        <h3><span style={{"color":"var(--brand-red-bright)"}} className="mr-2">7.</span> Policy Modifications</h3>
        <p>We continuously review and strengthen this policy as global cybersecurity landscapes and legal frameworks evolve. We will notify you via your registered email address of any material changes that affect your specific rights or the way we process critical data.</p>
        
        <p className="mt-8 pt-6" style={{"borderTop":"1px solid #E5E7EB"}}>If you wish to invoke any of your global data rights, or if you require immediate clarification from our Data Protection Officer, please contact <a href="mailto:privacy@snbdhost.com">privacy@snbdhost.com</a>.</p>
      </div>

    </div>
  </div>
</main>

{/* ========== FOOTER ========== */}

    </>
  )
}
