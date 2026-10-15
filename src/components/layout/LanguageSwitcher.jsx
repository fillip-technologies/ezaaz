import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher({ isLight = false }) {
  const { i18n, t } = useTranslation('common')
  const currentLang = i18n.language || 'en'

  const changeLang = (lang) => {
    i18n.changeLanguage(lang)
    try {
      localStorage.setItem('ejaz_language', lang)
    } catch {
      // ignore
    }
  }

  return (
    <div
      className={`flex items-center px-3 py-1.5 rounded-full border backdrop-blur-md text-xs transition-all ${
        isLight
          ? 'bg-slate-100/90 hover:bg-slate-200/90 border-slate-300/80 shadow-sm'
          : 'bg-master-dark/60 hover:bg-master-dark/80 border-master'
      }`}
    >
      <button
        type="button"
        onClick={() => changeLang('en')}
        className={`font-semibold tracking-wide transition-colors cursor-pointer ${
          currentLang === 'en'
            ? isLight
              ? 'text-[#003a70] font-bold'
              : 'text-sky-300 font-bold'
            : isLight
            ? 'text-slate-500 hover:text-slate-900'
            : 'text-white/60 hover:text-white'
        }`}
      >
        {t('language.en')}
      </button>
      <span className={`mx-2 font-light ${isLight ? 'text-slate-300' : 'text-white/30'}`}>|</span>
      <button
        type="button"
        onClick={() => changeLang('hi')}
        className={`font-medium tracking-wide transition-colors cursor-pointer ${
          currentLang === 'hi'
            ? isLight
              ? 'text-[#003a70] font-bold'
              : 'text-sky-300 font-bold'
            : isLight
            ? 'text-slate-500 hover:text-slate-900'
            : 'text-white/60 hover:text-white'
        }`}
      >
        {t('language.hi')}
      </button>
    </div>
  )
}
