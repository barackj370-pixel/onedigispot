import React from 'react';
import ToolLandingLayout from '../../components/ToolLandingLayout';
import { Search, TrendingUp, Target } from 'lucide-react';

const KeywordGeneratorLanding: React.FC = () => {
  return (
    <ToolLandingLayout
      title="Discover High-Volume SEO Keywords"
      subtitle="Stop guessing what your customers are searching for. Our free AI keyword generator finds the exact phrases that drive traffic."
      badge="Free SEO Tool"
      appLink="/app/keyword-generator"
      features={[
        {
          title: "Real-Time Search Data",
          description: "We pull data directly from live search engines to ensure you get the most accurate and up-to-date keyword suggestions.",
          icon: <Search size={28} />
        },
        {
          title: "Long-Tail Opportunities",
          description: "Discover hidden, low-competition long-tail keywords that are easier to rank for and convert better.",
          icon: <Target size={28} />
        },
        {
          title: "Search Volume Estimates",
          description: "Get estimated search volumes and competition levels so you can prioritize the keywords that matter most.",
          icon: <TrendingUp size={28} />
        }
      ]}
      howItWorks={[
        { step: "1", title: "Enter a seed topic", description: "Type in a broad topic or industry related to your business." },
        { step: "2", title: "AI analyzes search intent", description: "Our tool finds related searches, questions, and long-tail variations." },
        { step: "3", title: "Export your list", description: "Get a comprehensive list of keywords to fuel your content strategy." }
      ]}
      pricing={[
        {
          name: "Free Forever",
          price: "Free",
          description: "Essential keyword research for everyone.",
          features: [
            "Up to 100 keywords per search",
            "Unlimited daily searches",
            "Search volume estimates",
            "Export to CSV"
          ],
          ctaText: "Start Researching",
          ctaLink: "/app/keyword-generator"
        },
        {
          name: "SEO Pro",
          price: "$49",
          description: "Advanced analytics for serious marketers.",
          isPopular: true,
          features: [
            "Everything in Free",
            "Competitor keyword analysis",
            "Keyword difficulty scores",
            "Historical trend data"
          ],
          ctaText: "Upgrade to Pro",
          ctaLink: "/#contact"
        }
      ]}
      faq={[
        { question: "How accurate is the search volume data?", answer: "Our data is aggregated from multiple reliable search engine APIs to provide highly accurate estimates of monthly search volume." },
        { question: "Can I export the keywords?", answer: "Yes, you can easily copy the keywords or export them to a CSV file to use in your favorite spreadsheet software." },
        { question: "Do I need to create an account?", answer: "No account is required to use the free version of the keyword generator." }
      ]}
    />
  );
};

export default KeywordGeneratorLanding;
