import React from 'react';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: "Food Coop Market",
    category: "E-Commerce Platform",
    image: "https://s0.wp.com/mshots/v1/https://kplfoodcoopmarket.co.ke?w=800&h=600",
    desc: "An online marketplace connecting consumers with fresh, locally sourced produce and groceries.",
    link: "https://kplfoodcoopmarket.co.ke"
  },
  {
    title: "The Summer Pools",
    category: "Corporate Website",
    image: "https://s0.wp.com/mshots/v1/https://thesummerpools.com?w=800&h=600",
    desc: "A professional web presence for a premier pool construction and maintenance company.",
    link: "https://thesummerpools.com"
  },
  {
    title: "CSRG Kenya",
    category: "Organization Website",
    image: "https://s0.wp.com/mshots/v1/https://csrgkenya.org?w=800&h=600",
    desc: "A digital platform for the Civil Society Reference Group in Kenya, facilitating advocacy and engagement.",
    link: "https://csrgkenya.org"
  }
];

const PortfolioPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-6 font-heading">Our Portfolio</h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="lead text-xl text-slate-700 mb-8">
              A showcase of our best work, highlighting the innovative solutions we've built for our clients.
            </p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Featured Projects</h2>
            <p className="mb-6">
              We've had the privilege of working with a diverse range of clients, from ambitious startups to established enterprises. Here are a few examples of how we've helped them achieve their digital goals.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8 mb-8">
              {projects.map((project, idx) => (
                <a 
                  href={project.link} 
                  target={project.link !== "#" ? "_blank" : "_self"} 
                  rel="noreferrer" 
                  key={idx} 
                  className="group overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all border border-slate-100 block no-underline"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 m-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                      <span className="text-white font-bold bg-indigo-600 px-4 py-2 rounded-full text-xs">View Project</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <span className="text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2 block">{project.category}</span>
                    <h4 className="text-2xl font-bold text-slate-900 mb-3 mt-0">{project.title}</h4>
                    <p className="text-slate-500 line-clamp-2 m-0">{project.desc}</p>
                  </div>
                </a>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Our Impact</h2>
            <p className="mb-6">
              Our work spans across various industries, including finance, healthcare, retail, and education. We pride ourselves on delivering solutions that not only look great but also drive measurable business results.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Ready to be our next success story?</h3>
              <Link to="/#contact" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg no-underline">
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
