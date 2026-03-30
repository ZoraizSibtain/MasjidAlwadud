export interface BlogSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'blockquote' | 'list';
  text?: string;
  items?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  content: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'my-portfolio-took-23-seconds-to-load',
    title: "My Portfolio Took 23 Seconds to Load. Here's How I Fixed It.",
    excerpt:
      'A Lighthouse audit exposed embarrassing Core Web Vitals on my own site. One font file was the culprit behind 88% of the load time and I had no idea.',
    date: 'Mar 24, 2026',
    readTime: '10 min read',
    category: 'Engineering',
    tags: ['Performance', 'Web Vitals', 'Lighthouse', 'Optimization'],
    content: [
      {
        type: 'paragraph',
        text: "There is a particular kind of embarrassment reserved for engineers who discover that their own portfolio, the thing they hand to every recruiter and client... is objectively broken. That was me in March 2026, when a Lighthouse audit on zoraizsibtain.com returned a First Contentful Paint of 21.8 seconds and a Largest Contentful Paint of 23.1 seconds. For context: Google considers anything above 4 seconds poor. I was nearly six times that.",
      },
      {
        type: 'paragraph',
        text: "The site looked fine to me locally. Fast, even. That gap between perceived and measured performance was the trap. My browser cached everything, my machine has no network latency, and I stopped noticing what a first-time visitor actually experiences. The audit was a cold splash of water.",
      },
      {
        type: 'heading',
        text: 'Reading the HAR Logs',
      },
      {
        type: 'paragraph',
        text: "I captured HAR network logs across four scenarios: local dev server before and after changes, and the production site before and after. The production baseline told the story immediately. Ten requests. 2,709 ms total load time. 4,674 KB of content transferred. One of those requests had a receive time of 1,940 ms on its own. I found it in the waterfall, a single font file, sitting there consuming the majority of every page load.",
      },
      {
        type: 'blockquote',
        text: 'The Material Symbols Outlined variable font was loading a full 3,802 KB file on every page. That single request accounted for over 60% of total load time.',
      },
      {
        type: 'paragraph',
        text: "Variable fonts are powerful, they pack every weight and style into one file. But that flexibility comes at a cost if you are only using a small subset of glyphs. My site used maybe 30 distinct Material Symbols icons. I was loading the entire font to display 30 icons.",
      },
      {
        type: 'heading',
        text: 'Fix 1: Subsetting the Font',
      },
      {
        type: 'paragraph',
        text: "The fix was subsetting: generating a file containing only the glyphs actually used. The resulting file was 308 KB, a 92% reduction! Font load time on the production site dropped from 1,795 ms to 144 ms. Total receive time across all requests dropped from 1,940 ms to 230 ms.",
      },
      {
        type: 'list',
        items: [
          'Font file: 3,802 KB → 308 KB (−92%)',
          'Font load time in production: 1,795 ms → 144 ms',
          'Total page receive time: 1,940 ms → 230 ms (−88%)',
          'Overall production load time: 2,709 ms → 1,287 ms (−53%)',
          'Content transferred: 4,674 KB → 737 KB (−84%)',
        ],
      },
      {
        type: 'paragraph',
        text: "This one change was responsible for almost all of the performance gain. If you take nothing else from this post, take this: audit your font loading. Variable fonts loaded from a CDN without subsetting are a silent performance killer.",
      },
      {
        type: 'heading',
        text: 'Fix 2: The Hero Image',
      },
      {
        type: 'paragraph',
        text: "The profile photo on the About page was an uncompressed JPEG at 513 KB. I converted it to WebP and ran it through lossy compression, bringing it down to 70 KB, an 86% reduction. I also added explicit width and height attributes to the img element, which was supposed to eliminate a reflow contributing to Cumulative Layout Shift.",
      },
      {
        type: 'paragraph',
        text: "The image looked identical at 70 KB. 443 KB of data was being transferred for zero visible quality benefit. That one stings in hindsight.",
      },
      {
        type: 'heading',
        text: 'Fix 3: Accessibility and Contrast',
      },
      {
        type: 'paragraph',
        text: "The audit also flagged several text elements failing WCAG 2.1 AA contrast requirements. The culprit was text-slate-400 being used on section number labels and header annotations against a near-white background. I updated these to darker equivalents in tailwind.config.cjs, bringing all affected elements above the 4.5:1 contrast ratio. The SEO score moved from 55 to 69 as a side effect of better accessibility.",
      },
      {
        type: 'heading',
        text: 'The Honest Results',
      },
      {
        type: 'paragraph',
        text: "FCP, LCP, and Speed Index all landed at 4.2 seconds post-deployment down from 21.8s, 23.1s and 21.8s respectively. That is a meaningful improvement, but it did not hit the target threshold of under 2.5 seconds for LCP. The remaining bottleneck is TTFB, which held steady at 500–690 ms across all four log scenarios. Server-side performance was completely unaffected by these changes, which means that is the next thing to look at.",
      },
      {
        type: 'blockquote',
        text: 'TTFB remained consistent across all four environments. Every performance gain came entirely from reduced asset transfer sizes — server-side was untouched.',
      },
      {
        type: 'heading',
        text: 'What I Would Tell Myself Earlier',
      },
      {
        type: 'paragraph',
        text: "Run Lighthouse on your own site before anyone else does. Do it in an incognito window over a throttled connection so you see what a real visitor sees, not what your warm-cache development environment shows you. I knew about font subsetting before this audit. I had simply never applied the knowledge to my own work, because the site felt fast to me. The gap between what you experience as the author and what a stranger experiences as a first-time visitor is larger than you think.",
      },
    ],
  },
  {
    slug: 'building-ai-qa-pipeline',
    title: 'Building an AI-Powered QA Pipeline That Actually Works',
    excerpt:
      'How I reduced root-cause analysis time by 60% by replacing manual test triaging with an LLM-driven diagnostic loop.',
    date: 'Jun 10, 2024',
    readTime: '8 min read',
    category: 'Engineering',
    tags: ['AI', 'QA', 'LangChain', 'Automation'],
    content: [
      {
        type: 'paragraph',
        text: 'Manual QA triaging is a tax on engineering velocity. When I joined True Security Consultant Limited, senior analysts were spending upward of 90 minutes per incident just reconstructing what happened before they could even begin diagnosing why. That number bothered me the moment I saw it.',
      },
      {
        type: 'heading',
        text: 'The Problem With Traditional Pipelines',
      },
      {
        type: 'paragraph',
        text: 'Most test pipelines are designed to tell you what failed, not why. The result is a handoff problem: automated systems produce data, humans interpret it, and the gap between those two steps is where hours disappear. We had hundreds of test runs per week, each producing logs, screenshots, and stack traces that someone had to manually correlate.',
      },
      {
        type: 'blockquote',
        text: 'The goal was never to replace human judgment. It was to eliminate the undifferentiated heavy lifting that preceded it.',
      },
      {
        type: 'heading',
        text: 'Designing the Diagnostic Loop',
      },
      {
        type: 'paragraph',
        text: 'The architecture I settled on treats each test failure as a document retrieval problem. LangChain chains pull the relevant log fragments, stack traces, and recent code diffs into a context window, and a structured prompt extracts a ranked list of probable causes with supporting evidence.',
      },
      {
        type: 'subheading',
        text: 'Key Components',
      },
      {
        type: 'list',
        items: [
          'Log chunking with sliding-window overlap to preserve stack trace continuity',
          'A vector store index of resolved past incidents for few-shot retrieval',
          'A structured output schema forcing the LLM to cite specific log lines',
          'A confidence threshold below which the system escalates to a human reviewer',
        ],
      },
      {
        type: 'paragraph',
        text: 'The confidence threshold was the most important design decision. Without it, the system would produce plausible-sounding but wrong diagnoses silently. With it, the team knew exactly when to trust the output and when to dig deeper.',
      },
      {
        type: 'heading',
        text: 'Results',
      },
      {
        type: 'paragraph',
        text: 'After six weeks in production, root-cause analysis time dropped by 60%. More importantly, the quality of the diagnoses as rated by the analysts using them, was higher than the manual baseline on incidents involving known failure patterns. On novel failures, the system correctly escalated 94% of the time.',
      },
      {
        type: 'paragraph',
        text: 'The biggest surprise: junior analysts were the biggest beneficiaries. The LLM output gave them a structured starting point they could verify rather than a blank slate they had to fill from scratch.',
      },
      {
        type: 'heading',
        text: 'What I Would Do Differently',
      },
      {
        type: 'paragraph',
        text: "I underestimated the cost of maintaining the prompt. As the codebase evolved, failure patterns changed, and the prompt needed regular updates to stay accurate. Next time I would build a feedback loop directly into the UI. One click to mark a diagnosis as correct or incorrect and use that signal to drive automated prompt refinement.",
      },
    ],
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);
