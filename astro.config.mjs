
import { defineConfig } from 'astro/config';
import astroI18next from "astro-i18next";
import tailwind from "@astrojs/tailwind";
import vercelStatic from "@astrojs/vercel/static";

export default defineConfig({
  integrations: [tailwind(), astroI18next()],
  output: "static",
  adapter: vercelStatic({
    webAnalytics: {
      enabled: true,
    }
  })
});