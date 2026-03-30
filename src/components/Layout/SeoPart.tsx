import { useLocation } from "react-router-dom";
import Helmet from "react-helmet";

const BASE_URL = "https://zoraizsibtain.com";
const OG_IMAGE = `${BASE_URL}/og-image.jpg`;

const pageMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Zoraiz Sibtain — Software & AI Engineer",
    description:
      "Zoraiz Sibtain is a Software & AI Engineer based in New York specializing in LLM integration, enterprise applications, and QA automation. MS Computer Science, Illinois Institute of Technology.",
  },
  "/about": {
    title: "About — Zoraiz Sibtain",
    description:
      "Learn about Zoraiz Sibtain's background, education at Illinois Tech, and passion for building AI-powered software.",
  },
  "/experience": {
    title: "Experience — Zoraiz Sibtain",
    description:
      "Professional experience of Zoraiz Sibtain including software engineering roles, AI integration projects, and QA leadership.",
  },
  "/skills": {
    title: "Tech Stack — Zoraiz Sibtain",
    description:
      "Technologies and tools Zoraiz Sibtain works with: React, Node.js, LangChain, PostgreSQL, TypeScript, and more.",
  },
  "/contact": {
    title: "Contact — Zoraiz Sibtain",
    description:
      "Get in touch with Zoraiz Sibtain for software engineering, AI integration projects, or collaboration opportunities.",
  },
  "/blog": {
    title: "Blog — Zoraiz Sibtain",
    description:
      "Field notes on AI engineering, LLM integration, and automation by Zoraiz Sibtain — Software & AI Engineer.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Zoraiz Sibtain",
  url: BASE_URL,
  image: OG_IMAGE,
  jobTitle: "Software & AI Engineer",
  description:
    "Software & AI Engineer specializing in LLM integration and scalable enterprise applications.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New York",
    addressRegion: "NY",
    addressCountry: "US",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Illinois Institute of Technology",
  },
  sameAs: [
    "https://github.com/ZoraizSibtain",
    "https://linkedin.com/in/zoraiz-sibtain",
  ],
};

const SeoPart = () => {
  const { pathname } = useLocation();
  const metaKey = pathname.startsWith('/blog') ? '/blog' : pathname;
  const meta = pageMeta[metaKey] ?? pageMeta["/"];
  const canonical = `${BASE_URL}${pathname === "/" ? "" : pathname}`;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="author" content="Zoraiz Sibtain" />
      <meta
        name="keywords"
        content="Zoraiz Sibtain, Software Engineer, AI Engineer, LLM Integration, LangChain, React, TypeScript, QA Automation, Illinois Institute of Technology, New York"
      />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Zoraiz Sibtain" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SeoPart;
