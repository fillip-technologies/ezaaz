import { useState, useEffect } from 'react'
import {
  Play,
  X,
  Clock
} from 'lucide-react'
import ejazVideo from '../../assets/home/ejaz-home.mp4'

// Pure video collection dataset
const GALLERY_VIDEOS = [
  {
    id: 'vid-1',
    duration: '2:40',
    thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85',
    videoSrc: ejazVideo
  },
  {
    id: 'vid-2',
    duration: '3:15',
    thumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85',
    videoSrc: ejazVideo
  },
  {
    id: 'vid-3',
    duration: '2:50',
    thumbnail: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1200&q=85',
    videoSrc: ejazVideo
  },
  {
    id: 'vid-4',
    duration: '4:20',
    thumbnail: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=85',
    videoSrc: ejazVideo
  },
  {
    id: 'vid-5',
    duration: '3:05',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85',
    videoSrc: ejazVideo
  },
  {
    id: 'vid-6',
    duration: '2:30',
    thumbnail: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=85',
    videoSrc: ejazVideo
  }
]

export default function VideosView() {
  const [selectedVideo, setSelectedVideo] = useState(null)

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedVideo(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock scroll when video modal is open
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedVideo])

  return (
    <div className="w-full bg-slate-950 text-white min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-24">
      
      {/* Pure Videos Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {GALLERY_VIDEOS.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-lg hover:shadow-2xl hover:border-orange-500/40 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
            >
              <img
                src={video.thumbnail}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 opacity-90 group-hover:opacity-100"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                <span className="w-14 h-14 rounded-full bg-[#ea580c]/90 group-hover:bg-[#ea580c] text-white flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-115">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </span>
              </div>

              {/* Duration Pill */}
              <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{video.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Video Modal Player */}
      {selectedVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedVideo(null)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-60 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close video player"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full aspect-[16/9] bg-black rounded-2xl overflow-hidden border border-white/15 shadow-2xl"
          >
            <video
              src={selectedVideo.videoSrc}
              autoPlay
              controls
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

    </div>
  )
}
