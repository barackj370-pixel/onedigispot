import React from 'react';
import { Link } from 'react-router-dom';
import { InlineWidget } from 'react-calendly';

const ThankYouPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">
          ✓
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">You're almost there!</h1>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
          We've received your request. Please select a time below for our discovery call so we can learn more about your project.
        </p>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 h-[700px]">
          {/* Replace this URL with your actual Calendly link */}
          <InlineWidget 
            url="https://calendly.com/onedigispot" 
            styles={{ height: '100%', width: '100%' }} 
          />
        </div>

        <div className="mt-12">
          <Link to="/" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
