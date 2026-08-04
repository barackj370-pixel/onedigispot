import React, { useState } from 'react';
import { 
   Scissors, 
   Music, 
   Type, 
   Image as ImageIcon, 
   Video as VideoIcon, 
   Mic, 
   Layers, 
   Zap, 
   Download, 
   Wand2, 
   Maximize, 
   Minimize,
   Play,
   Pause,
   SkipBack,
   Settings,
   Plus,
   MousePointer2,
   SplitSquareHorizontal,
   Trash2,
   Crown,
   ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const VideoEditorPage: React.FC = () => {
   const [isPlaying, setIsPlaying] = useState(false);
   const [currentTime, setCurrentTime] = useState('00:00:00');
   const [activeTool, setActiveTool] = useState('select');
   const [videoUrl, setVideoUrl] = useState<string | null>(null);
   const [duration, setDuration] = useState('00:00:00');
   const videoRef = React.useRef<HTMLVideoElement>(null);

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const url = URL.createObjectURL(file);
         setVideoUrl(url);
      }
   };

   const formatTime = (seconds: number) => {
      const date = new Date(0);
      date.setSeconds(seconds);
      return date.toISOString().substring(11, 19);
   };

   const handleTimeUpdate = () => {
      if (videoRef.current) {
         setCurrentTime(formatTime(videoRef.current.currentTime));
      }
   };

   const handleLoadedMetadata = () => {
      if (videoRef.current) {
         setDuration(formatTime(videoRef.current.duration));
      }
   };

   const togglePlay = () => {
      if (videoRef.current) {
         if (isPlaying) {
            videoRef.current.pause();
         } else {
            videoRef.current.play().catch(e => console.error("Play error:", e));
         }
         setIsPlaying(!isPlaying);
      }
   };

   const tools = [
      { id: 'select', icon: <MousePointer2 size={18} />, label: 'Select' },
      { id: 'copy', icon: <Layers size={18} />, label: 'Copy / Paste' },
      { id: 'cut', icon: <Scissors size={18} />, label: 'Cut / Trim' },
      { id: 'split', icon: <SplitSquareHorizontal size={18} />, label: 'Split' },
      { id: 'text', icon: <Type size={18} />, label: 'Text' },
      { id: 'image', icon: <ImageIcon size={18} />, label: 'Images & Shapes' },
      { id: 'music', icon: <Music size={18} />, label: 'Audio Tracks' },
      { id: 'voiceover', icon: <Mic size={18} />, label: 'Voiceover' },
      { id: 'effects', icon: <Zap size={18} />, label: 'Transitions & Overlays' },
      { id: 'ai', icon: <Wand2 size={18} />, label: 'AI Magic' },
   ];

   const timelineTracks = [
      { name: 'Video 1', color: 'bg-indigo-500', segments: [{ width: '60%', left: '0%' }, { width: '30%', left: '65%' }] },
      { name: 'Audio 1', color: 'bg-emerald-500', segments: [{ width: '90%', left: '5%' }] },
      { name: 'Text / Overlays', color: 'bg-amber-500', segments: [{ width: '20%', left: '10%' }, { width: '15%', left: '70%' }] },
   ];

   return (
      <div className="h-screen bg-slate-900 text-slate-300 flex flex-col font-sans overflow-hidden">
         {/* Top Bar */}
         <div className="h-14 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-4">
               <Link to="/app/screen-recorder" className="text-slate-400 hover:text-white transition-colors">
                  <ChevronLeft className="w-5 h-5" />
               </Link>
               <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                     <VideoIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-white text-sm">Untitled Project</span>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <button className="text-amber-400 hover:text-amber-300 flex items-center gap-1.5 text-sm font-bold bg-amber-400/10 px-3 py-1.5 rounded-lg border border-amber-400/20">
                  <Crown className="w-4 h-4" />
                  Upgrade to Pro
               </button>
               <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-1.5 rounded-lg text-sm font-bold shadow-lg flex items-center gap-2 transition-colors">
                  <Download className="w-4 h-4" />
                  Export
               </button>
            </div>
         </div>

         <div className="flex flex-1 overflow-hidden">
            {/* Left Sidebar (Assets/Tools) */}
            <div className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0">
               <div className="flex border-b border-slate-800">
                  <button className="flex-1 py-3 text-xs font-bold text-indigo-400 border-b-2 border-indigo-500">Media</button>
                  <button className="flex-1 py-3 text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors">Effects</button>
                  <button className="flex-1 py-3 text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors">Text</button>
               </div>
               <div className="p-4 flex-1 overflow-y-auto">
                  <label className="w-full border border-dashed border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-colors mb-4 cursor-pointer">
                     <Plus className="w-6 h-6 text-slate-500" />
                     <span className="text-sm font-medium text-slate-400">Import Media</span>
                     <input type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                     {videoUrl && (
                        <div className="aspect-video bg-slate-800 rounded-lg relative group overflow-hidden border border-slate-700">
                           <video src={videoUrl} className="w-full h-full object-cover" />
                        </div>
                     )}
                     <div className="aspect-video bg-slate-800 rounded-lg relative group overflow-hidden border border-slate-700">
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity cursor-pointer">
                           <Plus className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black/70 px-1 rounded text-[10px] text-white">05:23</div>
                     </div>
                  </div>
               </div>
               
               {/* Advanced Feature Promo */}
               <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">AI Magic Tools</h4>
                  <div className="space-y-2">
                     <button className="w-full text-left px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-sm font-medium flex items-center gap-2 text-slate-300">
                        <Layers className="w-4 h-4 text-emerald-400" /> Remove Background
                     </button>
                     <button className="w-full text-left px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-sm font-medium flex items-center gap-2 text-slate-300">
                        <Type className="w-4 h-4 text-sky-400" /> Auto-Captions
                     </button>
                  </div>
               </div>
            </div>

            {/* Main Stage */}
            <div className="flex-1 flex flex-col relative bg-black">
               {/* Video Player */}
               <div className="flex-1 p-8 flex items-center justify-center relative">
                  <div className="aspect-video w-full max-w-4xl bg-slate-900 rounded-lg shadow-2xl border border-slate-800 flex items-center justify-center relative overflow-hidden group">
                     {videoUrl ? (
                        <video 
                           ref={videoRef} 
                           src={videoUrl} 
                           className="w-full h-full object-contain" 
                           onTimeUpdate={handleTimeUpdate}
                           onLoadedMetadata={handleLoadedMetadata}
                           onClick={togglePlay}
                        />
                     ) : (
                        <div className="absolute inset-0 bg-slate-800 flex flex-col items-center justify-center">
                           <ImageIcon className="w-16 h-16 text-slate-700 mb-4" />
                           <p className="text-slate-500 font-medium">Import media to start editing</p>
                        </div>
                     )}
                  </div>
               </div>

               {/* Player Controls */}
               <div className="h-12 bg-slate-950 flex items-center justify-center gap-6 px-4 border-t border-slate-800 shrink-0">
                  <span className="text-xs font-mono text-slate-400">{currentTime}</span>
                  <div className="flex items-center gap-2">
                     <button className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors">
                        <SkipBack className="w-4 h-4" />
                     </button>
                     <button 
                        onClick={togglePlay}
                        className="p-2 text-slate-900 bg-white hover:bg-slate-200 rounded-full transition-colors"
                     >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                     </button>
                     <button className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors">
                        <SkipBack className="w-4 h-4 rotate-180" />
                     </button>
                  </div>
                  <span className="text-xs font-mono text-slate-600">{duration}</span>
               </div>
            </div>
            
            {/* Right Panel (Properties) */}
            <div className="w-64 bg-slate-950 border-l border-slate-800 flex flex-col shrink-0">
               <div className="p-4 border-b border-slate-800">
                  <h3 className="font-bold text-white text-sm">Properties</h3>
               </div>
               <div className="p-4 space-y-4">
                  <div>
                     <label className="text-xs font-bold text-slate-500 mb-1.5 block">Format & Canvas</label>
                     <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none focus:border-indigo-500 mb-2">
                        <option>16:9 (Landscape)</option>
                        <option>9:16 (Vertical)</option>
                        <option>1:1 (Square)</option>
                     </select>
                     <button className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium transition-colors">
                        Crop & Resize Video
                     </button>
                  </div>
                  <div>
                     <label className="text-xs font-bold text-slate-500 mb-1.5 block">Playback Speed</label>
                     <div className="flex items-center gap-2">
                        <input type="range" min="0.25" max="2" step="0.25" defaultValue="1" className="flex-1 accent-indigo-500" />
                        <span className="text-xs font-mono text-slate-400 bg-slate-900 px-1.5 py-1 rounded">1.0x</span>
                     </div>
                  </div>
                  <div className="pt-4 border-t border-slate-800">
                     <label className="text-xs font-bold text-slate-500 mb-2 block">Effects & Greenscreen</label>
                     <div className="space-y-2">
                        <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors text-left px-3">
                           🟢 Apply Green Screen
                        </button>
                        <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors text-left px-3">
                           💧 Blur Background
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom Timeline */}
         <div className="h-64 bg-slate-950 border-t border-slate-800 flex flex-col shrink-0">
            {/* Toolbar */}
            <div className="h-10 border-b border-slate-800 px-4 flex items-center gap-2">
               {tools.map(t => (
                  <button 
                     key={t.id}
                     onClick={() => setActiveTool(t.id)}
                     className={`p-1.5 rounded transition-colors ${activeTool === t.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                     title={t.label}
                  >
                     {t.icon}
                  </button>
               ))}
               <div className="w-px h-5 bg-slate-800 mx-2" />
               <button className="p-1.5 rounded transition-colors text-slate-400 hover:text-white hover:bg-slate-800" title="Delete">
                  <Trash2 size={18} />
               </button>
               
               <div className="ml-auto flex items-center gap-2">
                  <button className="p-1 text-slate-400 hover:text-white"><Minimize size={16} /></button>
                  <div className="w-24 h-1 bg-slate-800 rounded-full">
                     <div className="w-1/2 h-full bg-slate-500 rounded-full" />
                  </div>
                  <button className="p-1 text-slate-400 hover:text-white"><Maximize size={16} /></button>
               </div>
            </div>
            
            {/* Tracks Area */}
            <div className="flex-1 overflow-auto relative p-2">
               {/* Time ruler */}
               <div className="h-6 border-b border-slate-800/50 mb-2 relative">
                  {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
                     <div key={i} className="absolute top-0 text-[10px] text-slate-600" style={{ left: `${i * 10}%` }}>
                        0{i}:00
                     </div>
                  ))}
               </div>

               <div className="space-y-2">
                  {timelineTracks.map((track, idx) => (
                     <div key={idx} className="flex h-12 bg-slate-900 rounded-md border border-slate-800/50 relative overflow-hidden group">
                        <div className="w-32 bg-slate-800/50 border-r border-slate-800 px-3 py-1 flex items-center z-10">
                           <span className="text-xs font-medium text-slate-400 truncate">{track.name}</span>
                        </div>
                        <div className="flex-1 relative">
                           {/* Grid lines */}
                           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgwLjV2NDBIMHptMjAgMGgwLjV2NDBIMjB6IiBmaWxsPSIjMWUxZTJmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] opacity-30" />
                           
                           {/* Segments */}
                           {track.segments.map((seg, sIdx) => (
                              <div 
                                 key={sIdx} 
                                 className={`absolute top-1 bottom-1 rounded ${track.color} border border-white/20 shadow-sm cursor-grab hover:brightness-110 transition-all`}
                                 style={{ width: seg.width, left: seg.left }}
                              >
                                 {/* Trim handles */}
                                 <div className="absolute left-0 top-0 bottom-0 w-2 hover:bg-white/30 cursor-col-resize transition-colors rounded-l" />
                                 <div className="absolute right-0 top-0 bottom-0 w-2 hover:bg-white/30 cursor-col-resize transition-colors rounded-r" />
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>

               {/* Playhead */}
               <div className="absolute top-0 bottom-0 w-px bg-red-500 z-20 left-[25%]">
                  <div className="w-3 h-3 border-4 border-red-500 bg-black rounded-full absolute -top-1.5 -left-1.5 cursor-ew-resize" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default VideoEditorPage;
