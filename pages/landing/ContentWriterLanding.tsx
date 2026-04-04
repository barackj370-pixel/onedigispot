import React from 'react';
import ToolLandingLayout from '../../components/ToolLandingLayout';
import { PenTool, FileText, Layout } from 'lucide-react';

const ContentWriterLanding: React.FC = () => {
  return (
    <ToolLandingLayout
      title="Write SEO-Optimized Articles in Minutes"
      subtitle="Generate high-quality, long-form blog posts that rank on Google. Our AI content writer does the heavy lifting for you."
      badge="Free AI Tool"
      appLink="/app/content-writer"
      features={[
        {
          title: "SEO-Optimized Output",
          description: "The AI automatically incorporates your target keywords naturally throughout the content to boost search rankings.",
          icon: <PenTool size={28} />
        },
        {
          title: "Proper Formatting",
          description: "Generates fully formatted articles with H1, H2, and H3 tags, bullet points, and clear paragraphs.",
          icon: <Layout size={28} />
        },
        {
          title: "Plagiarism-Free",
          description: "Every article is generated from scratch, ensuring 100% unique and original content for your website.",
          icon: <FileText size={28} />
        }
      ]}
      howItWorks={[
        { step: "1", title: "Provide a topic & keywords", description: "Tell the AI what you want to write about and which keywords to include." },
        { step: "2", title: "AI drafts the article", description: "Our advanced model writes a comprehensive, structured blog post." },
        { step: "3", title: "Review & publish", description: "Copy the markdown or HTML and publish directly to your CMS." }
      ]}
      pricing={[
        {
          name: "Free Forever",
          price: "Free",
          description: "Perfect for occasional bloggers.",
          features: [
            "Generate up to 1,500 words per article",
            "Basic SEO optimization",
            "Markdown export",
            "5 articles per day"
          ],
          ctaText: "Start Writing",
          ctaLink: "/app/content-writer"
        },
        {
          name: "Content Scale",
          price: "$79",
          description: "For agencies and high-volume publishers.",
          isPopular: true,
          features: [
            "Unlimited articles",
            "Advanced NLP keyword optimization",
            "Direct WordPress integration",
            "Custom brand voice"
          ],
          ctaText: "Upgrade to Pro",
          ctaLink: "/#contact"
        }
      ]}
      faq={[
        { question: "Will Google penalize AI content?", answer: "Google's guidelines state they reward high-quality content however it is produced. As long as the content is helpful and relevant to the user, it can rank well." },
        { question: "How long are the generated articles?", answer: "The free tool generates comprehensive articles typically ranging from 800 to 1,500 words depending on the topic." },
        { question: "Can I edit the content after it's generated?", answer: "Yes! We highly recommend reviewing and adding your own personal touch to the AI-generated draft before publishing." }
      ]}
    />
  );
};

export default ContentWriterLanding;
