import React from 'react';
import ToolLandingLayout from '../../components/ToolLandingLayout';
import { Filter, Mail, MousePointerClick } from 'lucide-react';

const FunnelBuilderLanding: React.FC = () => {
  return (
    <ToolLandingLayout
      title="Build High-Converting Sales Funnels with AI"
      subtitle="Stop struggling with complex funnel software. Our AI architects your entire sales process—from landing page copy to email sequences—in seconds."
      badge="Freemium AI Tool"
      appLink="/app/funnel-builder"
      features={[
        {
          title: "Complete Funnel Architecture",
          description: "The AI designs the perfect sequence of pages (Opt-in, Sales, Upsell, Thank You) based on your specific product.",
          icon: <Filter size={28} />
        },
        {
          title: "High-Converting Copywriting",
          description: "Generates persuasive headlines, bullet points, and calls-to-action utilizing proven direct-response frameworks.",
          icon: <MousePointerClick size={28} />
        },
        {
          title: "Automated Email Sequences",
          description: "Writes the exact follow-up email sequence you need to nurture leads and close sales on autopilot.",
          icon: <Mail size={28} />
        }
      ]}
      howItWorks={[
        { step: "1", title: "Describe your offer", description: "Tell the AI what you are selling and who your target audience is." },
        { step: "2", title: "Review the blueprint", description: "The AI generates a complete funnel strategy and all the necessary copy." },
        { step: "3", title: "Publish & launch", description: "Export the funnel or publish it directly to start capturing leads." }
      ]}
      pricing={[
        {
          name: "Funnel Blueprint (Free)",
          price: "Free",
          description: "Great for planning your strategy.",
          features: [
            "Generate funnel architecture",
            "Basic landing page copy",
            "1 email follow-up",
            "Export to text"
          ],
          ctaText: "Build a Free Funnel",
          ctaLink: "/app/funnel-builder"
        },
        {
          name: "Funnel Architect Pro",
          price: "$35/mo",
          description: "For serious marketers and agencies.",
          isPopular: true,
          features: [
            "Unlimited funnel generation",
            "Advanced direct-response copy",
            "Full 5-day email sequences",
            "1-click publishing & hosting"
          ],
          ctaText: "Upgrade to Pro",
          ctaLink: "/app/funnel-builder?upgrade=true"
        }
      ]}
      faq={[
        { question: "Do I need coding skills to use this?", answer: "Not at all. The AI generates everything for you. You can either use our built-in publisher or copy the text into your own page builder." },
        { question: "What types of funnels can it build?", answer: "It can build Lead Magnet funnels, Webinar funnels, Product Launch funnels, High-Ticket Application funnels, and more." },
        { question: "Can I connect my own domain?", answer: "Yes, Pro users can connect custom domains to host their published funnels directly on our platform." }
      ]}
    />
  );
};

export default FunnelBuilderLanding;
