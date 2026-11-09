import { useTranslation } from 'react-i18next'
import stethoscopeHeartImg from '../../assets/layout/footer-stethoscope.png'

export default function Footer() {
  const { t, i18n } = useTranslation(['common', 'home'])
  const isHindi = i18n?.language === 'hi'

  const currentYear = new Date().getFullYear()

  // Social icons matching user accounts (Facebook, Instagram, WhatsApp, YouTube)
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=100068185956623',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/drejazclinic/',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/message/MBM4KWAXXZWFM1',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
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
            <div className="mt-8 sm:mt-12 lg:mt-16 space-y-1">
              <p className="text-slate-500 text-xs sm:text-[13px] font-normal tracking-normal">
                {isHindi
                  ? `कॉपीराइट © ${currentYear} एजाज क्लिनिक। सर्वाधिकार सुरक्षित`
                  : `Copyright © ${currentYear} Ejaz Clinic. All Rights Reserved`}
              </p>
              <p className="text-slate-500 text-xs sm:text-[13px] font-normal tracking-normal">
                {isHindi ? 'डिज़ाइन एवं विकसित: ' : 'Designed & Developed by '}
                <a
                  href="https://filliptechnologies.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#003a70] hover:text-[#ea580c] hover:underline transition-colors"
                >
                  Fillip Technologies
                </a>
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

            {/* Email, Helpline, Address & WhatsApp */}
            <div className="mt-6 sm:mt-8 space-y-3 text-xs sm:text-[14px]">
              <div>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {t('footer.writeToUs', { ns: 'common' }) || 'Write to Us:'}
                </p>
                <a
                  href="mailto:care@ejazhospital.com"
                  className="text-[#003a70] hover:text-[#c12532] font-semibold transition-colors hover:underline block leading-relaxed"
                >
                  care@ejazhospital.com
                </a>
              </div>

              <div>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {isHindi ? 'हेल्पलाइन / मोबाइल नंबर:' : 'Mobile / Helpline Numbers:'}
                </p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold text-[#003a70]">
                  <a href="tel:+916203770070" className="hover:text-[#c12532] hover:underline">
                    +91 6203 770 070
                  </a>
                  <span className="text-slate-400">/</span>
                  <a href="tel:+917362004545" className="hover:text-[#c12532] hover:underline">
                    +91 7362 004 545
                  </a>
                </div>
              </div>

              <div className="pt-1">
                <p className="text-slate-700 font-medium leading-relaxed">
                  {isHindi ? 'अस्पताल पता:' : 'Hospital Address:'}
                </p>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                  Shareef Colony, Chak Musallahpur, Koiritola, Patna, Bihar 800004
                </p>
              </div>

              <div className="pt-1">
                <a
                  href="https://wa.me/message/MBM4KWAXXZWFM1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
                >
                  <span>{isHindi ? 'व्हाट्सएप चैट सहायता' : 'WhatsApp Official Chat'} →</span>
                </a>
              </div>
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
