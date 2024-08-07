import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from '@astrojs/mdx';

import remarkAfm from "remark-afm"
import remarkDirective from "remark-directive"

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    mdx(),
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      remarkDirective,
      remarkAfm
    ],
  },
});