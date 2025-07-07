# AGENTS.MD - Site Summary

## Overview
Personal blog for Nick Tomlin (Full Stack Engineer) built with Astro and deployed on Netlify. Focus on JavaScript, programming tutorials, and technical reflections.

## Tech Stack
- **Framework**: Astro 5.10+ with static output
- **Styling**: Tailwind CSS + custom CSS/SCSS
- **Content**: Markdown with frontmatter via Astro Content Collections
- **Components**: Mix of Astro (.astro) and React (.jsx)
- **Deployment**: Netlify (auto-deploy from main branch)
- **Comments**: Disqus integration

## Project Structure
```
src/
├── components/     # Astro + React components (Header, Footer, PostList, etc.)
├── content/        # Blog posts collection (24 posts)
├── layouts/        # BaseLayout, PostLayout
├── pages/          # File-based routing (index, about, posts, [...slug])
└── styles/         # CSS/SCSS files
```

## Content Management
- **Posts**: `src/content/posts/*.md` with schema validation
- **New posts**: `npm run post "Title"` (creates slugified filename)
- **Frontmatter**: title, date, excerpt, comments (boolean), disqusId

## Key Configuration Files
- `astro.config.mjs`: Site config, integrations (React, Tailwind, Sitemap)
- `site.config.js`: Site metadata (title, social links, analytics)
- `src/content/config.ts`: Content collection schemas
- `tailwind.config.js`: Tailwind customization

## Development
- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## Content Topics
Technical posts covering: JavaScript tooling (esbuild), shell scripting, databases (PostgreSQL), programming languages (Clojure, Elixir, Kotlin), developer tools (vim), and personal reflections on software development.

## Social/Contact
- Email: nick.tomlin+web@gmail.com
- GitHub: nicktomlin
- LinkedIn: nick-tomlin-b0397636
- StackOverflow: 1048479

## Migration Status
Currently on branch `ntomlin/astro-conversion` - appears to be migrating from Jekyll to Astro (has both `_posts/` legacy and `src/content/posts/` current).