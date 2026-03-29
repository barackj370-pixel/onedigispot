import React from 'react';

const services = [
  {
    title: "Custom App Development",
    desc: "Scalable iOS and Android applications built with React Native and Flutter for high-performance mobile experiences.",
    icon: "📱",
    color: "bg-blue-50"
  },
  {
    title: "Enterprise Web Platforms",
    desc: "Robust, secure, and modern web applications using React, Node.js, and cloud-native architectures.",
    icon: "💻",
    color: "bg-indigo-50"
  },
  {
    title: "Search Engine Optimization",
    desc: "Data-driven SEO strategies to boost your global search rankings and drive organic traffic to your business.",
    icon: "🔍",
    color: "bg-purple-50"
  },
  {
    title: "Email Marketing",
    desc: "Automated, high-conversion email campaigns that nurture leads and build lasting customer relationships.",
    icon: "📧",
    color: "bg-orange-50"
  },
  {
    title: "Sales Funnel Design",
    desc: "Strategic sales funnels engineered to convert visitors into loyal customers through optimized user journeys.",
    icon: "🎯",
    color: "bg-cyan-50"
  },
  {
    title: "AI Integration",
    desc: "Leveraging cutting-edge Large Language Models and computer vision to automate organizational intelligence.",
    icon: "🤖",
    color: "bg-emerald-50"
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-3">Our Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Global Solutions, African Innovation</h3>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            We don't just build software; we engineer competitive advantages. Our multidisciplinary team brings world-class standards to every project, delivering impact across borders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="group p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center text-3xl mb-6 shadow-sm`}>
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h4>
              <p className="text-slate-600 leading-relaxed mb-6">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
