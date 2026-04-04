import React from 'react';
import ToolLandingLayout from '../../components/ToolLandingLayout';
import { Share2, Calendar, Video } from 'lucide-react';

const SocialMediaAILanding: React.FC = () => {
  return (
    <ToolLandingLayout
      title="Automate Your Social Media with AI"
      subtitle="Generate a full month of engaging posts, captions, and video scripts from a single topic. Save hours of content creation time."
      badge="Freemium AI Tool"
      appLink="/app/social-media-ai"
      features={[
        {
          title: "Multi-Platform Generation",
          description: "Instantly create tailored content for Twitter, LinkedIn, Instagram, and Facebook with platform-specific formatting.",
          icon: <Share2 size={28} />
        },
        {
          title: "Video Script Writer",
          description: "Generate engaging TikTok and Instagram Reel scripts complete with visual cues and hook ideas.",
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
        { step: "3", title: "Schedule & relax", description: "Copy the content into your favorite scheduling tool." }
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
          ctaLink: "/app/social-media-ai"
        },
        {
          name: "Social Master",
          price: "$39",
          description: "For creators and social media managers.",
          isPopular: true,
          features: [
            "Generate 1 month of content",
            "All platforms + Video Scripts",
            "Hashtag & emoji optimization",
            "Unlimited campaigns"
          ],
          ctaText: "Upgrade to Master",
          ctaLink: "/#contact"
        }
      ]}
      faq={[
        { question: "Does this post directly to my social accounts?", answer: "Currently, the tool generates the content for you to copy and paste into your preferred scheduling tool (like Buffer or Hootsuite). Direct integration is coming soon to the Pro plan." },
        { question: "Are the video scripts ready to shoot?", answer: "Yes! The scripts include a hook, body, call-to-action, and suggestions for visuals or text-on-screen." },
        { question: "Can I change the tone of voice?", answer: "Yes, you can specify if you want the content to be professional, humorous, educational, or promotional." }
      ]}
    />
  );
};

export default SocialMediaAILanding;
