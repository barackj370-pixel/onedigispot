import React from 'react';
import EmailSystemLayout from '../../components/EmailSystemLayout';
import { Users, MailOpen, MousePointerClick, TrendingUp, AlertCircle } from 'lucide-react';

const StatisticsPage: React.FC = () => {
  return (
    <EmailSystemLayout>
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Email Statistics</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Subscribers</h3>
              <Users className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">4,281</div>
            <div className="mt-2 text-sm text-emerald-600 flex items-center font-medium">
              <TrendingUp className="w-4 h-4 mr-1" /> +12% this month
            </div>
          </div>
          
          <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Avg Open Rate</h3>
              <MailOpen className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">38.4%</div>
            <div className="mt-2 text-sm text-slate-500">Across all campaigns</div>
          </div>

          <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Avg Click Rate</h3>
              <MousePointerClick className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">8.2%</div>
            <div className="mt-2 text-sm text-slate-500">Industry avg: 2.1%</div>
          </div>

          <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Bounce Rate</h3>
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">0.8%</div>
            <div className="mt-2 text-sm text-slate-500">Healthy status</div>
          </div>
        </div>

        {/* Mock Chart Area */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center mt-6">
          <BarChartPlaceholder />
          <h3 className="text-lg font-bold text-slate-900 mb-2 mt-6">Subscriber Growth over Time</h3>
          <p className="text-slate-500 max-w-md mx-auto">Visual subscriber growth analytics will appear here as your list collects more data over the next 30 days.</p>
        </div>
      </div>
    </EmailSystemLayout>
  );
};

const BarChartPlaceholder = () => (
  <div className="w-full h-48 flex items-end justify-center space-x-2 opacity-50 mb-4">
    {[30, 40, 25, 50, 70, 60, 90, 85, 110, 100, 120, 150].map((height, i) => (
      <div key={i} className="w-8 bg-indigo-300 rounded-t-sm" style={{ height: `${height}px` }} />
    ))}
  </div>
);

export default StatisticsPage;
