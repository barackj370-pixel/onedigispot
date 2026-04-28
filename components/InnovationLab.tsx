
import React, { useState } from 'react';
import { generateRoadmap } from '../services/geminiService';
import { RoadmapResponse } from '../types';

const InnovationLab: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;
    setLoading(true);
    const result = await generateRoadmap(idea);
    setRoadmap(result);
    setLoading(false);
  };

  return (
    <section id="innovation-lab" className="scroll-mt-24 py-16 md:py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 md:p-12 opacity-10">
        <div className="text-[120px] md:text-[200px] font-black select-none">LAB</div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="text-indigo-400 font-bold uppercase tracking-widest text-xs md:text-sm mb-3">Innovation Lab</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 leading-tight">Validate Your Next Big Idea</h3>
            <p className="text-slate-400 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
              Use our AI-powered roadmap generator to visualize the technical path for your innovation. Describe your challenge, and get a professional breakdown from our hub.
            </p>

            <form onSubmit={handleGenerate} className="relative">
              <textarea 
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Ex: A global AI-powered supply chain tracker for sustainable logistics..."
                className="w-full h-40 bg-slate-800 border border-slate-700 rounded-2xl p-6 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all mb-4"
              />
              <button 
                disabled={loading}
                type="submit"
                className="w-full py-4 bg-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-500 transition-all disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Thinking...
                  </>
                ) : 'Generate Innovation Roadmap'}
              </button>
            </form>
          </div>

          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 min-h-[400px] flex flex-col">
            {!roadmap && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-700 rounded-2xl">
                <div className="text-5xl mb-4">✨</div>
                <p className="text-slate-500 italic">Your project roadmap will appear here...</p>
              </div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400">Our AI architect is analyzing your project...</p>
              </div>
            )}

            {roadmap && !loading && (
              <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                <div>
                  <h4 className="text-2xl font-bold text-indigo-400 mb-2">{roadmap.projectName}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{roadmap.summary}</p>
                </div>
                
                <div className="space-y-4">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">Phased Execution</h5>
                  {roadmap.phases.map((phase, i) => (
                    <div key={i} className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-white">{phase.name}</span>
                        <span className="text-xs text-indigo-400 px-2 py-0.5 bg-indigo-900/30 rounded-full">{phase.duration}</span>
                      </div>
                      <ul className="text-xs text-slate-400 space-y-1">
                        {phase.tasks.map((task, j) => (
                          <li key={j} className="flex items-start">
                            <span className="text-indigo-500 mr-2">•</span> {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Recommended Tech Stack</h5>
                  <div className="flex flex-wrap gap-2">
                    {roadmap.techStack.map((tech, i) => (
                      <span key={i} className="text-xs font-medium px-3 py-1 bg-slate-700 text-slate-200 rounded-full">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationLab;
