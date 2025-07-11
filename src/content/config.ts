import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    layout: z.string().optional(),
    excerpt: z.string().optional(),
    comments: z.boolean().default(true),
  }),
});

export const collections = {
  posts: postsCollection,
};