import React from 'react';
import { Link } from 'react-router-dom';

const WebDevelopmentPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-6 font-heading">Web Development</h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="lead text-xl text-slate-700 mb-8">
              Creating stunning, responsive, and high-converting websites that elevate your brand's digital presence.
            </p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Digital Experiences that Convert</h2>
            <p className="mb-6">
              Your website is often the first interaction a customer has with your brand. We build websites that are not only visually striking but also optimized for performance, accessibility, and search engines.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Our Web Development Services:</h3>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Corporate Websites:</strong> Professional, brand-aligned sites that establish credibility.</li>
              <li><strong>E-Commerce Solutions:</strong> Secure, scalable online stores optimized for sales.</li>
              <li><strong>Web Applications:</strong> Interactive, dynamic web apps built with modern frameworks like React and Vue.</li>
              <li><strong>CMS Development:</strong> Custom WordPress, Webflow, and headless CMS implementations.</li>
              <li><strong>Landing Pages:</strong> High-converting pages designed specifically for marketing campaigns.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The Onedigispot Advantage</h2>
            <p className="mb-6">
              We combine cutting-edge web technologies with deep understanding of user behavior. Every site we build is mobile-first, lightning-fast, and built to scale as your business grows.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Let's build your digital home</h3>
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

export default WebDevelopmentPage;
