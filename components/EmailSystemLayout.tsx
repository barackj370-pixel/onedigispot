import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { 
  BarChart, 
  Settings, 
  Mail, 
  Layout, 
  ArrowLeft,
  Send
} from 'lucide-react';

interface EmailSystemLayoutProps {
  children: React.ReactNode;
}

const EmailSystemLayout: React.FC<EmailSystemLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/app/funnel-builder" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Funnel Builder
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900">Email System</h1>
            <p className="text-slate-600 mt-1">Manage your campaigns, newsletters, and email settings.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              <NavLink
                to="/app/email-marketing/newsletters"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                <Layout className="mr-3 w-5 h-5" />
                Newsletters
              </NavLink>

              <NavLink
                to="/app/email-marketing/campaigns"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    isActive || window.location.pathname.includes('/app/email-marketing/campaigns')
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                <Send className="mr-3 w-5 h-5" />
                Campaigns
              </NavLink>

              <NavLink
                to="/app/email-marketing/statistics"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                <BarChart className="mr-3 w-5 h-5" />
                Statistics
              </NavLink>

              <NavLink
                to="/app/email-marketing/settings"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                <Settings className="mr-3 w-5 h-5" />
                Settings
              </NavLink>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default EmailSystemLayout;
