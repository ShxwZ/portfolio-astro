
import spanish from './es.json'
import english from './en.json'

const LANGUAGES = {
    en: 'en',
    es: 'es'
}


export const getI18n = (lang: string | undefined) => {
    if(lang === LANGUAGES.es) {
        return spanish
    }
    if(lang === LANGUAGES.en) {
        return english
    }
    return spanish
}
