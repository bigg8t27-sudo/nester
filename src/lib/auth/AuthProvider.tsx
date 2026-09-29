import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { authApi, type ApiUser } from '@/lib/api/auth'

interface AuthState { user: ApiUser | null; loading: boolean; refresh: () => Promise<void>; setUser: (user: ApiUser | null) => void }
const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null)
  const [loading, setLoading] = useState(true)
  const refresh = useCallback(async () => {
    try { setUser((await authApi.me()).user) } catch { setUser(null) }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { void refresh() }, [refresh])
  return <AuthContext.Provider value={{ user, loading, refresh, setUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside AuthProvider')
  return value
}
