import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmailSystemLayout from '../../components/EmailSystemLayout';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Clock, 
  Trash2, 
  ChevronDown, 
  Settings2,
  Mail,
  Layout
} from 'lucide-react';

const CampaignBuilderPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [campaignName, setCampaignName] = useState(isEditing ? 'Welcome Sequence - Logo Maker' : '');
  const [senderEmail, setSenderEmail] = useState('');
  const [description, setDescription] = useState('');
  
  const [emails, setEmails] = useState([
    { id: 1, subject: 'Welcome! Here is your access link', body: 'Hi {{name}},\n\nWelcome!', delayHours: 0, showSettings: false },
    { id: 2, subject: 'How are you liking the tool?', body: 'Just checking in...', delayHours: 24, showSettings: false }
  ]);

  const handleAddEmail = () => {
    setEmails([
      ...emails, 
      { 
        id: Date.now(), 
        subject: '', 
        body: '', 
        delayHours: 24, 
        showSettings: true 
      }
    ]);
  };

  const handleUpdateEmail = (id: number, field: string, value: string | number | boolean) => {
    setEmails(emails.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleRemoveEmail = (id: number) => {
    setEmails(emails.filter(e => e.id !== id));
  };

  const handleSave = () => {
    // API logic here
    alert('Campaign Saved Successfully!');
    navigate('/app/email-marketing/campaigns');
  };

  return (
    <EmailSystemLayout>
      <div className="p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200">
          <div className="flex items-center">
            <button onClick={() => navigate('/app/email-marketing/campaigns')} className="mr-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {isEditing ? 'Edit Campaign' : 'Create New Campaign'}
              </h2>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 bg-white font-medium hover:bg-slate-50 transition-colors">
              Save Draft
            </button>
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 rounded-lg text-white font-medium hover:bg-indigo-700 transition-colors flex items-center shadow-sm"
            >
              <Save className="w-4 h-4 mr-2" />
              Publish Campaign
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main sequence builder */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Email Sequence</h3>
              <button 
                onClick={handleAddEmail}
                className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center text-sm"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Step
              </button>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {emails.map((email, index) => (
                <div key={email.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  
                  {/* Timeline icon */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white bg-indigo-100 text-indigo-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 mx-auto">
                    <Mail className="w-5 h-5" />
                  </div>
                  
                  {/* Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white border border-slate-200 p-5 rounded-2xl shadow-sm group-hover:border-indigo-300 transition-colors relative">
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-sm font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        {index === 0 ? 'Wait 0 hours (Instant)' : `Wait ${email.delayHours} hours after previous`}
                      </div>
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => handleUpdateEmail(email.id, 'showSettings', !email.showSettings)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-md transition-colors"
                        >
                          <Settings2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleRemoveEmail(email.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {email.showSettings && (
                      <div className="mb-4 pt-3 border-t border-slate-100">
                        <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Delay (Hours)</label>
                        <input 
                          type="number" 
                          min="0"
                          value={email.delayHours}
                          onChange={(e) => handleUpdateEmail(email.id, 'delayHours', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        />
                      </div>
                    )}

                    <div className="space-y-3">
                      <div>
                        <input 
                          type="text" 
                          placeholder="Subject Line"
                          value={email.subject}
                          onChange={(e) => handleUpdateEmail(email.id, 'subject', e.target.value)}
                          className="w-full px-0 py-2 border-0 border-b border-dashed border-slate-300 focus:border-indigo-500 bg-transparent text-slate-900 font-semibold placeholder:text-slate-400 focus:ring-0 text-lg outline-none"
                        />
                      </div>
                      <div>
                        <textarea 
                          placeholder="Email body text here... Use {{name}} for personalization."
                          rows={6}
                          value={email.body}
                          onChange={(e) => handleUpdateEmail(email.id, 'body', e.target.value)}
                          className="w-full px-3 py-2 border border-transparent hover:border-slate-200 focus:border-indigo-500 rounded-xl bg-slate-50 focus:bg-white resize-none text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="relative flex justify-center z-10 pt-4">
                 <button 
                  onClick={handleAddEmail}
                  className="w-12 h-12 bg-white border-2 border-dashed border-slate-300 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-400 transition-colors shadow-sm"
                 >
                   <Plus className="w-6 h-6" />
                 </button>
              </div>

            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit">
            <h3 className="text-lg font-bold text-slate-900 mb-5">Campaign Settings</h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Campaign Name
                </label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g. Welcome Series"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Sender Email Address
                </label>
                <div className="relative">
                  <select 
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 pl-3 pr-10 py-2.5 text-sm appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white"
                  >
                    <option value="" disabled>Select verified sender...</option>
                    <option value="info@mail.onedigispot.com">info@mail.onedigispot.com (Verified)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
                <p className="text-xs text-slate-500 mt-1.5">
                  Manage senders in <Link to="/app/email-marketing/settings" className="text-indigo-600 hover:underline">Settings</Link>.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Internal notes about this campaign"
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              {/* Trigger Connection mockup */}
              <div className="pt-5 border-t border-slate-200">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Funnel Trigger
                </label>
                <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center mr-3">
                      <Layout className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Logo Maker Funnel</div>
                      <div className="text-xs text-slate-500">Triggers on Opt-in</div>
                    </div>
                  </div>
                  <button className="text-xs text-indigo-600 font-medium hover:text-indigo-800">
                    Change
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </EmailSystemLayout>
  );
};

export default CampaignBuilderPage;
