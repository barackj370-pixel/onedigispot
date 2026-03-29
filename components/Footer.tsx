
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/logo.svg" alt="Onedigispot.com" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-slate-500 mb-6 leading-relaxed">
              Kenya's premier digital innovation hub. We craft world-class custom applications and web platforms for global-minded organizations.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'LinkedIn', 'Github', 'Dribbble'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all text-slate-600">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current mask-icon"></div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Services</h4>
            <ul className="space-y-4 text-slate-500">
              <li><Link to="/services/custom-app-development" className="hover:text-indigo-600 transition-colors">Custom App Dev</Link></li>
              <li><Link to="/services/web-development" className="hover:text-indigo-600 transition-colors">Web Development</Link></li>
              <li><Link to="/services/digital-strategy" className="hover:text-indigo-600 transition-colors">Digital Strategy</Link></li>
              <li><Link to="/services/ui-ux-design" className="hover:text-indigo-600 transition-colors">UI/UX Design</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500">
              <li><Link to="/company/about-us" className="hover:text-indigo-600 transition-colors">About Onedigispot</Link></li>
              <li><Link to="/company/portfolio" className="hover:text-indigo-600 transition-colors">Portfolio</Link></li>
              <li><Link to="/company/careers" className="hover:text-indigo-600 transition-colors">Careers</Link></li>
              <li><Link to="/company/privacy-policy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/company/terms-of-service" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Contact</h4>
            <ul className="space-y-4 text-slate-500">
             
              <li className="flex items-center">
                <span className="mr-3">📧</span>
                info@onedigispot.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} Onedigispot Digital Innovations Hub. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/company/terms-of-service" className="hover:text-slate-600">Terms</Link>
            <Link to="/company/privacy-policy" className="hover:text-slate-600">Privacy</Link>
            <a href="#" className="hover:text-slate-600">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
