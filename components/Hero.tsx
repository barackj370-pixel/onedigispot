import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Globe, Cpu, PenTool, Share2, Search, Edit3, ArrowRight, Sparkles, Filter, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 'services',
    badge: 'Core Services',
    title: 'Architecting the Digital Future',
    description: 'We build bespoke, high-performance applications and integrate predictive AI to scale your operations globally.',
    accent: 'from-indigo-500 to-cyan-400',
    bgOrb: 'bg-indigo-600/20',
    items: [
      { title: 'Custom App Dev', icon: <Smartphone className="w-6 h-6" />, delay: 0.1 },
      { title: 'Enterprise Web', icon: <Globe className="w-6 h-6" />, delay: 0.2 },
      { title: 'AI Integration', icon: <Cpu className="w-6 h-6" />, delay: 0.3 },
      { title: 'Database Design', icon: <Database className="w-6 h-6" />, delay: 0.4 }
    ]
  },
  {
    id: 'ai-tools',
    badge: 'Free AI Marketing Tools',
    title: 'Next-Gen Marketing Engine',
    description: 'Supercharge your growth with our suite of intelligent, automated AI marketing tools. Available for free.',
    accent: 'from-pink-500 to-rose-400',
    bgOrb: 'bg-pink-600/20',
    items: [
      { title: 'Logo Generator', icon: <PenTool className="w-5 h-5 md:w-6 md:h-6" />, delay: 0.1 },
      { title: 'Social Media AI', icon: <Share2 className="w-5 h-5 md:w-6 md:h-6" />, delay: 0.2 },
      { title: 'SEO Keywords', icon: <Search className="w-5 h-5 md:w-6 md:h-6" />, delay: 0.3 },
      { title: 'Funnel Builder', icon: <Filter className="w-5 h-5 md:w-6 md:h-6" />, delay: 0.4 }
    ]
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000); // Decreased to 10000ms
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section 
      className="relative w-full min-h-[100svh] lg:h-[100svh] pt-[120px] md:pt-[100px] pb-20 md:pb-0 overflow-hidden flex items-center bg-slate-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={slides[currentSlide].id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className={`absolute top-[-20%] left-[-10%] w-[100vw] h-[100vw] sm:w-[70vw] sm:h-[70vw] rounded-full blur-[80px] md:blur-[120px] ${slides[currentSlide].bgOrb}`}
          />
        </AnimatePresence>
        <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] sm:w-[60vw] sm:h-[60vw] bg-blue-100/40 rounded-full blur-[80px] md:blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pb-16 md:pb-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="relative min-h-[350px] md:h-[350px] flex flex-col justify-center text-center md:text-left items-center md:items-start pt-10 md:pt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col justify-center items-center md:items-start"
              >
                <div className="inline-flex items-center space-x-2 bg-white/60 border border-slate-200 rounded-full px-4 py-1.5 mb-6 w-fit backdrop-blur-md shadow-sm">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span className="text-slate-700 text-sm font-semibold tracking-wide uppercase">
                    {slides[currentSlide].badge}
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.2] md:leading-[1.1] mb-6">
                  {slides[currentSlide].title.split(' ').slice(0, -2).join(' ')} <br className="hidden sm:block" />
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slides[currentSlide].accent}`}>
                    {slides[currentSlide].title.split(' ').slice(-2).join(' ')}
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed mb-8">
                  {slides[currentSlide].description}
                </p>

                <div className="flex items-center space-x-4">
                  {currentSlide === 0 ? (
                    <a href="#contact" className="px-6 py-3 md:px-8 md:py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center group shadow-lg">
                      Start Project
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <Link to="/tools" className="px-6 py-3 md:px-8 md:py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center group shadow-lg">
                      Explore AI Tools
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Creative Visual */}
          <div className="relative h-[250px] sm:h-[300px] md:h-[400px] flex lg:flex items-center justify-center mt-12 md:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className="absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center"
              >
                <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-sm md:max-w-md relative pb-10 md:pb-0">
                  {slides[currentSlide].items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: idx % 2 === 1 ? 24 : -24 }}
                      exit={{ opacity: 0, scale: 0.8, y: -30 }}
                      transition={{ delay: item.delay, duration: 0.6, type: "spring", stiffness: 100 }}
                      className="bg-white/80 backdrop-blur-xl border border-white/60 p-4 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-xl flex flex-col items-center justify-center text-center hover:bg-white transition-colors group"
                    >
                      <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${slides[currentSlide].accent} text-white mb-2 md:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-slate-900 text-xs sm:text-sm md:text-lg">{item.title}</h3>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Custom Navigation Dots */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-4 z-20 bg-slate-900/5 backdrop-blur-sm px-4 py-2 rounded-full">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-500 hover:scale-110 ${
                currentSlide === index ? 'w-12 bg-indigo-600' : 'w-4 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
