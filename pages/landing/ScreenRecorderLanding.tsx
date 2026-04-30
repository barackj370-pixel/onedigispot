import React from 'react';
import ToolLandingLayout from '../../components/ToolLandingLayout';
import { Video, Clock, Share2 } from 'lucide-react';

const ScreenRecorderLanding: React.FC = () => {
  return (
    <ToolLandingLayout
      title="Powerful Screen & Camera Recorder"
      subtitle="Record your screen, tabs, and webcam easily. Great for tutorials, marketing videos, and team communication."
      badge="Free Marketing Tool"
      appLink="/app/screen-recorder"
      features={[
        {
          title: "Multi-Source Recording",
          description: "Record your screen (windows or tabs) and your face at the same time using your webcam.",
          icon: <Video size={28} />
        },
        {
          title: "Up to 1 Hour Recording",
          description: "Record long marketing videos or webinars. Free plan allows up to 5 minutes.",
          icon: <Clock size={28} />
        },
        {
          title: "Instant Download & Share",
          description: "Instantly download the video and share it with your team, customers, or on social media.",
          icon: <Share2 size={28} />
        }
      ]}
      howItWorks={[
        { step: "1", title: "Select what to record", description: "Choose to record your whole screen, a window, or a browser tab. Enable webcam if needed." },
        { step: "2", title: "Start Recording", description: "Hit record and start presenting. We handle the rest." },
        { step: "3", title: "Save & Export", description: "Stop the recording, preview the video, and save it directly to your device." }
      ]}
      pricing={[
        {
          name: "Free Version",
          price: "Free",
          description: "Great for quick updates and short clips.",
          features: [
            "Up to 5 minutes recording",
            "Screen & Webcam support",
            "Instant download",
            "No watermarks"
          ],
          ctaText: "Start Recording",
          ctaLink: "/app/screen-recorder"
        },
        {
          name: "Pro Recorder",
          price: "$15/mo",
          description: "For long webinars and professional creators.",
          isPopular: true,
          features: [
            "Up to 1 hour recording length",
            "Premium quality export",
            "Advanced video settings",
            "Priority support"
          ],
          ctaText: "Upgrade to Pro",
          ctaLink: "/app/screen-recorder?upgrade=true"
        }
      ]}
      faq={[
        { question: "Is this tool free?", answer: "Yes! There is a free version that allows up to 5 minutes of recording with no watermarks." },
        { question: "Can I record my screen and face at the same time?", answer: "Yes, you can enable both your screen and webcam to record a picture-in-picture style video." },
        { question: "How safe are my recordings?", answer: "Your recordings are processed locally on your device and are completely private." }
      ]}
    />
  );
};

export default ScreenRecorderLanding;
