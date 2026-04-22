
import React from 'react';

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

const Portfolio: React.FC = () => {
  return (
    <section id="projects" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-indigo-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-3">Portfolio</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 md:mb-6">Built for Success</h3>
            <p className="text-slate-600 text-base md:text-lg">
              We've partnered with visionary organizations to deliver digital solutions that solve real-world problems.
            </p>
          </div>
          <a href="#" className="w-full md:w-auto text-center px-8 py-3 border border-slate-300 rounded-full font-bold hover:bg-slate-900 hover:text-white transition-all">
            View Case Studies
          </a>
        </div>

        <div className="flex overflow-x-auto pb-8 pt-4 -mx-4 px-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:p-0 md:mx-0 no-scrollbar">
          {projects.map((project, idx) => (
            <a 
              href={project.link} 
              target={project.link !== "#" ? "_blank" : "_self"} 
              rel="noreferrer" 
              key={idx} 
              className="w-[85vw] shrink-0 snap-center mr-4 md:mr-0 md:w-auto md:shrink group overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all border border-slate-100 block flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 md:p-8">
                  <span className="text-white font-bold bg-indigo-600 px-4 py-2 rounded-full text-xs hidden md:inline-block">View Project</span>
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1">
                <span className="text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2 block">{project.category}</span>
                <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 md:mb-3">{project.title}</h4>
                <p className="text-slate-500 text-sm md:text-base line-clamp-2 md:line-clamp-none">{project.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
