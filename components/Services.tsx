
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: "Custom App Development",
    desc: "Scalable iOS and Android applications built with React Native and Flutter for high-performance mobile experiences.",
    icon: "📱",
    color: "bg-blue-50",
    href: "/services/custom-app-development"
  },
  {
    title: "Enterprise Web Platforms",
    desc: "Robust, secure, and modern web applications using React, Node.js, and cloud-native architectures.",
    icon: "💻",
    color: "bg-indigo-50",
    href: "/services/web-development"
  },
  {
    title: "Search Engine Optimization",
    desc: "Data-driven SEO strategies to boost your global search rankings and drive organic traffic to your business.",
    icon: "🔍",
    color: "bg-purple-50",
    href: "/services/seo"
  },
  {
    title: "Email Marketing",
    desc: "Automated, high-conversion email campaigns that nurture leads and build lasting customer relationships.",
    icon: "📧",
    color: "bg-orange-50",
    href: "/services/email-marketing"
  },
  {
    title: "Sales Funnel Design",
    desc: "Strategic sales funnels engineered to convert visitors into loyal customers through optimized user journeys.",
    icon: "🎯",
    color: "bg-cyan-50",
    href: "/services/sales-funnel"
  },
  {
    title: "AI Integration",
    desc: "Leveraging cutting-edge Large Language Models and computer vision to automate organizational intelligence.",
    icon: "🤖",
    color: "bg-emerald-50",
    href: "/services/ai-integration"
  },
  {
    title: "Database Design & Integration",
    desc: "Designing and integrating robust, scalable, and secure databases tailored for your enterprise needs.",
    icon: "🗄️",
    color: "bg-teal-50",
    href: "/services/database-design"
  }
];

const Services: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    // Approximating the width of an item including its margins
    const itemWidth = scrollRef.current.clientWidth * 0.85; 
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < services.length) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-16 px-4">
          <h2 className="text-indigo-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-3">Our Expertise</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Global Solutions, African Innovation</h3>
          <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto">
            We don't just build software; we engineer competitive advantages. Our multidisciplinary team brings world-class standards to every project, delivering impact across borders.
          </p>
        </div>

        <div className="md:hidden flex justify-center items-center mb-6">
          <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            {activeIndex + 1} of {services.length}
          </span>
        </div>

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto pb-8 pt-4 -mx-4 px-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:p-0 md:mx-0 no-scrollbar"
        >
          {services.map((service, idx) => (
            <Link to={service.href} key={idx} className="block w-[85vw] shrink-0 snap-center mr-4 md:mr-0 md:w-auto md:shrink group p-6 md:p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className={`w-12 h-12 md:w-14 md:h-14 ${service.color} rounded-xl flex items-center justify-center text-2xl md:text-3xl mb-6 shadow-sm`}>
                {service.icon}
              </div>
              <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-3 md:mb-4 group-hover:text-indigo-600 transition-colors">{service.title}</h4>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4 md:mb-6">{service.desc}</p>
              <span className="text-indigo-600 font-medium flex items-center text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
