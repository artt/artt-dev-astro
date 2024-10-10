import { getCollection, type InferEntrySchema } from 'astro:content';

function removeDateFromSlug(slug: string) {
  return slug.replace(/\/\d{2}(?:\.)?\d{2}-/, "/")
}

export async function getAllBlogPosts(lang: string, maxPosts: number = 0) {
  
  const blogEntries = await getCollection('blog')
  const allBlogs = blogEntries.map((entry) => {
    const processedEntry = generateStaticPathFromEntry(entry, 'blog/')
    // check the length of the processedEntry array
    // if it's 1, then it's a bilingual page
    // if it's 2, then it's a single language page (the other one is a redirect)
    if (processedEntry.length === 1) {
      // it's a bilingual page; check if the entry's language matches the current locale
      // if the language matches, return the props; otherwise return null and wait for the correct one
      if (processedEntry[0].props.lang === lang) {
        return processedEntry[0].props
      }
      return null
    }
    else {
      return processedEntry[0].props
    }
  })
  
  // filter out the null values and sort by entry.data.date in descending order
  const sortedBlogs = allBlogs.filter((entry) => entry !== null).sort((a, b) => {
    return (b.entry?.data as InferEntrySchema<"blog">).date.getTime() - (a.entry?.data as InferEntrySchema<"blog">).date.getTime()
  })

  if (maxPosts > 0) {
    return sortedBlogs.slice(0, maxPosts)
  }
  return sortedBlogs
}



export function generateStaticPathFromEntry (
  entry: Awaited<ReturnType<typeof getCollection>>[number],
  collection: string
) {

  // test if entry.filePath ends with .(en|th).mdx?
  if (!entry.filePath)
    return []

  const matchBilingual = entry.filePath.match(`content\/${entry.collection}\/(?:(.*?)\/)?([^\/]*?)\.(th|en)\.mdx?$`)

  let mainSlug = ""

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
    mainSlug = removeDateFromSlug(mainSlug)
    return [{
      params: { dynamicMdxPath: `${matchBilingual[3] === "en" ? "en/" : ""}${collection}${mainSlug}` },
      props: { entry, mainSlug: `${collection}${mainSlug}`, lang: matchBilingual[3], isBilingual: true },
    }]
  }
  else {
    mainSlug = `${collection}${entry.id}`
    mainSlug = removeDateFromSlug(mainSlug)
    // cannot infer language from file name, so try to see if it's specified in the frontmatter
    if (entry.data.lang === "en") {
      return [
        {
          params: { dynamicMdxPath: `en/${mainSlug}` },
          props: { entry, mainSlug, lang: "en", isBilingual: false },
        },
        {
          params: { dynamicMdxPath: `${mainSlug}` },
          props: { redirect: `/en/${mainSlug}` },
        },
      ]
    }
    else {
      // if lang is "th" or not specified, then we assume that it's Thai
      return [
        {
          params: { dynamicMdxPath: `${mainSlug}` },
          props: { entry, mainSlug, lang: "th", isBilingual: false },
        },
        {
          params: { dynamicMdxPath: `en/${mainSlug}` },
          props: { redirect: `/${mainSlug}` },
        },
      ]
    }
  }

}