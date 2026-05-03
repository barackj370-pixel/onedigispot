import React, { useState } from 'react';
import EmailSystemLayout from '../../components/EmailSystemLayout';
import { Plus, Check, Mail, Globe, Lock, Trash2, AlertCircle } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [senderEmails, setSenderEmails] = useState<{ email: string; verified: boolean }[]>([
    { email: 'info@mail.onedigispot.com', verified: true }
  ]);
  const [domains, setDomains] = useState<{ domain: string; verified: boolean }[]>([
    { domain: 'mail.onedigispot.com', verified: true }
  ]);
  
  const [newEmail, setNewEmail] = useState('');
  const [newDomain, setNewDomain] = useState('');

  const [activeTab, setActiveTab] = useState<'senders' | 'domains'>('senders');

  const handleAddEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmail && !senderEmails.find(s => s.email === newEmail)) {
      setSenderEmails([...senderEmails, { email: newEmail, verified: false }]);
      setNewEmail('');
    }
  };

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDomain && !domains.find(d => d.domain === newDomain)) {
      setDomains([...domains, { domain: newDomain, verified: false }]);
      setNewDomain('');
    }
  };

  return (
    <EmailSystemLayout>
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Settings</h2>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab('senders')}
            className={`pb-4 px-2 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'senders' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Sender Email Addresses
          </button>
          <button
            onClick={() => setActiveTab('domains')}
            className={`pb-4 px-2 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'domains' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Custom Domains
          </button>
        </div>

        {/* Sender Emails Tab */}
        {activeTab === 'senders' && (
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-900 flex items-center mb-2">
                <Mail className="w-4 h-4 mr-2 text-indigo-500" />
                Add Sender Email
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Before you can send emails from a specific address, you need to verify it.
              </p>
              <form onSubmit={handleAddEmail} className="flex gap-3">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Email
                </button>
              </form>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Configured Email Addresses</h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 font-medium text-slate-600">Email Address</th>
                      <th className="px-6 py-3 font-medium text-slate-600">Status</th>
                      <th className="px-6 py-3 font-medium text-slate-600 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {senderEmails.map((sender) => (
                      <tr key={sender.email} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-slate-900 font-medium">{sender.email}</td>
                        <td className="px-6 py-4">
                          {sender.verified ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Check className="w-3 h-3 mr-1" /> Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              <AlertCircle className="w-3 h-3 mr-1" /> Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          {!sender.verified && (
                            <button className="text-indigo-600 hover:text-indigo-800 font-medium">Verify</button>
                          )}
                          <button className="text-red-500 hover:text-red-700">
                            <Trash2 className="w-5 h-5 ml-auto" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {senderEmails.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                          No sender emails configured yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Domains Tab */}
        {activeTab === 'domains' && (
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-900 flex items-center mb-2">
                <Globe className="w-4 h-4 mr-2 text-indigo-500" />
                Add Custom Domain
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Verify your domain to improve deliverability and allow emails to be sent from any address @yourdomain.com.
              </p>
              <form onSubmit={handleAddDomain} className="flex gap-3">
                <input
                  type="text"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  placeholder="e.g. yourdomain.com"
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Domain
                </button>
              </form>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Verified Domains</h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 font-medium text-slate-600">Domain Name</th>
                      <th className="px-6 py-3 font-medium text-slate-600">Authentication</th>
                      <th className="px-6 py-3 font-medium text-slate-600 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {domains.map((item) => (
                      <tr key={item.domain} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-slate-900 font-medium flex items-center">
                          <Globe className="w-4 h-4 text-slate-400 mr-2" />
                          {item.domain}
                        </td>
                        <td className="px-6 py-4">
                          {item.verified ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Lock className="w-3 h-3 mr-1" /> DKIM / SPF Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              <AlertCircle className="w-3 h-3 mr-1" /> Needs DNS Setup
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          {!item.verified && (
                            <button className="text-indigo-600 hover:text-indigo-800 font-medium">View Records</button>
                          )}
                          <button className="text-red-500 hover:text-red-700">
                            <Trash2 className="w-5 h-5 ml-auto" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {domains.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                          No custom domains configured yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </EmailSystemLayout>
  );
};

export default SettingsPage;
