import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import InnovationLab from '../components/InnovationLab';
import Portfolio from '../components/Portfolio';
import { supabase } from '../lib/supabase';

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleBookConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('consultations')
        .insert([{ email, created_at: new Date().toISOString() }]);

      if (error) throw error;

      // Send the immediate welcome email
      try {
        await fetch('/api/consultations/welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // We don't throw here because the consultation was already saved successfully
      }

      setStatus('success');
      setEmail('');
      
      // Redirect to the thank you page to book on Calendly
      navigate('/thank-you');
    } catch (error: any) {
      console.error('Error booking consultation:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <InnovationLab />
      
      {/* CTA Section */}
      <section id="contact" className="py-16 md:py-24 bg-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-white text-3xl md:text-5xl font-extrabold mb-6 md:mb-8">Ready to Build the Future?</h2>
          <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 md:mb-12">
            Whether you have a fully scoped project or just a seed of an idea, let's talk about how Onedigispot can bring it to life.
          </p>
          <form onSubmit={handleBookConsultation} className="bg-white p-2 rounded-2xl max-w-xl mx-auto shadow-2xl flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email" 
              required
              disabled={status === 'loading' || status === 'success'}
              className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-xl focus:outline-none text-slate-900 disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="bg-indigo-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-full sm:min-w-[200px]"
            >
              {status === 'loading' ? 'Submitting...' : status === 'success' ? 'Request Received!' : 'Book a Consultation'}
            </button>
          </form>
          {status === 'success' && (
            <p className="mt-4 text-green-300 font-medium">Thanks! We'll be in touch shortly.</p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-red-300 font-medium">{errorMessage}</p>
          )}
          <p className="mt-6 text-indigo-200 text-sm">Join 20+ organizations already innovating with us.</p>
        </div>
      </section>
    </>
  );
};

export default Home;
