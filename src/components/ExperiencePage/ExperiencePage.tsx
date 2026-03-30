import { useEffect, useRef } from 'react';

type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  subtitle: string;
  bullets: string[];
  tags: string[];
  badge?: string;
};

type EducationItem = {
  degree: string;
  school: string;
  period: string;
  location: string;
  focus?: string;
  tags?: string[];
};

const experiences: ExperienceItem[] = [
  {
    role: "Quality Assurance Lead",
    company: "True Security Consultant Limited",
    period: "Nov 2021 – Dec 2024",
    subtitle: "Led QA team of 10, automated documentation and incident analysis with AI.",
    badge: "LEADERSHIP",
    bullets: [
      "Implemented ChatGPT AI to automate SOP reviewing, reducing documentation time from 5 hours to 90 minutes per procedure.",
      "Deployed ChatGPT to analyze production incident patterns across 200+ tickets, identifying root causes 60% faster and reducing recurring issues by 25%.",
      "Led end-to-end quality validation of a custom vehicle tracking system, ensuring accuracy of real-time data and system performance.",
      "Promoted to Team Lead; hired, trained, and mentored 10 analysts, enforcing quality standards and process consistency.",
      "Collaborated with stakeholders to gather, analyze, and translate business requirements into functional specifications.",
    ],
    tags: ["AI Automation", "QA", "Business Analysis", "Team Leadership", "Process Management"],
  },
  {
    role: "Software Engineering Intern",
    company: "Imatic Technologies Limited",
    period: "Apr 2021 – Oct 2021",
    subtitle: "Built automated test suites and supported CI/CD adoption across the dev workflow.",
    badge: "ENGINEERING",
    bullets: [
      "Implemented automated testing solutions using Selenium, significantly reducing regression testing time.",
      "Integrated automated tests into the development workflow, supporting CI/CD adoption.",
      "Created and maintained test scripts aligned with application functionality and business rules.",
      "Collaborated with developers to debug production defects and validate fixes before release.",
      "Contributed to full-stack development, gaining insight into testability, code quality, and system architecture.",
    ],
    tags: ["Selenium", "CI/CD", "Test Automation", "Full-Stack", "Debugging"],
  },
  {
    role: "IT Intern",
    company: "Kian Joo Can Factory Bhd",
    period: "Apr 2018 – Jun 2018",
    subtitle: "Server maintenance, asset audits, and ticketing system implementation.",
    badge: "OPERATIONS",
    bullets: [
      "Performed daily server backups and validation checks to ensure data integrity.",
      "Conducted hardware and system audits across multiple locations, improving asset tracking accuracy.",
      "Implemented OTRS ticketing system, reducing issue resolution time by 30% and improving support SLAs.",
      "Assisted in system troubleshooting and operational QA checks for internal IT services.",
    ],
    tags: ["OTRS", "System Administration", "IT Operations", "Hardware Audit"],
  },
];

const education: EducationItem[] = [
  {
    degree: "Professional Master of Computer Science",
    school: "Illinois Institute of Technology",
    period: "Summer 2026",
    location: "Chicago, Illinois",
    focus: "AI, AI integration into Enterprise Applications, Software Project Management, Systems Architecture, Advanced Database Organization, Parallel & Distributed Processing",
    tags: ["Artificial Intelligence", "Systems Architecture", "Distributed Processing", "Database Organization"],
  },
  {
    degree: "Bachelor of Software Engineering",
    school: "Taylor's University",
    period: "2019 – 2022",
    location: "Kuala Lumpur, Malaysia",
    tags: ["Software Engineering", "OOP", "Web Development", "Database Systems"],
  },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('fade-in-hidden');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.remove('fade-in-hidden');
            el.classList.add('animate-fade-in-up');
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}

function Tag({ label }: { label: string }) {
  return (
    <span className="text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full font-['Space_Grotesk'] border border-outline-variant/20">
      {label}
    </span>
  );
}

const ExperiencePage = () => {
  return (
    <div className="space-y-6">

      {/* Header */}
      <FadeIn>
        <div className="mb-10">
          <span className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-outline block mb-4">
            03 / Career Journey
          </span>
          <h1 className="font-['Inter'] font-extrabold text-6xl tracking-tighter leading-[0.9] text-on-surface mb-6">
            Bridging the gap between<br />
            <span className="text-outline-variant italic">Engineering</span>{" & "}
            <span className="bg-primary-container text-white px-3 py-1 inline-block">AI Logic</span>.
          </h1>
          <p className="text-lg text-on-secondary-container font-['Inter'] font-light leading-relaxed max-w-2xl">
            A career dedicated to precision — from leading QA teams to developing autonomous AI workflows,
            transforming complex testing paradigms into streamlined digital architecture.
          </p>
        </div>
      </FadeIn>

      {/* Experience Timeline */}
      <div className="space-y-6">
        {experiences.map((exp, i) => (
          <FadeIn key={i} delay={i * 100}>
            <div className="bg-surface-container-low p-8 rounded-2xl relative overflow-hidden group hover:bg-surface-container transition-colors duration-300 shadow-sm hover:shadow-md">

              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="font-['Space_Grotesk'] text-[10px] text-outline tracking-widest uppercase block mb-2">
                    {exp.period}
                  </span>
                  <h3 className="font-['Inter'] font-bold text-2xl text-on-surface tracking-tight">
                    {exp.role}
                  </h3>
                  <p className="font-['Space_Grotesk'] text-sm uppercase tracking-widest text-on-secondary-container mt-1">
                    {exp.company}
                  </p>
                </div>
                {exp.badge && (
                  <span className="bg-surface-container-lowest px-4 py-1.5 rounded-full border border-outline-variant/20 text-xs font-['Space_Grotesk'] font-bold text-primary">
                    {exp.badge}
                  </span>
                )}
              </div>

              <p className="text-sm text-on-surface-variant leading-relaxed mb-5 italic">
                {exp.subtitle}
              </p>

              <ul className="space-y-2.5 mb-6">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="flex items-start space-x-3">
                    <span className="material-symbols-outlined text-primary text-[16px] mt-0.5 flex-shrink-0">check_circle</span>
                    <span className="text-sm text-on-surface-variant leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => <Tag key={tag} label={tag} />)}
              </div>

              <div className="absolute -right-8 -bottom-8 opacity-5">
                <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>terminal</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Education */}
      <FadeIn delay={150}>
        <div className="pt-4 space-y-4">
          <div className="flex items-center space-x-4 mb-6">
            <span className="font-['Space_Grotesk'] text-xs uppercase tracking-widest text-outline">Education</span>
            <div className="flex-1 h-px bg-outline-variant/20"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {education.map((edu, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-surface-container-lowest p-7 rounded-2xl border border-outline-variant/15 h-full shadow-sm">
                  <span className="font-['Space_Grotesk'] text-[10px] text-outline tracking-widest uppercase block mb-3">
                    {edu.period} · {edu.location}
                  </span>
                  <h3 className="font-['Inter'] font-bold text-lg text-on-surface tracking-tight mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-on-secondary-container font-['Space_Grotesk'] mb-4">
                    {edu.school}
                  </p>
                  {edu.focus && (
                    <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                      {edu.focus}
                    </p>
                  )}
                  {edu.tags && (
                    <div className="flex flex-wrap gap-2">
                      {edu.tags.map((tag) => <Tag key={tag} label={tag} />)}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </FadeIn>

    </div>
  );
};

export default ExperiencePage;
