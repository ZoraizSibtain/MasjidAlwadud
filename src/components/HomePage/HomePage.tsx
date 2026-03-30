import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="space-y-6">

      {/* Hero */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-on-secondary-container bg-secondary-container px-3 py-1 rounded-full">
            Available for select projects
          </span>
          <div className="h-px w-10 bg-outline-variant/40"></div>
          <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-outline">
            NYC · Remote
          </span>
        </div>

        <h2 className="text-7xl font-['Inter'] font-extrabold tracking-tighter leading-[0.9] text-primary mb-6">
          Zoraiz<br />Sibtain
        </h2>

        <p className="text-xl font-['Inter'] font-light text-on-surface-variant leading-relaxed mb-8 max-w-lg">
          Software & AI Engineer specializing in{" "}
          <span className="text-primary font-semibold">AI integration</span>{" "}
          and scalable enterprise applications.
        </p>

        <div className="flex items-center space-x-4">
          <Link
            to="/experience"
            className="bg-primary text-on-primary px-7 py-3.5 rounded-xl font-['Inter'] font-bold text-sm tracking-tight flex items-center space-x-2 group hover:opacity-90 transition-opacity"
          >
            <span>VIEW EXPERIENCE</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
          <Link
            to="/contact"
            className="border border-outline-variant/40 bg-surface-container-lowest px-7 py-3.5 rounded-xl font-['Inter'] font-bold text-sm tracking-tight hover:bg-surface-container-low transition-colors"
          >
            GET IN TOUCH
          </Link>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Education Card */}
        <div className="bg-surface-container-low p-7 rounded-2xl flex flex-col justify-between shadow-sm">
          <div>
            <span className="font-['Space_Grotesk'] text-[10px] text-outline tracking-widest uppercase">
              Academic Background
            </span>
            <h3 className="font-['Inter'] font-bold text-lg mt-4 mb-2 text-on-surface">
              Illinois Institute of Technology
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Master of Computer Science & Software Engineering
            </p>
          </div>
          <div className="mt-6 flex items-center space-x-2 text-primary">
            <span className="material-symbols-outlined text-[20px]">school</span>
            <span className="text-xs font-bold font-['Space_Grotesk'] uppercase tracking-widest">
              Master's Degree
            </span>
          </div>
        </div>

        {/* AI Expertise Card */}
        <div className="md:col-span-1 lg:col-span-2 bg-primary text-on-primary p-7 rounded-2xl relative overflow-hidden shadow-sm">
          <div className="relative z-10">
            <span className="font-['Space_Grotesk'] text-[10px] text-on-primary/60 tracking-widest uppercase">
              Expertise
            </span>
            <h3 className="font-['Inter'] font-bold text-2xl mt-4 mb-4">
              Building intelligent systems that scale beyond the sandbox.
            </h3>
            <div className="flex flex-wrap gap-2 mt-6">
              {["LLM Integration", "Enterprise AI", "QA Automation"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-['Space_Grotesk'] border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <span className="material-symbols-outlined" style={{ fontSize: '160px' }}>memory</span>
          </div>
        </div>

        {/* Featured Project Card */}
        <a 
          href="https://github.com/ZoraizSibtain/MagariHub" 
          target="_blank" 
          rel="noopener noreferrer"
          className="lg:col-span-2 block no-underline"
        >
        <div className="lg:col-span-2 bg-surface-container-lowest p-7 rounded-2xl border border-outline-variant/15 group cursor-pointer hover:bg-surface-container-low transition-colors duration-300 shadow-sm hover:shadow-md">
          <div className="flex justify-between items-start mb-5">
            <div>
              <span className="font-['Space_Grotesk'] text-[10px] text-outline tracking-widest uppercase">
                Featured Project
              </span>
              <h3 className="font-['Inter'] font-extrabold text-2xl mt-2 text-on-surface">
                MagariHub
              </h3>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
              north_east
            </span>
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-5">
            An AI-powered car sales platform featuring a LangChain-based natural language recommendation engine,
            secured with JWT and Firebase Authentication. Built with React, Node.js, and PostgreSQL.
          </p>
          <div className="flex items-center space-x-4">
            <div className="h-0.5 bg-primary w-10"></div>
            <span className="text-xs font-['Space_Grotesk'] text-outline uppercase tracking-tighter">
              LangChain · React · PostgreSQL
            </span>
          </div>
        </div>
        </a>

        {/* Location / Status Card */}
        <div className="bg-surface-container-low p-7 rounded-2xl flex flex-col justify-center items-center text-center shadow-sm">
          <div className="h-20 w-20 rounded-full border border-outline-variant/30 flex items-center justify-center mb-5 relative">
            <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin-slow"></div>
            <span className="material-symbols-outlined text-2xl text-on-surface">location_on</span>
          </div>
          <h3 className="font-['Inter'] font-bold text-lg text-on-surface">New York, NY</h3>
          <p className="text-sm text-on-surface-variant mt-1.5">AI & QA Engineer</p>
          {/* <p className="text-xs text-outline mt-1">The Curated Architect</p> */}
        </div>

      </div>

      {/* Methodology Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div className="flex space-x-5">
          <div className="flex-shrink-0 w-11 h-11 bg-surface-container-lowest flex items-center justify-center rounded-xl shadow-sm border border-outline-variant/15">
            <span className="material-symbols-outlined text-primary text-[20px]">deployed_code</span>
          </div>
          <div>
            <h4 className="font-['Inter'] font-bold text-sm text-on-surface mb-1">Enterprise Scalability</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Building systems that evolve with the complexity of tomorrow's enterprise requirements.
            </p>
          </div>
        </div>

        <div className="flex space-x-5">
          <div className="flex-shrink-0 w-11 h-11 bg-surface-container-lowest flex items-center justify-center rounded-xl shadow-sm border border-outline-variant/15">
            <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
          </div>
          <div>
            <h4 className="font-['Inter'] font-bold text-sm text-on-surface mb-1">Human-Centric AI</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Integrating LLMs and automation as a functional layer that empowers users.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
