import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import FunnelBuilder from '../components/FunnelBuilder';

const FunnelBuilderPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/ai-sales-funnel-builder" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Funnel Builder Overview
        </Link>
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Filter size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">AI Funnel Builder</h1>
          <p className="text-xl text-slate-600">
            Generate a complete, high-converting sales funnel in seconds. Answer a few simple questions and let our AI architect your path to profit.
          </p>
        </div>

        <FunnelBuilder />
      </div>
    </div>
  );
};

export default FunnelBuilderPage;
