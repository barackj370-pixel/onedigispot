import React from 'react';
import { Link } from 'react-router-dom';

const AIIntegrationPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-6 font-heading">AI Integration</h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="lead text-xl text-slate-700 mb-8">
              Leveraging cutting-edge Large Language Models and computer vision to automate organizational intelligence.
            </p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Empowering Your Business with AI</h2>
            <p className="mb-6">
              Artificial Intelligence is transforming how we work. We help organizations seamlessly integrate modern AI capabilities—from intelligent chatbots to automated data processing pipelines—into their existing workflows and applications.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Our AI Expertise:</h3>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Custom LLM Integration:</strong> Implementing GPT-4, Gemini, or Claude into your internal tooling.</li>
              <li><strong>Intelligent Chatbots & Assistants:</strong> 24/7 customer support and internal knowledge retrieval.</li>
              <li><strong>Process Automation:</strong> Using AI to analyze, route, and process documents and datasets instantly.</li>
              <li><strong>Predictive Analytics:</strong> Leveraging machine learning to forecast trends and customer behavior.</li>
              <li><strong>Data Privacy & Security:</strong> Ensuring your enterprise data remains secure when working with AI models.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The Future is Automated</h2>
            <p className="mb-6">
              Our integration strategies ensure that your team works smarter, not harder. By automating mundane tasks and surfacing deep insights, we free up your human talent to focus on creativity, strategy, and growth.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Ready to implement AI?</h3>
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

export default AIIntegrationPage;
