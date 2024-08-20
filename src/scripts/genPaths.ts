import type { getCollection } from "astro:content"

export function generateStaticPathFromEntry(entry: Awaited<ReturnType<typeof getCollection>>[number], collection: string) {

  // test if entry.id ends with .(en|th).mdx?
  const matchBilingual = entry.id.match(/(?:(.*?)\/)?([^\/]*?)\.(th|en)\.mdx?$/)

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
    return [{
      params: { dynamicMdxPath: `${matchBilingual[3] === "en" ? "en/" : ""}${collection}${mainSlug}` },
      props: { entry, mainSlug: `${collection}${mainSlug}`, lang: matchBilingual[3], isBilingual: true },
    }]
  }
  else {
    mainSlug = `${collection}${entry.slug}`
    // cannot infer language from file name, so try to see if it's specified in the frontmatter
    if (entry.data.lang === "en") {
      return [
        {
          params: { dynamicMdxPath: `en/${collection}${entry.slug}` },
          props: { entry, mainSlug, lang: "en", isBilingual: false },
        },
        {
          params: { dynamicMdxPath: `${collection}${entry.slug}` },
          props: { redirect: `/en/${collection}${entry.slug}` },
        },
      ]
    }
    else {
      // if lang is "th" or not specified, then we assume that it's Thai
      return [
        {
          params: { dynamicMdxPath: `${collection}${entry.slug}` },
          props: { entry, mainSlug, lang: "th", isBilingual: false },
        },
        {
          params: { dynamicMdxPath: `en/${collection}${entry.slug}` },
          props: { redirect: `/${collection}${entry.slug}` },
        },
      ]
    }
  }

}