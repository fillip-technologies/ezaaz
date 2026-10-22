import { useEffect, useState } from 'react'
import { assetUrl, doctorsApi } from '../../api'
import placeholderPhoto from '../../assets/doctor-placeholder.svg'

// Every page that shows doctors reads them from the backend (managed in /master).
// One request per page load, shared by all sections that use this hook.
let doctorsPromise = null

function loadDoctors() {
  if (!doctorsPromise) {
    doctorsPromise = doctorsApi.list().catch((err) => {
      doctorsPromise = null // allow a retry on the next mount
      throw err
    })
  }
  return doctorsPromise
}

export function useDoctors() {
  const [state, setState] = useState({ doctors: [], loading: true, error: '' })

  useEffect(() => {
    let cancelled = false
    loadDoctors()
      .then((doctors) => !cancelled && setState({ doctors, loading: false, error: '' }))
      .catch((err) => !cancelled && setState({ doctors: [], loading: false, error: err.message }))
    return () => {
      cancelled = true
    }
  }, [])

  return state
}

const pick = (field, isHindi) => {
  if (!field) return ''
  if (typeof field === 'string') return field
  if (isHindi && field.hi) return field.hi
  return field.en || field.hi || ''
}

export function doctorPhoto(doctor) {
  return doctor?.photo ? assetUrl(doctor.photo) : placeholderPhoto
}

export function formatExperience(years, isHindi) {
  if (!years) return ''
  return isHindi ? `${years}+ वर्ष` : `${years}+ Years`
}

import { DR_SHAHZAD_DETAILS } from './drShahzadDetails'
import { DR_SHIVANI_DETAILS } from './drShivaniDetails'
import { DR_SALIK_DETAILS } from './drSalikDetails'

export const checkIsShahzad = (doctor) =>
  doctor.slug === 'dr-shahzad' ||
  doctor._id === '6ad0c4fa70227250537648f3' ||
  (typeof doctor.name === 'string' && doctor.name.toLowerCase().includes('shahzad')) ||
  doctor.name?.en?.toLowerCase().includes('shahzad')

export const checkIsShivani = (doctor) =>
  doctor.slug === 'dr-ortho-specialist' ||
  doctor.slug === 'dr-shivani' ||
  doctor._id === '6ad0c4fb70227250537648f5' ||
  (typeof doctor.name === 'string' && doctor.name.toLowerCase().includes('shivani')) ||
  doctor.name?.en?.toLowerCase().includes('shivani')

export const checkIsSalik = (doctor) =>
  doctor.slug === 'dr-internal-med' ||
  doctor.slug === 'dr-salik' ||
  doctor.slug === 'dr-abdul-salik' ||
  doctor._id === '6ad0c4fb70227250537648f6' ||
  (typeof doctor.name === 'string' && (doctor.name.toLowerCase().includes('salik') || doctor.name.toLowerCase().includes('abdul'))) ||
  doctor.name?.en?.toLowerCase().includes('salik') ||
  doctor.name?.en?.toLowerCase().includes('abdul') ||
  doctor.name?.hi?.includes('सालिक')

// Flat, single-language shape used by the doctor cards and the booking form
export function toDoctorCard(doctor, isHindi) {
  if (!doctor) return null
  const isShahzad = checkIsShahzad(doctor)
  const isShivani = checkIsShivani(doctor)
  const isSalik = checkIsSalik(doctor)

  if (isShahzad) {
    return {
      id: doctor.slug || 'dr-shahzad',
      name: isHindi ? DR_SHAHZAD_DETAILS.nameHi : DR_SHAHZAD_DETAILS.name,
      photo: doctorPhoto(doctor),
      specialty: isHindi ? DR_SHAHZAD_DETAILS.specialtyHi : DR_SHAHZAD_DETAILS.specialty,
      subSpecialty: isHindi ? DR_SHAHZAD_DETAILS.subSpecialtyHi : DR_SHAHZAD_DETAILS.subSpecialty,
      department: isHindi ? DR_SHAHZAD_DETAILS.departmentHi : DR_SHAHZAD_DETAILS.department,
      departmentId: doctor.category,
      specialtyTags: doctor.specialtyTags || [],
      degrees: isHindi ? DR_SHAHZAD_DETAILS.degreesHi : DR_SHAHZAD_DETAILS.degrees,
      experience: isHindi ? DR_SHAHZAD_DETAILS.experienceHi : DR_SHAHZAD_DETAILS.experience,
      gender: isHindi ? 'पुरुष' : 'Male',
      timing: isHindi ? DR_SHAHZAD_DETAILS.timingHi : DR_SHAHZAD_DETAILS.timing,
      bio: DR_SHAHZAD_DETAILS.aboutEn?.slice(0, 160) + '...',
    }
  }

  if (isShivani) {
    return {
      id: doctor.slug || 'dr-ortho-specialist',
      name: isHindi ? DR_SHIVANI_DETAILS.nameHi : DR_SHIVANI_DETAILS.name,
      photo: doctorPhoto(doctor),
      specialty: isHindi ? DR_SHIVANI_DETAILS.specialtyHi : DR_SHIVANI_DETAILS.specialty,
      subSpecialty: isHindi ? DR_SHIVANI_DETAILS.subSpecialtyHi : DR_SHIVANI_DETAILS.subSpecialty,
      department: isHindi ? DR_SHIVANI_DETAILS.departmentHi : DR_SHIVANI_DETAILS.department,
      departmentId: 'gynaecology',
      specialtyTags: DR_SHIVANI_DETAILS.specialtyTags,
      degrees: isHindi ? DR_SHIVANI_DETAILS.degreesHi : DR_SHIVANI_DETAILS.degrees,
      experience: isHindi ? DR_SHIVANI_DETAILS.experienceHi : DR_SHIVANI_DETAILS.experience,
      gender: isHindi ? 'महिला' : 'Female',
      timing: isHindi ? DR_SHIVANI_DETAILS.timingHi : DR_SHIVANI_DETAILS.timing,
      bio: DR_SHIVANI_DETAILS.aboutEn?.slice(0, 160) + '...',
    }
  }

  if (isSalik) {
    return {
      id: doctor.slug || 'dr-internal-med',
      name: isHindi ? DR_SALIK_DETAILS.nameHi : DR_SALIK_DETAILS.name,
      photo: doctorPhoto(doctor),
      specialty: isHindi ? DR_SALIK_DETAILS.specialtyHi : DR_SALIK_DETAILS.specialty,
      subSpecialty: isHindi ? DR_SALIK_DETAILS.subSpecialtyHi : DR_SALIK_DETAILS.subSpecialty,
      department: isHindi ? DR_SALIK_DETAILS.departmentHi : DR_SALIK_DETAILS.department,
      departmentId: 'medicine',
      specialtyTags: DR_SALIK_DETAILS.specialtyTags,
      degrees: isHindi ? DR_SALIK_DETAILS.degreesHi : DR_SALIK_DETAILS.degrees,
      experience: isHindi ? DR_SALIK_DETAILS.experienceHi : DR_SALIK_DETAILS.experience,
      gender: isHindi ? 'पुरुष' : 'Male',
      timing: isHindi ? DR_SALIK_DETAILS.timingHi : DR_SALIK_DETAILS.timing,
      bio: DR_SALIK_DETAILS.aboutEn?.slice(0, 160) + '...',
    }
  }

  return {
    id: doctor.slug || doctor._id,
    name: pick(doctor.name, isHindi),
    photo: doctorPhoto(doctor),
    specialty: pick(doctor.specialty, isHindi),
    subSpecialty: pick(doctor.subSpecialty, isHindi),
    department: pick(doctor.department, isHindi),
    departmentId: doctor.category,
    specialtyTags: doctor.specialtyTags || [],
    degrees: pick(doctor.degrees, isHindi),
    experience: formatExperience(doctor.experienceYears, isHindi),
    gender: doctor.gender === 'female' ? (isHindi ? 'महिला' : 'Female') : isHindi ? 'पुरुष' : 'Male',
    timing: pick(doctor.timing, isHindi),
    bio: pick(doctor.bio, isHindi),
  }
}

// Blog posts store the author doctor's id; name, role and photo come from the doctor record.
// Returns null when that doctor doesn't exist or is hidden.
export function findBlogAuthor(doctors, authorDoctorId, isHindi) {
  if (!authorDoctorId || !doctors) return null
  const doctor = doctors.find((d) => d._id === authorDoctorId || d.slug === authorDoctorId)
  if (!doctor) return null
  const isShahzad = checkIsShahzad(doctor)
  const isShivani = checkIsShivani(doctor)
  const isSalik = checkIsSalik(doctor)

  return {
    id: doctor.slug || doctor._id,
    name: isShahzad
      ? (isHindi ? DR_SHAHZAD_DETAILS.nameHi : DR_SHAHZAD_DETAILS.name)
      : isShivani
        ? (isHindi ? DR_SHIVANI_DETAILS.nameHi : DR_SHIVANI_DETAILS.name)
        : isSalik
          ? (isHindi ? DR_SALIK_DETAILS.nameHi : DR_SALIK_DETAILS.name)
          : pick(doctor.name, isHindi),
    role: isShahzad
      ? (isHindi ? DR_SHAHZAD_DETAILS.specialtyHi : DR_SHAHZAD_DETAILS.specialty)
      : isShivani
        ? (isHindi ? DR_SHIVANI_DETAILS.specialtyHi : DR_SHIVANI_DETAILS.specialty)
        : isSalik
          ? (isHindi ? DR_SALIK_DETAILS.specialtyHi : DR_SALIK_DETAILS.specialty)
          : pick(doctor.specialty, isHindi),
    photo: doctorPhoto(doctor),
  }
}

// Bilingual shape used by the doctor profile page (keys match the old static profile data)
export function toDoctorProfile(doctor) {
  if (!doctor) return null
  const isShahzad = checkIsShahzad(doctor)
  const isShivani = checkIsShivani(doctor)
  const isSalik = checkIsSalik(doctor)

  if (isShahzad) {
    return {
      id: doctor.slug || 'dr-shahzad',
      isShahzad: true,
      name: DR_SHAHZAD_DETAILS.name,
      nameHi: DR_SHAHZAD_DETAILS.nameHi,
      regNo: DR_SHAHZAD_DETAILS.regNo,
      photo: doctorPhoto(doctor),
      degrees: DR_SHAHZAD_DETAILS.degrees,
      degreesHi: DR_SHAHZAD_DETAILS.degreesHi,
      specialty: DR_SHAHZAD_DETAILS.specialty,
      specialtyHi: DR_SHAHZAD_DETAILS.specialtyHi,
      subSpecialty: DR_SHAHZAD_DETAILS.subSpecialty,
      subSpecialtyHi: DR_SHAHZAD_DETAILS.subSpecialtyHi,
      department: DR_SHAHZAD_DETAILS.department,
      departmentHi: DR_SHAHZAD_DETAILS.departmentHi,
      experience: DR_SHAHZAD_DETAILS.experience,
      experienceHi: DR_SHAHZAD_DETAILS.experienceHi,
      languages: DR_SHAHZAD_DETAILS.languages,
      timing: DR_SHAHZAD_DETAILS.timing,
      timingHi: DR_SHAHZAD_DETAILS.timingHi,
      hospital: DR_SHAHZAD_DETAILS.hospital,
      hospitalHi: DR_SHAHZAD_DETAILS.hospitalHi,
      aboutEn: DR_SHAHZAD_DETAILS.aboutEn,
      aboutHi: DR_SHAHZAD_DETAILS.aboutHi,
      specializations: DR_SHAHZAD_DETAILS.specializations,
      education: DR_SHAHZAD_DETAILS.education,
      awards: DR_SHAHZAD_DETAILS.awards,
      licensure: DR_SHAHZAD_DETAILS.licensure,
      publications: DR_SHAHZAD_DETAILS.publications,
      currentPosition: DR_SHAHZAD_DETAILS.currentPosition,
      contact: DR_SHAHZAD_DETAILS.contact,
      personalInfo: DR_SHAHZAD_DETAILS.personalInfo,
    }
  }

  if (isShivani) {
    return {
      id: doctor.slug || 'dr-ortho-specialist',
      isShivani: true,
      name: DR_SHIVANI_DETAILS.name,
      nameHi: DR_SHIVANI_DETAILS.nameHi,
      regNo: DR_SHIVANI_DETAILS.regNo,
      photo: doctorPhoto(doctor),
      degrees: DR_SHIVANI_DETAILS.degrees,
      degreesHi: DR_SHIVANI_DETAILS.degreesHi,
      specialty: DR_SHIVANI_DETAILS.specialty,
      specialtyHi: DR_SHIVANI_DETAILS.specialtyHi,
      subSpecialty: DR_SHIVANI_DETAILS.subSpecialty,
      subSpecialtyHi: DR_SHIVANI_DETAILS.subSpecialtyHi,
      department: DR_SHIVANI_DETAILS.department,
      departmentHi: DR_SHIVANI_DETAILS.departmentHi,
      experience: DR_SHIVANI_DETAILS.experience,
      experienceHi: DR_SHIVANI_DETAILS.experienceHi,
      languages: DR_SHIVANI_DETAILS.languages,
      timing: DR_SHIVANI_DETAILS.timing,
      timingHi: DR_SHIVANI_DETAILS.timingHi,
      hospital: DR_SHIVANI_DETAILS.hospital,
      hospitalHi: DR_SHIVANI_DETAILS.hospitalHi,
      aboutEn: DR_SHIVANI_DETAILS.aboutEn,
      aboutHi: DR_SHIVANI_DETAILS.aboutHi,
      specializations: DR_SHIVANI_DETAILS.specializations,
      education: DR_SHIVANI_DETAILS.education,
      experienceList: DR_SHIVANI_DETAILS.experienceList,
      awards: DR_SHIVANI_DETAILS.awards || [],
      licensure: DR_SHIVANI_DETAILS.licensure,
      publications: DR_SHIVANI_DETAILS.publications,
      currentPosition: DR_SHIVANI_DETAILS.currentPosition,
      contact: DR_SHIVANI_DETAILS.contact,
      personalInfo: DR_SHIVANI_DETAILS.personalInfo,
    }
  }

  if (isSalik) {
    return {
      id: doctor.slug || 'dr-internal-med',
      isSalik: true,
      name: DR_SALIK_DETAILS.name,
      nameHi: DR_SALIK_DETAILS.nameHi,
      regNo: DR_SALIK_DETAILS.regNo,
      photo: doctorPhoto(doctor),
      degrees: DR_SALIK_DETAILS.degrees,
      degreesHi: DR_SALIK_DETAILS.degreesHi,
      specialty: DR_SALIK_DETAILS.specialty,
      specialtyHi: DR_SALIK_DETAILS.specialtyHi,
      subSpecialty: DR_SALIK_DETAILS.subSpecialty,
      subSpecialtyHi: DR_SALIK_DETAILS.subSpecialtyHi,
      department: DR_SALIK_DETAILS.department,
      departmentHi: DR_SALIK_DETAILS.departmentHi,
      experience: DR_SALIK_DETAILS.experience,
      experienceHi: DR_SALIK_DETAILS.experienceHi,
      languages: DR_SALIK_DETAILS.languages,
      timing: DR_SALIK_DETAILS.timing,
      timingHi: DR_SALIK_DETAILS.timingHi,
      hospital: DR_SALIK_DETAILS.hospital,
      hospitalHi: DR_SALIK_DETAILS.hospitalHi,
      aboutEn: DR_SALIK_DETAILS.aboutEn,
      aboutHi: DR_SALIK_DETAILS.aboutHi,
      specializations: DR_SALIK_DETAILS.specializations,
      education: DR_SALIK_DETAILS.education,
      experienceList: DR_SALIK_DETAILS.experienceList,
      awards: DR_SALIK_DETAILS.awards || [],
      licensure: DR_SALIK_DETAILS.licensure,
      publications: DR_SALIK_DETAILS.publications,
      currentPosition: DR_SALIK_DETAILS.currentPosition,
      contact: DR_SALIK_DETAILS.contact,
      personalInfo: DR_SALIK_DETAILS.personalInfo,
    }
  }

  return {
    id: doctor.slug || doctor._id,
    name: pick(doctor.name, false),
    nameHi: pick(doctor.name, true),
    regNo: doctor.regNo || '',
    photo: doctorPhoto(doctor),
    degrees: pick(doctor.degrees, false),
    degreesHi: pick(doctor.degrees, true),
    specialty: pick(doctor.specialty, false),
    specialtyHi: pick(doctor.specialty, true),
    subSpecialty: pick(doctor.subSpecialty, false),
    subSpecialtyHi: pick(doctor.subSpecialty, true),
    department: pick(doctor.department, false),
    departmentHi: pick(doctor.department, true),
    experience: formatExperience(doctor.experienceYears, false),
    experienceHi: formatExperience(doctor.experienceYears, true),
    languages: doctor.languages || '',
    timing: pick(doctor.timing, false),
    timingHi: pick(doctor.timing, true),
    hospital: pick(doctor.hospital, false),
    hospitalHi: pick(doctor.hospital, true),
    aboutEn: pick(doctor.about, false),
    aboutHi: pick(doctor.about, true),
    specializations: doctor.specializations || [],
    education: doctor.education || [],
    experienceList: doctor.experienceList || [],
    awards: doctor.awards || [],
    licensure: doctor.licensure || [],
    publications: doctor.publications || [],
    currentPosition: doctor.currentPosition || null,
    contact: doctor.contact || null,
    personalInfo: doctor.personalInfo || null,
  }
}
