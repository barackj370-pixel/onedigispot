import React from 'react';
import ToolLandingLayout from '../../components/ToolLandingLayout';
import { Share2, Calendar, Video } from 'lucide-react';

const SocialMediaAILanding: React.FC = () => {
  return (
    <ToolLandingLayout
      title="Social Media AI Post Master"
      subtitle="Generate a full month of engaging posts, video scripts, and automatically publish them directly to your TikTok or other social channels. Save hours of content creation time."
      badge="Freemium AI Tool"
      appLink="/app/social-media-ai-post-master"
      features={[
        {
          title: "Direct API Auto-Publishing",
          description: "Connect your accounts securely via OAuth. We've just completed our official TikTok API integration so you can publish generated videos over the air—no manual downloading required!",
          icon: <Share2 size={28} />
        },
        {
          title: "AI Video Generation",
          description: "Not just text! Generate engaging TikTok and Instagram Reels directly inside the platform complete with visual cues.",
          icon: <Video size={28} />
        },
        {
          title: "Content Calendar",
          description: "Get a structured schedule of what to post and when, ensuring consistent engagement with your audience.",
          icon: <Calendar size={28} />
        }
      ]}
      howItWorks={[
        { step: "1", title: "Enter your topic", description: "Provide a theme, blog post, or product you want to promote." },
        { step: "2", title: "AI creates the campaign", description: "Our system generates dozens of posts, threads, and scripts." },
        { step: "3", title: "Schedule & Publish", description: "Push your videos directly to TikTok, or copy text content into your favorite scheduling tool." }
      ]}
      pricing={[
        {
          name: "Starter (Free)",
          price: "Free",
          description: "Perfect for testing the waters.",
          features: [
            "Generate 1 week of content",
            "Twitter & LinkedIn formats",
            "Basic text posts",
            "3 campaigns per month"
          ],
          ctaText: "Start for Free",
          ctaLink: "/app/social-media-ai-post-master"
        },
        {
          name: "Post Master Pro",
          price: "$25/mo",
          description: "For creators and social media managers.",
          isPopular: true,
          features: [
            "Generate 1 month of content",
            "All platforms + Video Scripts",
            "Hashtag & emoji optimization",
            "Unlimited campaigns"
          ],
          ctaText: "Upgrade to Master",
          ctaLink: "/app/social-media-ai-post-master?upgrade=true"
        }
      ]}
      faq={[
        { question: "Does this post directly to my social accounts?", answer: "Yes! We just launched our official Direct Post integration for TikTok. Simply connect your account and hit publish. Direct integrations for LinkedIn, X (Twitter), Facebook, and Instagram are currently in development!" },
        { question: "Are the video scripts ready to shoot?", answer: "Yes! The scripts include a hook, body, call-to-action, and suggestions for visuals or text-on-screen." },
        { question: "Can I change the tone of voice?", answer: "Yes, you can specify if you want the content to be professional, humorous, educational, or promotional." }
      ]}
    />
  );
};

export default SocialMediaAILanding;
