import React from 'react';
import ToolLandingLayout from '../../components/ToolLandingLayout';
import { Image as ImageIcon, Zap, Download } from 'lucide-react';

const LogoMakerLanding: React.FC = () => {
  return (
    <ToolLandingLayout
      title="Create a Professional Logo in Seconds"
      subtitle="Our AI-powered logo maker generates high-end, unique logos for your brand instantly. No design skills required. 100% Free."
      badge="Free AI Tool"
      appLink="/app/logo-maker"
      features={[
        {
          title: "AI-Powered Generation",
          description: "Our advanced AI understands your brand description and generates logos that perfectly match your vision.",
          icon: <ImageIcon size={28} />
        },
        {
          title: "Instant Results",
          description: "Get dozens of unique logo concepts in seconds. Iterate and refine until you find the perfect match.",
          icon: <Zap size={28} />
        },
        {
          title: "High-Resolution Export",
          description: "Download your logo in high resolution, ready to be used on your website, social media, or print materials.",
          icon: <Download size={28} />
        }
      ]}
      howItWorks={[
        { step: "1", title: "Describe your brand", description: "Tell us about your company, industry, and the vibe you're going for." },
        { step: "2", title: "AI generates concepts", description: "Our AI creates multiple unique logo designs based on your prompt." },
        { step: "3", title: "Download & use", description: "Pick your favorite design and download it instantly for free." }
      ]}
      pricing={[
        {
          name: "Free Forever",
          price: "Free",
          description: "Perfect for startups and small businesses.",
          features: [
            "Unlimited logo generations",
            "High-resolution downloads",
            "Commercial use license",
            "No watermarks"
          ],
          ctaText: "Start Designing",
          ctaLink: "/app/logo-maker"
        },
        {
          name: "Pro Brand Kit",
          price: "$29",
          description: "For businesses that need a complete brand identity.",
          isPopular: true,
          features: [
            "Everything in Free",
            "Vector files (SVG, EPS)",
            "Social media kit",
            "Brand guidelines document"
          ],
          ctaText: "Upgrade to Pro",
          ctaLink: "/#contact"
        }
      ]}
      faq={[
        { question: "Is the logo maker really free?", answer: "Yes! You can generate and download high-resolution logos completely for free. We offer a paid upgrade if you need vector files and a full brand kit." },
        { question: "Can I use the logo for commercial purposes?", answer: "Absolutely. You own the full commercial rights to any logo you generate and download." },
        { question: "What file formats do I get?", answer: "Free users get high-resolution PNG and JPG files. Pro users also get scalable vector formats like SVG." }
      ]}
    />
  );
};

export default LogoMakerLanding;
