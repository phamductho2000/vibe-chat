import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { authenticate, type MockUser } from '../../features/auth/mockAuth'

type AuthContextValue = {
  user: MockUser | null
  login: (email: string, password: string) => Promise<MockUser>
  logout: () => void
  ready: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = 'my-vibe-chat:user'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw) as MockUser)
    } finally {
      setReady(true)
    }
  }, [])

  const value = useMemo<AuthContextValue>(() => {
    return {
      user,
      ready,
      login: async (email: string, password: string) => {
        await new Promise((r) => setTimeout(r, 450))
        const u = authenticate(email, password)
        if (!u) throw new Error('INVALID_CREDENTIALS')
        setUser(u)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
        return u
      },
      logout: () => {
        setUser(null)
        localStorage.removeItem(STORAGE_KEY)
      },
    }
  }, [ready, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

