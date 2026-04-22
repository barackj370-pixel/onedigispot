import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { PenTool, Loader2, Sparkles, Copy, Download, CheckCircle2, FileText } from 'lucide-react';
import Markdown from 'react-markdown';

const ContentGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [wordCount, setWordCount] = useState<number>(1000);
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateContent = async () => {
    if (!topic) {
      setError('Please enter a seed topic or heading.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setContent('');
    setCopied(false);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `You are an expert content writer and SEO specialist. Write a comprehensive, high-quality article about "${topic}".
      
      Requirements:
      - Target word count: approximately ${wordCount} words.
      - Keywords to include naturally (do not overuse or stuff them): ${keywords ? keywords : 'None specified'}.
      - Structure: Must include a clear Introduction, well-organized body paragraphs with appropriate H2 and H3 headings, and a Conclusion.
      - Tone: Professional, engaging, and informative.
      - Format: Markdown. Do not wrap the response in markdown code blocks (e.g., \`\`\`markdown), just return the raw markdown text.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
      });

      let generatedText = response.text || "";
      // Strip markdown code block wrappers if the model still includes them
      if (generatedText.startsWith('```markdown')) {
        generatedText = generatedText.replace(/^```markdown\n/, '').replace(/\n```$/, '');
      } else if (generatedText.startsWith('```')) {
        generatedText = generatedText.replace(/^```\n/, '').replace(/\n```$/, '');
      }

      setContent(generatedText);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadContent = () => {
    if (!content) return;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${topic.replace(/\s+/g, '-').toLowerCase()}-article.md`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="content-generator" className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm mb-6">
            <PenTool size={16} />
            <span>SEO Content Writer</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">High-Quality Content Generator</h2>
          <p className="text-slate-600 text-lg">
            Generate long-form, keyword-optimized articles with proper headings, introductions, and conclusions. 
            Perfect for blogs, landing pages, and SEO campaigns.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <FileText className="text-indigo-600" />
                Article Settings
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Seed Topic or Heading *</label>
                  <textarea 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. The Ultimate Guide to B2B SaaS Marketing in 2026..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Target Keywords (Optional)</label>
                  <input 
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g. SaaS marketing, B2B growth, lead generation"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                  />
                  <p className="text-xs text-slate-500 mt-2">Separate keywords with commas. The AI will weave them in naturally without stuffing.</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-slate-700">Word Count</label>
                    <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{wordCount} words</span>
                  </div>
                  <input 
                    type="range"
                    min="250"
                    max="3000"
                    step="50"
                    value={wordCount}
                    onChange={(e) => setWordCount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                    <span>250</span>
                    <span>3000</span>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                    {error}
                  </div>
                )}

                <button 
                  onClick={generateContent}
                  disabled={isGenerating}
                  className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Writing Article...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate Content
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Content Preview */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm h-full min-h-[600px] flex flex-col overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700 font-bold">
                  <FileText size={18} className="text-indigo-600" />
                  Generated Article
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={copyToClipboard}
                    disabled={!content}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copied ? <CheckCircle2 size={16} className="text-emerald-600" /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button 
                    onClick={downloadContent}
                    disabled={!content}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download size={16} />
                    Download .md
                  </button>
                </div>
              </div>
              
              <div className="p-8 flex-grow overflow-y-auto bg-white">
                {!content && !isGenerating ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                    <PenTool size={48} className="mb-4 opacity-20" />
                    <p className="max-w-sm">
                      Your generated article will appear here. It will include proper headings, an introduction, body paragraphs, and a conclusion.
                    </p>
                  </div>
                ) : isGenerating ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-indigo-600">
                    <Loader2 size={48} className="mb-4 animate-spin opacity-50" />
                    <p className="font-medium animate-pulse">Crafting your masterpiece...</p>
                  </div>
                ) : (
                  <div className="prose prose-slate prose-indigo max-w-none">
                    <div className="markdown-body">
                      <Markdown>{content}</Markdown>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentGenerator;
