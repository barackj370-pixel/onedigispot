import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Search, TrendingUp, BarChart2, Target, Loader2, Download, Sparkles } from 'lucide-react';

interface KeywordData {
  keyword: string;
  volume: number;
  difficulty: string;
  intent: string;
}

const KeywordGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateKeywords = async () => {
    if (!topic) {
      setError('Please enter a seed keyword or topic.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setKeywords([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `You are an expert SEO strategist. Using Google Search data, generate a list of up to 100 highly relevant SEO keywords for the seed topic: "${topic}". 
      Estimate the average monthly search volume based on search trends.
      Sort the final list in descending order based on the monthly search volume.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            description: "A list of SEO keywords sorted by search volume in descending order.",
            items: {
              type: Type.OBJECT,
              properties: {
                keyword: { type: Type.STRING, description: "The specific search query or keyword." },
                volume: { type: Type.NUMBER, description: "Estimated monthly search volume." },
                difficulty: { type: Type.STRING, description: "SEO difficulty: Low, Medium, or High." },
                intent: { type: Type.STRING, description: "Search intent: Informational, Navigational, Commercial, or Transactional." }
              },
              required: ["keyword", "volume", "difficulty", "intent"]
            }
          }
        }
      });

      const generatedContent = JSON.parse(response.text || "[]");
      setKeywords(generatedContent);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate keywords. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const exportToCSV = () => {
    if (keywords.length === 0) return;
    
    const headers = ['Keyword', 'Volume', 'Difficulty', 'Intent'];
    const csvContent = [
      headers.join(','),
      ...keywords.map(k => `"${k.keyword}",${k.volume},"${k.difficulty}","${k.intent}"`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${topic.replace(/\s+/g, '_')}_keywords.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="keyword-generator" className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm mb-6">
            <Search size={16} />
            <span>Data-Driven SEO</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">High-Quality Keyword Generator</h2>
          <p className="text-slate-600 text-lg">
            Discover up to 100 high-volume, relevant keywords for your niche. Powered by real-time Google Search data and AI analysis.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-slate-400" size={20} />
              </div>
              <input 
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && generateKeywords()}
                placeholder="Enter a seed keyword (e.g., 'sustainable fashion', 'B2B SaaS')"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-lg"
              />
            </div>
            <button 
              onClick={generateKeywords}
              disabled={isGenerating}
              className="md:w-auto w-full bg-indigo-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 whitespace-nowrap"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analyzing Data...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Keywords
                </>
              )}
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}
        </div>

        {keywords.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-slate-700 font-bold">
                  <BarChart2 className="text-indigo-600" size={20} />
                  {keywords.length} Keywords Found
                </div>
              </div>
              <button 
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium text-sm shadow-sm"
              >
                <Download size={16} />
                Export to CSV
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 font-bold text-slate-700 whitespace-nowrap">Keyword</th>
                    <th className="p-4 font-bold text-slate-700 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <TrendingUp size={16} />
                        Monthly Volume
                      </div>
                    </th>
                    <th className="p-4 font-bold text-slate-700 whitespace-nowrap">Difficulty</th>
                    <th className="p-4 font-bold text-slate-700 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Target size={16} />
                        Search Intent
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {keywords.map((kw, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-slate-900 font-medium">{kw.keyword}</td>
                      <td className="p-4 text-slate-600 font-mono">{kw.volume.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                          kw.difficulty.toLowerCase() === 'low' ? 'bg-emerald-100 text-emerald-700' :
                          kw.difficulty.toLowerCase() === 'medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {kw.difficulty}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600 text-sm">
                        <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 inline-block font-medium">
                          {kw.intent}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default KeywordGenerator;
