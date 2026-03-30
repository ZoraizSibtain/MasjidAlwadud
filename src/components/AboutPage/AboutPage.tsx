import { Link } from "react-router-dom";
import userImage from "@/assets/images/user-highres.jpg";

const goals = [
  { title: "Athletic Peak",  sub: "A sub-25min 5K run.",              icon: "speed"       },
  { title: "Scale Agency",   sub: "Growing my company to 50+ clients.", icon: "query_stats" },
  { title: "NYC Explorer",   sub: "10 new cafes in each of the 4 boroughs (no Staten Island).", icon: "explore"    },
];

const tags = ["Skiing", "Car Maintenance", "Fitness", "Cafes"];

const AboutPage = () => {
  return (
    <div className="space-y-20 pb-12">

      {/* ── Hero ── */}
      <section className="space-y-6">
        {/* Hero image with floating location badge */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-low shadow-sm">
          <img
            src={userImage}
            alt="Zoraiz Sibtain"
            width={800}
            height={600}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-highest/90 backdrop-blur-sm rounded-full border border-outline-variant/20 shadow-sm">
            <span className="material-symbols-outlined text-[14px] text-on-surface-variant">location_on</span>
            <span className="text-[10px] font-bold tracking-widest uppercase font-['Space_Grotesk'] text-on-surface-variant">
              Based in Bronx, NY
            </span>
          </div>
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-primary leading-[1.1] font-['Space_Grotesk']">
          Zoraiz Sibtain.<br />
          <span className="text-on-primary-container">Building Solutions.</span>
        </h1>
        <p className="text-lg leading-relaxed text-on-surface-variant max-w-md font-['Inter']">
          Software Engineer obsessed with eliminating manual toil through intelligent architectural design.
        </p>
      </section>

      {/* ── Professional Story ── */}
      <section className="space-y-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold tracking-tight font-['Space_Grotesk']">Professional Story</h2>
          <span className="text-[10px] font-bold tracking-widest uppercase font-['Space_Grotesk'] text-on-tertiary-container">
            01 / Logic
          </span>
        </div>

        <div className="space-y-6">
          {/* Main career card */}
          <div className="bg-surface-container-low p-8 rounded-xl space-y-6 shadow-sm">
            <span className="material-symbols-outlined text-3xl text-primary">terminal</span>
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-['Space_Grotesk']">The Automation Architect</h3>
              <p className="text-on-surface-variant leading-relaxed font-['Inter'] text-sm">
                I joined True Security Consultant Limited where I transformed
                legacy workflows. By implementing AI-driven systems, I reduced 90-minute documentation cycles
                and accelerated root cause analysis by 60%, while mentoring a team of 10 analysts.
              </p>
            </div>
          </div>

          {/* 2-col project cards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-surface-container-highest p-6 rounded-xl space-y-4 shadow-sm">
              <span className="material-symbols-outlined text-2xl text-on-surface">directions_car</span>
              <p className="text-xs font-bold font-['Space_Grotesk'] uppercase tracking-widest text-on-surface">MagariHub</p>
              <p className="text-sm leading-snug font-medium font-['Inter'] text-on-surface-variant">
                Engineering an AI car platform to redefine vehicle sourcing.
              </p>
            </div>
            <div className="bg-primary-container p-6 rounded-xl space-y-4 shadow-sm">
              <span className="material-symbols-outlined text-2xl text-on-primary">token</span>
              <p className="text-xs font-bold font-['Space_Grotesk'] uppercase tracking-widest text-on-primary-container">
                Imatic Technologies Limited
              </p>
              <p className="text-sm leading-snug font-medium font-['Inter'] text-on-primary/80">
                Formative internship where the "Learn-by-Building" ethos began.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Personal Narrative ── */}
      <section className="space-y-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold tracking-tight font-['Space_Grotesk']">Personal Narrative</h2>
          <span className="text-[10px] font-bold tracking-widest uppercase font-['Space_Grotesk'] text-on-tertiary-container">
            02 / Craft
          </span>
        </div>

        {/* Tinkering card */}
        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10">
          <h3 className="text-lg font-bold mb-4 font-['Space_Grotesk']">Tinkering &amp; Trails</h3>
          <p className="text-on-surface-variant leading-relaxed text-sm mb-6 font-['Inter']">
            When I'm not in the terminal, you'll find me under the hood of a car or on a mountain side.
            My "learn-by-building" attitude extends to everything, from fitness and car maintenance to
            exploring the great outdoors.
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold tracking-widest font-['Space_Grotesk'] uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Recent obsession cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-8 rounded-xl flex items-center gap-6 shadow-sm">
            <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-surface-container-highest flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-on-surface-variant">local_cafe</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold font-['Space_Grotesk'] uppercase tracking-widest text-on-tertiary-container">
                Recent Obsession
              </p>
              <p className="text-sm font-medium font-['Inter']">Kaafi by Chaiguy — serves the best Gulab jamun doughnuts.</p>
            </div>
          </div>
          <div className="bg-surface-container-low p-8 rounded-xl flex items-center gap-6 shadow-sm">
            <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-surface-container-highest flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-on-surface-variant">lunch_dining</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold font-['Space_Grotesk'] uppercase tracking-widest text-on-tertiary-container">
                Food Obsession
              </p>
              <p className="text-sm font-medium font-['Inter']">Butter — criminally good smash burgers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision 2026 ── */}
      <section className="space-y-8 pb-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold tracking-tight font-['Space_Grotesk']">Vision 2026</h2>
          <span className="text-[10px] font-bold tracking-widest uppercase font-['Space_Grotesk'] text-on-tertiary-container">
            03 / Growth
          </span>
        </div>

        <div className="space-y-4">
          {goals.map(({ title, sub, icon }) => (
            <div
              key={title}
              className="group flex items-center justify-between p-6 bg-surface-container-lowest rounded-xl hover:bg-primary hover:text-on-primary transition-all duration-300 cursor-default border border-outline-variant/10 shadow-sm hover:shadow-md"
            >
              <div className="space-y-1">
                <h4 className="text-lg font-bold font-['Space_Grotesk']">{title}</h4>
                <p className="text-sm text-on-surface-variant group-hover:text-on-primary/70 font-['Inter']">
                  {sub}
                </p>
              </div>
              <span className="material-symbols-outlined text-3xl opacity-20 group-hover:opacity-100 transition-opacity">
                {icon}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-4 pt-2">
          <Link
            to="/contact"
            className="bg-primary text-on-primary px-6 py-3 rounded-xl font-['Inter'] font-bold text-sm tracking-tight hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </Link>
          <a
            href="mailto:zoraiz.sibtain@hotmail.com"
            className="border border-outline-variant/40 px-6 py-3 rounded-xl font-['Inter'] font-bold text-sm tracking-tight hover:bg-surface-container-low transition-colors"
          >
            E-Mail
          </a>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
