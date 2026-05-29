import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import JsonLd from './components/JsonLd';
import { organizationSchema } from './seo/pageMeta';
import { FloatingWhatsApp } from '@carlos8a/react-whatsapp-floating-button';

// Pages
import Home from './pages/Home';
import Hosting from './pages/Hosting';
import ResellerHosting from './pages/ResellerHosting';
import Domain from './pages/Domain';
import VPSServer from './pages/VPSServer';
import BDIXServers from './pages/BDIXServers';
import OpenClaw from './pages/OpenClaw';
import N8NAutomation from './pages/N8NAutomation';
import Offers from './pages/Offers';
import Support from './pages/Support';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import DevUpdates from './pages/DevUpdates';

// Blog
import BlogList from './pages/blog/BlogList';
import BlogPost from './pages/blog/BlogPost';

// Admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import PostEditor from './pages/admin/PostEditor';
import SeoChecklist from './pages/admin/SeoChecklist';
import MarketingTools from './pages/admin/MarketingTools';
import VersionControl from './pages/admin/VersionControl';
import ProtectedRoute from './pages/admin/ProtectedRoute';

// Knowledge Base Plugin Pages
import KnowledgeBase from './pages/KnowledgeBase';
import KnowledgeBaseAdmin from './pages/admin/KnowledgeBaseAdmin';

function App() {
  return (
    <HelmetProvider>
      <JsonLd data={organizationSchema} />
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hosting" element={<Hosting />} />
              <Route path="/reseller-hosting" element={<ResellerHosting />} />
              <Route path="/domain" element={<Domain />} />
              <Route path="/vps-server" element={<VPSServer />} />
              <Route path="/bdix-servers" element={<BDIXServers />} />
              <Route path="/openclaw" element={<OpenClaw />} />
              <Route path="/n8n-automation" element={<N8NAutomation />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/support" element={<Support />} />
              <Route path="/support/kb" element={<KnowledgeBase />} />
              <Route path="/support/kb/:slug" element={<KnowledgeBase />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/dev-updates" element={<DevUpdates />} />

              {/* Blog */}
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />

              {/* Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/posts/new"
                element={
                  <ProtectedRoute>
                    <PostEditor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/posts/:id/edit"
                element={
                  <ProtectedRoute>
                    <PostEditor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/seo-checklist"
                element={
                  <ProtectedRoute>
                    <SeoChecklist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/marketing"
                element={
                  <ProtectedRoute>
                    <MarketingTools />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/versions"
                element={
                  <ProtectedRoute>
                    <VersionControl />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/plugins/knowledge-base"
                element={
                  <ProtectedRoute>
                    <KnowledgeBaseAdmin />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />

          <FloatingWhatsApp
            phoneNumber='8801841528073'
            accountName='SNBD HOST Support'
            avatar='/logo.png'
            initialMessageByServer='Hi there! How can we help you today?'
            initialMessageByClient='Hello! I need some help with SNBD HOST services.'
            statusMessage='Typically replies instantly'
            startChatText='Start chat with us'
            tooltipText='Need help? Click to chat!'
            allowEsc={true}
            allowClickAway={true}
          />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
