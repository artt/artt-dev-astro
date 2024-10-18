import { getCollection, type InferEntrySchema } from 'astro:content';
import { joinPath } from '@/lib/utils';

function getPathPrefix(collection: string): string {
  return ({
    blog: 'blog',
    project: 'project',
    pages: '',
  }[collection] || '')
}

function removeDateFromSlug(slug: string) {
  return slug.replace(/\/\d{2}(?:\.)?\d{2}-/, "/")
}


export function generateMainSlugFromEntry(entry: Awaited<ReturnType<typeof getCollection>>[number]) {
  if (!entry.filePath)
    return null
  const matchBilingual = entry.filePath.match(`content\/${entry.collection}\/(?:(.*?)\/)?([^\/]*?)\.(th|en)\.mdx?$`)
  let mainSlug
  let isBilingual
  let lang
  if (matchBilingual) {
    // if this is the case then we assume that there's no need to redirect anything
    // since *.th.mdx and *.en.mdx must exist in pair
    if (matchBilingual[2] === "index") {
      // if the file is index.(en|th).mdx, then mainSlug should be matchBilingual[1]
      mainSlug = matchBilingual[1]
    }
    else {
      // otherwise, mainSlug should be matchBilingual[1] + "/" + matchBilingual[2]
      mainSlug = `${matchBilingual[1]}/${matchBilingual[2]}`
    }
    mainSlug = joinPath([getPathPrefix(entry.collection), removeDateFromSlug(mainSlug)])
    isBilingual = true
    lang = matchBilingual[3]
  }
  else {
    mainSlug = joinPath([getPathPrefix(entry.collection), removeDateFromSlug(entry.id)])
    isBilingual = false
    // if lang is "th" or not specified, then we assume that it's Thai
    lang = entry.data.lang === "en" ? "en" : "th"
  }
  return { data: entry.data, mainSlug, isBilingual, lang }
}

export async function getAllBlogPosts(lang: string, maxPosts: number = 0) {
  
  const blogEntries = await getCollection('blog')
  const allBlogs = blogEntries.map((entry) => {
    const ret = generateMainSlugFromEntry(entry)
    if (!ret) return
    const { data, mainSlug, isBilingual, lang: entryLang } = ret
    // check the length of the processedEntry array
    // if it's 1, then it's a bilingual page
    // if it's 2, then it's a single language page (the other one is a redirect)
    if (isBilingual) {
      // it's a bilingual page; check if the entry's language matches the current locale
      // if the language matches, return the props; otherwise return null and wait for the correct one
      if (entryLang === lang) {
        return { data, mainSlug }
      }
      return null
    }
    else {
      return { data, mainSlug }
    }
  })
  
  // filter out the null values and sort by entry.data.date in descending order
  const sortedBlogs = allBlogs.filter((entry) => entry !== null).sort((a, b) => {
    return (b?.data as InferEntrySchema<"blog">).date.getTime() - (a?.data as InferEntrySchema<"blog">).date.getTime()
  })

  if (maxPosts > 0) {
    return sortedBlogs.slice(0, maxPosts)
  }
  return sortedBlogs
}

const allBlogPosts = {
  th: await getAllBlogPosts("th"),
  en: await getAllBlogPosts("en"),
}

export async function generateStaticPathFromEntry(entry: Awaited<ReturnType<typeof getCollection>>[number]) {

  const ret = generateMainSlugFromEntry(entry)
  if (!ret) return []
  const { mainSlug, isBilingual, lang } = ret

  // find previous/next blog post
  const allBlogs = allBlogPosts[lang as "th" | "en"] //await getAllBlogPosts(lang)
  const index = allBlogs.findIndex((blog) => blog!.mainSlug === mainSlug)
  const prevBlog = allBlogs[index + 1] || null
  const nextBlog = allBlogs[index - 1] || null

  if (isBilingual) {
    return [{
      params: { dynamicMdxPath: joinPath([lang === "en" ? "en" : "", mainSlug], false) },
      props: { entry, ...ret, prevBlog, nextBlog },
    }]
  }
  else {
    if (lang === "en") {
      return [
        {
          params: { dynamicMdxPath: joinPath(['en', mainSlug], false) },
          props: { entry, ...ret, prevBlog, nextBlog },
        },
        {
          params: { dynamicMdxPath: joinPath([mainSlug], false) },
          props: { redirect: joinPath(['en', mainSlug], true) },
        },
      ]
    }
    else {
      return [
        {
          params: { dynamicMdxPath: joinPath([mainSlug], false) },
          props: { entry, ...ret, prevBlog, nextBlog },
        },
        {
          params: { dynamicMdxPath: joinPath(['en', mainSlug], false) },
          props: { redirect: mainSlug },
        },
      ]
    }
  }

}