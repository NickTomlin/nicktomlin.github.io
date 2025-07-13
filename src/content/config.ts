// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // 'content' for Markdown/MDX files
  schema: z.object({
    title: z.string(),
    date: z.date(),
    layout: z.string().optional(),
    comments: z.boolean().optional(),
    'external-url': z.string().nullable().optional(),
    published: z.boolean().optional(),
    categories: z.union([z.string(), z.array(z.string())]).optional(),
    disqusId: z.string().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    excerpt: z.string().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};
