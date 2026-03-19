import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Group,
  Paper,
  Text,
  TextInput,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { Virtuoso } from 'react-virtuoso'

type Bubble = {
  id: string
  from: 'me' | 'them'
  text: string
  at: string
}

const mockConversation: Bubble[] = [
  { id: '1', from: 'them', text: '?', at: '11:38' },
  {
    id: '2',
    from: 'me',
    text: 'Đại ca',
    at: '11:38',
  },
  {
    id: '3',
    from: 'me',
    text: 'cái ịn lúc bên vẽ bên vẽ cho e cái header có cái p-api-key để làm gì ấy nhỉ',
    at: '11:38',
  },
  { id: '4', from: 'them', text: 'để verify signature', at: '11:39' },
  {
    id: '5',
    from: 'me',
    text: 'e tưởng dùng cái secret key',
    at: '11:41',
  },
  { id: '6', from: 'them', text: 'ờ nhỉ', at: '11:42' },
  { id: '7', from: 'them', text: 'kỳ băng cái secret key mà', at: '11:42' },
  { id: '8', from: 'them', text: 'đủ hiểu dễ lắm ạ luôn', at: '11:43' },
  { id: '9', from: 'me', text: 'lú vc', at: '11:44' },
  { id: '10', from: 'them', text: 'lú vc', at: '11:44' },
  { id: '11', from: 'me', text: 'lú vc', at: '11:44' },
  { id: '12', from: 'them', text: 'lú vc', at: '11:44' },
  { id: '13', from: 'me', text: 'lú vc', at: '11:44' },
  { id: '14', from: 'them', text: 'lú vc', at: '11:44' },
  { id: '15', from: 'me', text: 'lú vc', at: '11:44' },
  { id: '16', from: 'them', text: 'lú vc', at: '11:44' },
  { id: '17', from: 'me', text: 'lú vc', at: '11:44' },
  { id: '18', from: 'them', text: 'lú vc', at: '11:44' },
  { id: '19', from: 'me', text: 'lú vc', at: '11:44' },
  { id: '20', from: 'them', text: 'lú vc', at: '11:44' },
  { id: '21', from: 'me', text: 'lú vc', at: '11:44' },
  { id: '22', from: 'them', text: 'lú vc', at: '11:44' },
  { id: '23', from: 'me', text: 'lú vc', at: '11:44' },
  { id: '24', from: 'them', text: 'lú vc', at: '11:44' },
  { id: '25', from: 'me', text: 'lú vc', at: '11:44' },
  { id: '26', from: 'them', text: 'lú vc', at: '11:44' },
  { id: '27', from: 'me', text: 'lú vc', at: '11:44' },
]

function BubbleItem({ item }: { item: Bubble }) {
  const theme = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const mine = item.from === 'me'

  return (
    <Group justify={mine ? 'flex-end' : 'flex-start'}>
      <Paper
        radius="md"
        px="sm"
        py={6}
        shadow="xs"
        style={{
          maxWidth: 460,
          border: `1px solid ${
            colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
          }`,
          background: mine
            ? colorScheme === 'dark'
              ? 'rgba(167,243,208,0.25)'
              : '#e8ffd8'
            : colorScheme === 'dark'
              ? theme.colors.dark[6]
              : 'white',
        }}
      >
        <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
          {item.text}
        </Text>
        <Text size="xs" c="dimmed" ta="right" mt={2}>
          {item.at}
        </Text>
      </Paper>
    </Group>
  )
}

export function ChatContent() {
  const theme = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()

  const lineColor = colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
  const listItems: Array<{ type: 'day' | 'message' | 'footer'; label?: string; item?: Bubble }> = [
    { type: 'day', label: 'March 6' },
    ...mockConversation.map((item) => ({ type: 'message' as const, item })),
    { type: 'footer', label: 'Friday' },
  ]

  return (
    <Box h="100%" style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <Box
        px="md"
        py="xs"
        style={{
          borderBottom: `1px solid ${lineColor}`,
          background: colorScheme === 'dark' ? theme.colors.dark[7] : 'white',
        }}
      >
        <Group justify="space-between" wrap="nowrap">
          <Group gap="sm" wrap="nowrap">
            <Avatar
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=120&q=80"
              radius="xl"
              size={36}
            />
            <Box>
              <Text fw={700}>A Trung Paypay</Text>
              <Text size="xs" c="dimmed">
                last seen 1 minute ago
              </Text>
            </Box>
          </Group>

          <Group gap={8} wrap="nowrap">
            <Box pr="sm" style={{ borderRight: `1px solid ${lineColor}` }}>
              <Text size="sm" c="blue" fw={600}>
                Pinned message
              </Text>
              <Text size="xs" fw={700}>
                125K
              </Text>
            </Box>
            <ActionIcon variant="subtle" aria-label="Close">
              ✕
            </ActionIcon>
            <ActionIcon variant="subtle" aria-label="Search">
              ⌕
            </ActionIcon>
            <ActionIcon variant="subtle" aria-label="Call">
              ☏
            </ActionIcon>
            <ActionIcon variant="subtle" aria-label="More">
              ⋮
            </ActionIcon>
          </Group>
        </Group>
      </Box>

      <Box
        style={{
          flex: 1,
          minHeight: 0,
        //   background:
        //     colorScheme === 'dark'
        //       ? 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, #1a1b1e 0)'
        //       : 'radial-gradient(circle at 1px 1px, rgba(47,125,68,0.12) 1px, #dff2d8 0)',
          backgroundSize: '16px 16px',
        }}
      >
        <Virtuoso
          style={{ height: '100%' }}
          data={listItems}
          alignToBottom
          followOutput
          itemContent={(_, row) => {
            if (row.type === 'day' || row.type === 'footer') {
              return (
                <Group justify="center" py="xs">
                  <Badge radius="xl" variant="filled" color="gray">
                    {row.label}
                  </Badge>
                </Group>
              )
            }

            return (
              <Box px="xl" py={4}>
                <BubbleItem item={row.item!} />
              </Box>
            )
          }}
        />
      </Box>

      <Box
        px="md"
        py="xs"
        style={{
          borderTop: `1px solid ${lineColor}`,
          background: colorScheme === 'dark' ? theme.colors.dark[7] : 'white',
        }}
      >
        <Group wrap="nowrap">
          <ActionIcon variant="subtle" radius="xl" aria-label="Emoji">
            ☺
          </ActionIcon>
          <TextInput placeholder="Message" radius="xl" style={{ flex: 1 }} />
          <ActionIcon variant="subtle" radius="xl" aria-label="Attach">
            📎
          </ActionIcon>
          <ActionIcon variant="subtle" radius="xl" aria-label="Voice">
            🎤
          </ActionIcon>
        </Group>
      </Box>
    </Box>
  )
}