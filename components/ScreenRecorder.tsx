import React, { useState, useRef } from 'react';
import { Camera, Monitor, Mic, Square, Play, Download, Settings, Trash2 } from 'lucide-react';

export default function ScreenRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const [useScreen, setUseScreen] = useState(!!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia));
  const [useCamera, setUseCamera] = useState(!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia));
  const [useAudio, setUseAudio] = useState(true);

  const hasDisplayMediaSupport = !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const recordedVideoRef = useRef<HTMLVideoElement>(null);

  const startRecording = async () => {
    setError(null);
    setRecordedBlob(null);
    setRecordingTime(0);

    try {
      const streams: MediaStreamTrack[] = [];
      let screenStream: MediaStream | null = null;
      let cameraStream: MediaStream | null = null;

      if (useScreen) {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
          throw new Error("Screen recording is not supported on this device/browser (e.g., most mobile browsers). Please use Camera recording instead.");
        }
        screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: useAudio,
        });
        streams.push(...screenStream.getTracks());
      }

      if (useCamera) {
        cameraStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: useAudio && !useScreen, // only add mic audio if screen didn't already capture audio
        });
        
        // If we are recording screen AND camera, it gets complex to just push tracks (browsers might use only one video track for recording).
        // For a basic MVP that works, if both are selected, we might just keep one or use canvas. 
        // We will push all tracks to a single stream. The browser will generally record the first video track. 
        // We will alert the user that picture-in-picture requires pro in this basic setup, or we just try to add both.
        // Modern approach for PiP without drawing canvas: use picture in picture API, but MediaRecorder only records one video track.
        
        // For our MVP, if they select both, we will just use screen primarily and prompt them that camera is active in a floating window (though recording might just grab screen).
        // Let's actually just pass all streams.
        cameraStream.getTracks().forEach(track => {
           // check if we don't already have a video/audio track
           const hasVideo = streams.some(t => t.kind === 'video');
           if (track.kind === 'video' && hasVideo) {
              // we can't easily record two videos in one MediaRecorder without canvas
              // we will just append it and hope the browser handles it, or show an alert.
              setError("Note: Recording both screen and camera natively records the screen. Use PIP manually.");
           } else {
              streams.push(track);
           }
        });
      }

      if (!useScreen && !useCamera) {
         setError("Please select either screen or camera to record.");
         return;
      }

      const combinedStream = new MediaStream(streams);
      streamRef.current = combinedStream;

      if (previewVideoRef.current) {
         previewVideoRef.current.srcObject = combinedStream;
         previewVideoRef.current.play();
      }

      const recorder = new MediaRecorder(combinedStream, { mimeType: 'video/webm;codecs=vp9' });
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setRecordedBlob(blob);
        
        if (previewVideoRef.current) {
           previewVideoRef.current.srcObject = null;
        }

        // Stop all tracks
        streamRef.current?.getTracks().forEach(t => t.stop());
      };

      recorder.start(1000); // collect data every second
      mediaRecorderRef.current = recorder;
      setIsRecording(true);

      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => {
           // Free version limit 5 mins (300 secs)
           if (prev >= 300) {
              stopRecording();
              return prev;
           }
           return prev + 1;
        });
      }, 1000);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to start recording. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleDownload = () => {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recording-${new Date().getTime()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
        
        {/* Controls Header */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-8 border-b border-slate-100 pb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Record Video</h2>
            <p className="text-slate-500">Free limit: 5 minutes</p>
          </div>

          <div className="flex flex-col gap-2">
             <div className="flex flex-wrap gap-3">
                <label title={!hasDisplayMediaSupport ? "Screen recording is not supported on this device/browser" : ""} className={`flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 transition-colors ${!hasDisplayMediaSupport ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'}`}>
                   <input type="checkbox" checked={useScreen} onChange={e => setUseScreen(e.target.checked)} disabled={isRecording || !hasDisplayMediaSupport} className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 disabled:opacity-50" />
                   <Monitor size={18} className="text-slate-600" />
                   <span className="font-medium text-slate-700">Screen</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors">
                   <input type="checkbox" checked={useCamera} onChange={e => setUseCamera(e.target.checked)} disabled={isRecording} className="w-4 h-4 rounded text-indigo-600" />
                   <Camera size={18} className="text-slate-600" />
                   <span className="font-medium text-slate-700">Camera</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors">
                   <input type="checkbox" checked={useAudio} onChange={e => setUseAudio(e.target.checked)} disabled={isRecording} className="w-4 h-4 rounded text-indigo-600" />
                   <Mic size={18} className="text-slate-600" />
                   <span className="font-medium text-slate-700">Audio</span>
                </label>
             </div>
             {!hasDisplayMediaSupport && (
                <p className="text-xs text-rose-500 font-medium">Screen recording is not supported on this mobile device/browser.</p>
             )}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        {/* Video Area */}
        <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden mb-8 relative border-4 border-slate-900 shadow-xl">
           {!isRecording && !recordedBlob && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50">
                 <Monitor size={64} className="mb-4 opacity-50" />
                 <p className="text-lg font-medium">Ready to record</p>
              </div>
           )}
           
           {isRecording && (
              <video 
                 ref={previewVideoRef} 
                 muted 
                 className="w-full h-full object-contain bg-black"
              />
           )}

           {recordedBlob && !isRecording && (
              <video 
                 ref={recordedVideoRef} 
                 src={URL.createObjectURL(recordedBlob)} 
                 controls 
                 className="w-full h-full object-contain bg-black"
              />
           )}

           {isRecording && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 animate-pulse shadow-lg">
                 <div className="w-2 h-2 rounded-full bg-white" />
                 {formatTime(recordingTime)}
              </div>
           )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
           {!isRecording && !recordedBlob && (
              <button onClick={startRecording} className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-red-500/30 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
                 <div className="w-4 h-4 rounded-full bg-white" />
                 Start Recording
              </button>
           )}

           {isRecording && (
              <button onClick={stopRecording} className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-slate-900/30 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
                 <Square size={20} fill="currentColor" />
                 Stop Recording
              </button>
           )}

           {recordedBlob && !isRecording && (
              <>
                 <button onClick={startRecording} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-4 rounded-full font-bold flex items-center gap-2 transition-colors">
                    <Trash2 size={20} />
                    Discard & Retry
                 </button>
                 <button onClick={handleDownload} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
                    <Download size={20} />
                    Download Video (.webm)
                 </button>
              </>
           )}
        </div>

      </div>
    </div>
  );
}
