import { defineConfig } from 'astro/config';
import astroI18next from "astro-i18next";
import tailwind from "@astrojs/tailwind";
import vercelStatic from "@astrojs/vercel/static";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), astroI18next(), sitemap()],
  site: 'https://gabrielgarcia.vercel.app/',
  output: "static",
  adapter: vercelStatic({
    webAnalytics: {
      enabled: true
    }
  })
});