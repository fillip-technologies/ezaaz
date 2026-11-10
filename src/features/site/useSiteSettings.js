import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { assetUrl, siteApi } from '../../api'
import defaultIntroVideo from '../../assets/intro-videos.mp4'
import defaultHeroVideo from '../../assets/home/ejaz-home.mp4'

// Site settings managed in the admin panel: the welcome intro and home header videos
// (/master/settings/videos) and the home header stats (/master/settings/home-stats).
// Fetched once per page load and shared by every component below.
let settingsPromise = null

function loadSettings() {
  if (!settingsPromise) {
    settingsPromise = siteApi.get().catch((err) => {
      settingsPromise = null // allow a retry on the next mount
      throw err
    })
  }
  return settingsPromise
}

export const DEFAULT_VIDEOS = { intro: defaultIntroVideo, hero: defaultHeroVideo }

// If the API is slow, show the built-in content rather than leave the page waiting
const SETTINGS_TIMEOUT_MS = 3000

// The settings once loaded, or null if the request failed or timed out. `undefined` while waiting.
function useSettings() {
  const [settings, setSettings] = useState(undefined)

  useEffect(() => {
    let cancelled = false
    const timeout = new Promise((resolve) => setTimeout(resolve, SETTINGS_TIMEOUT_MS, null))
    Promise.race([loadSettings(), timeout])
      .catch(() => null)
      .then((data) => !cancelled && setSettings(data ?? null))
    return () => {
      cancelled = true
    }
  }, [])

  return settings
}

// Video URL for `key` ('intro' | 'hero'): the uploaded one, else the built-in default.
// '' until the settings have loaded, so the browser never starts downloading the default
// only to swap it for the uploaded video.
export function useSiteVideo(key) {
  const settings = useSettings()
  if (settings === undefined) return ''
  const uploaded = settings?.[`${key}Video`]
  return uploaded ? assetUrl(uploaded) : DEFAULT_VIDEOS[key]
}

// Home header stats as [{ icon, value, label }] in the current language: the admin's list,
// else the built-in numbers from the translations. null until the settings have loaded.
export function useHeroStats() {
  const settings = useSettings()
  const { t, i18n } = useTranslation('home')
  if (settings === undefined) return null

  const custom = settings?.heroStats
  if (custom?.length) {
    const isHindi = i18n.language === 'hi'
    return custom.map((s) => ({ icon: s.icon, value: s.value, label: (isHindi && s.label?.hi) || s.label?.en || '' }))
  }
  const builtIn = t('hero.stats', { returnObjects: true })
  return (Array.isArray(builtIn) ? builtIn : []).map((s) => ({ icon: s.id, value: s.value, label: s.label }))
}
