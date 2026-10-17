import { useEffect, useState } from 'react'
import { contactApi } from '../../api'

// Departments for the website's enquiry forms, managed in the admin panel (Settings → Departments).
// Fetched once per page load and shared by the contact page and the home page form.
let listPromise = null

function loadDepartments() {
  if (!listPromise) {
    listPromise = contactApi.departments().catch((err) => {
      listPromise = null
      throw err
    })
  }
  return listPromise
}

// [{ id, label }] in the current language
export function useDepartments(isHindi) {
  const [list, setList] = useState([])

  useEffect(() => {
    let cancelled = false
    loadDepartments()
      .then((departments) => !cancelled && setList(departments))
      .catch(() => !cancelled && setList([]))
    return () => {
      cancelled = true
    }
  }, [])

  return list.map((dept) => ({
    id: dept._id,
    label: isHindi ? dept.name.hi || dept.name.en : dept.name.en,
  }))
}
