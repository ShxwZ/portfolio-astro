// astro-i18n configuration
export default {
    primaryLocale: "es", // Primary language
    secondaryLocales: ["en"], // Other languages
    fallbackLocale: "es", // Fallback language
    trailingSlash: "never", // "never" | "always" | "ignore"
    run: "client+server", // "client+server" | "server" | "client"
    showPrimaryLocale: false, // "/en/about" vs "/about"
    translationLoadingRules: [], // Load translation files
    translationDirectory: {}, // Translation files location
    translations: {}, // Inline translations (optional)
    routes: {}, // Custom routes per locale (optional)
};
