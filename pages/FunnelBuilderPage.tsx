import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Filter, Lock } from 'lucide-react';
import FunnelBuilder from '../components/FunnelBuilder';
import PaymentModal from '../components/PaymentModal';

const FunnelBuilderPage: React.FC = () => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('upgrade') === 'true') {
      setIsPaymentOpen(true);
    }
  }, [searchParams]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/ai-sales-funnel-builder" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Funnel Builder Overview
        </Link>
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Filter size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">AI Funnel Builder</h1>
          <p className="text-xl text-slate-600 mb-6">
            Generate a complete, high-converting sales funnel in seconds. Answer a few simple questions and let our AI architect your path to profit.
          </p>
          
          {!isPremium ? (
            <button 
              onClick={() => setIsPaymentOpen(true)}
              className="inline-flex items-center bg-amber-500 text-white px-6 py-3 rounded-full font-bold hover:bg-amber-600 transition-all shadow-md"
            >
              <Lock className="w-5 h-5 mr-2" />
              Unlock Premium Funnels ($35/mo)
            </button>
          ) : (
             <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-semibold text-sm">
               ✓ Premium Mode Active
             </div>
          )}
        </div>

        <FunnelBuilder />
        
        <PaymentModal 
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          amount={35.00}
          itemDescription="Pro Funnel Builder - Monthly Subscription"
          onSuccess={() => {
             setIsPaymentOpen(false);
             setIsPremium(true);
             alert('Payment successful! Premium features unlocked.');
          }}
        />
      </div>
    </div>
  );
};

export default FunnelBuilderPage;
