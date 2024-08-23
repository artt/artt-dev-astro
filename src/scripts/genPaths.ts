import type { getCollection } from "astro:content"

function removeDateFromSlug(slug: string) {
  return slug.replace(/\/\d{4}-/, "/")
}

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
    mainSlug = removeDateFromSlug(mainSlug)
    return [{
      params: { dynamicMdxPath: `${matchBilingual[3] === "en" ? "en/" : ""}${collection}${mainSlug}` },
      props: { entry, mainSlug: `${collection}${mainSlug}`, lang: matchBilingual[3], isBilingual: true },
    }]
  }
  else {
    mainSlug = `${collection}${entry.slug}`
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