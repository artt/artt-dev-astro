import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from '@astrojs/mdx';
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";
import sitemap from "@astrojs/sitemap";
import { imageService } from "@unpic/astro/service";

import remarkHeadingId from "remark-custom-heading-id"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkSomething from "./plugins/remarkSomething"
import remarkDirective from "remark-directive"
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import svgr from "vite-plugin-svgr";

import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationFocus,
  transformerNotationErrorLevel,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
} from '@shikijs/transformers'

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
  trailingSlash: "always",
  build: {
    format: "directory",
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
    plugins: [
      svgr(),
    ],
  },
  image: {
    // domains: ["artt.dev"],
    service: imageService(),
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
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
    // syntaxHighlight: true,
    remarkPlugins: [
      remarkHeadingId,
      remarkDirective,
      remarkMath,
      remarkSomething,
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      rehypeKatex,
      // rehypeSomething,
    ],
    shikiConfig: {
      themes: {
        light: 'light-plus',
        dark: 'dark-plus',
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationFocus(),
        transformerNotationErrorLevel(),
        transformerMetaHighlight(),
        transformerMetaWordHighlight(),
      ],
    }
  },
});