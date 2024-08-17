import { getCollection } from 'astro:content';

const blogEntries = await getCollection('blog')
  
const allBlogPaths: any[] = []

blogEntries.forEach(entry => {
  // test if entry.id ends with .(en|th).mdx?
  const matchBilingual = entry.id.match(/(?:(.*?)\/)?([^\/]*?)\.(th|en)\.mdx?$/)
  if (matchBilingual) {
    let mainSlug = ""
    if (matchBilingual[2] === "index") {
      // if the file is index.(en|th).mdx, then mainSlug should be matchBilingual[1]
      mainSlug = matchBilingual[1]
    }
    else {
      // otherwise, mainSlug should be matchBilingual[1] + "/" + matchBilingual[2]
      mainSlug = `${matchBilingual[1]}/${matchBilingual[2]}`
    }
    allBlogPaths.push({
      params: { blogSlug: `${matchBilingual[3] === "en" ? "en/" : ""}blog/${mainSlug}` },
      props: { entry },
    })
  }
  else {
    // cannot infer language from file name, so try to see if it's specified in the frontmatter
    // if (entry.data.lang === "en") {

    // }
    allBlogPaths.push({
      params: { blogSlug: `blog/${entry.slug}` },
      props: { entry },
    })
    // push en path
    allBlogPaths.push({
      params: { blogSlug: `en/blog/${entry.slug}` },
      props: { redirect: `/blog/${entry.slug}` },
    })
  }
})

export default allBlogPaths