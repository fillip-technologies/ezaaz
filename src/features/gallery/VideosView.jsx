import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'

// The 2 Real Videos added in src/assets/Videos/
import hospitalVideo1 from '../../assets/Videos/videos-1.mp4'

// Real Hospital Photo Thumbnails
import thumbGiSurgery from '../../assets/dumps-images/DSC00770.JPG'
import thumbHospital1 from '../../assets/OT-PHOTOS/DSC00761.JPG'

// Exactly the 2 videos requested by the user, with zero text
const GALLERY_VIDEOS = [
  {
    id: 'vid-gi-cancer',
    thumbnail: thumbGiSurgery,
    videoSrc: giCancerVideo
  },
  {
    id: 'vid-hospital-overview',
    thumbnail: thumbHospital1,
    videoSrc: hospitalVideo1
  }
]

// Adaptive Cinematic Player with Ambient Blur Background (handles both landscape & portrait)
function AmbientVideoCard({ video }) {
  const [isPortrait, setIsPortrait] = useState(false)

  const handleLoadedMetadata = (e) => {
    if (e.target.videoHeight > e.target.videoWidth) {
      setIsPortrait(true)
    }
  }

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-xl hover:shadow-2xl transition-all duration-300 ${isPortrait ? 'aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9]' : 'aspect-[16/10] sm:aspect-[16/9]'
        }`}
    >
      {/* Ambient Blurred Colored Glow (fills letterbox space seamlessly) */}
      <img
        src={video.thumbnail}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 pointer-events-none select-none transition-opacity"
      />
      {/* Deep Dark Overlay for crisp contrast */}
      <div className="absolute inset-0 bg-slate-950/60 pointer-events-none select-none" />

      {/* Main Video with object-contain: Never crops any part of landscape or portrait video */}
      <video
        src={video.videoSrc}
        poster={video.thumbnail}
        controls
        playsInline
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        className="relative z-10 w-full h-full object-contain mx-auto drop-shadow-2xl"
      />
    </div>
  )
}

export default function VideosView() {
  const { i18n } = useTranslation()
  const isHindi = i18n?.language === 'hi'

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-24 font-sans">
      {/* Top Header & Navigation */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <a
                href="/"
                className="text-xs sm:text-sm font-semibold text-[#003a70] hover:text-[#00284d] flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {isHindi ? 'होम पेज पर वापस' : 'Back to Home'}
              </a>
              <span className="text-slate-300 text-xs">/</span>
              <span className="text-xs sm:text-sm text-slate-500 font-medium">
                {isHindi ? 'वीडियो गैलरी' : 'Video Gallery'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              {isHindi ? (
                <>
                  अस्पताल <span className="text-[#ea580c]">वीडियो गैलरी</span>
                </>
              ) : (
                <>
                  Hospital <span className="text-[#ea580c]">Video Gallery</span>
                </>
              )}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-white text-slate-700 text-xs font-semibold border border-slate-200 shadow-xs">
              2 {isHindi ? 'वीडियो' : 'Videos'}
            </span>
          </div>
        </div>
      </div>

      {/* Pure Videos Grid - 3 Columns in a Row */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {GALLERY_VIDEOS.map((video) => (
            <AmbientVideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  )
}
