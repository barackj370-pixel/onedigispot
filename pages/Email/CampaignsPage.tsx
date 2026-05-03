import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmailSystemLayout from '../../components/EmailSystemLayout';
import { Plus, Play, Pause, Edit, Trash2, Users } from 'lucide-react';

const CampaignsPage: React.FC = () => {
  const [campaigns] = useState([
    {
      id: '1',
      name: 'Welcome Sequence - Logo Maker',
      status: 'active',
      subscribers: 1420,
      openRate: '42.5%',
      emailsCount: 3,
      createdAt: '2 days ago'
    },
    {
      id: '2',
      name: 'Screen Recorder Post-Signup',
      status: 'paused',
      subscribers: 85,
      openRate: '12.0%',
      emailsCount: 5,
      createdAt: '1 week ago'
    }
  ]);

  return (
    <EmailSystemLayout>
      <div className="p-6 sm:p-8">
        <div className="flex sm:items-center justify-between flex-col sm:flex-row mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Email Campaigns</h2>
            <p className="text-sm text-slate-600 mt-1">Automated sequences triggered by funnel opt-ins.</p>
          </div>
          <Link 
            to="/app/email-marketing/campaigns/new"
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Campaign
          </Link>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium text-slate-600">Campaign Name</th>
                <th className="px-6 py-4 font-medium text-slate-600">Status</th>
                <th className="px-6 py-4 font-medium text-slate-600">Performance</th>
                <th className="px-6 py-4 font-medium text-slate-600">Structure</th>
                <th className="px-6 py-4 font-medium text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{campaign.name}</div>
                    <div className="text-slate-500 text-xs mt-1">Created {campaign.createdAt}</div>
                  </td>
                  <td className="px-6 py-4">
                    {campaign.status === 'active' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        <Play className="w-3 h-3 mr-1" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        <Pause className="w-3 h-3 mr-1" /> Paused
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="flex items-center text-slate-700 font-medium">
                          <Users className="w-4 h-4 mr-1 text-slate-400" />
                          {campaign.subscribers.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Subscribers</div>
                      </div>
                      <div>
                        <div className="text-slate-700 font-medium">{campaign.openRate}</div>
                        <div className="text-xs text-slate-500 mt-1">Open Rate</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                      <Mail className="w-3 h-3 mr-1" /> {campaign.emailsCount} Emails
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <Link to={`/app/email-marketing/campaigns/${campaign.id}`} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Edit Campaign">
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete Campaign">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {campaigns.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400 mb-3">
                      <Send className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">No campaigns yet</h3>
                    <p className="text-slate-500 mt-1 mb-4">Create your first automated email sequence to nurture your leads.</p>
                    <Link 
                      to="/app/email-marketing/campaigns/new"
                      className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Create Campaign
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </EmailSystemLayout>
  );
};

export default CampaignsPage;
