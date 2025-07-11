# nick-tomlin.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/32b38392-50d5-40c4-94a7-19ad9996f8f6/deploy-status)](https://app.netlify.com/sites/nick-tomlin/deploys)

Personal blog built with [Astro](https://astro.build/) and deployed on [Netlify](https://www.netlify.com/).

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Content Management

### Adding New Posts

```bash
# Create a new post (title gets slugified)
npm run post "Post Title"
```

Posts are stored in `src/content/posts/` as markdown files with frontmatter:

```yaml
---
title: "Post Title"
date: 2024-01-01
excerpt: "Optional excerpt"
comments: true
---

Post content here...
```

### Project Structure

```
src/
├── components/     # Astro and React components
├── content/        # Blog posts and content collections
├── layouts/        # Page layouts
├── pages/          # File-based routing
└── styles/         # CSS files
```

## Deployment

The site builds to static HTML and deploys automatically via Netlify when pushing to the main branch.
