import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SocialMediaAI from '../components/SocialMediaAI';

const SocialMediaAIPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/social-media-ai-post-master" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Social Media AI Post Master Overview
        </Link>
      </div>
      <SocialMediaAI />
    </div>
  );
};

export default SocialMediaAIPage;
