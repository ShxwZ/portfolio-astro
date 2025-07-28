import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercelStatic from "@astrojs/vercel/static";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), preact()],
  site: 'https://gabriel-garcia.es/',
  output: "static",
  adapter: vercelStatic({
    webAnalytics: {
      enabled: true
    }
  }),
  vite: {
      resolve: {
        alias: {
          '@lib': '/src/lib', 
          '@ui': '/src/components/ui',
          '@layout': '/src/components/layout',
          '@features': '/src/components/features',
          '@images': '/src/images',
      }
    }
  }
});