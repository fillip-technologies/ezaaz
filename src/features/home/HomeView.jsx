import HeroSection from './components/HeroSection'
import QuickActionsBar from './components/QuickActionsBar'
import AboutSection from './components/AboutSection'
import SpecialtiesSection from './components/SpecialtiesSection'
import DoctorsSection from './components/DoctorsSection'
import HealthServicesSection from './components/HealthServicesSection'
import WhyChooseSection from './components/WhyChooseSection'
import TopProceduresSection from './components/TopProceduresSection'
import GallerySection from './components/GallerySection'
import BlogSection from './components/BlogSection'
import TestimonialsSection from './components/TestimonialsSection'
import HelpContactSection from './components/HelpContactSection'

export default function HomeView() {
  return (
    <div className="w-full bg-master text-white">
      {/* Hero Section */}
      <HeroSection />

      {/* 5-Item Medical Quick Actions Bar: Doctor Consultation, Radiology, Diagnostic Lab, Physiotherapy, ICU Services */}
      <QuickActionsBar />

      {/* About Section matching reference design */}
      <AboutSection />

      {/* Clinical Specialities & Centres of Excellence */}
      <SpecialtiesSection />

      {/* Renowned Medical Specialists & Doctors */}
      <DoctorsSection />

      {/* Services For Your Health - Overlapping Banner Section */}
      <HealthServicesSection />

      {/* Why Choose Ejaz Hospital */}
      <WhyChooseSection />

      {/* Top Clinical & Surgical Procedures */}
      <TopProceduresSection />

      {/* Facility & Hospital Life Gallery Dual-Row Continuous Showcase */}
      <GallerySection />

      {/* Latest News & Medical Blog Section */}
      <BlogSection />

      {/* Real Patient Recovery Stories & Testimonials */}
      <TestimonialsSection />

      {/* We're Here to Help: Left Contact Form & Right Hospital Map */}
      <HelpContactSection />
    </div>
  )
}
