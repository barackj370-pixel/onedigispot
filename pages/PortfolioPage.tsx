import React from 'react';
import { Link } from 'react-router-dom';

const PortfolioPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-6 font-heading">Our Portfolio</h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="lead text-xl text-slate-700 mb-8">
              A showcase of our best work, highlighting the innovative solutions we've built for our clients.
            </p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Featured Projects</h2>
            <p className="mb-6">
              We've had the privilege of working with a diverse range of clients, from ambitious startups to established enterprises. Here are a few examples of how we've helped them achieve their digital goals.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 mb-8">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-2">E-Commerce Platform Redesign</h3>
                <p className="text-sm text-indigo-600 font-semibold mb-3">UI/UX Design & Web Development</p>
                <p className="text-slate-600 text-sm">A complete overhaul of a legacy e-commerce site, resulting in a 40% increase in conversion rates and a significantly improved user experience.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Fintech Mobile App</h3>
                <p className="text-sm text-indigo-600 font-semibold mb-3">Custom App Development</p>
                <p className="text-slate-600 text-sm">A secure, high-performance mobile application for a growing fintech startup, featuring real-time transactions and biometric authentication.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Corporate Intranet Portal</h3>
                <p className="text-sm text-indigo-600 font-semibold mb-3">Enterprise Software</p>
                <p className="text-slate-600 text-sm">A centralized hub for a multinational corporation, streamlining internal communication and document management for over 5,000 employees.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-2">AI-Powered Marketing Tool</h3>
                <p className="text-sm text-indigo-600 font-semibold mb-3">Digital Strategy & Development</p>
                <p className="text-slate-600 text-sm">A SaaS platform leveraging machine learning to automate marketing campaigns, reducing customer acquisition costs by 25%.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Our Impact</h2>
            <p className="mb-6">
              Our work spans across various industries, including finance, healthcare, retail, and education. We pride ourselves on delivering solutions that not only look great but also drive measurable business results.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Ready to be our next success story?</h3>
              <Link to="/#contact" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg">
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
