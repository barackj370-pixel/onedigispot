
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
          </Routes>
        </main>

        <Footer />
        <SpotAssistant />
      </div>
    </Router>
  );
}

export default App;
