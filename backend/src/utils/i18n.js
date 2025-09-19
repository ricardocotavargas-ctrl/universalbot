import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translations: { /* textos en inglés */ } },
    es: { translations: { /* textos en español */ } }
  },
  lng: "es",
  fallbackLng: "es",
  interpolation: { escapeValue: false }
});