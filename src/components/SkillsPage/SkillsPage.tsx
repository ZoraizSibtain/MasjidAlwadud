import type { ReactNode } from 'react';
import {
  SiOpenai, SiGoogle, SiReact, SiNodedotjs, SiJavascript,
  SiTypescript, SiBootstrap, SiDjango, SiDotnet, SiPostgresql,
  SiMongodb, SiSelenium, SiFirebase, SiGit,
} from 'react-icons/si';
import {
  FaBrain, FaLink, FaLock, FaServer, FaProjectDiagram, FaUserCheck,
} from 'react-icons/fa';
import { FiZap, FiGitMerge, FiLayout, FiCpu } from 'react-icons/fi';

type Skill = {
  name: string;
  category: string;
  icon: ReactNode;
};

type SkillSection = {
  title: string;
  icon: string;
  skills: Skill[];
};

const sections: SkillSection[] = [
  {
    title: "AI & LLMs",
    icon: "psychology",
    skills: [
      { name: "Claude",        category: "Anthropic",    icon: <FaBrain /> },
      { name: "ChatGPT",       category: "OpenAI",       icon: <SiOpenai /> },
      { name: "Gemini",        category: "Google",       icon: <SiGoogle /> },
      { name: "LangChain",     category: "AI Framework", icon: <FaLink /> },
      { name: "LangGraph",     category: "AI Framework", icon: <FiCpu /> },
      { name: "AI Workflows",  category: "Automation",   icon: <FiZap /> },
    ],
  },
  {
    title: "Frontend",
    icon: "web",
    skills: [
      { name: "React",       category: "Framework", icon: <SiReact /> },
      { name: "JavaScript",  category: "Language",  icon: <SiJavascript /> },
      { name: "TypeScript",  category: "Language",  icon: <SiTypescript /> },
      { name: "Bootstrap",   category: "CSS",       icon: <SiBootstrap /> },
    ],
  },
  {
    title: "Backend",
    icon: "dns",
    skills: [
      { name: "Node.js", category: "Runtime",   icon: <SiNodedotjs /> },
      { name: "Django",  category: "Framework", icon: <SiDjango /> },
      { name: ".NET",    category: "Framework", icon: <SiDotnet /> },
    ],
  },
  {
    title: "Databases",
    icon: "database",
    skills: [
      { name: "PostgreSQL", category: "Relational", icon: <SiPostgresql /> },
      { name: "MongoDB",    category: "NoSQL",      icon: <SiMongodb /> },
    ],
  },
  {
    title: "Testing & QA",
    icon: "fact_check",
    skills: [
      { name: "Selenium",     category: "Automation", icon: <SiSelenium /> },
      { name: "CI/CD",        category: "DevOps",     icon: <FiGitMerge /> },
      { name: "API Testing",  category: "QA",         icon: <FaServer /> },
    ],
  },
  {
    title: "Security & Tools",
    icon: "security",
    skills: [
      { name: "JWT",                   category: "Auth",            icon: <FaLock /> },
      { name: "Firebase",              category: "Auth",            icon: <SiFirebase /> },
      { name: "Git",                   category: "Version Control", icon: <SiGit /> },
    ],
  },
];

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="flex flex-row items-center p-3 rounded-xl gap-3 border border-outline-variant/20 bg-surface-container-lowest hover:border-outline-variant/60 hover:bg-surface-container-low transition-all duration-200 cursor-default group">
      <div className="text-xl text-on-surface-variant w-9 h-9 flex items-center justify-center shrink-0 bg-surface-container rounded-lg group-hover:text-primary transition-colors">
        {skill.icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-['Inter'] font-medium text-on-surface truncate">{skill.name}</p>
        <p className="text-xs font-['Space_Grotesk'] text-outline truncate">{skill.category}</p>
      </div>
    </div>
  );
}

const SkillsPage = () => {
  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <span className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-outline block mb-4">
          04 / Stack
        </span>
        <h1 className="font-['Inter'] font-extrabold text-6xl tracking-tighter leading-[0.9] text-primary mb-4">
          Tech Stack
        </h1>
        <p className="font-['Inter'] text-on-surface-variant font-light text-lg leading-relaxed">
          Technologies and tools I work with.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.title} className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10">
            <div className="flex items-center space-x-3 mb-4">
              <span className="material-symbols-outlined text-primary text-[18px]">{section.icon}</span>
              <h2 className="text-xs font-['Space_Grotesk'] font-bold uppercase tracking-widest text-on-surface-variant">
                {section.title}
              </h2>
              <div className="flex-1 h-px bg-outline-variant/20"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {section.skills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default SkillsPage;
