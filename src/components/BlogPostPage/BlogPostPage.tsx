import { Link, useParams, Navigate } from 'react-router-dom';
import { getPostBySlug, type BlogSection } from '@/data/blog/posts';

const renderSection = (section: BlogSection, index: number) => {
  switch (section.type) {
    case 'paragraph':
      return (
        <p key={index} className="text-[15px] leading-relaxed text-on-surface-variant font-['Inter']">
          {section.text}
        </p>
      );
    case 'heading':
      return (
        <h2
          key={index}
          className="text-xl font-bold font-['Space_Grotesk'] tracking-tight text-on-surface pt-4"
        >
          {section.text}
        </h2>
      );
    case 'subheading':
      return (
        <h3
          key={index}
          className="text-base font-bold font-['Space_Grotesk'] tracking-tight text-on-surface"
        >
          {section.text}
        </h3>
      );
    case 'blockquote':
      return (
        <blockquote key={index} className="border-l-4 border-primary pl-6 py-1 my-2">
          <p className="text-[15px] italic leading-relaxed text-on-surface font-['Inter'] font-medium">
            {section.text}
          </p>
        </blockquote>
      );
    case 'list':
      return (
        <ul key={index} className="space-y-2">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-[9px] w-1 h-1 rounded-full bg-primary flex-shrink-0" />
              <span className="text-[15px] leading-relaxed text-on-surface-variant font-['Inter']">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug ?? '');

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="space-y-12 pb-12">
      {/* Back */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase font-['Space_Grotesk'] text-on-surface-variant hover:text-primary transition-colors"
      >
        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
        All Posts
      </Link>

      {/* Header */}
      <header className="space-y-5">
        <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[9px] font-bold tracking-widest uppercase font-['Space_Grotesk']">
          {post.category}
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface leading-[1.2] font-['Space_Grotesk']">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-on-primary text-[11px] font-bold font-['Space_Grotesk']">ZS</span>
            </div>
            <span className="text-sm font-medium font-['Space_Grotesk'] text-on-surface">
              Zoraiz Sibtain
            </span>
          </div>
          <span className="text-on-surface-variant text-xs">·</span>
          <span className="text-xs text-on-surface-variant font-['Space_Grotesk']">{post.date}</span>
          <span className="text-on-surface-variant text-xs">·</span>
          <span className="text-xs text-on-surface-variant font-['Space_Grotesk']">
            {post.readTime}
          </span>
        </div>
        <p className="text-base leading-relaxed text-on-surface-variant font-['Inter'] border-t border-outline-variant/20 pt-6">
          {post.excerpt}
        </p>
      </header>

      {/* Body */}
      <article className="space-y-6">
        {post.content.map((section, i) => renderSection(section, i))}
      </article>

      {/* Tags + Footer */}
      <footer className="pt-6 border-t border-outline-variant/20 space-y-4">
        <p className="text-[10px] font-bold tracking-widest uppercase font-['Space_Grotesk'] text-on-surface-variant">
          Tagged
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-surface-container-highest text-on-surface-variant rounded-full text-[10px] font-bold tracking-widest uppercase font-['Space_Grotesk']"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 pt-2 text-xs font-bold font-['Space_Grotesk'] text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to all posts
        </Link>
      </footer>
    </div>
  );
};

export default BlogPostPage;
