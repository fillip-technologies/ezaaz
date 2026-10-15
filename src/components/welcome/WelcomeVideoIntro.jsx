import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight, Volume2, VolumeX } from 'lucide-react'
import logoImg from '../../assets/Logo_white_text.png'
import ejazVideo from '../../assets/home/ejaz-home.mp4'

export default function WelcomeVideoIntro() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const logoRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    // Check if the user has already entered in this browsing session
    const hasEntered = sessionStorage.getItem('ejaz_hospital_entered')
    if (!hasEntered) {
      setIsOpen(true)
      // Lock scroll while intro is visible
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Smooth entrance reveal animation when intro mounts
  useEffect(() => {
    if (!isOpen) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.88, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.9, delay: 0.1 }
    )
    tl.fromTo(
      buttonRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.4'
    )
  }, [isOpen])

  // Very smooth exit transition when user clicks "Explore Ejaz Hospital"
  const handleEnter = () => {
    sessionStorage.setItem('ejaz_hospital_entered', 'true')

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false)
        document.body.style.overflow = 'unset'
        window.dispatchEvent(new CustomEvent('welcome-intro-closed'))
      }
    })

    // 1. Button active click feedback
    tl.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.15,
      ease: 'power2.in'
    })
      .to(buttonRef.current, {
        scale: 1.05,
        duration: 0.25,
        ease: 'power2.out'
      })

    // 2. Logo and Button glide away
    tl.to([logoRef.current, buttonRef.current], {
      opacity: 0,
      y: -25,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power3.in'
    }, '-=0.1')

    // 3. Video scale zooms gently and fades out
    tl.to(videoRef.current, {
      scale: 1.06,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut'
    }, '-=0.3')

    // 4. Main container fades away seamlessly
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut'
    }, '-=0.4')
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  if (!isOpen) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] w-full h-full bg-black flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background Full Video - Crystal Clear & Fully Visible */}
      <video
        ref={videoRef}
        src={ejazVideo}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700"
        style={{ opacity: isVideoLoaded ? 1 : 0 }}
      />

      {/* Subtle edge vignette for contrast without dimming the video */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none" />

      {/* Top Bar: Sound toggle on top-right */}
      <div className="relative z-20 w-full flex justify-end p-6 sm:p-8">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/40 hover:bg-black/70 text-white text-xs font-semibold backdrop-blur-md border border-white/20 shadow-lg transition-all cursor-pointer"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-slate-300" />
              <span className="hidden sm:inline">Unmute Sound</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Mute Sound</span>
            </>
          )}
        </button>
      </div>

      {/* Center: Hospital Logo */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div ref={logoRef}>
          <img
            src={logoImg}
            alt="Ejaz Hospital Logo"
            className="h-28 sm:h-36 lg:h-44 w-auto object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Bottom: ONLY "Explore Ejaz Hospital" Button */}
      <div className="relative z-20 w-full flex justify-center pb-10 sm:pb-14 px-6">
        <div ref={buttonRef}>
          <button
            type="button"
            onClick={handleEnter}
            className="group relative inline-flex items-center gap-3.5 px-9 sm:px-12 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-[#003a70] via-[#004f98] to-[#003a70] hover:from-[#002b54] hover:to-[#003a70] text-white font-extrabold text-base sm:text-lg tracking-wide shadow-[0_12px_45px_rgba(0,0,0,0.65)] hover:shadow-[0_16px_55px_rgba(0,58,112,0.95)] border border-white/30 transition-all duration-300 active:scale-95 cursor-pointer backdrop-blur-xs"
          >
            <span>Explore Ejaz Hospital</span>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1.5 shadow-sm">
              <ArrowRight className="w-4.5 h-4.5 text-white" />
            </div>

            {/* Glowing border accent */}
            <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-300 pointer-events-none" />
          </button>
        </div>
      </div>
    </div>
  )
}
