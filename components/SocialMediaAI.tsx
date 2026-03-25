import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  Sparkles, 
  Calendar, 
  Video, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Loader2,
  Music,
  Share2,
  Plus,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Send
} from 'lucide-react';

interface Post {
  id: string;
  dayOfWeek: string;
  content: string;
  description: string;
  type: 'text' | 'video';
  videoUrl?: string;
  scheduledTime: string;
  status: 'draft' | 'scheduled' | 'posting' | 'posted';
  source: 'ai' | 'upload';
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const SocialMediaAI: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [postType, setPostType] = useState<'text' | 'video'>('text');
  const [sound, setSound] = useState('Energetic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // New state for social platforms
  const [platforms, setPlatforms] = useState<string[]>(['LinkedIn', 'Twitter']);
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);

  // Listen for OAuth success messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate origin is from AI Studio preview or localhost
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        const platform = event.data.platform;
        setConnectedPlatforms(prev => 
          prev.includes(platform) ? prev : [...prev, platform]
        );
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleConnect = async (platform: string) => {
    try {
      // 1. Fetch the OAuth URL from your server
      const response = await fetch(`/api/auth/url?platform=${platform}`);
      if (!response.ok) {
        throw new Error('Failed to get auth URL');
      }
      const { url } = await response.json();

      // 2. Open the OAuth PROVIDER's URL directly in popup
      const authWindow = window.open(
        url,
        'oauth_popup',
        'width=600,height=700'
      );

      if (!authWindow) {
        alert('Please allow popups for this site to connect your account.');
      }
    } catch (error) {
      console.error('OAuth error:', error);
      setError(`Failed to connect to ${platform}.`);
    }
  };

  const togglePlatform = (platform: string) => {
    setPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform) 
        : [...prev, platform]
    );
  };

  const generatePosts = async () => {
    if (!topic) {
      setError('Please enter a topic first.');
      return;
    }

    if (platforms.length === 0) {
      setError('Please select at least one social platform.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setPosts([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `Generate 7 high-quality social media posts (one for each day of the week) based on the topic: "${topic}". 
      Each post should be engaging, include relevant hashtags, and be optimized for platforms like ${platforms.join(', ')}.
      Format the output as a JSON array of objects with 'content' (the main post text) and 'description' (a short description of the post/video).`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const generatedContent = JSON.parse(response.text || "[]");
      
      const newPosts: Post[] = generatedContent.map((item: any, index: number) => ({
        id: Math.random().toString(36).substring(7),
        dayOfWeek: DAYS_OF_WEEK[index % 7],
        content: item.content || item,
        description: item.description || 'Auto-generated post',
        type: postType,
        scheduledTime: `09:00`,
        status: 'draft',
        source: 'ai'
      }));

      setPosts(newPosts);

      if (postType === 'video') {
        await generateVideoForPost(newPosts[0].id, newPosts[0].content);
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate posts. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateVideoForPost = async (id: string, content: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `A high-quality, professional social media video related to: ${content}. Style: Modern, clean, and engaging with stylish text captions like inshot videos. Duration: 15 seconds.`,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '9:16'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const videoResponse = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': process.env.GEMINI_API_KEY || '',
          },
        });
        const blob = await videoResponse.blob();
        const url = URL.createObjectURL(blob);
        
        setPosts(prev => prev.map(p => p.id === id ? { ...p, videoUrl: url } : p));
      }
    } catch (err) {
      console.error('Video generation error:', err);
      // Silently fail for video, keep text
    }
  };

  const updatePostDay = (id: string, dayOfWeek: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, dayOfWeek } : p));
  };

  const updatePostTime = (id: string, scheduledTime: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, scheduledTime } : p));
  };

  const updatePostDescription = (id: string, description: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, description } : p));
  };

  const updatePostContent = (id: string, content: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, content } : p));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newPost: Post = {
        id: Math.random().toString(36).substring(7),
        dayOfWeek: DAYS_OF_WEEK[0],
        content: 'Check out my new video!',
        description: 'My custom recorded video',
        type: 'video',
        videoUrl: url,
        scheduledTime: '09:00',
        status: 'draft',
        source: 'upload'
      };
      setPosts(prev => [newPost, ...prev]);
    }
  };

  const sharePost = async (id: string) => {
    if (platforms.length === 0) {
      setError('Please select at least one social platform to share to.');
      return;
    }

    // Simulate posting process
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status: 'posting' } : p));
    
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status: 'posted' } : p));
  };

  const scheduleAll = () => {
    if (platforms.length === 0) {
      setError('Please select at least one social platform to schedule to.');
      return;
    }
    setPosts(prev => prev.map(p => ({ ...p, status: 'scheduled' })));
  };

  return (
    <section id="social-media-ai" className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm mb-6">
            <Sparkles size={16} />
            <span>Global Marketing Tool</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Social Media AI Master</h2>
          <p className="text-slate-600 text-lg">
            Generate, schedule, and auto-post a full week of high-quality social media content across all your favorite platforms.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Configuration Panel */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Plus className="text-indigo-600" />
                New Campaign
              </h3>
              
              <div className="space-y-6">
                {/* Connected Accounts */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Connected Accounts</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['LinkedIn', 'Twitter', 'Instagram', 'Facebook', 'TikTok'].map(platform => {
                      const isConnected = connectedPlatforms.includes(platform);
                      return (
                        <button
                          key={platform}
                          onClick={() => !isConnected && handleConnect(platform)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium border flex items-center gap-1.5 transition-all ${
                            isConnected 
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700 cursor-default' 
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {isConnected ? <CheckCircle2 size={14} /> : <Plus size={14} />}
                          {platform}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Social Platforms Selection */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Target Platforms</label>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button 
                      onClick={() => togglePlatform('LinkedIn')}
                      className={`flex items-center gap-2 p-3 rounded-xl border font-medium transition-all ${platforms.includes('LinkedIn') ? 'bg-[#0A66C2]/10 border-[#0A66C2] text-[#0A66C2]' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                    >
                      <Linkedin size={18} /> LinkedIn
                    </button>
                    <button 
                      onClick={() => togglePlatform('Twitter')}
                      className={`flex items-center gap-2 p-3 rounded-xl border font-medium transition-all ${platforms.includes('Twitter') ? 'bg-black/5 border-black text-black' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                    >
                      <Twitter size={18} /> Twitter
                    </button>
                    <button 
                      onClick={() => togglePlatform('Instagram')}
                      className={`flex items-center gap-2 p-3 rounded-xl border font-medium transition-all ${platforms.includes('Instagram') ? 'bg-[#E1306C]/10 border-[#E1306C] text-[#E1306C]' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                    >
                      <Instagram size={18} /> Instagram
                    </button>
                    <button 
                      onClick={() => togglePlatform('Facebook')}
                      className={`flex items-center gap-2 p-3 rounded-xl border font-medium transition-all ${platforms.includes('Facebook') ? 'bg-[#1877F2]/10 border-[#1877F2] text-[#1877F2]' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                    >
                      <Facebook size={18} /> Facebook
                    </button>
                    <button 
                      onClick={() => togglePlatform('TikTok')}
                      className={`flex items-center gap-2 p-3 rounded-xl border font-medium transition-all ${platforms.includes('TikTok') ? 'bg-black/5 border-black text-black' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg> TikTok
                    </button>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-xl text-xs leading-relaxed">
                    <strong>How Auto-Posting Works:</strong> This interface is currently a <em>UI prototype</em>. To actually auto-post to these platforms, we would need to implement <strong>OAuth Authentication</strong> (where you log into each platform to grant this app permission) and a backend server to execute the API calls. Clicking "Share" or "Schedule" currently simulates this process.
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Seed Topic</label>
                  <textarea 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. The future of AI in African agriculture..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Content Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setPostType('text')}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-bold transition-all ${postType === 'text' ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-600'}`}
                    >
                      <FileText size={18} />
                      Written
                    </button>
                    <button 
                      onClick={() => setPostType('video')}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-bold transition-all ${postType === 'video' ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-600'}`}
                    >
                      <Video size={18} />
                      Video
                    </button>
                  </div>
                </div>

                {postType === 'video' && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Background Sound</label>
                    <select 
                      value={sound}
                      onChange={(e) => setSound(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                    >
                      <option>Energetic</option>
                      <option>Professional</option>
                      <option>Calm</option>
                      <option>Trendy</option>
                    </select>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                    {error}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={generatePosts}
                    disabled={isGenerating || platforms.length === 0}
                    className="flex-1 bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={20} />
                        Generate AI Plan
                      </>
                    )}
                  </button>
                  <label className="flex-1 bg-white border-2 border-indigo-600 text-indigo-600 font-bold py-4 rounded-xl hover:bg-indigo-50 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-indigo-100">
                    <Video size={20} />
                    Upload Video
                    <input type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>
              </div>
            </div>

            {posts.length > 0 && (
              <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-200">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Calendar size={20} />
                  Auto-Post Scheduler
                </h4>
                <p className="text-indigo-100 text-sm mb-6">
                  Ready to automate? Schedule these posts to automatically publish to {platforms.join(', ')} at their designated times.
                </p>
                <button 
                  onClick={scheduleAll}
                  className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={18} />
                  Schedule All to Auto-Post
                </button>
              </div>
            )}
          </div>

          {/* Content Preview */}
          <div className="lg:col-span-2 space-y-6">
            {posts.length === 0 && !isGenerating ? (
              <div className="h-full min-h-[500px] bg-white rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <Share2 className="text-slate-300" size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Content Generated Yet</h3>
                <p className="text-slate-500 max-w-sm">
                  Select your target platforms and enter a topic to generate a full week of auto-postable content.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <select 
                          value={post.dayOfWeek}
                          onChange={(e) => updatePostDay(post.id, e.target.value)}
                          className="bg-slate-50 border border-slate-200 text-slate-900 font-bold py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        >
                          {DAYS_OF_WEEK.map(day => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                        <input 
                          type="time" 
                          value={post.scheduledTime}
                          onChange={(e) => updatePostTime(post.id, e.target.value)}
                          className="bg-slate-50 border border-slate-200 text-slate-600 font-medium py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>
                      <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit ${
                        post.status === 'posted' ? 'bg-emerald-50 text-emerald-600' : 
                        post.status === 'scheduled' ? 'bg-blue-50 text-blue-600' : 
                        post.status === 'posting' ? 'bg-amber-50 text-amber-600' : 
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {post.status === 'posted' ? <CheckCircle2 size={14} /> : 
                         post.status === 'scheduled' ? <Calendar size={14} /> : 
                         post.status === 'posting' ? <Loader2 size={14} className="animate-spin" /> : 
                         <Clock size={14} />}
                        {post.status.toUpperCase()}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div className="md:col-span-2 space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Short Description</label>
                          <input 
                            type="text"
                            value={post.description}
                            onChange={(e) => updatePostDescription(post.id, e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm font-medium"
                            placeholder="Brief description of this post..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Post Content / Caption</label>
                          <textarea 
                            value={post.content}
                            onChange={(e) => updatePostContent(post.id, e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm min-h-[100px] resize-y"
                            placeholder="Write your caption here..."
                          />
                        </div>
                      </div>
                      <div className="md:col-span-1">
                        {post.type === 'video' ? (
                          <div className="aspect-[9/16] bg-slate-900 rounded-2xl overflow-hidden relative group">
                            {post.videoUrl ? (
                              <video 
                                src={post.videoUrl} 
                                className="w-full h-full object-cover"
                                controls
                              />
                            ) : (
                              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                                <Loader2 className="animate-spin mb-2" />
                                <p className="text-[10px] font-medium opacity-70 uppercase tracking-widest">Generating Video...</p>
                              </div>
                            )}
                            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md p-1.5 rounded-lg">
                              <Music size={14} className="text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="aspect-square bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100">
                            <FileText size={40} className="text-indigo-200" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="font-medium">Targeting:</span>
                        <div className="flex gap-1.5">
                          {platforms.includes('LinkedIn') && <Linkedin size={16} className="text-[#0A66C2]" />}
                          {platforms.includes('Twitter') && <Twitter size={16} className="text-black" />}
                          {platforms.includes('Instagram') && <Instagram size={16} className="text-[#E1306C]" />}
                          {platforms.includes('Facebook') && <Facebook size={16} className="text-[#1877F2]" />}
                          {platforms.includes('TikTok') && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>}
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => sharePost(post.id)}
                        disabled={post.status === 'posted' || post.status === 'posting'}
                        className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {post.status === 'posting' ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Sharing...
                          </>
                        ) : post.status === 'posted' ? (
                          <>
                            <CheckCircle2 size={16} />
                            Shared
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Share Now
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaAI;
