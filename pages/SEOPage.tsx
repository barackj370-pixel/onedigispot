import React from 'react';
import { Link } from 'react-router-dom';

const SEOPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-6 font-heading">Search Engine Optimization</h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="lead text-xl text-slate-700 mb-8">
              Data-driven SEO strategies to boost your global search rankings and drive organic traffic to your business.
            </p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Rank Higher, Grow Faster</h2>
            <p className="mb-6">
              Visibility is everything. Our SEO services ensure that your prospective customers find you exactly when they need you. We employ ethical, white-hat techniques to sustainably increase your search engine rankings and organic engagement.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Our SEO Services:</h3>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Comprehensive Audits:</strong> Identifying technical bottlenecks and growth opportunities.</li>
              <li><strong>On-Page Optimization:</strong> Enhancing code, content, and structure for search engines.</li>
              <li><strong>Content Strategy & Keyword Research:</strong> Targeting high-value terms that your audience is searching for.</li>
              <li><strong>Link Building:</strong> Acquiring high-quality backlinks to build domain authority.</li>
              <li><strong>Local SEO:</strong> Dominating search results in your specific geographic area.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Our Approach</h2>
            <p className="mb-6">
              SEO is a marathon, not a sprint. We focus on long-term, sustainable strategies that outlast algorithm updates. Through constant monitoring, data analysis, and technical refinements, we build an organic growth engine for your brand.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Start climbing the search results</h3>
              <a href="/#contact" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg">
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOPage;
