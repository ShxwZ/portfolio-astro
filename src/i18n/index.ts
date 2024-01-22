
import spanish from './es.json'
import english from './en.json'
                                                                                                                                                                    
export const ui = {
    es: spanish,
    en: english,
  } as const;
  
export const defaultLang = 'es';
  
export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
  }
  
  export function useTranslations(lang: keyof typeof ui) {
    return ui[lang];
  }