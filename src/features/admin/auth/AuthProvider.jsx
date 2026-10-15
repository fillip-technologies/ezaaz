import { useCallback, useEffect, useMemo, useState } from 'react'
import { authApi, tokenStore, UNAUTHORIZED_EVENT } from '../../../api'
import { AuthContext } from './authContext'

// status: 'loading' while restoring a saved session, then 'authenticated' or 'guest'
export default function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [status, setStatus] = useState(() => (tokenStore.get() ? 'loading' : 'guest'))

  useEffect(() => {
    if (status !== 'loading') return
    let cancelled = false
    authApi
      .me()
      .then((me) => {
        if (cancelled) return
        setAdmin(me)
        setStatus('authenticated')
      })
      .catch(() => {
        if (cancelled) return
        tokenStore.clear()
        setStatus('guest')
      })
    return () => {
      cancelled = true
    }
  }, [status])

  useEffect(() => {
    const onUnauthorized = () => {
      setAdmin(null)
      setStatus('guest')
    }
    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized)
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized)
  }, [])

  const startSession = useCallback(({ token, admin: nextAdmin }) => {
    tokenStore.set(token)
    setAdmin(nextAdmin)
    setStatus('authenticated')
  }, [])

  const login = useCallback(
    async (email, password) => startSession(await authApi.login(email, password)),
    [startSession],
  )

  const logout = useCallback(() => {
    tokenStore.clear()
    setAdmin(null)
    setStatus('guest')
  }, [])

  const value = useMemo(
    () => ({ admin, status, login, logout, startSession, setAdmin }),
    [admin, status, login, logout, startSession],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
