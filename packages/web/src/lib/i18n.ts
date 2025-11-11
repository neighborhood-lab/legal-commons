import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import English translations
import commonEn from '../locales/en/common.json'
import authEn from '../locales/en/auth.json'
import dashboardEn from '../locales/en/dashboard.json'
import llcFormationEn from '../locales/en/llc-formation.json'

// Import Spanish translations
import commonEs from '../locales/es/common.json'
import authEs from '../locales/es/auth.json'
import dashboardEs from '../locales/es/dashboard.json'
import llcFormationEs from '../locales/es/llc-formation.json'

// Translation resources
const resources = {
  en: {
    common: commonEn,
    auth: authEn,
    dashboard: dashboardEn,
    llcFormation: llcFormationEn,
  },
  es: {
    common: commonEs,
    auth: authEs,
    dashboard: dashboardEs,
    llcFormation: llcFormationEs,
  },
}

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'auth', 'dashboard', 'llcFormation'],

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      // Detection order
      order: ['localStorage', 'navigator'],
      // Keys to lookup language from
      lookupLocalStorage: 'language',
      // Cache user language in localStorage
      caches: ['localStorage'],
    },

    react: {
      useSuspense: false,
    },
  })

export default i18n
