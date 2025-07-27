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
  })
});