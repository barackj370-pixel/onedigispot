import React, { useState } from 'react';
import EmailSystemLayout from '../../components/EmailSystemLayout';
import { Plus, Search, Edit, Trash2, Send, Clock, Calendar } from 'lucide-react';

const NewslettersPage: React.FC = () => {
  const [newsletters] = useState([
    {
      id: 1,
      subject: 'Top 5 SEO Tools to Use in 2026',
      status: 'sent',
      sentTo: 1450,
      openRate: '38.2%',
      clickRate: '12.4%',
      date: 'May 1, 2026'
    },
    {
      id: 2,
      subject: 'New Feature Alert: Funnel Builder Update',
      status: 'draft',
      sentTo: 0,
      openRate: 'N/A',
      clickRate: 'N/A',
      date: 'Draft'
    }
  ]);

  return (
    <EmailSystemLayout>
      <div className="p-6 sm:p-8">
        <div className="flex sm:items-center justify-between flex-col sm:flex-row mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Newsletters</h2>
            <p className="text-sm text-slate-600 mt-1">Send one-off broadcasts to your audience.</p>
          </div>
          <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center shadow-sm">
            <Plus className="w-5 h-5 mr-2" />
            Create Newsletter
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search newsletters by subject..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
            />
          </div>
          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl p-1">
            <button className="px-4 py-1.5 bg-white text-slate-800 text-sm font-medium rounded-lg shadow-sm">All</button>
            <button className="px-4 py-1.5 text-slate-600 text-sm font-medium rounded-lg hover:text-slate-800">Drafts</button>
            <button className="px-4 py-1.5 text-slate-600 text-sm font-medium rounded-lg hover:text-slate-800">Sent</button>
          </div>
        </div>

        {/* List */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium text-slate-600">Newsletter Info</th>
                <th className="px-6 py-4 font-medium text-slate-600">Status & Date</th>
                <th className="px-6 py-4 font-medium text-slate-600">Engagement</th>
                <th className="px-6 py-4 font-medium text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {newsletters.map((nl) => (
                <tr key={nl.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{nl.subject}</div>
                    <div className="text-slate-500 text-xs mt-1">To: All Subscribers</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center mb-1">
                      {nl.status === 'sent' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                           Sent
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 uppercase tracking-wider">
                           Draft
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {nl.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {nl.status === 'sent' ? (
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="text-slate-700 font-medium">{nl.openRate}</div>
                          <div className="text-xs text-slate-500 mt-1">Opens</div>
                        </div>
                        <div>
                          <div className="text-slate-700 font-medium">{nl.clickRate}</div>
                          <div className="text-xs text-slate-500 mt-1">Clicks</div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic text-xs">Waiting to send</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      {nl.status === 'draft' ? (
                         <>
                           <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">Edit</button>
                           <button className="text-sm font-medium text-slate-500 hover:text-indigo-600 flex items-center transition-colors"><Send className="w-3.5 h-3.5 mr-1" /> Send Now</button>
                         </>
                      ) : (
                        <button className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">View Report</button>
                      )}
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </EmailSystemLayout>
  );
};

export default NewslettersPage;
