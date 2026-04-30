import React from 'react';
import ToolLandingLayout from '../../components/ToolLandingLayout';
import { CreditCard, Download, Image as ImageIcon } from 'lucide-react';

const BusinessCardLanding: React.FC = () => {
  return (
    <ToolLandingLayout
      title="AI Digital Business Card Generator"
      subtitle="Instantly generate a highly professional digital business card with a custom abbreviation logo and brand colors."
      badge="Free AI Tool"
      appLink="/app/business-card-generator"
      features={[
        {
          title: "AI Abbreviation Logo",
          description: "Our AI creates a stylish logo automatically using the initials of your business name.",
          icon: <ImageIcon size={28} />
        },
        {
          title: "Custom Brand Colors",
          description: "Select your custom brand colors so your business card matches your identity perfectly.",
          icon: <CreditCard size={28} />
        },
        {
          title: "PDF Download & Share",
          description: "Export as a high-quality PDF ready for printing, or share the electronic version instantly.",
          icon: <Download size={28} />
        }
      ]}
      howItWorks={[
        { step: "1", title: "Fill Details", description: "Enter your contact details, business name, and job title." },
        { step: "2", title: "Styling & Logo", description: "Let the AI generate a logo. Choose your brand colors." },
        { step: "3", title: "Export", description: "Download as a PDF or share the card directly with your network." }
      ]}
      pricing={[
        {
          name: "Free",
          price: "Free",
          description: "Essential business card for individuals.",
          features: [
            "AI Logo Generation",
            "Color Customization",
            "PDF Export",
            "Standard Templates"
          ],
          ctaText: "Create a Card",
          ctaLink: "/app/business-card-generator"
        },
        {
          name: "Premium Team",
          price: "$19/mo",
          description: "For agencies and large teams.",
          isPopular: true,
          features: [
            "Everything in Free",
            "Custom Font Upload",
            "NFC Card Integration",
            "Analytics dashboard"
          ],
          ctaText: "Upgrade to Premium",
          ctaLink: "/app/business-card-generator?upgrade=true"
        }
      ]}
      faq={[
        { question: "How does the AI logo work?", answer: "It takes the words in your business name and generates a sleek, typographic abbreviation logo automatically." },
        { question: "Does the PDF support printing?", answer: "Yes, the exported PDF is ready for high-quality printing if you want physical cards." },
        { question: "Can I use custom hex colors?", answer: "Yes, you can define the exact hex values for your primary and secondary brand colors." }
      ]}
    />
  );
};

export default BusinessCardLanding;
