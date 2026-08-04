import React, { useState, useRef, useEffect } from 'react';
import { Camera, Monitor, Mic, Square, Play, Download, Settings, Trash2, Pause, RotateCcw, Check, Sparkles, AlertCircle, ChevronDown, Video as VideoIcon, Scissors } from 'lucide-react';
import { Link } from 'react-router-dom';
import AIProcessor from './AIProcessor';

export default function ScreenRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const [useScreen, setUseScreen] = useState(!!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia));
  const [useCamera, setUseCamera] = useState(!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia));

  // Device Selection State
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedMic, setSelectedMic] = useState<string>('default');
  const [selectedCamera, setSelectedCamera] = useState<string>('default');
  const [showSettings, setShowSettings] = useState(false);

  const hasDisplayMediaSupport = !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sourceStreamsRef = useRef<MediaStream[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const recordedVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Load available devices
    const getDevices = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
           const devices = await navigator.mediaDevices.enumerateDevices();
           setDevices(devices);
        }
      } catch (err) {
        console.warn("Could not enumerate devices (likely waiting for permissions):", err);
      }
    };
    getDevices();
  }, []);

  const handleStartRecording = () => {
    if (!useScreen && !useCamera) {
      setError("Please select either screen or camera to record.");
      return;
    }
    startRecording();
  };

  const startRecording = async () => {
    setError(null);
    setRecordedBlob(null);
    setRecordingTime(0);
    setIsPaused(false);

    try {
      const streams: MediaStreamTrack[] = [];
      let screenStream: MediaStream | null = null;
      let cameraStream: MediaStream | null = null;
      let micStream: MediaStream | null = null;

      // Always capture microphone
      try {
         micStream = await navigator.mediaDevices.getUserMedia({
            audio: selectedMic !== 'default' ? { deviceId: { exact: selectedMic } } : true,
            video: false
         });
         micStream.getAudioTracks().forEach(t => streams.push(t));
      } catch (micErr: any) {
         console.warn("Could not capture microphone:", micErr);
         // Don't fail completely if mic is unavailable, but audio won't be present
      }

      if (useScreen && useCamera) {
        // Picture-in-Picture mode using canvas
        if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
          throw new Error("Screen recording is not supported on this device/browser.");
        }
        
        try {
          screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: { displaySurface: 'monitor' },
            audio: false, // We use mic audio instead
          });
        } catch (mediaErr: any) {
          if (mediaErr.message?.includes('disallowed by permissions policy') || mediaErr.message?.includes('Permission denied')) {
             throw new Error("Screen recording is blocked in this preview window. Please click 'Open in New Tab' to use this feature, or check your browser permissions.");
          }
          throw mediaErr;
        }

        cameraStream = await navigator.mediaDevices.getUserMedia({
          video: selectedCamera !== 'default' ? { deviceId: { exact: selectedCamera } } : true,
          audio: false,
        });

        // Set up the canvas mixer
        const canvas = document.createElement('canvas');
        canvas.width = 1920;
        canvas.height = 1080;
        const ctx = canvas.getContext('2d');

        const hiddenContainer = document.createElement('div');
        hiddenContainer.id = 'screen-recorder-hidden-container';
        hiddenContainer.style.position = 'absolute';
        hiddenContainer.style.width = '1px';
        hiddenContainer.style.height = '1px';
        hiddenContainer.style.margin = '-1px';
        hiddenContainer.style.padding = '0';
        hiddenContainer.style.overflow = 'hidden';
        hiddenContainer.style.clip = 'rect(0, 0, 0, 0)';
        hiddenContainer.style.border = '0';
        document.body.appendChild(hiddenContainer);
        
        hiddenContainer.appendChild(canvas);

        const screenVideo = document.createElement('video');
        screenVideo.srcObject = screenStream;
        screenVideo.autoplay = true;
        screenVideo.muted = true;
        screenVideo.playsInline = true;
        hiddenContainer.appendChild(screenVideo);
        screenVideo.play().catch(e => {
           if (e.name !== 'AbortError') console.error("Screen video play error:", e);
        });

        const cameraVideo = document.createElement('video');
        cameraVideo.srcObject = cameraStream;
        cameraVideo.autoplay = true;
        cameraVideo.muted = true;
        cameraVideo.playsInline = true;
        hiddenContainer.appendChild(cameraVideo);
        cameraVideo.play().catch(e => {
           if (e.name !== 'AbortError') console.error("Camera video play error:", e);
        });

        const drawFrame = () => {
           try {
             if (ctx) {
               ctx.fillStyle = '#000';
               ctx.fillRect(0, 0, canvas.width, canvas.height);
               
               // Draw screen (scale to fit or fill, we will do fill for simplicity)
               if (screenVideo.videoWidth > 0) {
                 ctx.drawImage(screenVideo, 0, 0, canvas.width, canvas.height);
               }
               
               // Draw camera in bottom right corner
               if (cameraVideo.videoWidth > 0) {
                 const camWidth = 320;
                 // Fallback to 180 if videoWidth is 0
                 const camHeight = (cameraVideo.videoHeight / cameraVideo.videoWidth) * camWidth || 180;
                 const padding = 20;
                 
                 ctx.save();
                 // Add a rounded rect clipping path and shadow
                 ctx.shadowColor = 'rgba(0,0,0,0.5)';
                 ctx.shadowBlur = 15;
                 ctx.shadowOffsetX = 0;
                 ctx.shadowOffsetY = 5;
                 ctx.beginPath();
                 if (typeof ctx.roundRect === 'function') {
                    ctx.roundRect(canvas.width - camWidth - padding, canvas.height - camHeight - padding, camWidth, camHeight, 12);
                 } else {
                    ctx.rect(canvas.width - camWidth - padding, canvas.height - camHeight - padding, camWidth, camHeight);
                 }
                 ctx.fill();
                 ctx.clip();
                 ctx.drawImage(cameraVideo, canvas.width - camWidth - padding, canvas.height - camHeight - padding, camWidth, camHeight);
                 
                 // Add border
                 ctx.strokeStyle = 'white';
                 ctx.lineWidth = 3;
                 ctx.stroke();
                 ctx.restore();
               }
             }
           } catch (err) {
             console.error("Canvas draw frame error:", err);
           }
        };
        
        // Start the loop
        animationFrameRef.current = window.setInterval(drawFrame, 1000 / 30) as unknown as number;

        const canvasStream = canvas.captureStream(30);
        streams.push(...canvasStream.getVideoTracks());

        // Detect stop from browser UI
        screenStream.getVideoTracks()[0].onended = () => {
           if (animationFrameRef.current !== null) {
              window.clearInterval(animationFrameRef.current);
           }
           stopRecording();
        };

      } else if (useScreen) {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
          throw new Error("Screen recording is not supported on this device/browser.");
        }
        
        try {
          screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: { displaySurface: 'monitor' },
            audio: false,
          });
        } catch (mediaErr: any) {
          if (mediaErr.message?.includes('disallowed by permissions policy') || mediaErr.message?.includes('Permission denied')) {
             throw new Error("Screen recording is blocked in this preview window. Please click 'Open in New Tab' to use this feature, or check your browser permissions.");
          }
          throw mediaErr;
        }
        
        streams.push(...screenStream.getVideoTracks());
        
        // Detect stop from browser UI
        screenStream.getVideoTracks()[0].onended = () => {
           stopRecording();
        };
      } else if (useCamera) {
        cameraStream = await navigator.mediaDevices.getUserMedia({
          video: selectedCamera !== 'default' ? { deviceId: { exact: selectedCamera } } : true,
          audio: false,
        });
        
        streams.push(...cameraStream.getVideoTracks());
      }

      const combinedStream = new MediaStream(streams);
      streamRef.current = combinedStream;
      
      const sources: MediaStream[] = [];
      if (micStream) sources.push(micStream);
      if (screenStream) sources.push(screenStream);
      if (cameraStream) sources.push(cameraStream);
      sourceStreamsRef.current = sources;

      if (previewVideoRef.current) {
         previewVideoRef.current.srcObject = combinedStream;
         previewVideoRef.current.play().catch(e => {
            if (e.name !== 'AbortError') {
               console.error("Preview video play error:", e);
            }
         });
      }

      const possibleTypes = [
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm',
        'video/mp4'
      ];
      let mimeType = '';
      for (const type of possibleTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          mimeType = type;
          break;
        }
      }
      const recorderOptions = mimeType ? { mimeType } : undefined;
      const recorder = new MediaRecorder(combinedStream, recorderOptions);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType || 'video/webm' });
        setRecordedBlob(blob);
        
        if (previewVideoRef.current) {
           previewVideoRef.current.srcObject = null;
        }

        streamRef.current?.getTracks().forEach(t => t.stop());
        sourceStreamsRef.current.forEach(s => s.getTracks().forEach(t => t.stop()));
        sourceStreamsRef.current = [];

        if (animationFrameRef.current !== null) {
           window.clearInterval(animationFrameRef.current);
           animationFrameRef.current = null;
        }

        const hiddenContainer = document.getElementById('screen-recorder-hidden-container');
        if (hiddenContainer) {
           hiddenContainer.remove();
        }
      };

      // Detect if user stops screen sharing from browser UI
      if (screenStream) {
        screenStream.getVideoTracks()[0].onended = () => {
           stopRecording();
        };
      }

      recorder.start(1000);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);

      startTimer();

    } catch (err: any) {
      if (err.message?.includes('blocked in this preview window') || err.message?.includes('Permission denied')) {
         console.warn(err.message);
      } else {
         console.error(err);
      }
      setError(err.message || 'Failed to start recording. Please check permissions.');
    }
  };

  const startTimer = () => {
    timerRef.current = window.setInterval(() => {
      setRecordingTime(prev => {
         if (prev >= 300) { // 5 min limit for free
            stopRecording();
            return prev;
         }
         return prev + 1;
      });
    }, 1000);
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      startTimer();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && (mediaRecorderRef.current.state === 'recording' || mediaRecorderRef.current.state === 'paused')) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setIsPaused(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleDownload = () => {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OneDigispot-Record-${new Date().toISOString().slice(0,10)}.webm`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const audioDevices = devices.filter(d => d.kind === 'audioinput');
  const videoDevices = devices.filter(d => d.kind === 'videoinput');
  const isIframe = window.self !== window.top;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Top Warning/Info Banner */}
      {isIframe && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-amber-900">Preview Mode Limitation</h4>
            <p className="text-sm text-amber-700 mt-1">
              Screen recording may be blocked by your browser when running inside this preview window. If you experience issues, please click the "Open in New Tab" button in the top right corner of the preview to use the recorder.
            </p>
          </div>
        </div>
      )}
      
      <div className="mb-6 bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-indigo-900">Welcome to the OneDigispot Creator Studio</h4>
          <p className="text-sm text-indigo-700 mt-1">
            Record your screen, camera, and microphone directly from your browser. No downloads required. Your recordings are processed locally and remain completely private until you choose to upload them.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
        
        {/* Controls Header */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mb-8 border-b border-slate-100 pb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Record Video</h2>
            <p className="text-slate-500 font-medium text-sm flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
              Ready to record (5 min limit)
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full lg:w-auto">
             <div className="flex flex-wrap gap-3">
                <label title={!hasDisplayMediaSupport ? "Screen recording is not supported on this device/browser" : ""} className={`flex-1 lg:flex-none flex items-center justify-center gap-2 cursor-pointer bg-slate-50 px-5 py-3 rounded-xl border border-slate-200 transition-colors ${!hasDisplayMediaSupport ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100 hover:border-slate-300'}`}>
                   <input type="checkbox" checked={useScreen} onChange={e => setUseScreen(e.target.checked)} disabled={isRecording || !hasDisplayMediaSupport} className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 disabled:opacity-50" />
                   <Monitor size={18} className="text-slate-700" />
                   <span className="font-semibold text-slate-800 text-sm">Screen</span>
                </label>
                <label className="flex-1 lg:flex-none flex items-center justify-center gap-2 cursor-pointer bg-slate-50 px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-colors">
                   <input type="checkbox" checked={useCamera} onChange={e => setUseCamera(e.target.checked)} disabled={isRecording} className="w-4 h-4 rounded text-indigo-600" />
                   <Camera size={18} className="text-slate-700" />
                   <span className="font-semibold text-slate-800 text-sm">Camera</span>
                </label>
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  disabled={isRecording}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors text-slate-600 disabled:opacity-50"
                >
                  <Settings size={18} />
                </button>
             </div>
             
             {/* Settings Panel */}
             {showSettings && !isRecording && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Microphone</label>
                    <div className="relative">
                      <select 
                        value={selectedMic} 
                        onChange={(e) => setSelectedMic(e.target.value)}
                        className="w-full appearance-none bg-white border border-slate-300 text-slate-700 py-2 pl-3 pr-8 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      >
                        <option value="default">System Default Microphone</option>
                        {audioDevices.map(d => (
                          <option key={d.deviceId} value={d.deviceId}>{d.label || `Microphone ${d.deviceId.substring(0,5)}...`}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-2.5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Camera</label>
                    <div className="relative">
                      <select 
                        value={selectedCamera} 
                        onChange={(e) => setSelectedCamera(e.target.value)}
                        className="w-full appearance-none bg-white border border-slate-300 text-slate-700 py-2 pl-3 pr-8 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      >
                        <option value="default">System Default Camera</option>
                        {videoDevices.map(d => (
                          <option key={d.deviceId} value={d.deviceId}>{d.label || `Camera ${d.deviceId.substring(0,5)}...`}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-2.5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="md:col-span-2 mt-2 p-3 bg-indigo-50 rounded-lg flex items-start gap-2">
                    <VideoIcon className="w-4 h-4 text-indigo-600 mt-0.5" />
                    <p className="text-xs text-indigo-800 leading-relaxed">
                      <strong>AI Processing:</strong> In future updates, recordings can be automatically transcribed, summarized, and turned into blog posts using OneDigispot AI.
                    </p>
                  </div>
                </div>
             )}

             {!hasDisplayMediaSupport && (
                <p className="text-xs text-rose-500 font-medium flex items-center"><AlertCircle className="w-3 h-3 mr-1"/> Screen recording is not supported on this mobile device/browser.</p>
             )}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div>{error}</div>
          </div>
        )}

        {/* Video Area */}
        <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden mb-8 relative border-4 border-slate-900 shadow-xl group">
           
           {!isRecording && !recordedBlob && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 bg-gradient-to-br from-slate-800 to-slate-900 z-10">
                 <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <Monitor size={40} className="opacity-80" />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2">Ready to Capture</h3>
                 <p className="text-slate-400 font-medium">Select sources above and hit record</p>
              </div>
           )}
           
           <video 
              ref={previewVideoRef} 
              muted 
              autoplay
              playsInline
              className={`w-full h-full object-contain bg-black ${!isRecording ? 'hidden' : ''} ${isPaused ? 'opacity-50 grayscale' : ''}`}
           />

           {isPaused && (
             <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="bg-slate-900/80 backdrop-blur px-6 py-3 rounded-full text-white font-bold flex items-center gap-2 border border-white/20">
                  <Pause className="w-5 h-5" />
                  Paused
                </div>
             </div>
           )}

           {recordedBlob && !isRecording && (
              <video 
                 ref={recordedVideoRef} 
                 src={URL.createObjectURL(recordedBlob)} 
                 controls 
                 className="w-full h-full object-contain bg-black"
              />
           )}

           {isRecording && !isPaused && (
              <div className="absolute top-4 right-4 bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 animate-pulse shadow-lg shadow-rose-500/20">
                 <div className="w-2.5 h-2.5 rounded-full bg-white" />
                 {formatTime(recordingTime)}
              </div>
           )}
           {isRecording && isPaused && (
              <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20">
                 <Pause className="w-3 h-3 fill-current" />
                 {formatTime(recordingTime)}
              </div>
           )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
           {!isRecording && !recordedBlob && (
              <button 
                onClick={handleStartRecording} 
                className="bg-rose-500 hover:bg-rose-600 text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-rose-500/20 flex items-center gap-3 transition-all hover:-translate-y-1 active:translate-y-0 text-lg"
              >
                 <div className="w-4 h-4 rounded-full bg-white" />
                 Start Recording
              </button>
           )}

           {isRecording && (
              <>
                 {isPaused ? (
                    <button onClick={resumeRecording} className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 text-lg">
                       <Play size={20} fill="currentColor" />
                       Resume
                    </button>
                 ) : (
                    <button onClick={pauseRecording} className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 text-lg">
                       <Pause size={20} fill="currentColor" />
                       Pause
                    </button>
                 )}
                 <button onClick={stopRecording} className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-slate-900/20 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 text-lg">
                    <Square size={20} fill="currentColor" />
                    Stop Recording
                 </button>
              </>
           )}

           {recordedBlob && !isRecording && (
              <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                       <Check size={24} strokeWidth={3} />
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900">Recording Complete</h4>
                       <p className="text-sm text-slate-500 font-medium">Duration: {formatTime(recordingTime)} • Size: {(recordedBlob.size / 1024 / 1024).toFixed(1)} MB</p>
                    </div>
                 </div>
                 
                 <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <button onClick={startRecording} className="flex-1 md:flex-none bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                       <RotateCcw size={18} />
                       Record New
                    </button>
                    <Link to="/app/video-editor" className="flex-1 md:flex-none bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                       <Scissors size={18} />
                       Edit Video
                    </Link>
                    <button onClick={handleDownload} className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-3 transition-colors">
                       <Download size={20} />
                       Save Video
                    </button>
                 </div>
              </div>
           )}
        </div>

      </div>

      {/* AI Processing Module */}
      {recordedBlob && !isRecording && (
        <AIProcessor videoBlob={recordedBlob} duration={recordingTime} />
      )}
    </div>
  );
}
