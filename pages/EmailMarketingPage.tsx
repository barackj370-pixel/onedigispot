import React from 'react';
import { Link } from 'react-router-dom';

const EmailMarketingPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-6 font-heading">Email Marketing</h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="lead text-xl text-slate-700 mb-8">
              Automated, high-conversion email campaigns that nurture leads and build lasting customer relationships.
            </p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Direct Connection to Your Audience</h2>
            <p className="mb-6">
              Email remains one of the most effective channels for acquiring and retaining customers. We craft personalized, data-driven email strategies tailored to engage your audience and drive meaningful action.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Our Email Marketing Solutions:</h3>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Campaign Strategy:</strong> Aligning emails with your broader marketing objectives.</li>
              <li><strong>Automated Workflows:</strong> Drip campaigns, welcome series, and abandoned cart recoveries.</li>
              <li><strong>List Segmentation:</strong> Delivering the right message to the right person.</li>
              <li><strong>Creative Design & Copywriting:</strong> Compelling emails that stand out in crowded inboxes.</li>
              <li><strong>Performance Analytics:</strong> Tracking open rates, click-throughs, and conversions to optimize results.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The Power of Automation</h2>
            <p className="mb-6">
              By utilizing advanced automation tools, we ensure that your marketing operates efficiently around the clock. Engage leads exactly when they are most receptive without manual intervention.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Ready to reach the inbox?</h3>
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

export default EmailMarketingPage;
