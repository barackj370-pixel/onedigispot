import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Loader2, ArrowRight, CheckCircle, LayoutTemplate, Mail, DollarSign, 
  FileText, Download, Layout, MousePointer, ShoppingCart, ArrowUpCircle, 
  ArrowDownCircle, Clock, Settings, Target, Plus, Trash, Edit, Save, Play, 
  ChevronRight, GripVertical, Rocket
} from 'lucide-react';

interface FunnelData {
  overview: {
    targetAudience: string;
    offer: string;
    leadMagnet: string;
    funnelFlow: string;
  };
  pages: {
    landing: {
      headline: string;
      subheadline: string;
      benefits: string[];
      body: string;
      ctaText: string;
    };
    sales: {
      headline: string;
      hook: string;
      problem: string;
      solution: string;
      pricing: string;
      guarantee: string;
      ctaText: string;
    };
  };
  monetization: {
    upsell: {
      headline: string;
      pitch: string;
      price: string;
      ctaText: string;
    };
    downsell: {
      headline: string;
      pitch: string;
      price: string;
      ctaText: string;
    };
  };
  emails: {
    subject: string;
    body: string;
    delayDays: number;
  }[];
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
  const [activeTab, setActiveTab] = useState<'landing' | 'sales' | 'upsell' | 'downsell' | 'emails' | 'overview'>('landing');
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
        You are an expert AI Sales Funnel Builder. Generate a complete, high-converting sales funnel based on:
        - Business Type: ${formData.business}
        - Product/Service: ${formData.product}
        - Target Audience: ${formData.audience}
        - Goal: ${formData.goal}

        Output the funnel in the exact JSON structure requested.
        - overview: Define the target audience, offer, lead magnet ideas, and the funnel flow diagram.
        - pages.landing: A squeeze page with a strong headline, subheadline, 3-4 bullet benefits, body text, and a CTA button text.
        - pages.sales: A long-form sales page with a headline, hook, problem agitation, solution, pricing strategy, guarantee, and CTA button text.
        - monetization.upsell: A one-click upsell offer with a headline, short pitch, price, and CTA.
        - monetization.downsell: A downsell offer with a headline, short pitch, price, and CTA.
        - emails: A 5-day email sequence. Each email needs a subject, body, and a delayDays (e.g., 0 for immediate, 1 for next day).
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
                  landing: {
                    type: Type.OBJECT,
                    properties: {
                      headline: { type: Type.STRING },
                      subheadline: { type: Type.STRING },
                      benefits: { type: Type.ARRAY, items: { type: Type.STRING } },
                      body: { type: Type.STRING },
                      ctaText: { type: Type.STRING }
                    },
                    required: ["headline", "subheadline", "benefits", "body", "ctaText"]
                  },
                  sales: {
                    type: Type.OBJECT,
                    properties: {
                      headline: { type: Type.STRING },
                      hook: { type: Type.STRING },
                      problem: { type: Type.STRING },
                      solution: { type: Type.STRING },
                      pricing: { type: Type.STRING },
                      guarantee: { type: Type.STRING },
                      ctaText: { type: Type.STRING }
                    },
                    required: ["headline", "hook", "problem", "solution", "pricing", "guarantee", "ctaText"]
                  }
                },
                required: ["landing", "sales"]
              },
              monetization: {
                type: Type.OBJECT,
                properties: {
                  upsell: {
                    type: Type.OBJECT,
                    properties: {
                      headline: { type: Type.STRING },
                      pitch: { type: Type.STRING },
                      price: { type: Type.STRING },
                      ctaText: { type: Type.STRING }
                    },
                    required: ["headline", "pitch", "price", "ctaText"]
                  },
                  downsell: {
                    type: Type.OBJECT,
                    properties: {
                      headline: { type: Type.STRING },
                      pitch: { type: Type.STRING },
                      price: { type: Type.STRING },
                      ctaText: { type: Type.STRING }
                    },
                    required: ["headline", "pitch", "price", "ctaText"]
                  }
                },
                required: ["upsell", "downsell"]
              },
              emails: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    subject: { type: Type.STRING },
                    body: { type: Type.STRING },
                    delayDays: { type: Type.NUMBER }
                  },
                  required: ["subject", "body", "delayDays"]
                }
              }
            },
            required: ["overview", "pages", "monetization", "emails"]
          }
        }
      });

      const jsonStr = response.text?.trim() || '{}';
      const parsedData = JSON.parse(jsonStr) as FunnelData;
      setFunnelData(parsedData);
      setStep(5); // Move to workspace view
    } catch (err) {
      console.error("Error generating funnel:", err);
      setError("Failed to generate funnel. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // --- Update Handlers for the Visual Editor ---
  const updatePage = (page: 'landing' | 'sales', field: string, value: string | string[]) => {
    if (!funnelData) return;
    setFunnelData({
      ...funnelData,
      pages: {
        ...funnelData.pages,
        [page]: {
          ...funnelData.pages[page],
          [field]: value
        }
      }
    });
  };

  const updateMonetization = (offer: 'upsell' | 'downsell', field: string, value: string) => {
    if (!funnelData) return;
    setFunnelData({
      ...funnelData,
      monetization: {
        ...funnelData.monetization,
        [offer]: {
          ...funnelData.monetization[offer],
          [field]: value
        }
      }
    });
  };

  const updateEmail = (index: number, field: string, value: string | number) => {
    if (!funnelData) return;
    const newEmails = [...funnelData.emails];
    newEmails[index] = { ...newEmails[index], [field]: value };
    setFunnelData({ ...funnelData, emails: newEmails });
  };

  // --- Render Helpers ---
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

  const renderWorkspace = () => {
    if (!funnelData) return null;

    const inputClasses = "w-full bg-transparent hover:bg-slate-50 focus:bg-white border border-transparent hover:border-slate-200 focus:border-indigo-500 rounded-lg transition-colors p-2 outline-none";

    return (
      <div className="w-full max-w-[1400px] mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex h-[85vh] min-h-[700px]">
        
        {/* Sidebar */}
        <div className="w-72 bg-slate-50 border-r border-slate-200 flex flex-col h-full">
          <div className="p-5 border-b border-slate-200 bg-white flex items-center justify-between">
            <div className="font-bold text-slate-800 flex items-center gap-2">
              <Layout size={20} className="text-indigo-600" /> Funnel Steps
            </div>
            <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500"><Plus size={16}/></button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 space-y-1">
            <button onClick={() => setActiveTab('landing')} className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${activeTab === 'landing' ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-600 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}>
              <MousePointer size={18} className={activeTab === 'landing' ? 'text-indigo-600' : 'text-slate-400'} />
              1. Squeeze Page
            </button>
            <button onClick={() => setActiveTab('sales')} className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${activeTab === 'sales' ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-600 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}>
              <ShoppingCart size={18} className={activeTab === 'sales' ? 'text-indigo-600' : 'text-slate-400'} />
              2. Sales Page
            </button>
            <button onClick={() => setActiveTab('upsell')} className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${activeTab === 'upsell' ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-600 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}>
              <ArrowUpCircle size={18} className={activeTab === 'upsell' ? 'text-indigo-600' : 'text-slate-400'} />
              3. Upsell Offer
            </button>
            <button onClick={() => setActiveTab('downsell')} className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${activeTab === 'downsell' ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-600 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}>
              <ArrowDownCircle size={18} className={activeTab === 'downsell' ? 'text-indigo-600' : 'text-slate-400'} />
              4. Downsell Offer
            </button>

            <div className="px-5 pt-6 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Automations
            </div>
            <button onClick={() => setActiveTab('emails')} className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${activeTab === 'emails' ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-600 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}>
              <Clock size={18} className={activeTab === 'emails' ? 'text-indigo-600' : 'text-slate-400'} />
              Email Campaign
            </button>

            <div className="px-5 pt-6 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Settings
            </div>
            <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${activeTab === 'overview' ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-600 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}>
              <Target size={18} className={activeTab === 'overview' ? 'text-indigo-600' : 'text-slate-400'} />
              Funnel Overview
            </button>
          </div>

          <div className="p-4 border-t border-slate-200 bg-white">
            <button onClick={() => alert('Funnel Published to Live URL!')} className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
              <Rocket size={16} /> Publish Funnel
            </button>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col bg-slate-100 overflow-hidden relative">
          {/* Top Bar */}
          <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
            <div className="font-semibold text-slate-800 flex items-center gap-2">
              <Edit size={16} className="text-slate-400" />
              Editing: <span className="text-indigo-600 capitalize">{activeTab.replace(/([A-Z])/g, ' $1').trim()}</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1">
                <Play size={14} /> Preview
              </button>
              <button className="text-sm font-medium bg-slate-900 text-white px-4 py-1.5 rounded-md hover:bg-slate-800 flex items-center gap-1">
                <Save size={14} /> Save Changes
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-sm border border-slate-200 rounded-xl min-h-full">
              
              {/* Landing Page Editor */}
              {activeTab === 'landing' && (
                <div className="p-12 flex flex-col items-center text-center">
                  <textarea 
                    value={funnelData.pages.landing.headline}
                    onChange={(e) => updatePage('landing', 'headline', e.target.value)}
                    className={`${inputClasses} text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 resize-none text-center`}
                    rows={2}
                  />
                  <textarea 
                    value={funnelData.pages.landing.subheadline}
                    onChange={(e) => updatePage('landing', 'subheadline', e.target.value)}
                    className={`${inputClasses} text-xl text-slate-600 mb-10 resize-none text-center`}
                    rows={2}
                  />
                  
                  <div className="w-full max-w-2xl bg-slate-50 p-8 rounded-2xl border border-slate-100 mb-10 text-left">
                    <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">What you'll get:</h4>
                    <ul className="space-y-3">
                      {funnelData.pages.landing.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="text-emerald-500 mt-1 shrink-0" size={18} />
                          <input 
                            value={benefit}
                            onChange={(e) => {
                              const newBenefits = [...funnelData.pages.landing.benefits];
                              newBenefits[idx] = e.target.value;
                              updatePage('landing', 'benefits', newBenefits);
                            }}
                            className={inputClasses}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <textarea 
                    value={funnelData.pages.landing.body}
                    onChange={(e) => updatePage('landing', 'body', e.target.value)}
                    className={`${inputClasses} text-lg text-slate-700 mb-10 resize-none text-center`}
                    rows={4}
                  />

                  <div className="w-full max-w-md relative group">
                    <input 
                      value={funnelData.pages.landing.ctaText}
                      onChange={(e) => updatePage('landing', 'ctaText', e.target.value)}
                      className="w-full bg-indigo-600 text-white text-xl font-bold py-4 px-8 rounded-full text-center outline-none border-2 border-transparent focus:border-indigo-300 shadow-lg shadow-indigo-200"
                    />
                    <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200"><Settings size={16}/></button>
                    </div>
                  </div>
                </div>
              )}

              {/* Sales Page Editor */}
              {activeTab === 'sales' && (
                <div className="p-12">
                  <textarea 
                    value={funnelData.pages.sales.headline}
                    onChange={(e) => updatePage('sales', 'headline', e.target.value)}
                    className={`${inputClasses} text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 resize-none text-center`}
                    rows={2}
                  />
                  <textarea 
                    value={funnelData.pages.sales.hook}
                    onChange={(e) => updatePage('sales', 'hook', e.target.value)}
                    className={`${inputClasses} text-2xl font-medium text-indigo-600 mb-10 resize-none text-center`}
                    rows={2}
                  />
                  
                  <div className="space-y-8 max-w-3xl mx-auto">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">The Problem</label>
                      <textarea 
                        value={funnelData.pages.sales.problem}
                        onChange={(e) => updatePage('sales', 'problem', e.target.value)}
                        className={`${inputClasses} text-lg text-slate-700 resize-none`}
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">The Solution</label>
                      <textarea 
                        value={funnelData.pages.sales.solution}
                        onChange={(e) => updatePage('sales', 'solution', e.target.value)}
                        className={`${inputClasses} text-lg text-slate-700 resize-none`}
                        rows={4}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Pricing Strategy</label>
                        <textarea 
                          value={funnelData.pages.sales.pricing}
                          onChange={(e) => updatePage('sales', 'pricing', e.target.value)}
                          className={`${inputClasses} text-slate-800 font-medium resize-none`}
                          rows={3}
                        />
                      </div>
                      <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                        <label className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 block">Guarantee</label>
                        <textarea 
                          value={funnelData.pages.sales.guarantee}
                          onChange={(e) => updatePage('sales', 'guarantee', e.target.value)}
                          className={`${inputClasses} text-emerald-800 font-medium resize-none`}
                          rows={3}
                        />
                      </div>
                    </div>

                    <div className="flex justify-center pt-8">
                      <input 
                        value={funnelData.pages.sales.ctaText}
                        onChange={(e) => updatePage('sales', 'ctaText', e.target.value)}
                        className="w-full max-w-md bg-orange-500 text-white text-xl font-bold py-4 px-8 rounded-full text-center outline-none border-2 border-transparent focus:border-orange-300 shadow-lg shadow-orange-200"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Upsell/Downsell Editor */}
              {(activeTab === 'upsell' || activeTab === 'downsell') && (
                <div className="p-12 flex flex-col items-center text-center">
                  <div className="inline-block px-4 py-1.5 bg-yellow-100 text-yellow-800 font-bold text-sm rounded-full mb-8 uppercase tracking-wider">
                    Wait! Special One-Time Offer
                  </div>
                  <textarea 
                    value={funnelData.monetization[activeTab].headline}
                    onChange={(e) => updateMonetization(activeTab, 'headline', e.target.value)}
                    className={`${inputClasses} text-4xl font-extrabold text-slate-900 mb-6 resize-none text-center`}
                    rows={2}
                  />
                  <textarea 
                    value={funnelData.monetization[activeTab].pitch}
                    onChange={(e) => updateMonetization(activeTab, 'pitch', e.target.value)}
                    className={`${inputClasses} text-xl text-slate-600 mb-8 resize-none text-center`}
                    rows={4}
                  />
                  
                  <div className="text-5xl font-black text-slate-900 mb-10 flex justify-center items-center gap-2">
                    <input 
                      value={funnelData.monetization[activeTab].price}
                      onChange={(e) => updateMonetization(activeTab, 'price', e.target.value)}
                      className="bg-transparent border-b-2 border-dashed border-slate-300 hover:border-slate-400 focus:border-indigo-500 outline-none text-center w-48"
                    />
                  </div>

                  <input 
                    value={funnelData.monetization[activeTab].ctaText}
                    onChange={(e) => updateMonetization(activeTab, 'ctaText', e.target.value)}
                    className="w-full max-w-md bg-green-500 text-white text-xl font-bold py-4 px-8 rounded-full text-center outline-none border-2 border-transparent focus:border-green-300 shadow-lg shadow-green-200 mb-4"
                  />
                  <button className="text-slate-400 hover:text-slate-600 underline text-sm">
                    No thanks, I don't want this special offer.
                  </button>
                </div>
              )}

              {/* Email Automation Builder */}
              {activeTab === 'emails' && (
                <div className="p-12 bg-slate-50 min-h-full">
                  <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-bold text-slate-900">Email Automation Timeline</h3>
                      <button className="text-sm bg-white border border-slate-200 px-3 py-1.5 rounded-md shadow-sm hover:bg-slate-50 flex items-center gap-2">
                        <Plus size={14}/> Add Email
                      </button>
                    </div>

                    <div className="relative border-l-2 border-indigo-200 ml-4 space-y-8 pb-8">
                      {funnelData.emails.map((email, idx) => (
                        <div key={idx} className="relative pl-8">
                          {/* Timeline Dot */}
                          <div className="absolute -left-[11px] top-4 w-5 h-5 bg-indigo-600 rounded-full border-4 border-slate-50 shadow-sm" />
                          
                          {/* Delay Badge */}
                          <div className="mb-3">
                            <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full border border-indigo-100">
                              <Clock size={12} />
                              Wait {email.delayDays} days
                            </span>
                          </div>

                          {/* Email Card */}
                          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden group">
                            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-3">
                              <GripVertical size={16} className="text-slate-400 cursor-grab" />
                              <div className="flex-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Subject Line</label>
                                <input 
                                  value={email.subject}
                                  onChange={(e) => updateEmail(idx, 'subject', e.target.value)}
                                  className="w-full bg-transparent font-semibold text-slate-900 outline-none"
                                />
                              </div>
                              <button className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash size={16}/></button>
                            </div>
                            <div className="p-4">
                              <textarea 
                                value={email.body}
                                onChange={(e) => updateEmail(idx, 'body', e.target.value)}
                                className="w-full bg-transparent text-slate-600 text-sm outline-none resize-none min-h-[120px]"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Overview / Settings */}
              {activeTab === 'overview' && (
                <div className="p-12">
                  <h3 className="text-2xl font-bold text-slate-900 mb-8">Funnel Settings & Overview</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><Target size={18} className="text-indigo-500"/> Target Audience</h4>
                      <p className="text-slate-600 text-sm">{funnelData.overview.targetAudience}</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><DollarSign size={18} className="text-emerald-500"/> Core Offer</h4>
                      <p className="text-slate-600 text-sm">{funnelData.overview.offer}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><LayoutTemplate size={18} className="text-blue-500"/> Funnel Flow</h4>
                    <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans bg-white p-4 rounded-lg border border-slate-200">
                      {funnelData.overview.funnelFlow}
                    </pre>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><FileText size={18} className="text-orange-500"/> Lead Magnet Ideas</h4>
                    <p className="text-slate-600 text-sm whitespace-pre-wrap">{funnelData.overview.leadMagnet}</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {step < 5 ? (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
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
        renderWorkspace()
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
