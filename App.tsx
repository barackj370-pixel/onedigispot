
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/SiteNav';
import SpotAssistant from './components/SpotAssistant';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ToolsPage from './pages/ToolsPage';

// Tool Apps
import LogoDesignerPage from './pages/LogoDesignerPage';
import SocialMediaAIPage from './pages/SocialMediaAIPage';
import KeywordGeneratorPage from './pages/KeywordGeneratorPage';
import ContentGeneratorPage from './pages/ContentGeneratorPage';
import FunnelBuilderPage from './pages/FunnelBuilderPage';
import PublishedFunnel from './pages/PublishedFunnel';

// Tool Landing Pages
import LogoMakerLanding from './pages/landing/LogoMakerLanding';
import KeywordGeneratorLanding from './pages/landing/KeywordGeneratorLanding';
import ContentWriterLanding from './pages/landing/ContentWriterLanding';
import SocialMediaAILanding from './pages/landing/SocialMediaAILanding';
import FunnelBuilderLanding from './pages/landing/FunnelBuilderLanding';

import ScreenRecorderLanding from './pages/landing/ScreenRecorderLanding';
import BusinessCardLanding from './pages/landing/BusinessCardLanding';
import ScreenRecorderPage from './pages/ScreenRecorderPage';
import BusinessCardGeneratorPage from './pages/BusinessCardGeneratorPage';

// New Pages
import CustomAppDevPage from './pages/CustomAppDevPage';
import WebDevelopmentPage from './pages/WebDevelopmentPage';
import DigitalStrategyPage from './pages/DigitalStrategyPage';
import UIUXDesignPage from './pages/UIUXDesignPage';
import SEOPage from './pages/SEOPage';
import EmailMarketingPage from './pages/EmailMarketingPage';
import SalesFunnelPage from './pages/SalesFunnelPage';
import AIIntegrationPage from './pages/AIIntegrationPage';
import DatabaseDesignPage from './pages/DatabaseDesignPage';
import AboutUsPage from './pages/AboutUsPage';
import PortfolioPage from './pages/PortfolioPage';
import CareersPage from './pages/CareersPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import ThankYouPage from './pages/ThankYouPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';

import CampaignsPage from './pages/email/CampaignsPage';
import CampaignBuilderPage from './pages/email/CampaignBuilderPage';
import NewslettersPage from './pages/email/NewslettersPage';
import StatisticsPage from './pages/email/StatisticsPage';
import SettingsPage from './pages/email/SettingsPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            
            {/* SEO Landing Pages */}
            <Route path="/free-ai-logo-maker" element={<LogoMakerLanding />} />
            <Route path="/free-seo-keyword-generator" element={<KeywordGeneratorLanding />} />
            <Route path="/free-ai-content-writer" element={<ContentWriterLanding />} />
            <Route path="/social-media-ai-post-master" element={<SocialMediaAILanding />} />
            <Route path="/ai-sales-funnel-builder" element={<FunnelBuilderLanding />} />

            <Route path="/free-screen-recorder" element={<ScreenRecorderLanding />} />
            <Route path="/free-digital-business-card-generator" element={<BusinessCardLanding />} />

            {/* Actual Tool Apps */}
            <Route path="/app/logo-maker" element={<LogoDesignerPage />} />
            <Route path="/app/screen-recorder" element={<ScreenRecorderPage />} />
            <Route path="/app/business-card-generator" element={<BusinessCardGeneratorPage />} />
            <Route path="/app/social-media-ai-post-master" element={<SocialMediaAIPage />} />
            <Route path="/app/keyword-generator" element={<KeywordGeneratorPage />} />
            <Route path="/app/content-writer" element={<ContentGeneratorPage />} />
            <Route path="/app/funnel-builder" element={<FunnelBuilderPage />} />

            {/* Email Marketing System */}
            <Route path="/app/email-marketing/campaigns" element={<CampaignsPage />} />
            <Route path="/app/email-marketing/campaigns/new" element={<CampaignBuilderPage />} />
            <Route path="/app/email-marketing/campaigns/:id" element={<CampaignBuilderPage />} />
            <Route path="/app/email-marketing/newsletters" element={<NewslettersPage />} />
            <Route path="/app/email-marketing/statistics" element={<StatisticsPage />} />
            <Route path="/app/email-marketing/settings" element={<SettingsPage />} />
            
            <Route path="/f/:slug" element={<PublishedFunnel />} />
            
            {/* Services Routes */}
            <Route path="/services/custom-app-development" element={<CustomAppDevPage />} />
            <Route path="/services/web-development" element={<WebDevelopmentPage />} />
            <Route path="/services/digital-strategy" element={<DigitalStrategyPage />} />
            <Route path="/services/ui-ux-design" element={<UIUXDesignPage />} />
            <Route path="/services/seo" element={<SEOPage />} />
            <Route path="/services/email-marketing" element={<EmailMarketingPage />} />
            <Route path="/services/sales-funnel" element={<SalesFunnelPage />} />
            <Route path="/services/ai-integration" element={<AIIntegrationPage />} />
            <Route path="/services/database-design" element={<DatabaseDesignPage />} />

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
