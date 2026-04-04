import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ContentGenerator from '../components/ContentGenerator';

const ContentGeneratorPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/free-ai-content-writer" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Content Writer Overview
        </Link>
      </div>
      <ContentGenerator />
    </div>
  );
};

export default ContentGeneratorPage;
