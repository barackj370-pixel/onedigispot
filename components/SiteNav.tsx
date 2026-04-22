import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const SiteNav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || !isHome || mobileMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
            <img src="/logo.svg" alt="Onedigispot.com" className="h-10 sm:h-12 w-auto object-contain" />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {isHome ? (
              <>
                <a href="#services" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Services</a>
                <a href="#projects" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Projects</a>
                <a href="#innovation-lab" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Innovation Lab</a>
              </>
            ) : (
              <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Home</Link>
            )}
            <Link to="/tools" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors flex items-center gap-1">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Free AI Tools
            </Link>
            <a href={isHome ? "#contact" : "/#contact"} className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg">
              Contact Us
            </a>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-900 focus:outline-none p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-slate-100 py-4 px-4 flex flex-col space-y-4">
            {isHome ? (
              <>
                <a onClick={() => setMobileMenuOpen(false)} href="#services" className="block text-slate-600 hover:text-indigo-600 font-medium transition-colors p-2">Services</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#projects" className="block text-slate-600 hover:text-indigo-600 font-medium transition-colors p-2">Projects</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#innovation-lab" className="block text-slate-600 hover:text-indigo-600 font-medium transition-colors p-2">Innovation Lab</a>
              </>
            ) : (
              <Link onClick={() => setMobileMenuOpen(false)} to="/" className="block text-slate-600 hover:text-indigo-600 font-medium transition-colors p-2">Home</Link>
            )}
            <Link onClick={() => setMobileMenuOpen(false)} to="/tools" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors flex items-center gap-2 p-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Free AI Tools
            </Link>
            <a onClick={() => setMobileMenuOpen(false)} href={isHome ? "#contact" : "/#contact"} className="bg-indigo-600 text-center text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md mt-4 block">
              Contact Us
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default SiteNav;
