import { Box, Text } from '@mantine/core'

export function HomePage() {
  return (
    <Box
      h="100%"
      style={{
        padding: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text fw={700}>Home (mock)</Text>
    </Box>
  )
}

