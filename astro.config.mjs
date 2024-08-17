import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from '@astrojs/mdx';
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";
import sitemap from "@astrojs/sitemap";


import remarkAfm from "remark-afm"
import remarkDirective from "remark-directive"

const locales = {th: "th-TH", en: "en-US"}
const defaultLocale = "th"


// https://astro.build/config
export default defineConfig({
  site: "https://artt.dev",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  integrations: [
    tailwind(),
    mdx(),
    i18n({
      locales,
      defaultLocale,
      exclude: ["pages/api/**/*", "pages/**/\[*\]"],
    }),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      remarkDirective,
      remarkAfm
    ],
  },
});