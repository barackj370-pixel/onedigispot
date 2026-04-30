import React from 'react';
import { Link } from 'react-router-dom';

const DatabaseDesignPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-6 font-heading">Database Design & Integration</h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="lead text-xl text-slate-700 mb-8">
              Designing and integrating robust, scalable, and secure databases tailored for your enterprise needs.
            </p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The Foundation of Your Digital Infrastructure</h2>
            <p className="mb-6">
              A performant application requires a rock-solid data foundation. We architect database solutions that ensure high availability, data integrity, and lightning-fast query speeds—no matter the scale of your operations.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Our Database Services:</h3>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Schema Architecture & Modeling:</strong> Designing efficient relational (SQL) and NoSQL structures.</li>
              <li><strong>API & Systems Integration:</strong> Seamlessly connecting disparate data sources across your organization.</li>
              <li><strong>Cloud Database Migration:</strong> Safely moving legacy data to AWS RDS, Google Cloud SQL, or managed NoSQL platforms.</li>
              <li><strong>Performance Tuning:</strong> Optimizing indexes, queries, and caching layers to accelerate data retrieval.</li>
              <li><strong>Data Security & Compliance:</strong> Implementing encryption, strict access controls, and automated backup protocols.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Scalability from Day One</h2>
            <p className="mb-6">
              We don't just build for what you need today. Our forward-thinking database designs anticipate your future data volume and complexity, ensuring your systems won't crack under the pressure of business growth.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Need a robust data strategy?</h3>
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

export default DatabaseDesignPage;
