import { getCollection } from "astro:content";

export type BlogEntry = Awaited<ReturnType<typeof getCollection<'blog'>>>[number]
export type PageEntry = Awaited<ReturnType<typeof getCollection<'pages'>>>[number]