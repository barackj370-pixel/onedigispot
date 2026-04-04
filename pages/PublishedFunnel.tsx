import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle, Loader2 } from 'lucide-react';

export default function PublishedFunnel() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [funnelData, setFunnelData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<'landing' | 'sales' | 'upsell' | 'downsell' | 'thankyou'>('landing');

  useEffect(() => {
    const fetchFunnel = async () => {
      try {
        const { data, error } = await supabase
          .from('funnels')
          .select('data')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        if (data) {
          setFunnelData(data.data);
        } else {
          setError('Funnel not found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load funnel');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchFunnel();
  }, [slug]);

  const handleOptIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);

    try {
      // Call our backend to trigger the SendGrid email sequence
      const response = await fetch('/api/funnels/optin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          slug,
          funnelData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to opt-in');
      }

      // Move to Sales Page
      setStep('sales');
    } catch (err) {
      console.error(err);
      alert('There was an error processing your request.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error || !funnelData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Oops!</h1>
          <p className="text-slate-600">{error || 'Funnel not found'}</p>
        </div>
      </div>
    );
  }

  const { pages, monetization } = funnelData;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {step === 'landing' && (
        <div className="max-w-4xl mx-auto px-4 py-20 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            {pages.landing.headline}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl">
            {pages.landing.subheadline}
          </p>

          <div className="w-full max-w-2xl bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 mb-12 text-left">
            <h3 className="font-bold text-slate-900 mb-6 text-lg">Here is what you will get:</h3>
            <ul className="space-y-4">
              {pages.landing.benefits.map((benefit: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="text-emerald-500 mt-1 shrink-0" size={20} />
                  <span className="text-slate-700 text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-lg text-slate-700 mb-8 max-w-2xl">
            {pages.landing.body}
          </p>

          <form onSubmit={handleOptIn} className="w-full max-w-md flex flex-col gap-4">
            <input
              type="email"
              required
              placeholder="Enter your best email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 text-lg border-2 border-slate-200 rounded-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-center"
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-indigo-600 text-white text-xl font-bold py-4 px-8 rounded-full hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : pages.landing.ctaText}
            </button>
          </form>
          <p className="text-sm text-slate-400 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      )}

      {step === 'sales' && (
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              {pages.sales.headline}
            </h1>
            <p className="text-2xl font-medium text-indigo-600 max-w-3xl mx-auto">
              {pages.sales.hook}
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 mb-12">
            <div className="prose prose-lg prose-slate max-w-none">
              <h3 className="text-red-500 font-bold uppercase tracking-wider text-sm mb-4">The Problem</h3>
              <p className="mb-10 whitespace-pre-wrap">{pages.sales.problem}</p>

              <h3 className="text-emerald-500 font-bold uppercase tracking-wider text-sm mb-4">The Solution</h3>
              <p className="mb-10 whitespace-pre-wrap">{pages.sales.solution}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center">
                <h4 className="font-bold text-slate-900 mb-4 text-xl">Pricing</h4>
                <p className="text-slate-700 whitespace-pre-wrap">{pages.sales.pricing}</p>
              </div>
              <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 text-center">
                <h4 className="font-bold text-emerald-800 mb-4 text-xl">Our Guarantee</h4>
                <p className="text-emerald-700 whitespace-pre-wrap">{pages.sales.guarantee}</p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <button 
                onClick={() => setStep('upsell')}
                className="w-full max-w-md bg-orange-500 text-white text-xl font-bold py-5 px-8 rounded-full hover:bg-orange-600 transition-all shadow-xl shadow-orange-200"
              >
                {pages.sales.ctaText}
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'upsell' && (
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <div className="inline-block px-4 py-1.5 bg-yellow-100 text-yellow-800 font-bold text-sm rounded-full mb-8 uppercase tracking-wider">
            Wait! Special One-Time Offer
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            {monetization.upsell.headline}
          </h1>
          <p className="text-xl text-slate-600 mb-12 whitespace-pre-wrap">
            {monetization.upsell.pitch}
          </p>
          <div className="text-6xl font-black text-slate-900 mb-12">
            {monetization.upsell.price}
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={() => setStep('thankyou')}
              className="w-full max-w-md bg-green-500 text-white text-xl font-bold py-5 px-8 rounded-full hover:bg-green-600 transition-all shadow-xl shadow-green-200"
            >
              {monetization.upsell.ctaText}
            </button>
            <button 
              onClick={() => setStep('downsell')}
              className="text-slate-500 hover:text-slate-700 underline font-medium"
            >
              No thanks, I don't want this special offer.
            </button>
          </div>
        </div>
      )}

      {step === 'downsell' && (
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <div className="inline-block px-4 py-1.5 bg-slate-200 text-slate-700 font-bold text-sm rounded-full mb-8 uppercase tracking-wider">
            Last Chance
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            {monetization.downsell.headline}
          </h1>
          <p className="text-xl text-slate-600 mb-12 whitespace-pre-wrap">
            {monetization.downsell.pitch}
          </p>
          <div className="text-6xl font-black text-slate-900 mb-12">
            {monetization.downsell.price}
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={() => setStep('thankyou')}
              className="w-full max-w-md bg-green-500 text-white text-xl font-bold py-5 px-8 rounded-full hover:bg-green-600 transition-all shadow-xl shadow-green-200"
            >
              {monetization.downsell.ctaText}
            </button>
            <button 
              onClick={() => setStep('thankyou')}
              className="text-slate-500 hover:text-slate-700 underline font-medium"
            >
              No thanks, I'll pass on this too.
            </button>
          </div>
        </div>
      )}

      {step === 'thankyou' && (
        <div className="max-w-2xl mx-auto px-4 py-32 text-center">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={48} />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Order Complete!
          </h1>
          <p className="text-xl text-slate-600">
            Thank you for your purchase. Check your email for access details.
          </p>
        </div>
      )}
    </div>
  );
}
