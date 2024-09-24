import { z, defineCollection } from 'astro:content'

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    cover: image(),
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
  }),
})

export const collections = {
  'blog': blogCollection,
  'pages': pagesCollection,
}