import { z, defineCollection } from 'astro:content'

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date(),
    cover: image().optional(),
    lang: z.enum(['th', 'en']).optional(),
    categories: z.array(z.string()),
    tags: z.array(z.string()),
  }),
})

const pagesCollection = defineCollection({
  type: 'content',
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