import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import ScreenRecorder from '../components/ScreenRecorder';
import PaymentModal from '../components/PaymentModal';

const ScreenRecorderPage: React.FC = () => {
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4 border-b border-slate-200 pb-4">
          <Link to="/free-screen-recorder" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Screen Recorder Overview
          </Link>

          {!isPremium ? (
            <button 
              onClick={() => setIsPaymentOpen(true)}
              className="inline-flex items-center bg-amber-500 text-white px-5 py-2 rounded-full font-bold hover:bg-amber-600 transition-all shadow-md text-sm whitespace-nowrap"
            >
              <Lock className="w-4 h-4 mr-2" />
              Unlock 1-Hour Recording ($15/mo)
            </button>
          ) : (
             <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-semibold text-sm self-start">
               ✓ Pro Recorder Active (Unlimited 1Hr)
             </div>
          )}
        </div>
      </div>
      
      <div className="px-4">
         <ScreenRecorder />
      </div>
      
      <PaymentModal 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        amount={15.00}
        itemDescription="Pro Screen Recorder - 1 Hour limit"
        onSuccess={() => {
           setIsPaymentOpen(false);
           setIsPremium(true);
           alert('Payment successful! Premium features unlocked.');
        }}
      />
    </div>
  );
};

export default ScreenRecorderPage;
