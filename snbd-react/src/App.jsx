import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import JsonLd from './components/JsonLd';
import { organizationSchema } from './seo/pageMeta';

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

// Blog
import BlogList from './pages/blog/BlogList';
import BlogPost from './pages/blog/BlogPost';

// Admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import PostEditor from './pages/admin/PostEditor';
import ProtectedRoute from './pages/admin/ProtectedRoute';

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
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />

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
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
