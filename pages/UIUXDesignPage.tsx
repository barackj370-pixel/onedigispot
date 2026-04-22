import React from 'react';
import { Link } from 'react-router-dom';

const UIUXDesignPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-6 font-heading">UI/UX Design</h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="lead text-xl text-slate-700 mb-8">
              Crafting intuitive, engaging, and beautiful digital experiences that users love.
            </p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Design that Works</h2>
            <p className="mb-6">
              Great design is more than just aesthetics; it's about how a product works. Our UI/UX design process focuses on understanding user needs, reducing friction, and creating seamless journeys that drive engagement and conversion.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Our Design Capabilities:</h3>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>User Research:</strong> Understanding your users through interviews, surveys, and testing.</li>
              <li><strong>Wireframing & Prototyping:</strong> Rapidly iterating on concepts before writing code.</li>
              <li><strong>User Interface (UI) Design:</strong> Creating visually stunning, brand-aligned interfaces.</li>
              <li><strong>User Experience (UX) Design:</strong> Mapping out logical, intuitive user flows.</li>
              <li><strong>Design Systems:</strong> Building scalable component libraries for consistent branding.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The User-Centric Approach</h2>
            <p className="mb-6">
              We believe in designing with empathy. By putting the user at the center of our design process, we create products that are not only beautiful but also highly functional and accessible to everyone.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Need a design overhaul?</h3>
              <Link to="/#contact" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg">
                Discuss Your Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIUXDesignPage;
