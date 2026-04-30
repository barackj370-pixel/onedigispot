import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-6 font-heading">Terms of Service</h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="text-sm text-slate-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-6">
              By accessing and using this website, and our suite of applications including specifically "Social Media AI Post Master", you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Intellectual Property Rights</h2>
            <p className="mb-6">
              This site and its original content, features, and functionality are owned by Onedigispot and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Use of the Site</h2>
            <p className="mb-4">You agree to use the site only for lawful purposes. You agree not to take any action that might compromise the security of the site, render the site inaccessible to others or otherwise cause damage to the site or the content. You agree not to add to, subtract from, or otherwise modify the content, or to attempt to access any content that is not intended for you. You agree not to use the site in any manner that might interfere with the rights of third parties.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Limitation of Liability</h2>
            <p className="mb-6">
              In no event shall Onedigispot, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Changes to This Agreement</h2>
            <p className="mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Contact Us</h2>
            <p className="mb-6">
              If you have any questions about these Terms, please contact us at info@onedigispot.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
