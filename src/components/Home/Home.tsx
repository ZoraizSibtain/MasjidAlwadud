import Sider from "@/components/Layout/Sider/Sider";
import HomePage from "@/components/HomePage/HomePage";
import Footer from "@/components/Layout/Footer";
import { Route, Routes, useLocation, Link } from "react-router-dom";
import AboutPage from "@/components/AboutPage/index";
import ContactPage from "@/components/ContactPage/index";
import ExperiencePage from "@/components/ExperiencePage/ExperiencePage";
import SkillsPage from "@/components/SkillsPage/SkillsPage";
import BlogPage from "@/components/BlogPage/index";
import BlogPostPage from "@/components/BlogPostPage/index";
import SeoPart from "@/components/Layout/SeoPart";
import Container from "@/components/Layout/Container";
import ScrollToTop from "@/components/Layout/ScrollToTop";
import { useTheme } from "@/hooks/useTheme";

const pageInfo: Record<string, { num: string; title: string }> = {
  "/":           { num: "01", title: "Home" },
  "/about":      { num: "02", title: "About" },
  "/experience": { num: "03", title: "Experience" },
  "/skills":     { num: "04", title: "Stack" },
  "/contact":    { num: "05", title: "Contact" },
  "/blog":       { num: "06", title: "Blog" },
};

const mobileNav = [
  { path: "/",           icon: "layers",          label: "Home" },
  { path: "/about",      icon: "person",          label: "About" },
  { path: "/experience", icon: "terminal",        label: "Exp" },
  { path: "/skills",     icon: "memory",          label: "Stack" },
  { path: "/contact",    icon: "alternate_email", label: "Contact" },
  { path: "/blog",       icon: "edit_note",       label: "Blog" },
];

const Home = () => {
  const { pathname } = useLocation();
  const { isDark, toggle } = useTheme();
  const page = pathname.startsWith('/blog')
    ? pageInfo["/blog"]
    : (pageInfo[pathname] ?? { num: "—", title: "Portfolio" });

  return (
    <>
      <ScrollToTop />
      <SeoPart />
      <div className="flex items-stretch min-w-full">
        <Sider />

        <div className="grow md:ml-64 min-h-screen flex flex-col bg-surface">

          {/* Top App Bar */}
          <header className="fixed top-0 right-0 left-0 md:left-64 h-16 z-40 bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-between px-6 md:px-8 border-b border-outline-variant/20">
            <div className="flex items-center space-x-3">
              <span className="font-['Space_Grotesk'] text-xs tracking-[0.2em] text-on-surface-variant uppercase">
                {page.num}
              </span>
              <span className="font-['Inter'] font-semibold text-on-surface text-sm tracking-tight uppercase">
                {page.title}
              </span>
            </div>
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="text-on-surface-variant hover:text-on-surface transition-colors p-1.5 rounded-lg hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-[22px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
          </header>

          {/* Page content — extra bottom padding on mobile for the bottom nav */}
          <main className="pt-16 pb-20 md:pb-14 flex-1 flex flex-col">
            <Container wide={pathname === '/experience' || pathname === '/skills'}>
              <Routes>
                <Route element={<HomePage />} index />
                <Route element={<AboutPage />} path="/about" />
                <Route element={<ExperiencePage />} path="/experience" />
                <Route element={<SkillsPage />} path="/skills" />
                <Route element={<ContactPage />} path="/contact" />
                <Route element={<BlogPage />} path="/blog" />
                <Route element={<BlogPostPage />} path="/blog/:slug" />
              </Routes>
            </Container>
            <Footer />
          </main>

        </div>
      </div>

      {/* Mobile Bottom Nav — hidden on md+ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-md border-t border-outline-variant/20 flex items-center justify-around px-2 h-16">
        {mobileNav.map((item) => {
          const active =
            item.path === '/'
              ? pathname === '/'
              : pathname === item.path || pathname.startsWith(item.path + '/');
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1"
            >
              <span
                className={`material-symbols-outlined text-[22px] transition-colors ${
                  active ? "text-primary" : "text-on-surface-variant"
                }`}
                style={{ fontVariationSettings: active ? "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" : undefined }}
              >
                {item.icon}
              </span>
              <span className={`text-[10px] font-['Space_Grotesk'] uppercase tracking-wide transition-colors ${
                active ? "text-primary font-bold" : "text-on-surface-variant"
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Home;
