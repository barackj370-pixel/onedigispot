import React from 'react';
import { Link } from 'react-router-dom';

const AboutUsPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-6 font-heading">About Onedigispot</h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="lead text-xl text-slate-700 mb-8">
              We are a collective of digital innovators, strategists, and creators based in Kenya, building world-class solutions for a global audience.
            </p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Our Story</h2>
            <p className="mb-6">
              Founded with the vision of bridging the gap between complex technology and business needs, Onedigispot has grown into a premier digital innovation hub. We started as a small team of passionate developers and have evolved into a full-service agency that tackles the most challenging digital problems.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Our Core Values:</h3>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Innovation:</strong> We constantly push the boundaries of what's possible with technology.</li>
              <li><strong>Excellence:</strong> We are committed to delivering the highest quality in everything we do.</li>
              <li><strong>Collaboration:</strong> We work closely with our clients, treating their business as our own.</li>
              <li><strong>Integrity:</strong> We believe in transparent communication and honest partnerships.</li>
              <li><strong>Impact:</strong> We measure our success by the positive impact our solutions have on our clients' businesses.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Our Mission</h2>
            <p className="mb-6">
              To empower organizations with transformative digital solutions that drive growth, efficiency, and competitive advantage in an increasingly digital world.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Want to know more?</h3>
              <Link to="/#contact" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg">
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
