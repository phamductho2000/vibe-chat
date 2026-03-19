import {
  Box,
  Button,
  Divider,
  Group,
  PasswordInput,
  Paper,
  Stack,
  Text,
  TextInput,
  useMantineColorScheme,
} from '@mantine/core'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/auth/auth'

export function LoginPage() {
  const { colorScheme } = useMantineColorScheme()
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('demo@myvibe.chat')
  const [password, setPassword] = useState('demo1234')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function submit() {
    setError(null)
    setLoading(true)
    try {
      await login(email, password)
      navigate('/chat', { replace: true })
    } catch {
      setError('Email hoặc mật khẩu không đúng.')
    } finally {
      setLoading(false)
    }
  }

  async function socialLogin() {
    setEmail('demo@myvibe.chat')
    setPassword('demo1234')
    setError(null)
    setLoading(true)
    try {
      await login('demo@myvibe.chat', 'demo1234')
      navigate('/chat', { replace: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        background:
          colorScheme === 'dark'
            ? '#14141a'
            : 'linear-gradient(135deg, #ff4fd8 0%, #6a5bff 45%, #3c68ff 100%)',
      }}
    >
      <Paper
        radius="md"
        p={0}
        style={{
          width: 980,
          maxWidth: '100%',
          overflow: 'hidden',
          boxShadow: '0 18px 45px rgba(0,0,0,0.25)',
        }}
      >
        <Group wrap="nowrap" style={{ minHeight: 560 }}>
          <Box
            style={{
              flex: 1,
              padding: 40,
              color: 'white',
              position: 'relative',
              background:
                'linear-gradient(135deg, #6b2cff 0%, #3f2bc8 40%, #2a2c86 100%)',
              minWidth: 320,
            }}
          >
            <Box
              style={{
                position: 'absolute',
                inset: -80,
                background:
                  'radial-gradient(circle at 20% 30%, rgba(0,255,204,0.25) 0%, transparent 40%), radial-gradient(circle at 70% 15%, rgba(255,82,190,0.35) 0%, transparent 38%), radial-gradient(circle at 20% 85%, rgba(255,168,82,0.2) 0%, transparent 45%)',
                pointerEvents: 'none',
              }}
            />

            <Group style={{ position: 'relative' }} align="center" gap={14}>
              <Box
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 999,
                  border: '2px solid rgba(255,255,255,0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                }}
              >
                ⊙
              </Box>
              <Text fw={700} size="lg" opacity={0.95}>
                LOGO
              </Text>
            </Group>

            <Stack style={{ position: 'relative' }} justify="center" h="100%">
              <Text
                style={{
                  fontSize: 44,
                  fontWeight: 800,
                  letterSpacing: -0.5,
                  lineHeight: 1.05,
                  marginTop: 20,
                }}
              >
                Welcome Page
              </Text>
              <Text size="sm" opacity={0.9} mt={12} style={{ maxWidth: 240 }}>
                Sign in to
                <br />
                continue access
              </Text>
              <Box style={{ flex: 1 }} />
              <Text size="xs" opacity={0.8} fw={600} style={{ marginTop: 8 }}>
                www.yoursite.com
              </Text>
            </Stack>
          </Box>

          <Box
            style={{
              width: 420,
              background: 'white',
              padding: 44,
              minWidth: 320,
            }}
          >
            <Stack>
              <Text style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
                Sign In
              </Text>

              <TextInput
                label="Email Address"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                radius="md"
              />

              <PasswordInput
                label="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                radius="md"
                mt={8}
              />

              {error ? (
                <Text c="red" size="sm">
                  {error}
                </Text>
              ) : null}

              <Button
                mt="sm"
                fullWidth
                radius="md"
                loading={loading}
                disabled={loading}
                styles={{
                  root: {
                    background:
                      'linear-gradient(135deg, #7a3cff 0%, #a23bff 100%)',
                  },
                }}
                onClick={submit}
              >
                <Group justify="space-between" style={{ width: '100%' }} wrap="nowrap">
                  <Text fw={700}>CONTINUE</Text>
                  <Text fw={800}>›</Text>
                </Group>
              </Button>

              <Divider
                label="or Connect with Social Media"
                labelPosition="center"
                mt="md"
              />

              <Button
                fullWidth
                radius="md"
                mt="sm"
                styles={{ root: { background: '#2aa0dd' } }}
                onClick={socialLogin}
                loading={loading}
              >
                <Group justify="center" gap="sm">
                  <Text fw={900} style={{ fontSize: 18 }}>
                    t
                  </Text>
                  <Text fw={600}>Sign in With Twitter</Text>
                </Group>
              </Button>

              <Button
                fullWidth
                radius="md"
                mt="sm"
                styles={{ root: { background: '#2b6cb3' } }}
                onClick={socialLogin}
                loading={loading}
              >
                <Group justify="center" gap="sm">
                  <Text fw={900} style={{ fontSize: 18 }}>
                    f
                  </Text>
                  <Text fw={600}>Sign in With Facebook</Text>
                </Group>
              </Button>

              <Text size="xs" c="dimmed" mt="sm">
                Mock login: <b>demo@myvibe.chat</b> / <b>demo1234</b>
              </Text>
            </Stack>
          </Box>
        </Group>
      </Paper>
    </Box>
  )
}

