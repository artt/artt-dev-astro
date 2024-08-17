import { z, defineCollection } from 'astro:content'

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    cover: z.string(),
    categories: z.array(z.string()),
    tags: z.array(z.string()),
  }),
})

export const collections = {
  'blog': blogCollection,
}