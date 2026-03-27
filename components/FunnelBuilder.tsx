import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, ArrowRight, CheckCircle, LayoutTemplate, Mail, DollarSign, FileText, Download } from 'lucide-react';

interface FunnelData {
  overview: {
    targetAudience: string;
    offer: string;
    leadMagnet: string;
    funnelFlow: string;
  };
  pages: {
    landingPage: string;
    salesPage: string;
  };
  emails: {
    subject: string;
    body: string;
  }[];
  monetization: {
    upsell: string;
    downsell: string;
  };
}

const FunnelBuilder: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    business: '',
    product: '',
    audience: '',
    goal: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [funnelData, setFunnelData] = useState<FunnelData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'pages' | 'emails' | 'monetization'>('overview');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const generateFunnel = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `
        You are an expert AI Sales Funnel Builder. Your job is to generate a complete, high-converting sales funnel based on the following inputs:
        - Business Type: ${formData.business}
        - Product/Service: ${formData.product}
        - Target Audience: ${formData.audience}
        - Goal: ${formData.goal}

        Generate the funnel following these instructions:
        - Keep output simple, structured, and beginner-friendly
        - Use persuasive, conversion-focused copywriting
        - Use bullet points and sections where appropriate
        - Optimize for clarity and action
        - Assume the user wants fast results

        The output must be structured exactly according to the JSON schema provided.
        - overview.targetAudience: Define the ideal customer avatar (age, location, income, pain points) and top 5 problems.
        - overview.offer: Define the unique selling proposition (USP) and an irresistible offer.
        - overview.leadMagnet: Provide 3 high-converting lead magnet ideas (format, title, why it converts).
        - overview.funnelFlow: Create a simple funnel flow diagram in text (e.g., Landing Page -> Thank You Page -> Email Sequence -> Sales Page -> Upsell -> Downsell) and explain the goal of each step.
        - pages.landingPage: Generate a landing page copy with Headline, Subheadline, Problem, Solution, Benefits, Lead magnet description, and CTA.
        - pages.salesPage: Generate a sales page copy with Headline, Hook, Problem agitation, Solution, Offer breakdown, Testimonials, Pricing strategy, Guarantee, and CTA buttons.
        - emails: Create a 5-day email sequence (Day 1: Welcome+value, Day 2: Problem awareness, Day 3: Solution intro, Day 4: Social proof, Day 5: Sales pitch).
        - monetization.upsell: Generate 1 upsell offer, pricing suggestion, and short pitch.
        - monetization.downsell: Generate 1 downsell offer, pricing suggestion, and short pitch.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overview: {
                type: Type.OBJECT,
                properties: {
                  targetAudience: { type: Type.STRING },
                  offer: { type: Type.STRING },
                  leadMagnet: { type: Type.STRING },
                  funnelFlow: { type: Type.STRING }
                },
                required: ["targetAudience", "offer", "leadMagnet", "funnelFlow"]
              },
              pages: {
                type: Type.OBJECT,
                properties: {
                  landingPage: { type: Type.STRING },
                  salesPage: { type: Type.STRING }
                },
                required: ["landingPage", "salesPage"]
              },
              emails: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    subject: { type: Type.STRING },
                    body: { type: Type.STRING }
                  },
                  required: ["subject", "body"]
                }
              },
              monetization: {
                type: Type.OBJECT,
                properties: {
                  upsell: { type: Type.STRING },
                  downsell: { type: Type.STRING }
                },
                required: ["upsell", "downsell"]
              }
            },
            required: ["overview", "pages", "emails", "monetization"]
          }
        }
      });

      const jsonStr = response.text?.trim() || '{}';
      const parsedData = JSON.parse(jsonStr) as FunnelData;
      setFunnelData(parsedData);
      setStep(5); // Move to results view
    } catch (err) {
      console.error("Error generating funnel:", err);
      setError("Failed to generate funnel. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const renderWizardStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">What is your business?</h3>
            <p className="text-slate-600 mb-6">Tell us a bit about your company or brand.</p>
            <input
              type="text"
              name="business"
              value={formData.business}
              onChange={handleInputChange}
              placeholder="e.g., Fitness Coaching, SaaS Startup, Local Bakery"
              className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-lg"
              autoFocus
            />
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">What are you selling?</h3>
            <p className="text-slate-600 mb-6">Describe your main product or service.</p>
            <textarea
              name="product"
              value={formData.product}
              onChange={handleInputChange}
              placeholder="e.g., A 12-week online weight loss program for busy moms"
              className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-lg h-32 resize-none"
              autoFocus
            />
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Who is your target audience?</h3>
            <p className="text-slate-600 mb-6">Who are you trying to reach?</p>
            <textarea
              name="audience"
              value={formData.audience}
              onChange={handleInputChange}
              placeholder="e.g., Working mothers aged 30-45 who struggle to find time for the gym"
              className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-lg h-32 resize-none"
              autoFocus
            />
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">What is your primary goal?</h3>
            <p className="text-slate-600 mb-6">What do you want this funnel to achieve?</p>
            <input
              type="text"
              name="goal"
              value={formData.goal}
              onChange={handleInputChange}
              placeholder="e.g., Generate leads, Sell a $99 course, Book consultation calls"
              className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-lg"
              autoFocus
            />
          </motion.div>
        );
      default:
        return null;
    }
  };

  const renderResults = () => {
    if (!funnelData) return null;

    return (
      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="flex flex-wrap border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-4 px-6 font-semibold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 ${activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
          >
            <LayoutTemplate size={18} /> Overview
          </button>
          <button
            onClick={() => setActiveTab('pages')}
            className={`flex-1 py-4 px-6 font-semibold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 ${activeTab === 'pages' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
          >
            <FileText size={18} /> Pages
          </button>
          <button
            onClick={() => setActiveTab('emails')}
            className={`flex-1 py-4 px-6 font-semibold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 ${activeTab === 'emails' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
          >
            <Mail size={18} /> Emails
          </button>
          <button
            onClick={() => setActiveTab('monetization')}
            className={`flex-1 py-4 px-6 font-semibold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 ${activeTab === 'monetization' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
          >
            <DollarSign size={18} /> Monetization
          </button>
        </div>

        <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto bg-slate-50/50">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><CheckCircle className="text-indigo-500" size={20}/> Target Audience</h4>
                <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700">{funnelData.overview.targetAudience}</div>
              </section>
              <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><CheckCircle className="text-indigo-500" size={20}/> The Offer</h4>
                <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700">{funnelData.overview.offer}</div>
              </section>
              <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><CheckCircle className="text-indigo-500" size={20}/> Lead Magnet Ideas</h4>
                <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700">{funnelData.overview.leadMagnet}</div>
              </section>
              <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><CheckCircle className="text-indigo-500" size={20}/> Funnel Flow</h4>
                <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700">{funnelData.overview.funnelFlow}</div>
              </section>
            </div>
          )}

          {activeTab === 'pages' && (
            <div className="space-y-8">
              <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xl font-bold text-slate-900 mb-4">Landing Page Copy</h4>
                <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700 bg-slate-50 p-6 rounded-lg border border-slate-100">{funnelData.pages.landingPage}</div>
              </section>
              <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xl font-bold text-slate-900 mb-4">Sales Page Copy</h4>
                <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700 bg-slate-50 p-6 rounded-lg border border-slate-100">{funnelData.pages.salesPage}</div>
              </section>
            </div>
          )}

          {activeTab === 'emails' && (
            <div className="space-y-6">
              {funnelData.emails.map((email, index) => (
                <section key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Day {index + 1}: {email.subject}</h4>
                  <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700 bg-slate-50 p-6 rounded-lg border border-slate-100 mt-4">{email.body}</div>
                </section>
              ))}
            </div>
          )}

          {activeTab === 'monetization' && (
            <div className="space-y-8">
              <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xl font-bold text-slate-900 mb-4">Upsell Strategy</h4>
                <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700">{funnelData.monetization.upsell}</div>
              </section>
              <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xl font-bold text-slate-900 mb-4">Downsell Strategy</h4>
                <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700">{funnelData.monetization.downsell}</div>
              </section>
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-slate-200 bg-white flex flex-wrap gap-4 justify-between items-center">
          <button 
            onClick={() => setStep(1)} 
            className="text-slate-500 hover:text-indigo-600 font-medium transition-colors"
          >
            Start Over
          </button>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                const textToCopy = `
FUNNEL BLUEPRINT

--- OVERVIEW ---
Target Audience: ${funnelData.overview.targetAudience}
Offer: ${funnelData.overview.offer}
Lead Magnet: ${funnelData.overview.leadMagnet}
Funnel Flow: ${funnelData.overview.funnelFlow}

--- PAGES ---
Landing Page:
${funnelData.pages.landingPage}

Sales Page:
${funnelData.pages.salesPage}

--- EMAILS ---
${funnelData.emails.map((e, i) => `Day ${i + 1}: ${e.subject}\n${e.body}`).join('\n\n')}

--- MONETIZATION ---
Upsell: ${funnelData.monetization.upsell}
Downsell: ${funnelData.monetization.downsell}
                `.trim();
                navigator.clipboard.writeText(textToCopy);
                alert('Copied to clipboard!');
              }}
              className="bg-white text-slate-700 border border-slate-300 px-6 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
            >
              <FileText size={18} /> Copy Text
            </button>
            <button 
              onClick={() => {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(funnelData, null, 2));
                const downloadAnchorNode = document.createElement('a');
                downloadAnchorNode.setAttribute("href",     dataStr);
                downloadAnchorNode.setAttribute("download", "funnel-blueprint.json");
                document.body.appendChild(downloadAnchorNode);
                downloadAnchorNode.click();
                downloadAnchorNode.remove();
              }}
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md flex items-center gap-2"
            >
              <Download size={18} /> Export JSON
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {step < 5 ? (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
            <div 
              className="h-full bg-indigo-600 transition-all duration-500 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          <div className="mb-8 flex justify-between items-center text-sm font-medium text-slate-400">
            <span>Step {step} of 4</span>
            {step > 1 && (
              <button onClick={prevStep} className="hover:text-slate-700 transition-colors">
                Back
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {renderWizardStep()}
          </AnimatePresence>

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="mt-10 flex justify-end">
            {step < 4 ? (
              <button
                onClick={nextStep}
                className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center group"
              >
                Next Step
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                onClick={generateFunnel}
                disabled={isGenerating}
                className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center group disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Building Funnel...
                  </>
                ) : (
                  <>
                    Generate Full Funnel
                    <SparklesIcon className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Your Custom Funnel Blueprint</h2>
            <p className="text-slate-600">We've generated a complete, high-converting sales funnel based on your inputs.</p>
          </div>
          {renderResults()}
        </div>
      )}
    </div>
  );
};

// Extracted Sparkles icon to avoid missing import
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/>
    <path d="M19 17v4"/>
    <path d="M3 5h4"/>
    <path d="M17 19h4"/>
  </svg>
);

export default FunnelBuilder;
