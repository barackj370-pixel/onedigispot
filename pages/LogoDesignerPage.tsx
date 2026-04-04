import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import LogoGenerator from '../components/LogoGenerator';

const LogoDesignerPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/free-ai-logo-maker" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Logo Maker Overview
        </Link>
      </div>
      <LogoGenerator />
    </div>
  );
};

export default LogoDesignerPage;
