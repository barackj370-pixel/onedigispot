import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, XCircle } from 'lucide-react';
import SiteNav from '../components/SiteNav';
import Footer from '../components/Footer';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const tx_ref = searchParams.get('tx_ref');
  const transaction_id = searchParams.get('transaction_id');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-20">
      <SiteNav />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center">
          {status === 'successful' || status === 'completed' ? (
            <>
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Payment Successful!</h1>
              <p className="text-slate-600 mb-8">
                Thank you for your purchase. Your transaction has been processed successfully.
              </p>
              
              <div className="bg-slate-50 p-4 rounded-xl text-left mb-8 space-y-2 text-sm text-slate-600 border border-slate-100">
                <div className="flex justify-between">
                  <span className="font-medium text-slate-700">Transaction Ref:</span>
                  <span className="font-mono">{tx_ref || transaction_id || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-700">Status:</span>
                  <span className="capitalize text-emerald-600 font-medium">{status}</span>
                </div>
              </div>
            </>
          ) : (
             <>
               <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <XCircle className="w-10 h-10" />
               </div>
               <h1 className="text-3xl font-bold text-slate-900 mb-4">Payment Failed</h1>
               <p className="text-slate-600 mb-8">
                 We couldn't process your payment. Please try again or use a different payment method.
               </p>
               
               <div className="bg-slate-50 p-4 rounded-xl text-left mb-8 space-y-2 text-sm text-slate-600 border border-slate-100">
                 <div className="flex justify-between">
                   <span className="font-medium text-slate-700">Status:</span>
                   <span className="capitalize text-red-600 font-medium">{status || 'Failed'}</span>
                 </div>
               </div>
             </>
          )}

          <Link to="/tools" className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg hover:bg-indigo-700 transition-all w-full md:w-auto">
            Return to Dashboard
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
