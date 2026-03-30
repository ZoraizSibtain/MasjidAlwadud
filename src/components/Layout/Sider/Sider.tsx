import AvatarBox from "@/components/Layout/Sider/AvatarBox";
import RouteButtons from "@/components/Layout/Sider/RouteButtons";
import SocialButtons from "@/components/Layout/Sider/SocialButtons";

const Sider = () => {
  return (
    <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 border-r border-outline-variant/20 bg-surface-container-low/80 backdrop-blur-xl flex-col p-6 space-y-8 z-50">
      <AvatarBox />
      <RouteButtons />
      {/* <a
        href="/Zoraiz_Sibtain_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary text-on-primary font-['Inter'] font-semibold py-3 px-4 rounded-xl text-sm text-center hover:opacity-90 transition-opacity"
      >
        Download CV
      </a> */}
      <SocialButtons />
    </aside>
  );
};

export default Sider;
