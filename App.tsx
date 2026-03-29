
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SpotAssistant from './components/SpotAssistant';
import Footer from './components/Footer';
import Home from './pages/Home';
import ToolsPage from './pages/ToolsPage';
import LogoDesignerPage from './pages/LogoDesignerPage';
import SocialMediaAIPage from './pages/SocialMediaAIPage';
import KeywordGeneratorPage from './pages/KeywordGeneratorPage';
import ContentGeneratorPage from './pages/ContentGeneratorPage';
import FunnelBuilderPage from './pages/FunnelBuilderPage';
import PublishedFunnel from './pages/PublishedFunnel';

// New Pages
import CustomAppDevPage from './pages/CustomAppDevPage';
import WebDevelopmentPage from './pages/WebDevelopmentPage';
import DigitalStrategyPage from './pages/DigitalStrategyPage';
import UIUXDesignPage from './pages/UIUXDesignPage';
import AboutUsPage from './pages/AboutUsPage';
import PortfolioPage from './pages/PortfolioPage';
import CareersPage from './pages/CareersPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/tools/logo-designer" element={<LogoDesignerPage />} />
            <Route path="/tools/social-media-ai" element={<SocialMediaAIPage />} />
            <Route path="/tools/keyword-generator" element={<KeywordGeneratorPage />} />
            <Route path="/tools/content-generator" element={<ContentGeneratorPage />} />
            <Route path="/tools/funnel-builder" element={<FunnelBuilderPage />} />
            <Route path="/f/:slug" element={<PublishedFunnel />} />
            
            {/* Services Routes */}
            <Route path="/services/custom-app-development" element={<CustomAppDevPage />} />
            <Route path="/services/web-development" element={<WebDevelopmentPage />} />
            <Route path="/services/digital-strategy" element={<DigitalStrategyPage />} />
            <Route path="/services/ui-ux-design" element={<UIUXDesignPage />} />

            {/* Company Routes */}
            <Route path="/company/about-us" element={<AboutUsPage />} />
            <Route path="/company/portfolio" element={<PortfolioPage />} />
            <Route path="/company/careers" element={<CareersPage />} />
            <Route path="/company/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/company/terms-of-service" element={<TermsOfServicePage />} />
          </Routes>
        </main>

        <Footer />
        <SpotAssistant />
      </div>
    </Router>
  );
}

export default App;
