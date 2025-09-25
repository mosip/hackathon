import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['path', 'localStorage', 'navigator'],
            caches: ['localStorage'],
        },
        supportedLngs: ['en', 'fr', 'pt'],
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
    });

export default i18n;