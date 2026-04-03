import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Hosting from './pages/Hosting';
import Domain from './pages/Domain';
import VPSServer from './pages/VPSServer';
import BDIXServers from './pages/BDIXServers';
import OpenClaw from './pages/OpenClaw';
import N8NAutomation from './pages/N8NAutomation';
import Offers from './pages/Offers';
import Support from './pages/Support';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hosting" element={<Hosting />} />
            <Route path="/domain" element={<Domain />} />
            <Route path="/vps-server" element={<VPSServer />} />
            <Route path="/bdix-servers" element={<BDIXServers />} />
            <Route path="/openclaw" element={<OpenClaw />} />
            <Route path="/n8n-automation" element={<N8NAutomation />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/support" element={<Support />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
