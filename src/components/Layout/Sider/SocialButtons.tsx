const SocialButtons = () => {
  return (
    <div className="pt-6 border-t border-slate-200/20 space-y-1">
      <a
        href="https://github.com/ZoraizSibtain"
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-500 flex items-center space-x-3 px-4 py-2 rounded-xl text-sm hover:text-slate-900 hover:bg-slate-200/50 transition-all duration-200"
      >
        <span className="material-symbols-outlined text-[18px]">code</span>
        <span className="font-['Inter'] tracking-tight">GitHub</span>
      </a>
      <a
        href="https://linkedin.com/in/zoraiz-sibtain"
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-500 flex items-center space-x-3 px-4 py-2 rounded-xl text-sm hover:text-slate-900 hover:bg-slate-200/50 transition-all duration-200"
      >
        <span className="material-symbols-outlined text-[18px]">work</span>
        <span className="font-['Inter'] tracking-tight">LinkedIn</span>
      </a>
    </div>
  );
};

export default SocialButtons;
