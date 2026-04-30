import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import BusinessCardGenerator from '../components/BusinessCardGenerator';
import PaymentModal from '../components/PaymentModal';

const BusinessCardGeneratorPage: React.FC = () => {
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4 print:hidden">
          <Link to="/free-digital-business-card-generator" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Digital Business Card Overview
          </Link>

          {!isPremium ? (
            <button 
              onClick={() => setIsPaymentOpen(true)}
              className="inline-flex items-center bg-amber-500 text-white px-5 py-2 rounded-full font-bold hover:bg-amber-600 transition-all shadow-md text-sm whitespace-nowrap"
            >
              <Lock className="w-4 h-4 mr-2" />
              Unlock Premium Team ($19/mo)
            </button>
          ) : (
             <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-semibold text-sm self-start">
               ✓ Premium Active
             </div>
          )}
        </div>
      </div>
      
      <BusinessCardGenerator />
      
      <PaymentModal 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        amount={19.00}
        itemDescription="Digital Business Card - Premium Team"
        onSuccess={() => {
           setIsPaymentOpen(false);
           setIsPremium(true);
           alert('Payment successful! Premium features unlocked.');
        }}
      />
    </div>
  );
};

export default BusinessCardGeneratorPage;
