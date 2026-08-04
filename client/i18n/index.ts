import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import ru from './locales/ru.json';

export const SUPPORTED_LOCALES = ['en', 'ru'] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

const syncDocumentLang = (lng: string) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng.slice(0, 2);
  }
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    fallbackLng: 'en',
    supportedLngs: [...SUPPORTED_LOCALES],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'vibe_locale',
    },
  })
  .then(() => syncDocumentLang(i18n.resolvedLanguage || i18n.language || 'en'));

i18n.on('languageChanged', syncDocumentLang);

export default i18n;
