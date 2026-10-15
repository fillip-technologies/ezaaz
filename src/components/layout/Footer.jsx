import { useTranslation } from 'react-i18next'
import stethoscopeHeartImg from '../../assets/layout/footer-stethoscope.png'

export default function Footer() {
  const { t, i18n } = useTranslation(['common', 'home'])
  const isHindi = i18n?.language === 'hi'

  const currentYear = new Date().getFullYear()

  // Social icons matching reference (Facebook, YouTube, LinkedIn, X)
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.222 0h.003z" />
        </svg>
      )
    },
    {
      name: 'X',
      href: 'https://x.com',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    }
  ]

  return (
    <footer id="contact" className="relative w-full bg-[#f4f5f8] text-slate-800 border-t border-slate-200/90 overflow-hidden font-sans">
      
      {/* Background subtle micro-dot pattern matching reference image */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#003a70 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-18 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Column 1: Quick Links (Span 5) */}
          <div className="lg:col-span-5 text-left flex flex-col justify-between h-full">
            <div>
              <h3 className="font-heading font-semibold text-slate-900 text-xl sm:text-[22px] tracking-tight mb-5 sm:mb-6">
                {t('footer.quickLinks', { ns: 'common' }) || 'Quick Links'}
              </h3>

              {/* 2-Subcolumn Links matching screenshot */}
              <div className="grid grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-3.5 sm:gap-y-4">
                {/* Subcolumn 1 */}
                <div className="space-y-3">
                  <a
                    href="/about"
                    onClick={(e) => {
                      e.preventDefault()
                      if (window.history?.pushState) {
                        window.history.pushState(null, '', '/about')
                        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
                        window.dispatchEvent(new CustomEvent('app-route-change', { detail: '/about' }))
                      } else {
                        window.location.href = '/about'
                      }
                      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
                    }}
                    className="text-slate-600 hover:text-[#003a70] text-sm sm:text-[15px] font-normal transition-colors block cursor-pointer"
                  >
                    {t('footer.links.aboutUs', { ns: 'common' }) || 'About Us'}
                  </a>
                  <a
                    href="#why-choose-us"
                    className="text-slate-600 hover:text-[#003a70] text-sm sm:text-[15px] font-normal transition-colors block"
                  >
                    {t('footer.links.faqs', { ns: 'common' }) || 'FAQs'}
                  </a>
                  <a
                    href="#testimonials"
                    className="text-slate-600 hover:text-[#003a70] text-sm sm:text-[15px] font-normal transition-colors block"
                  >
                    {t('footer.links.testimonials', { ns: 'common' }) || 'Testimonials'}
                  </a>
                  <a
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault()
                      if (window.history?.pushState) {
                        window.history.pushState(null, '', '/contact')
                        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
                        window.dispatchEvent(new CustomEvent('app-route-change', { detail: '/contact' }))
                      } else {
                        window.location.href = '/contact'
                      }
                      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
                    }}
                    className="text-slate-600 hover:text-[#003a70] text-sm sm:text-[15px] font-normal transition-colors block cursor-pointer"
                  >
                    {isHindi ? 'संपर्क करें' : 'Contact Us'}
                  </a>
                </div>

                {/* Subcolumn 2 */}
                <div className="space-y-3">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault()
                      if (window.history?.pushState) {
                        window.history.pushState(null, '', '/')
                        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
                        window.dispatchEvent(new CustomEvent('app-route-change', { detail: '/' }))
                      } else {
                        window.location.href = '/'
                      }
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="text-slate-600 hover:text-[#003a70] text-sm sm:text-[15px] font-normal transition-colors block cursor-pointer"
                  >
                    {t('footer.links.ourHospitals', { ns: 'common' }) || 'Our Hospitals'}
                  </a>
                  <a
                    href="/doctors"
                    onClick={(e) => {
                      e.preventDefault()
                      if (window.history?.pushState) {
                        window.history.pushState(null, '', '/doctors')
                        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
                        window.dispatchEvent(new CustomEvent('app-route-change', { detail: '/doctors' }))
                      } else {
                        window.location.href = '/doctors'
                      }
                      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
                    }}
                    className="text-slate-600 hover:text-[#003a70] text-sm sm:text-[15px] font-normal transition-colors block cursor-pointer"
                  >
                    {t('footer.links.ourDoctors', { ns: 'common' }) || 'Our Doctors'}
                  </a>
                  <a
                    href="#departments"
                    className="text-slate-600 hover:text-[#003a70] text-sm sm:text-[15px] font-normal transition-colors block"
                  >
                    {t('footer.links.specialties', { ns: 'common' }) || 'Specialties'}
                  </a>
                  <a
                    href="/gallery/photos"
                    onClick={(e) => {
                      e.preventDefault()
                      if (window.history?.pushState) {
                        window.history.pushState(null, '', '/gallery/photos')
                        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
                        window.dispatchEvent(new CustomEvent('app-route-change', { detail: '/gallery/photos' }))
                      } else {
                        window.location.href = '/gallery/photos'
                      }
                      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
                    }}
                    className="text-slate-600 hover:text-[#003a70] text-sm sm:text-[15px] font-normal transition-colors block cursor-pointer"
                  >
                    {isHindi ? 'फोटो व वीडियो गैलरी' : 'Hospital Gallery'}
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright matching screenshot bottom-left position */}
            <div className="mt-8 sm:mt-12 lg:mt-16">
              <p className="text-slate-500 text-xs sm:text-[13px] font-normal tracking-normal">
                {isHindi
                  ? `कॉपीराइट © ${currentYear} एजाज क्लिनिक। सर्वाधिकार सुरक्षित`
                  : `Copyright © ${currentYear} Ejaz Clinic. All Rights Reserved`}
              </p>
            </div>
          </div>

          {/* Column 2: Get in Touch (Span 4) */}
          <div className="lg:col-span-4 text-left flex flex-col justify-start h-full">
            <h3 className="font-heading font-semibold text-slate-900 text-xl sm:text-[22px] tracking-tight mb-5 sm:mb-6">
              {t('footer.getInTouch', { ns: 'common' }) || 'Get in Touch'}
            </h3>

            {/* 4 Circular Dark Social Buttons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="w-10 h-10 rounded-full bg-[#1e252d] hover:bg-[#003a70] text-white flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {item.icon}
                </a>
              ))}
            </div>

            {/* Email & Helpline matching screenshot */}
            <div className="mt-6 sm:mt-8 space-y-1.5 text-xs sm:text-[14px]">
              <p className="text-slate-700 font-medium leading-relaxed">
                {t('footer.writeToUs', { ns: 'common' }) || 'Write to Us:'}
              </p>
              
              <a
                href="mailto:care@ejazhospital.com"
                className="text-[#003a70] hover:text-[#c12532] font-semibold transition-colors hover:underline block leading-relaxed"
              >
                care@ejazhospital.com
              </a>

              <p className="text-[#003a70] font-semibold leading-relaxed pt-1">
                <span className="text-slate-700 font-medium">{t('footer.helplineNumber', { ns: 'common' }) || 'Helpline Number:'}</span>{' '}
                <a href="tel:+916203770070" className="hover:text-[#c12532] hover:underline">
                  +91 6203 770 070
                </a>
              </p>
            </div>
          </div>

          {/* Column 3: Coiled Blue Stethoscope & Red Heart Graphic (Span 3) */}
          <div className="lg:col-span-3 flex items-center justify-center lg:justify-end">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 flex items-center justify-center group">
              <img
                src={stethoscopeHeartImg}
                alt="Ejaz Hospital Compassionate Care Stethoscope"
                className="w-full h-full object-contain drop-shadow-md group-hover:scale-103 transition-transform duration-500 ease-out select-none pointer-events-none"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>

    </footer>
  )
}
