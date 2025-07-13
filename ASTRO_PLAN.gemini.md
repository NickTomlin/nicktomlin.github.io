# Migration Plan: Next.js to Astro

This document outlines the plan to migrate the personal blog from Next.js to Astro. The goal is to simplify the build process, improve performance, and leverage Astro's content-focused features while retaining the existing design and content.

## 1. Project Setup

1.  **Initialize Astro:** Start a new Astro project. A minimal setup is best.
    ```bash
    npm create astro@latest new-astro-site -- --template minimal
    cd new-astro-site
    ```
2.  **Install Integrations:** Add Astro integrations for React, Tailwind CSS, and potentially MDX.
    ```bash
    npx astro add react
    npx astro add tailwind
    # MDX is optional but recommended for future content
    npx astro add mdx
    ```
3.  **Copy Public Assets:** Copy all files from the current `public/` directory to the new `public/` directory in the Astro project.
4.  **Copy Configuration:**
    *   Copy `tailwind.config.js` to the Astro project root.
    *   Copy `postcss.config.js` to the Astro project root.
    *   The contents of `site.config.js` should be moved into `src/consts.ts` (or `.js`) for type-safe access throughout the Astro project.

## 2. Content Migration (Posts)

The current blog posts are Markdown files in the `posts/` directory, processed by the custom `lib/posts.js` script. Astro's [Content Collections](https://docs.astro.build/en/guides/content-collections/) are a more robust and integrated solution.

1.  **Create Collection:** Create a new directory `src/content/blog`.
2.  **Move Posts:** Move all Markdown files from the `posts/` directory into `src/content/blog/`.
3.  **Define Schema:** Create `src/content/config.ts` to define the schema for blog posts. This validates the frontmatter and provides type safety.

    ```typescript
    // src/content/config.ts
    import { defineCollection, z } from 'astro:content';

    const blogCollection = defineCollection({
      type: 'content', // 'content' for Markdown/MDX files
      schema: z.object({
        title: z.string(),
        date: z.date(),
        author: z.string().optional(),
        tags: z.array(z.string()).optional(),
        excerpt: z.string().optional(),
        // Add other frontmatter fields as needed
      }),
    });

    export const collections = {
      'blog': blogCollection,
    };
    ```
4.  **Retire `lib/posts.js`:** The custom logic in `lib/posts.js` for reading files, parsing frontmatter, and sorting is no longer needed. Astro's `getCollection('blog')` API will replace it.

## 3. Styling

The project uses a mix of Tailwind CSS, `main.css`, and other CSS files. The plan is to consolidate this.

1.  **Configure Tailwind:** Ensure `tailwind.config.js` is correctly configured in `astro.config.mjs`. The existing config should work.
2.  **Global Styles:** The styles in `styles/main.css` and `styles/variables.css` should be combined and imported into a global layout component. Create a `src/styles/global.css` file.
3.  **Component Styles:** Astro supports scoped styles out-of-the-box (`<style>` tags in `.astro` components). This can be used for component-specific styles that don't fit into Tailwind's utility-first approach. The styles in `layout.scss` can be converted to regular CSS and scoped within the relevant layout files.

## 4. Layouts and Components

The existing React components can be largely reused. Layouts will be recreated as Astro components.

1.  **Create Astro Layouts:**
    *   Recreate `layouts/DefaultLayout.js` as `src/layouts/Layout.astro`. This will be the main layout file, containing the `<html>`, `<head>`, and `<body>` structure. It will also import global stylesheets and include the `Header` and `Footer`.
    *   The `PostLayout.js` and `PageLayout.js` concepts can be recreated as more specific Astro layouts, e.g., `src/layouts/PostLayout.astro`, which would import the base `Layout.astro`.

    **`src/layouts/Layout.astro` (Example):**
    ```astro
    ---
    import Header from '../components/Header.astro';
    import Footer from '../components/Footer.astro';
    import '../styles/global.css';
    const { title } = Astro.props;
    ---
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        <title>{title}</title>
    </head>
    <body>
        <Header />
        <main class="wrapper page-content">
            <slot />
        </main>
        <Footer />
    </body>
    </html>
    ```

2.  **Migrate Components:**
    *   Copy the contents of `components/` into a new `src/components/` directory.
    *   The simple, presentational React components (like `SocialLinks.js`, `Date.js`) can be rewritten as `.astro` components for better performance (zero JS shipped to the client).
    *   For interactive components (like the `Disqus` component), keep them as React components and use a client directive.

    **Example (Disqus):**
    ```astro
    ---
    // src/pages/posts/[...slug].astro
    import Disqus from '../../components/Disqus.jsx';
    ---
    <!-- ... post content ... -->
    <Disqus client:visible title={post.data.title} id={post.slug} />
    ```

## 5. Page Migration

The Next.js pages in `pages/` will be recreated as `.astro` pages in `src/pages/`.

1.  **Index Page (`src/pages/index.astro`):**
    *   Recreate `pages/index.js`.
    *   Use `getCollection('blog')` to fetch and sort posts, replacing `getSortedPostsData()`.
    *   Pass the posts to the `PostList` component (which can be a `.astro` or `.jsx` component).

2.  **Blog Post Index (`src/pages/posts.astro`):**
    *   Create a new page to list all blog posts, similar to the index page but without the intro section.

3.  **Dynamic Post Pages (`src/pages/posts/[...slug].astro`):**
    *   This single file will generate all individual blog post pages, replacing `pages/posts/[id].js`.
    *   Use a `getStaticPaths` function to generate the pages from the `blog` content collection.
    *   The page will render the post's `title`, `date`, and content using the `<Content />` component provided by Astro.

    **`src/pages/posts/[...slug].astro` (Example):**
    ```astro
    ---
    import { getCollection } from 'astro:content';
    import PostLayout from '../../layouts/PostLayout.astro';

    export async function getStaticPaths() {
      const blogEntries = await getCollection('blog');
      return blogEntries.map(entry => ({
        params: { slug: entry.slug },
        props: { entry },
      }));
    }

    const { entry } = Astro.props;
    const { Content } = await entry.render();
    ---
    <PostLayout title={entry.data.title}>
      <h1>{entry.data.title}</h1>
      <p>Published on: {entry.data.date.toDateString()}</p>
      <Content />
    </PostLayout>
    ```

## 6. Dependency Management

1.  **Update `package.json`:**
    *   **Remove:** `next`, `next-remote-watch`, `react`, `react-dom`, `gray-matter`, `remark`, `remark-html`, etc. The Astro integrations will manage their own versions of these where needed.
    *   **Add:** `astro` and the integration packages (`@astrojs/react`, `@astrojs/tailwind`, `@astrojs/mdx`).
2.  **Scripts:** Update the `scripts` in `package.json` to use Astro's CLI commands:
    *   `"dev": "astro dev"`
    *   `"build": "astro build"`
    *   `"preview": "astro preview"`

## Summary of Choices

*   **Content Management:** Move from a custom script (`lib/posts.js`) to **Astro Content Collections**. This is the idiomatic Astro approach, providing type safety, automatic parsing, and a clean API.
*   **Templating:** Move from React-based layouts (`.js` files) to **Aro components (`.astro` files)** for layouts. This allows for shipping zero JS by default for static parts of the page.
*   **Component Strategy:**
    *   **Primary:** Convert simple React components to `.astro` components to maximize performance.
    *   **Alternative:** Keep all components in React and use the `@astrojs/react` integration everywhere. This is faster for migration but doesn't take full advantage of Astro's performance benefits. The chosen approach is a hybrid one.
*   **Styling:** Consolidate styles into **Tailwind CSS and a single global stylesheet**. This simplifies the styling architecture.
*   **Site Configuration:** Move from `site.config.js` to `src/consts.ts` to leverage TypeScript and modern module imports.
