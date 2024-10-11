import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.mdx', base: "./content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date(),
    cover: image().optional(),
    thumbnail: image().optional(),
    lang: z.enum(['th', 'en']).optional(),
    categories: z.array(z.string()),
    tags: z.array(z.string()),
    canonical: z.string().optional(),
  }),
})

const pagesCollection = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.mdx', base: "./content/pages" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    cover: image().optional(),
    lang: z.enum(['th', 'en']).optional(),
  }),
})

export const collections = {
  'blog': blogCollection,
  'pages': pagesCollection,
}