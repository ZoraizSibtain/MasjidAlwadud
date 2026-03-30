# Zoraiz Sibtain — Portfolio Website

Personal portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

## About

This is the source code for my portfolio at — a light-themed, single-page application with a fixed sidebar navigation and multi-page routing.

**Pages:**
- **Home** — Introduction and typewriter effect
- **About** — Background, experience summary, and personal interests
- **Experience** — Scrollable timeline of work history and education with tech tags
- **Skills** — Categorized tool and framework grid with icons
- **Contact** — GitHub, LinkedIn, and email cards

## Tech Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — build tool with HMR
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [React Router DOM](https://reactrouter.com/) — client-side routing
- [react-icons](https://react-icons.github.io/react-icons/) — icon library
- [react-simple-typewriter](https://www.npmjs.com/package/react-simple-typewriter) — typewriter animation
- [Radix UI](https://www.radix-ui.com/) — accessible UI primitives

## Getting Started

**Prerequisites:** Node.js >= 18.11.0

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Run all checks (TypeScript, tests, lint, format)
npm test
```

## Project Structure

```
src/
├── assets/              # Images and static files
├── components/
│   ├── AboutPage/       # About page
│   ├── Common/          # Shared buttons and UI elements
│   ├── ContactPage/     # Contact page with social cards
│   ├── ExperiencePage/  # Timeline experience + education
│   ├── Home/            # Root layout with routing
│   ├── HomePage/        # Landing / hero page
│   ├── Layout/          # Sidebar, footer, container, SEO
│   ├── SkillsPage/      # Skills & tools grid
│   └── ui/              # Radix-based UI primitives
└── lib/                 # Utility functions
```

## Contact

- **Email:** zoraiz.sibtain@hotmail.com
- **GitHub:** [github.com/ZoraizSibtain](https://github.com/ZoraizSibtain)
- **LinkedIn:** [linkedin.com/in/zoraiz-sibtain](https://linkedin.com/in/zoraiz-sibtain)
