import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enCommon from './locales/en/common/data.json'
import hiCommon from './locales/hi/common/data.json'
import enHome from './locales/en/home/data.json'
import hiHome from './locales/hi/home/data.json'

const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('ejaz_language') : null

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        home: enHome,
      },
      hi: {
        common: hiCommon,
        home: hiHome,
      },
    },
    lng: savedLanguage || 'en',
    fallbackLng: 'en',
    ns: ['common', 'home'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already safeguards from XSS
    },
  })

export default i18n
