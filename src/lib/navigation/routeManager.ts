/**
 * Route Management System for Portfolio (Server-side compatible)
 * Based on official documentation: https://docs.astro.build/en/guides/routing/
 *
 * Features:
 * - Automatic i18n handling (es/en)
 * - Server-side route generation
 * - Navigation and SEO utilities
 * - Configurable instances with context data
 * - No client-side dependencies
 */

export interface RouteConfig {
    /** Supported languages */
    supportedLangs: string[];
    /** Default language */
    defaultLang: string;
    /** Site base URL */
    baseUrl: string;
}

export interface RouteInfo {
    /** Current route without language prefix */
    basePath: string;
    /** Current language */
    currentLang: string;
    /** Complete current path */
    currentPath: string;
    /** URL hash (if exists) */
    hash: string;
    /** Query parameters */
    searchParams: URLSearchParams;
}

export interface BlogPostData {
    slug: string;
    lang: string;
    relatedPosts?: {
        es?: string;
        en?: string;
        fallback?: string;
        [key: string]: string | undefined;
    };
}

export interface RouteContext {
    /** Blog posts data from server */
    blogPosts?: BlogPostData[];
    /** Current page context */
    pageContext?: {
        isSSR: boolean;
        isDev: boolean;
        currentPage?: string;
    };
    /** Custom route mappings */
    customRoutes?: Record<string, Record<string, string>>;
}

/**
 * Creates RouteContext from Astro global and environment
 *
 * @param astroGlobal - Astro global object from component
 * @returns RouteContext with all available information
 */
export async function createRouteContextFromAstro(
    astroGlobal: any
): Promise<RouteContext> {
    const context: RouteContext = {};

    // Page context information
    context.pageContext = {
        isSSR: import.meta.env.SSR || false,
        isDev: import.meta.env.DEV || false,
        currentPage: astroGlobal.url?.pathname || "/",
    };

    // Try to get blog posts if astro:content is available
    try {
        // Dynamic import to avoid server/client conflicts
        if (typeof astroGlobal !== "undefined" && import.meta.env.SSR) {
            const { getCollection } = await import("astro:content");
            const blogPosts = await getCollection("blog");

            context.blogPosts = blogPosts.map((post: any) => ({
                slug: post.slug,
                lang: post.data.lang || "es",
                relatedPosts: post.data.relatedPosts || {},
            }));
        }
    } catch (error) {
        console.warn("Could not load blog posts:", error);
        context.blogPosts = [];
    }

    // Custom route mappings (can be extended)
    context.customRoutes = {
        "/": { es: "/", en: "/en" },
        "/blog": { es: "/blog", en: "/en/blog" },
    };

    return context;
}

/**
 * Creates RouteContext with manual blog post data
 *
 * @param blogPostsData - Manual blog posts data
 * @param pageInfo - Optional page information
 * @returns RouteContext with provided data
 */
export function createRouteContextManual(
    blogPostsData?: BlogPostData[],
    pageInfo?: { currentPage?: string; isSSR?: boolean; isDev?: boolean }
): RouteContext {
    return {
        blogPosts: blogPostsData || [],
        pageContext: {
            isSSR: pageInfo?.isSSR ?? import.meta.env.SSR ?? false,
            isDev: pageInfo?.isDev ?? import.meta.env.DEV ?? false,
            currentPage: pageInfo?.currentPage ?? "/",
        },
        customRoutes: {
            "/": { es: "/", en: "/en" },
            "/blog": { es: "/blog", en: "/en/blog" },
        },
    };
}

// Default configuration
const DEFAULT_CONFIG: RouteConfig = {
    supportedLangs: ["es", "en"],
    defaultLang: "es",
    baseUrl: "https://gabriel-garcia.es",
};

/**
 * Main class for route management with configurable context
 */
export class RouteManager {
    private config: RouteConfig;
    private context: RouteContext;

    constructor(config: Partial<RouteConfig> = {}, context: RouteContext = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
        this.context = context;
    }

    /**
     * Updates the route context (useful for passing server data)
     *
     * @param context - New context data
     */
    updateContext(context: Partial<RouteContext>): void {
        this.context = { ...this.context, ...context };
    }

    /**
     * Gets the current route context
     *
     * @returns Current RouteContext
     */
    getContext(): RouteContext {
        return this.context;
    }

    /**
     * Gets the current route configuration
     *
     * @returns Current RouteConfig
     */
    getConfig(): RouteConfig {
        return this.config;
    }

    /**
     * Analyzes a URL and extracts route information
     *
     * @param url - URL object to analyze
     * @returns RouteInfo object with extracted information
     */
    analyzeUrl(url: URL): RouteInfo {
        const pathname = url.pathname;
        const hash = url.hash;
        const searchParams = url.searchParams;

        // Detect language from URL
        const langMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
        const detectedLang = langMatch ? langMatch[1] : this.config.defaultLang;

        // Validate that the language is supported
        const currentLang = this.config.supportedLangs.includes(detectedLang)
            ? detectedLang
            : this.config.defaultLang;

        // Get base path without language prefix
        let basePath = pathname;
        if (currentLang !== this.config.defaultLang) {
            basePath = pathname.replace(`/${currentLang}`, "") || "/";
        }

        return {
            basePath,
            currentLang,
            currentPath: pathname,
            hash,
            searchParams,
        };
    }

    /**
     * Gets blog post data from context by slug
     *
     * @param slug - Post slug to find
     * @returns Blog post data or undefined
     */
    private getBlogPostBySlug(slug: string): BlogPostData | undefined {
        if (!this.context.blogPosts) return undefined;
        return this.context.blogPosts.find((post) => post.slug === slug);
    }

    /**
     * Generates the URL for a specific language with enhanced blog support
     *
     * @param routeInfo - Current route information
     * @param targetLang - Target language code
     * @returns Generated URL string for the target language
     */
    getRouteForLang(routeInfo: RouteInfo, targetLang: string): string {
        // Validate target language
        if (!this.config.supportedLangs.includes(targetLang)) {
            console.warn(`Unsupported language: ${targetLang}`);
            return routeInfo.currentPath;
        }

        // Prepare hash and query parameters for consistent usage
        const hash = routeInfo.hash || "";
        const searchString = routeInfo.searchParams.toString();
        const queryParams = searchString ? `?${searchString}` : "";

        // Check for custom route mappings first
        if (this.context.customRoutes) {
            const customRoute = this.context.customRoutes[routeInfo.basePath];
            if (customRoute && customRoute[targetLang]) {
                return `${customRoute[targetLang]}${queryParams}${hash}`;
            }
        }

        // For blog posts, use enhanced logic with context data
        if (routeInfo.basePath.startsWith("/blog/")) {
            const slug = routeInfo.basePath.replace("/blog/", "");
            const blogPost = this.getBlogPostBySlug(slug);

            if (blogPost && blogPost.relatedPosts) {
                // Check if there's a specific translation
                const relatedSlug = blogPost.relatedPosts[targetLang];
                if (relatedSlug) {
                    const blogUrl =
                        targetLang === this.config.defaultLang
                            ? `/blog/${relatedSlug}`
                            : `/${targetLang}/blog/${relatedSlug}`;
                    return `${blogUrl}${queryParams}${hash}`;
                }

                // Use fallback if no translation exists
                if (blogPost.relatedPosts.fallback) {
                    const fallbackUrl =
                        targetLang === this.config.defaultLang
                            ? blogPost.relatedPosts.fallback
                            : `/${targetLang}${blogPost.relatedPosts.fallback}`;
                    return `${fallbackUrl}${queryParams}${hash}`;
                }
            }

            // Default blog fallback
            const blogFallback =
                targetLang === this.config.defaultLang
                    ? "/blog"
                    : `/${targetLang}/blog`;
            return `${blogFallback}${queryParams}${hash}`;
        }

        // Standard route logic for non-blog pages
        let newPath = routeInfo.basePath;

        // Add language prefix if not the default language
        if (targetLang !== this.config.defaultLang) {
            newPath = `/${targetLang}${routeInfo.basePath === "/" ? "" : routeInfo.basePath}`;
        }

        return `${newPath}${queryParams}${hash}`;
    }

    /**
     * Generates absolute URL for a specific language
     *
     * @param routeInfo - Current route information
     * @param targetLang - Target language code
     * @returns Absolute URL string for the target language
     */
    getAbsoluteRouteForLang(routeInfo: RouteInfo, targetLang: string): string {
        const relativePath = this.getRouteForLang(routeInfo, targetLang);
        return `${this.config.baseUrl}${relativePath}`;
    }

    /**
     * Gets all language variants for a route
     *
     * @param routeInfo - Current route information
     * @returns Object with language codes as keys and URLs as values
     */
    getAllLanguageVariants(routeInfo: RouteInfo): Record<string, string> {
        const variants: Record<string, string> = {};

        this.config.supportedLangs.forEach((lang) => {
            variants[lang] = this.getRouteForLang(routeInfo, lang);
        });

        return variants;
    }

    /**
     * Gets all absolute variants for SEO
     *
     * @param routeInfo - Current route information
     * @returns Object with language codes as keys and absolute URLs as values
     */
    getAllAbsoluteVariants(routeInfo: RouteInfo): Record<string, string> {
        const variants: Record<string, string> = {};

        this.config.supportedLangs.forEach((lang) => {
            const relativePath = this.getRouteForLang(routeInfo, lang);
            variants[lang] = `${this.config.baseUrl}${relativePath}`;
        });

        return variants;
    }

    /**
     * Generates hreflang tags for SEO
     *
     * @param routeInfo - Current route information
     * @returns Array of objects with lang and href properties for hreflang tags
     */
    generateHrefLangTags(
        routeInfo: RouteInfo
    ): Array<{ lang: string; href: string }> {
        const variants = this.getAllAbsoluteVariants(routeInfo);
        const hrefLangs: Array<{ lang: string; href: string }> = [];

        // Add tags for each language
        this.config.supportedLangs.forEach((lang) => {
            hrefLangs.push({
                lang,
                href: variants[lang],
            });
        });

        // Add x-default tag (default language)
        hrefLangs.push({
            lang: "x-default",
            href: variants[this.config.defaultLang],
        });

        return hrefLangs;
    }

    /**
     * Validates if a route exists (for static routes)
     *
     * @param basePath - Base path to validate
     * @returns Boolean indicating if the route is valid
     */
    isValidRoute(basePath: string): boolean {
        // List of known valid routes
        const validRoutes = ["/", "/blog", "/404"];

        // Check static routes
        if (validRoutes.includes(basePath)) {
            return true;
        }

        // Check dynamic routes (blog posts)
        if (basePath.startsWith("/blog/")) {
            return true; // Assume valid, will be validated at runtime
        }

        return false;
    }

    /**
     * Debug utility for development
     *
     * @param url - URL to debug
     */
    debugRoute(url: URL): void {
        const routeInfo = this.analyzeUrl(url);
        const variants = this.getAllLanguageVariants(routeInfo);

        console.log("🛣️ Route Manager Debug:");
        console.log("  Current URL:", url.href);
        console.log("  Route Info:", routeInfo);
        console.log("  Language Variants:", variants);
        console.log("  Context:", this.context);
        console.log("  ──────────────────────");
    }

    /**
     * Test hash preservation with different URL examples
     *
     * @param testUrls - Array of URL strings to test
     */
    testHashPreservation(testUrls: string[]): void {
        console.log("🧪 Testing Hash Preservation:");

        testUrls.forEach((urlString) => {
            const url = new URL(urlString);
            const routeInfo = this.analyzeUrl(url);

            console.log(`\n📍 Testing: ${urlString}`);
            console.log(`   Current Lang: ${routeInfo.currentLang}`);
            console.log(`   Base Path: ${routeInfo.basePath}`);
            console.log(`   Hash: ${routeInfo.hash}`);
            console.log(`   Query: ${routeInfo.searchParams.toString()}`);

            this.config.supportedLangs.forEach((lang) => {
                const switchUrl = this.getRouteForLang(routeInfo, lang);
                console.log(`   → ${lang}: ${switchUrl}`);
            });
        });

        console.log("  ──────────────────────");
    }
}

// Default singleton instance for backwards compatibility
export const routeManager = new RouteManager();

/**
 * Creates a new RouteManager instance with specific configuration and context
 *
 * @param config - Route configuration
 * @param context - Route context with server data
 * @returns New RouteManager instance
 */
export function createRouteManager(
    config?: Partial<RouteConfig>,
    context?: RouteContext
): RouteManager {
    return new RouteManager(config, context);
}

/**
 * Creates a RouteManager instance with blog posts data
 *
 * @param blogPosts - Array of blog post data
 * @param config - Optional route configuration
 * @returns RouteManager instance with blog context
 */
export function createBlogRouteManager(
    blogPosts: BlogPostData[],
    config?: Partial<RouteConfig>
): RouteManager {
    return new RouteManager(config, { blogPosts });
}

/**
 * Creates a RouteManager instance with full Astro context (AUTO)
 * This method automatically extracts all available context from Astro
 *
 * @param astroGlobal - Astro global object from component
 * @param config - Optional route configuration
 * @returns Promise<RouteManager> instance with full context
 */
export async function createAutoRouteManager(
    astroGlobal: any,
    config?: Partial<RouteConfig>
): Promise<RouteManager> {
    const context = await createRouteContextFromAstro(astroGlobal);
    return new RouteManager(config, context);
}

/**
 * Creates a RouteManager instance with manual context
 *
 * @param blogPosts - Optional blog posts data
 * @param pageInfo - Optional page information
 * @param config - Optional route configuration
 * @returns RouteManager instance with manual context
 */
export function createManualRouteManager(
    blogPosts?: BlogPostData[],
    pageInfo?: { currentPage?: string; isSSR?: boolean; isDev?: boolean },
    config?: Partial<RouteConfig>
): RouteManager {
    const context = createRouteContextManual(blogPosts, pageInfo);
    return new RouteManager(config, context);
}

/**
 * Utility functions for use in Astro components
 */

/**
 * Gets route information from an Astro URL
 *
 * @param astroUrl - Astro URL object
 * @returns RouteInfo object with analyzed route data
 */
export function getRouteInfo(astroUrl: URL): RouteInfo {
    return routeManager.analyzeUrl(astroUrl);
}

/**
 * Gets route information using a specific RouteManager instance
 *
 * @param routeManagerInstance - Specific RouteManager instance
 * @param astroUrl - Astro URL object
 * @returns RouteInfo object with analyzed route data
 */
export function getRouteInfoWithManager(
    routeManagerInstance: RouteManager,
    astroUrl: URL
): RouteInfo {
    return routeManagerInstance.analyzeUrl(astroUrl);
}

/**
 * Gets the URL to switch to another language
 *
 * @param astroUrl - Current Astro URL
 * @param targetLang - Target language code
 * @returns URL string for the target language
 */
export function getLangSwitchUrl(astroUrl: URL, targetLang: string): string {
    const routeInfo = getRouteInfo(astroUrl);
    return routeManager.getRouteForLang(routeInfo, targetLang);
}

/**
 * Gets the URL to switch to another language using a specific RouteManager
 *
 * @param routeManagerInstance - Specific RouteManager instance
 * @param astroUrl - Current Astro URL
 * @param targetLang - Target language code
 * @returns URL string for the target language
 */
export function getLangSwitchUrlWithManager(
    routeManagerInstance: RouteManager,
    astroUrl: URL,
    targetLang: string
): string {
    const routeInfo = routeManagerInstance.analyzeUrl(astroUrl);
    return routeManagerInstance.getRouteForLang(routeInfo, targetLang);
}

/**
 * Gets all language variants for the current route
 *
 * @param astroUrl - Current Astro URL
 * @returns Object with language codes as keys and URLs as values
 */
export function getLanguageVariants(astroUrl: URL): Record<string, string> {
    const routeInfo = getRouteInfo(astroUrl);
    return routeManager.getAllLanguageVariants(routeInfo);
}

/**
 * Generates hreflang tags for SEO
 *
 * @param astroUrl - Current Astro URL
 * @returns Array of hreflang tag objects for SEO
 */
export function getHrefLangTags(
    astroUrl: URL
): Array<{ lang: string; href: string }> {
    const routeInfo = getRouteInfo(astroUrl);
    return routeManager.generateHrefLangTags(routeInfo);
}

/**
 * Debug function for development
 *
 * @param astroUrl - Astro URL to debug
 */
export function debugRoute(astroUrl: URL): void {
    routeManager.debugRoute(astroUrl);
}
