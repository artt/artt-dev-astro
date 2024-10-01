import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from '@astrojs/mdx';
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";
import sitemap from "@astrojs/sitemap";
import AutoImport from 'astro-auto-import';

import remarkHeadingId from "remark-custom-heading-id"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkAfm from "remark-afm"
import remarkDirective from "remark-directive"

import react from "@astrojs/react";

// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const locales = { th: "th-TH", en: "en-US" }
const defaultLocale = "th"



// https://astro.build/config
export default defineConfig({
  site: "https://artt.dev",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // or "modern"
        },
      },
    },
    resolve: {
      alias: {
        // https://github.com/ngneat/falso/discussions/371
        crypto: path.resolve(__dirname, "./src/emptyModule.ts"),
      },
    },
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    // AutoImport({
    //   imports: [
    //     {
    //       './src/components/Album': ['Album'],
    //     },
    //   ],
    // }),
    i18n({
      locales,
      defaultLocale,
      exclude: [
        "pages/api/**/*",
        "pages/**/[[]*[]].astro",
      ],
    }),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
    react(),
    mdx(),
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      remarkHeadingId,
      remarkDirective,
      // remarkAfm,
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }]
    ],
  },
});