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

// const pageCollection = defineCollection({
//   type: 'content',
//   schema: z.object({
//     title: z.string(),
//     cover: z.string().optional(),
//   }),
// })

export const collections = {
  blog: blogCollection,
  // page: pageCollection,
}