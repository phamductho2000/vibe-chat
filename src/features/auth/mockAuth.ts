export type MockUser = {
  id: string
  email: string
  name: string
}

const MOCK_CREDENTIALS: Array<{
  email: string
  password: string
  user: MockUser
}> = [
  {
    email: 'demo@myvibe.chat',
    password: 'demo1234',
    user: { id: 'u1', email: 'demo@myvibe.chat', name: 'Demo User' },
  },
]

export function authenticate(email: string, password: string): MockUser | null {
  const e = email.trim().toLowerCase()
  const p = password
  const hit = MOCK_CREDENTIALS.find((c) => c.email === e && c.password === p)
  return hit?.user ?? null
}

