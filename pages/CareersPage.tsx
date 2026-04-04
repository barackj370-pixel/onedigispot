import React from 'react';
import { Link } from 'react-router-dom';

const CareersPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-6 font-heading">Careers at Onedigispot</h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="lead text-xl text-slate-700 mb-8">
              Join a team of passionate innovators shaping the future of digital experiences.
            </p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Why Work With Us?</h2>
            <p className="mb-6">
              At Onedigispot, we believe that our people are our greatest asset. We foster a culture of continuous learning, collaboration, and creative problem-solving. We offer a dynamic environment where you can grow your skills, work on exciting projects, and make a real impact.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">What We Offer:</h3>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Competitive Compensation:</strong> We offer attractive salaries and benefits packages.</li>
              <li><strong>Flexible Work Arrangements:</strong> We support remote work and flexible hours to help you balance your professional and personal life.</li>
              <li><strong>Professional Development:</strong> We invest in your growth through training, workshops, and conference attendance.</li>
              <li><strong>Collaborative Culture:</strong> We value teamwork, open communication, and mutual respect.</li>
              <li><strong>Impactful Projects:</strong> You'll have the opportunity to work on challenging projects that make a difference.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Current Openings</h2>
            <p className="mb-6">
              We are always looking for talented individuals to join our team. While we don't have any specific openings at the moment, we encourage you to submit your resume for future consideration.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Interested in joining us?</h3>
              <p className="mb-4">Send your resume and portfolio to our team.</p>
              <a href="mailto:careers@onedigispot.com" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
