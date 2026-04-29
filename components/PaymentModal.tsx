import React, { useState } from 'react';
import { X } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  itemDescription: string;
  onSuccess: () => void;
}

export default function PaymentModal({ isOpen, onClose, amount, itemDescription, onSuccess }: PaymentModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handlePayPalCheckout = async () => {
    if (!email) {
      setError('Please provide your email before proceeding.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/payments/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, description: itemDescription })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to initialize PayPal checkout');
      
      if (data.link) {
         window.location.href = data.link;
      } else {
         alert(`PayPal Order ID generated: ${data.id}. Missing hosted checkout link.`);
      }
      
    } catch (err: any) {
      setError(err.message || 'Payment initiation failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleFlutterwaveCheckout = async () => {
    if (!email || !name) {
      setError('Please provide your name and email before proceeding.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/payments/flutterwave/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount, 
          email, 
          name, 
          description: itemDescription 
        })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to initialize Flutterwave checkout');
      
      // Redirect to Flutterwave's hosted checkout page
      if (data.link) {
        window.location.href = data.link;
      }
    } catch (err: any) {
      setError(err.message || 'Payment initiation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-xl font-bold text-slate-900">Complete Purchase</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
             <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <p className="text-sm text-slate-500 mb-1">Item details</p>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
               <span className="font-medium text-slate-900">{itemDescription}</span>
               <span className="font-bold text-lg text-indigo-600">${amount.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
               <input 
                 type="text"
                 className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                 placeholder="John Doe"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
               />
             </div>
             
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
               <input 
                 type="email"
                 className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                 placeholder="john@example.com"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
               />
             </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-3 pt-2">
             <div className="relative">
               <div className="absolute inset-0 flex items-center">
                 <div className="w-full border-t border-slate-200"></div>
               </div>
               <div className="relative flex justify-center text-sm">
                 <span className="px-2 bg-white text-slate-500">Choose Payment Method</span>
               </div>
             </div>

             <button 
               onClick={handlePayPalCheckout}
               disabled={loading}
               className="w-full relative flex items-center justify-center space-x-2 bg-[#ffc439] hover:bg-[#f4bb33] text-[#003087] px-4 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
             >
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-6" alt="PayPal" />
             </button>

             <button 
               onClick={handleFlutterwaveCheckout}
               disabled={loading}
               className="w-full flex items-center justify-center space-x-2 bg-[#F5A623] hover:bg-[#e09822] text-white px-4 py-3 rounded-xl font-bold transition-all shadow-md disabled:opacity-50"
             >
                <img src="https://flutterwave.com/images/logo/logo-mark/full.svg" className="h-5 brightness-0 invert" alt="Flutterwave" />
                <span>Pay with Mobile Money / Card</span>
             </button>
             <p className="text-xs text-center text-slate-500 mt-2">
               Payments process securely via your selected provider.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
