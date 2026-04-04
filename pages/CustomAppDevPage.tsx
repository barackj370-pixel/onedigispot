import React from 'react';
import { Link } from 'react-router-dom';

const CustomAppDevPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-6 font-heading">Custom App Development</h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="lead text-xl text-slate-700 mb-8">
              We build scalable, high-performance custom applications tailored to your unique business needs.
            </p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Our Approach</h2>
            <p className="mb-6">
              At Onedigispot, we don't just write code; we solve business problems. Our custom application development process is designed to deliver robust, secure, and user-centric solutions that drive real value.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">What We Offer:</h3>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Enterprise Software:</strong> Complex, scalable systems designed for large organizations.</li>
              <li><strong>SaaS Platforms:</strong> End-to-end development of Software as a Service products.</li>
              <li><strong>Mobile Applications:</strong> Native and cross-platform apps for iOS and Android.</li>
              <li><strong>API Development & Integration:</strong> Seamlessly connecting your systems and third-party services.</li>
              <li><strong>Legacy System Modernization:</strong> Upgrading outdated software to modern tech stacks.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Why Choose Us?</h2>
            <p className="mb-6">
              We leverage the latest technologies and agile methodologies to ensure rapid delivery without compromising on quality. Our team of expert developers, architects, and QA engineers work closely with you from concept to deployment and beyond.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Ready to start your project?</h3>
              <Link to="/#contact" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAppDevPage;
