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

const pick = (field, isHindi) => (isHindi && field?.hi ? field.hi : field?.en || '')

export function doctorPhoto(doctor) {
  return doctor?.photo ? assetUrl(doctor.photo) : placeholderPhoto
}

export function formatExperience(years, isHindi) {
  if (!years) return ''
  return isHindi ? `${years}+ वर्ष` : `${years}+ Years`
}

// Flat, single-language shape used by the doctor cards and the booking form
export function toDoctorCard(doctor, isHindi) {
  return {
    id: doctor.slug,
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
  if (!authorDoctorId) return null
  const doctor = doctors.find((d) => d._id === authorDoctorId)
  if (!doctor) return null
  return {
    id: doctor.slug,
    name: pick(doctor.name, isHindi),
    role: pick(doctor.specialty, isHindi),
    photo: doctorPhoto(doctor),
  }
}

// Bilingual shape used by the doctor profile page (keys match the old static profile data)
export function toDoctorProfile(doctor) {
  return {
    id: doctor.slug,
    name: doctor.name?.en || '',
    nameHi: pick(doctor.name, true),
    regNo: doctor.regNo,
    photo: doctorPhoto(doctor),
    degrees: doctor.degrees?.en || '',
    degreesHi: pick(doctor.degrees, true),
    specialty: doctor.specialty?.en || '',
    specialtyHi: pick(doctor.specialty, true),
    experience: formatExperience(doctor.experienceYears, false),
    experienceHi: formatExperience(doctor.experienceYears, true),
    languages: doctor.languages,
    timing: doctor.timing?.en || '',
    timingHi: pick(doctor.timing, true),
    hospital: doctor.hospital?.en || '',
    hospitalHi: pick(doctor.hospital, true),
    aboutEn: doctor.about?.en || '',
    aboutHi: pick(doctor.about, true),
    specializations: doctor.specializations || [],
    education: doctor.education || [],
  }
}
