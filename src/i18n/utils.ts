import { ui, defaultLang, showDefaultLang, routes } from "./ui";

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split("/");
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: keyof (typeof ui)[typeof defaultLang]) {
        return ui[lang][key] || ui[defaultLang][key];
    };
}

export function useTranslatedPath(lang: keyof typeof ui) {
    return function translatePath(path: string, l: string = lang) {
        // Para simplicidad, solo manejamos las rutas básicas sin traducción avanzada
        return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`;
    };
}

export function getRouteFromUrl(url: URL): string | undefined {
    const pathname = new URL(url).pathname;
    const parts = pathname?.split("/");
    const path = parts.pop() || parts.pop();

    if (path === undefined) {
        return undefined;
    }

    // Para simplicidad, devolvemos la ruta base sin traducción
    return path;
}
