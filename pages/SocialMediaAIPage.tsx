import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import SocialMediaAI from '../components/SocialMediaAI';
import PaymentModal from '../components/PaymentModal';

const SocialMediaAIPage: React.FC = () => {
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
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <Link to="/social-media-ai-post-master" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Social Media AI Post Master Overview
          </Link>

          {!isPremium ? (
            <button 
              onClick={() => setIsPaymentOpen(true)}
              className="inline-flex items-center bg-amber-500 text-white px-5 py-2 rounded-full font-bold hover:bg-amber-600 transition-all shadow-md text-sm whitespace-nowrap"
            >
              <Lock className="w-4 h-4 mr-2" />
              Unlock Premium Features ($25/mo)
            </button>
          ) : (
             <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-semibold text-sm self-start">
               ✓ Premium Active
             </div>
          )}
        </div>
      </div>
      
      <SocialMediaAI />
      
      <PaymentModal 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        amount={25.00}
        itemDescription="Social Media AI Post Master - Pro Plan"
        onSuccess={() => {
           setIsPaymentOpen(false);
           setIsPremium(true);
           alert('Payment successful! Premium features unlocked.');
        }}
      />
    </div>
  );
};

export default SocialMediaAIPage;
