import { Activity, Ambulance, Award, BedDouble, HeartPulse, Medal, Stethoscope, Users } from 'lucide-react'

// Icons for the home header stats. Keys must match STAT_ICONS in the server's site.model.js.
export const STAT_ICONS = {
  operations: { Icon: Activity, label: 'Operations (pulse)' },
  experience: { Icon: Award, label: 'Experience (award)' },
  patients: { Icon: Users, label: 'Patients (people)' },
  doctors: { Icon: Stethoscope, label: 'Doctors (stethoscope)' },
  beds: { Icon: BedDouble, label: 'Beds' },
  heart: { Icon: HeartPulse, label: 'Heart' },
  ambulance: { Icon: Ambulance, label: 'Ambulance' },
  award: { Icon: Medal, label: 'Medal' },
}

export const statIcon = (key, index = 0) => STAT_ICONS[key]?.Icon || Object.values(STAT_ICONS)[index % 4].Icon
