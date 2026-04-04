import React from 'react';
import { Link } from 'react-router-dom';

const DigitalStrategyPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-6 font-heading">Digital Strategy</h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="lead text-xl text-slate-700 mb-8">
              Data-driven strategies to navigate the digital landscape and accelerate business growth.
            </p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">A Roadmap to Success</h2>
            <p className="mb-6">
              In today's fast-paced digital world, having a website isn't enough. You need a comprehensive strategy that aligns your digital initiatives with your core business objectives. We help organizations map out their digital future.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Core Strategy Services:</h3>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Digital Transformation:</strong> Guiding traditional businesses into the digital age.</li>
              <li><strong>Market Research & Analysis:</strong> Understanding your audience and competitors.</li>
              <li><strong>Technology Roadmapping:</strong> Planning your tech stack for the next 3-5 years.</li>
              <li><strong>Growth Marketing:</strong> Data-driven campaigns, SEO, and content strategies.</li>
              <li><strong>Data Analytics:</strong> Implementing tracking and dashboards to measure success.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Our Methodology</h2>
            <p className="mb-6">
              We start by deeply understanding your business, your customers, and your market. From there, we develop actionable, measurable strategies that prioritize quick wins while building a foundation for long-term sustainable growth.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Ready to rethink your strategy?</h3>
              <Link to="/#contact" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg">
                Talk to a Strategist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalStrategyPage;
