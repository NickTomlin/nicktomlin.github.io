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
