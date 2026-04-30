import React from 'react';
import { Link } from 'react-router-dom';
import { Image as ImageIcon, Share2, ArrowRight, Search, PenTool, Filter, Video, CreditCard } from 'lucide-react';

const ToolsPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">Free AI Marketing Tools</h1>
          <p className="text-xl text-slate-600">
            Empower your brand with our world-class AI tools. Select a tool below to get started.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <Link to="/free-ai-logo-maker" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ImageIcon size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">High-End Logo Generator</h2>
            <p className="text-slate-600 mb-8 flex-grow">
              Describe your brand vision, and our AI will craft a professional, high-quality logo for your business in seconds.
            </p>
            <div className="flex items-center text-indigo-600 font-bold mt-auto">
              Learn More <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          <Link to="/social-media-ai-post-master" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Share2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Social Media AI Post Master</h2>
            <p className="text-slate-600 mb-8 flex-grow">
              Generate, schedule, and automate a full week of high-quality social media content (text & video) from a single topic.
            </p>
            <div className="flex items-center text-blue-600 font-bold mt-auto">
              Learn More <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          <Link to="/free-seo-keyword-generator" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Search size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">SEO Keyword Generator</h2>
            <p className="text-slate-600 mb-8 flex-grow">
              Discover up to 100 high-volume, relevant keywords for your niche using real-time Google Search data.
            </p>
            <div className="flex items-center text-emerald-600 font-bold mt-auto">
              Learn More <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          <Link to="/free-ai-content-writer" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full">
            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <PenTool size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">SEO Content Writer</h2>
            <p className="text-slate-600 mb-8 flex-grow">
              Generate long-form, keyword-optimized articles with proper headings, introductions, and conclusions.
            </p>
            <div className="flex items-center text-orange-600 font-bold mt-auto">
              Learn More <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          <Link to="/ai-sales-funnel-builder" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Filter size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">AI Funnel Builder</h2>
            <p className="text-slate-600 mb-8 flex-grow">
              Generate a complete, high-converting sales funnel including landing pages, email sequences, and upsell strategies.
            </p>
            <div className="flex items-center text-purple-600 font-bold mt-auto">
              Learn More <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          <Link to="/free-screen-recorder" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full">
            <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Video size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Screen & Video Recorder</h2>
            <p className="text-slate-600 mb-8 flex-grow">
              Record your screen, browser tabs, and webcam seamlessly. Great for quick tutorials and sales videos.
            </p>
            <div className="flex items-center text-rose-600 font-bold mt-auto">
              Learn More <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          <Link to="/free-digital-business-card-generator" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CreditCard size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Digital Business Card</h2>
            <p className="text-slate-600 mb-8 flex-grow">
              Generate a stunning digital business card complete with a custom abbreviation logo and your brand colors.
            </p>
            <div className="flex items-center text-amber-600 font-bold mt-auto">
              Learn More <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
