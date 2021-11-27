import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import Locale from '../constants/locale';

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: Locale.EN,
        ns: ['general'],
        defaultNS: 'general',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: `${window.location.pathname}locales/{{lng}}/{{ns}}.json`,
        },
        react: {
            wait: true,
        },
    });
