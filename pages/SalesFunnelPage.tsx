import React from 'react';
import { Link } from 'react-router-dom';

const SalesFunnelPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-6 font-heading">Sales Funnel Design</h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="lead text-xl text-slate-700 mb-8">
              Strategic sales funnels engineered to convert visitors into loyal customers through optimized user journeys.
            </p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Mastering the Conversion Journey</h2>
            <p className="mb-6">
              A website alone isn't enough to generate consistent revenue. You need a structured pathway that guides prospects seamlessly from first touch to final purchase. We design and build high-converting sales funnels that maximize your ROI.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Our Funnel Services:</h3>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Lead Generation Funnels:</strong> Capture high-quality prospects with irresistible offers.</li>
              <li><strong>Webinar & Event Funnels:</strong> Drive registrations and attendee engagement.</li>
              <li><strong>E-commerce Sales Funnels:</strong> Reduce cart abandonment and increase average order value.</li>
              <li><strong>High-Ticket Application Funnels:</strong> Qualify leads for premium services or consulting.</li>
              <li><strong>A/B Testing & Optimization:</strong> Continuous improvements to conversion rates at every step.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Psychology Meets Technology</h2>
            <p className="mb-6">
              Our funnels are built on a deep understanding of consumer psychology. We combine compelling direct-response copywriting with frictionless technical execution to create pathways that your users want to travel.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Start maximizing your conversions</h3>
              <Link to="/#contact" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg">
                Build Your Funnel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesFunnelPage;
