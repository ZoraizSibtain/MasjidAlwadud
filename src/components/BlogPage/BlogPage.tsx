import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blog/posts';

const categories = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All' ? blogPosts : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-16 pb-12">
      {/* Header */}
      <section className="space-y-6">
        <div className="inline-block px-3 py-1 bg-surface-container-highest rounded-full">
          <span className="text-[10px] font-bold tracking-widest uppercase font-['Space_Grotesk'] text-on-surface-variant">
            Writing
          </span>
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-primary leading-[1.1] font-['Space_Grotesk']">
          Peek into Professional
          <br />
          <span className="text-on-primary-container"> & Personal Life.</span>
        </h1>
        <p className="text-lg leading-relaxed text-on-surface-variant max-w-md font-['Inter']">
          Field notes from building AI systems, automating workflows, and lessons learned the hard
          way.
        </p>
      </section>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase font-['Space_Grotesk'] transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-slate-950 text-white'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Post List */}
      <div className="space-y-1">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group flex items-center justify-between p-6 rounded-xl hover:bg-surface-container-low transition-all duration-200 border border-transparent hover:border-outline-variant/10"
          >
            <div className="flex-1 min-w-0 pr-6 space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded-full text-[9px] font-bold tracking-widest uppercase font-['Space_Grotesk']">
                  {post.category}
                </span>
                <span className="text-[11px] text-on-surface-variant font-['Space_Grotesk'] tracking-wide">
                  {post.date} · {post.readTime}
                </span>
              </div>
              <h2 className="text-base font-bold font-['Space_Grotesk'] tracking-tight text-on-surface group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-on-surface-variant font-['Inter'] leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            </div>
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0">
              arrow_forward
            </span>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="text-on-surface-variant font-['Inter'] text-sm py-12 text-center">
            No posts in this category yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
