import { useState } from 'react'
import { usePageBanner } from './useSiteSettings'
import { DEFAULT_PAGE_BANNERS } from './pageBanners'

// A page's top banner <img> (`pageKey` from pageBanners.js): the admin's upload, else the built-in image.
// The built-in image is also used when the backend is down or slow, or the uploaded image fails to load.
// Renders nothing until the settings are known, so the browser never downloads the built-in image only to swap it.
export default function BannerImage({ pageKey, alt = '', ...props }) {
  const src = usePageBanner(pageKey)
  const [failed, setFailed] = useState('')
  const builtIn = DEFAULT_PAGE_BANNERS[pageKey]
  if (!src) return null
  const shown = failed === src ? builtIn : src
  return <img src={shown} alt={alt} onError={() => shown !== builtIn && setFailed(src)} {...props} />
}
