# Astro Migration Plan

## Current State Analysis

### Project Overview
- **Framework**: Next.js 12.3.2 with static export (`next build && next export`)
- **Content**: Markdown blog posts with frontmatter (20+ posts)
- **Styling**: Tailwind CSS v2 with custom configuration
- **Components**: React components with JSX
- **Features**: 
  - Blog post listing and individual post pages
  - Static site generation with markdown processing
  - Disqus comments integration
  - Google Analytics
  - Responsive design with custom fonts (Rubik)

### Key Dependencies
- **Markdown Processing**: `remark`, `remark-html`, `remark-prism`, `gray-matter`
- **Styling**: `tailwindcss`, `@tailwindcss/typography`, `autoprefixer`, `postcss`
- **Utils**: `fast-glob`, `luxon`, `@sindresorhus/slugify`
- **Comments**: `disqus-react`

### Current Structure
```
├── components/           # React components
│   ├── Header.js
│   ├── Footer.js
│   ├── SocialLinks.js
│   └── post/
├── layouts/             # Layout components
│   ├── DefaultLayout.js
│   ├── PageLayout.js
│   └── PostLayout.js
├── pages/               # Next.js pages
│   ├── _app.js          # Global app wrapper
│   ├── index.js         # Homepage
│   ├── about.js
│   ├── posts.js         # Post listing
│   └── posts/[id].js    # Individual posts
├── posts/               # Markdown content
├── lib/                 # Utilities
│   ├── posts.js         # Post processing
│   └── markdown.js      # Markdown rendering
├── styles/              # CSS files
└── public/              # Static assets
```

## Migration Strategy

### Phase 1: Project Setup & Configuration

#### 1.1 Initialize Astro Project
```bash
# Create new Astro project
npm create astro@latest astro-blog -- --template blog --typescript

# OR start from minimal template
npm create astro@latest astro-blog -- --template minimal --typescript
```

#### 1.2 Install Required Dependencies
```bash
# Core dependencies
npm install @astrojs/react @astrojs/tailwind @astrojs/sitemap

# Markdown processing (if needed beyond Astro's built-in)
npm install remark-prism gray-matter

# Utilities
npm install @sindresorhus/slugify luxon fast-glob

# Comments (if keeping Disqus)
npm install disqus-react
```

#### 1.3 Configure Astro
**astro.config.mjs**
```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nick-tomlin.com',
  integrations: [
    react(),
    tailwind({
      config: { path: './tailwind.config.js' }
    }),
    sitemap()
  ],
  markdown: {
    remarkPlugins: [
      ['remark-prism', { transformInlineCode: true }]
    ],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});
```

### Phase 2: Content Migration

#### 2.1 Content Structure
- **Keep existing**: `posts/` directory with markdown files
- **Astro convention**: Move to `src/content/posts/` (recommended)
- **Collection setup**: Configure content collections for type safety

#### 2.2 Content Collection Configuration
**src/content/config.ts**
```typescript
import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string().optional(),
    comments: z.boolean().default(true),
    disqusId: z.string().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
```

#### 2.3 Move Content
```bash
mkdir -p src/content
mv posts src/content/posts
```

### Phase 3: Component Migration

#### 3.1 Convert Layouts to Astro
**src/layouts/BaseLayout.astro**
```astro
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

export interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Default description' } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content={description}>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
</head>
<body>
  <Header />
  <main class="page-content">
    <div class="wrapper">
      <slot />
    </div>
  </main>
  <Footer />
</body>
</html>
```

#### 3.2 Convert Components
- **Header.js** → **Header.astro** (static navigation)
- **Footer.js** → **Footer.astro** (static footer)
- **SocialLinks.js** → **SocialLinks.astro** (static social links)
- **Date.js** → **Date.astro** (date formatting)
- **PostList.js** → **PostList.astro** (with props)

#### 3.3 Interactive Components
Keep React components for interactive features:
- **DisqusComments.jsx** (comments require client-side JS)

### Phase 4: Page Migration

#### 4.1 Static Pages
**src/pages/index.astro**
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import PostList from '../components/PostList.astro';
import SocialLinks from '../components/SocialLinks.astro';

const posts = await getCollection('posts');
const sortedPosts = posts.sort((a, b) => 
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);
---

<BaseLayout title="Nick Tomlin: Full Stack Engineer">
  <section class="mb-2 flex flex-col items-center md:flex-row md:mb-4 lg:my-16">
    <!-- Hero section content -->
  </section>
  
  <section class="mb-2 flex flex-col md:flex-row md:mb-4 lg:my-16">
    <article class="mb-8">
      <h1 class="decorated-heading font-semibold text-3xl lead tracking-wide">Latest Posts</h1>
      <PostList posts={sortedPosts.slice(0, 4)} />
      <p class="text-secondary text-md underline">
        <a href="/posts" class="py-1 px-4 rounded-md bg-brand-primary text-white no-underline">
          All posts
        </a>
      </p>
    </article>
  </section>
</BaseLayout>
```

#### 4.2 Dynamic Pages
**src/pages/posts/[...slug].astro**
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Date from '../../components/Date.astro';
import DisqusComments from '../../components/DisqusComments.jsx';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BaseLayout title={post.data.title} description={post.data.excerpt}>
  <article itemscope itemtype="http://schema.org/BlogPosting">
    <header class="my-4">
      <h1 class="lead text-5xl mb-3" itemprop="name headline">{post.data.title}</h1>
      <Date dateString={post.data.date} itemProp="datePublished" />
    </header>
    
    <div class="post-content prose lg:prose-xl" itemprop="articleBody">
      <Content />
    </div>
    
    <footer class="my-10">
      <div>
        <a href="/posts" class="py-1 px-4 rounded-md bg-brand-primary text-white no-underline">
          More posts
        </a>
      </div>
      {post.data.comments !== false && (
        <div class="my-4">
          <DisqusComments 
            shortname={post.slug}
            config={{
              locale: "en_US",
              identifier: post.data.disqusId || post.slug,
              title: post.data.title
            }}
            client:load
          />
        </div>
      )}
    </footer>
  </article>
</BaseLayout>
```

### Phase 5: Styling Migration

#### 5.1 Tailwind Configuration
- **Copy existing**: `tailwind.config.js` works as-is
- **Update purge paths**: Point to `src/**/*.{astro,js,jsx,ts,tsx}`
- **Verify custom CSS**: Ensure all custom styles are preserved

#### 5.2 CSS Files
- **Copy styles**: Move all CSS files to `src/styles/`
- **Import in layout**: Import global styles in base layout
- **Test responsive**: Verify all responsive breakpoints work

### Phase 6: Utilities & Features

#### 6.1 Site Configuration
**src/config.ts**
```typescript
export const siteConfig = {
  title: "Nick Tomlin: Full Stack Engineer",
  subtitle: "Always: JavaScript. Occasionally: poetry",
  email: "nick.tomlin+web@gmail.com",
  description: "I'm Nick Tomlin, a full stack engineer that loves JavaScript and poetry.",
  url: "https://nick-tomlin.com",
  twitter_username: "itsnicktomlin",
  github_username: "nicktomlin",
  linkedIn_username: "nick-tomlin-b0397636",
  stackoverflow_username: "1048479",
  GOOGLE_ANALYTICS_ID: "UA-31147245-1"
};
```

#### 6.2 Utility Functions
- **Date formatting**: Port luxon-based date utilities
- **Slug generation**: Use existing `@sindresorhus/slugify`
- **Content helpers**: Create Astro-compatible versions

### Phase 7: Build & Deployment

#### 7.1 Build Configuration
**package.json**
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

#### 7.2 Deployment
- **Static hosting**: Astro builds to `dist/` folder
- **GitHub Pages**: Works with existing deployment setup
- **Netlify/Vercel**: Drop-in replacement for Next.js

## Migration Benefits

### Performance Improvements
- **Faster builds**: Astro's optimized build process
- **Less JavaScript**: Only hydrate interactive components
- **Better Core Web Vitals**: Optimized for static content

### Developer Experience
- **Simpler routing**: File-based routing without getStaticProps/getStaticPaths complexity
- **Better TypeScript**: Built-in TypeScript support with content collections
- **Content collections**: Type-safe content with schema validation
- **Component flexibility**: Mix Astro, React, and other frameworks

### Maintenance Benefits
- **Fewer dependencies**: Built-in markdown processing
- **Modern tooling**: Latest web standards and tooling
- **Better caching**: Improved build caching and incremental builds

## Potential Challenges

### 1. Interactive Components
- **Solution**: Use `client:load` directive for React components
- **Components to watch**: Disqus comments, any form interactions

### 2. Dynamic Imports
- **Issue**: Next.js dynamic imports won't work
- **Solution**: Use Astro's component loading or React lazy loading

### 3. API Routes
- **Current**: None in this project
- **Note**: Astro supports API routes if needed later

### 4. SEO & Meta Tags
- **Solution**: Use Astro's built-in SEO capabilities
- **Tools**: @astrojs/sitemap for sitemap generation

## Testing Strategy

### 1. Content Verification
- [ ] All posts render correctly
- [ ] Frontmatter data is preserved
- [ ] Code syntax highlighting works
- [ ] Internal links function properly

### 2. Design Consistency
- [ ] All pages match current design
- [ ] Responsive breakpoints work
- [ ] Custom fonts load correctly
- [ ] Brand colors are consistent

### 3. Functionality Tests
- [ ] Navigation works on all pages
- [ ] Post listing and pagination
- [ ] Individual post pages
- [ ] Comments system (if keeping Disqus)
- [ ] Social links function

### 4. Performance Validation
- [ ] Lighthouse scores meet or exceed current
- [ ] Build time comparison
- [ ] Bundle size analysis

## Migration Timeline

### Week 1: Setup & Configuration
- [ ] Initialize Astro project
- [ ] Configure integrations
- [ ] Set up content collections
- [ ] Migrate site configuration

### Week 2: Components & Layouts
- [ ] Convert layouts to Astro
- [ ] Migrate static components
- [ ] Set up interactive components
- [ ] Test component rendering

### Week 3: Pages & Content
- [ ] Create page templates
- [ ] Migrate all pages
- [ ] Test content rendering
- [ ] Verify dynamic routing

### Week 4: Styling & Polish
- [ ] Complete styling migration
- [ ] Test responsive design
- [ ] Performance optimization
- [ ] Final testing and deployment

## Post-Migration Cleanup

### 1. Remove Next.js Dependencies
```bash
npm uninstall next react react-dom next-remote-watch
```

### 2. Clean Up Files
- Remove `pages/` directory
- Remove Next.js configuration files
- Update `.gitignore` for Astro

### 3. Update Documentation
- Update README with new build commands
- Document new development workflow
- Update deployment instructions

## Success Criteria

- [ ] All existing content renders correctly
- [ ] No broken links or missing assets
- [ ] Performance equal to or better than current site
- [ ] All existing features work (comments, analytics, etc.)
- [ ] Development experience is improved
- [ ] Build process is faster and more reliable

---

This migration plan provides a comprehensive roadmap for converting your Next.js blog to Astro while preserving all existing functionality and improving performance. The phased approach ensures a smooth transition with minimal downtime.