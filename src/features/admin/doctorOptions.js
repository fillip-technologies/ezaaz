// `category` drives the filter tabs on the website's doctors section
export const CATEGORY_OPTIONS = [
  { value: 'surgical', label: 'Surgical Specialists' },
  { value: 'medicine', label: 'Medicine & Critical Care' },
  { value: 'super', label: 'Super Specialists' },
]

export const CATEGORY_LABELS = Object.fromEntries(CATEGORY_OPTIONS.map((o) => [o.value, o.label]))

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]
