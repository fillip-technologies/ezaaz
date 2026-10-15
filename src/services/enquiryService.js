/**
 * Specialty Enquiry Service
 * Centralized service to handle enquiries across all specialty and clinic pages.
 * When integrating with a backend API in the future, simply update the submitSpecialtyEnquiry function here.
 */

export async function submitSpecialtyEnquiry({ name, phone, message, specialtyName = 'General' }) {
  // Payload prepared for backend API integration
  const payload = {
    name: name.trim(),
    phone: phone.trim(),
    message: message?.trim() || '',
    specialty: specialtyName,
    submittedAt: new Date().toISOString(),
    source: window.location.pathname
  }

  // Log in development
  if (import.meta.env.DEV) {
    console.log('[EnquiryService] Submitting enquiry:', payload)
  }

  // TODO: Replace with real API endpoint when backend is ready:
  // const response = await fetch('/api/v1/enquiries', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload)
  // })
  // if (!response.ok) throw new Error('Failed to submit enquiry')
  // return await response.json()

  // Simulated asynchronous network response
  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    success: true,
    data: payload
  }
}
