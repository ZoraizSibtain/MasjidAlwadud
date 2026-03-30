const cards = [
  {
    icon: "code",
    label: "GitHub",
    handle: "@ZoraizSibtain",
    href: "https://github.com/ZoraizSibtain",
    desc: "View my open source work and projects",
  },
  {
    icon: "work",
    label: "LinkedIn",
    handle: "zoraiz-sibtain",
    href: "https://linkedin.com/in/zoraiz-sibtain",
    desc: "Connect professionally",
  },
  {
    icon: "mail",
    label: "Email",
    handle: "zoraiz.sibtain@hotmail.com",
    href: "mailto:zoraiz.sibtain@hotmail.com",
    desc: "Best for direct inquiries",
  },
];

const ContactPage = () => {
  return (
    <div className="space-y-12">

      {/* Header */}
      <div>
        <span className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-outline block mb-4">
          05 / Contact
        </span>
        <h1 className="font-['Inter'] font-extrabold text-6xl tracking-tighter leading-[0.9] text-primary mb-6">
          Get in<br />Touch
        </h1>
        <p className="font-['Inter'] text-on-surface-variant font-light text-lg leading-relaxed max-w-lg">
          If you're working on something in AI, automation, software development or just want to connect, reach out.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            target={card.href.startsWith('mailto') ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="flex flex-col gap-5 p-7 rounded-2xl border border-outline-variant/20 bg-surface-container-lowest hover:border-outline-variant/60 hover:bg-surface-container-low transition-all duration-200 group"
          >
            <div className="w-11 h-11 bg-surface-container rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all duration-200">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-on-primary transition-colors">
                {card.icon}
              </span>
            </div>
            <div>
              <p className="font-['Inter'] font-bold text-on-surface text-base">{card.label}</p>
              <p className="font-['Space_Grotesk'] text-xs text-outline mt-0.5 break-all">{card.handle}</p>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">{card.desc}</p>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[18px] self-end">
              north_east
            </span>
          </a>
        ))}
      </div>

      {/* Status */}
      <div className="bg-surface-container-low p-7 rounded-2xl border border-outline-variant/15">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="font-['Space_Grotesk'] text-xs uppercase tracking-widest text-outline">
            Status
          </span>
        </div>
        <p className="font-['Inter'] font-bold text-on-surface text-lg mb-1">Available for opportunities</p>
        <p className="text-sm text-on-surface-variant">
          Based in Bronx, NY · Open to internships, collaborations, and full-time roles.
        </p>
      </div>

    </div>
  );
};

export default ContactPage;
