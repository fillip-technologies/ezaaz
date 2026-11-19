import about from '../../assets/about/about.png'
import doctors from '../../assets/doctors/doctors-hero.jpg'
import contact from '../../assets/contact-page-1.png'
import diagnosis from '../../assets/diagnosis/diagnosis.png'
import emergency from '../../assets/emergency.png'
import radiology from '../../assets/radiology/radiology.png'
import appointment from '../../assets/appointment/appointment-hero.jpg'
import research from '../../assets/research/research-hero.png'
import laparoscopic from '../../assets/speciality/laproscopic/Laparoscopic-image-1.png'
import roboticSurgery from '../../assets/robotic-surgery.JPG'
import cancer from '../../assets/speciality/cancer-hero.png'
import hernia from '../../assets/speciality/hernia-hero.png'
import orthopaedics from '../../assets/speciality/orthopedic-hero.png'
import generalSurgery from '../../assets/speciality/general-surgery.png'
import gastrointestinal from '../../assets/speciality/Gastroenterolory-hero.png'
import physiotherapy from '../../assets/speciality/Physiotherapy-hero.png'
import anaesthesia from '../../assets/speciality/anethesia-hero.png'
import plasticSurgery from '../../assets/speciality/plastic-surgery.png'
import urology from '../../assets/speciality/urology-hero.png'
import generalInternal from '../../assets/speciality/general-internal-hero.png'
import gynaecology from '../../assets/speciality/gyanelogy-hero.png'

// Pages whose top banner image the admin can replace (/master/settings/page-banners).
// Keys must match PAGE_BANNER_KEYS in the backend's site.model.js. `image` = the built-in banner.
export const PAGE_BANNERS = [
  { group: 'Main pages', key: 'about', title: 'About us', image: about },
  { group: 'Main pages', key: 'doctors', title: 'Our doctors', image: doctors },
  { group: 'Main pages', key: 'contact', title: 'Contact us', image: contact },
  { group: 'Main pages', key: 'blogs', title: 'Health blogs', image: appointment },
  { group: 'Main pages', key: 'bookAppointment', title: 'Book appointment', image: appointment },
  { group: 'Main pages', key: 'appointmentBooking', title: 'Appointment booking', image: appointment },
  { group: 'Main pages', key: 'research', title: 'Research & articles', image: research },
  { group: 'Main pages', key: 'caseStudies', title: 'Case studies', image: research },
  { group: 'Facilities', key: 'emergency', title: '24×7 Emergency', image: emergency },
  { group: 'Facilities', key: 'diagnosis', title: 'Diagnosis', image: diagnosis },
  { group: 'Facilities', key: 'radiology', title: 'Radiology', image: radiology },
  { group: 'Specialities', key: 'laparoscopic', title: 'Laparoscopic surgery', image: laparoscopic },
  { group: 'Specialities', key: 'roboticSurgery', title: 'Robotic surgery', image: roboticSurgery },
  { group: 'Specialities', key: 'cancer', title: 'Cancer surgery', image: cancer },
  { group: 'Specialities', key: 'hernia', title: 'Hernia', image: hernia },
  { group: 'Specialities', key: 'orthopaedics', title: 'Orthopaedics', image: orthopaedics },
  { group: 'Specialities', key: 'generalSurgery', title: 'General surgery', image: generalSurgery },
  { group: 'Specialities', key: 'gastrointestinal', title: 'Gastrointestinal', image: gastrointestinal },
  { group: 'Specialities', key: 'physiotherapy', title: 'Physiotherapy', image: physiotherapy },
  { group: 'Specialities', key: 'anaesthesia', title: 'Anaesthesia', image: anaesthesia },
  { group: 'Specialities', key: 'plasticSurgery', title: 'Plastic surgery', image: plasticSurgery },
  { group: 'Specialities', key: 'urology', title: 'Urology', image: urology },
  { group: 'Specialities', key: 'generalInternal', title: 'General & internal medicine', image: generalInternal },
  { group: 'Specialities', key: 'gynaecology', title: 'Gynaecology', image: gynaecology },
]

export const DEFAULT_PAGE_BANNERS = Object.fromEntries(PAGE_BANNERS.map((b) => [b.key, b.image]))
