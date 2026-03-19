import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Divider,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Textarea,
  TextInput,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { useEffect, useMemo, useRef, useState } from 'react'
import { initialChats, initialMessages, type ChatId, type Message } from './mock'

function formatNowHHmm() {
  const d = new Date()
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

function MessageBubble({ msg }: { msg: Message }) {
  const theme = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const mine = msg.from === 'me'

  return (
    <Group justify={mine ? 'flex-end' : 'flex-start'} align="flex-end" gap="xs">
      <Paper
        radius="lg"
        px="md"
        py="sm"
        shadow="xs"
        style={{
          maxWidth: 520,
          background: mine
            ? theme.colors.teal[colorScheme === 'dark' ? 9 : 1]
            : theme.colors.gray[colorScheme === 'dark' ? 8 : 1],
          border: `1px solid ${
            colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
          }`,
        }}
      >
        <Text
          size="sm"
          style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}
        >
          {msg.text}
        </Text>
        <Group justify="flex-end" mt={6} gap={6}>
          <Text size="xs" c="dimmed">
            {msg.at}
          </Text>
          {mine ? (
            <Text
              size="xs"
              c="dimmed"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              ✓✓
            </Text>
          ) : null}
        </Group>
      </Paper>
    </Group>
  )
}

function ChatRow({
  active,
  title,
  subtitle,
  lastAt,
  lastMessage,
  unread,
  avatarColor,
  onClick,
}: {
  active: boolean
  title: string
  subtitle?: string
  lastAt: string
  lastMessage: string
  unread?: number
  avatarColor: string
  onClick: () => void
}) {
  const theme = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const bg = active
    ? theme.colors.blue[colorScheme === 'dark' ? 9 : 1]
    : 'transparent'

  return (
    <UnstyledButton
      onClick={onClick}
      style={{
        width: '100%',
        borderRadius: theme.radius.md,
        padding: '10px 10px',
        background: bg,
      }}
    >
      <Group wrap="nowrap" gap="sm" align="center">
        <Avatar
          radius="xl"
          size={42}
          color="white"
          style={{ background: avatarColor, color: 'white' }}
        >
          {title.slice(0, 1).toUpperCase()}
        </Avatar>
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Group justify="space-between" wrap="nowrap" gap="xs">
            <Text fw={600} size="sm" truncate>
              {title}
            </Text>
            <Text size="xs" c="dimmed" style={{ flexShrink: 0 }}>
              {lastAt}
            </Text>
          </Group>
          <Group justify="space-between" wrap="nowrap" gap="xs" mt={2}>
            <Text size="sm" c="dimmed" truncate>
              {subtitle ?? lastMessage}
            </Text>
            {unread && unread > 0 ? (
              <Badge size="sm" variant="filled" radius="xl">
                {unread > 99 ? '99+' : unread}
              </Badge>
            ) : null}
          </Group>
        </Box>
      </Group>
    </UnstyledButton>
  )
}

export function TelegramChat() {
  const theme = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const [chats, setChats] = useState(initialChats)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [selectedChatId, setSelectedChatId] = useState<ChatId>(initialChats[0]?.id)
  const [query, setQuery] = useState('')
  const [draft, setDraft] = useState('')
  const viewportRef = useRef<HTMLDivElement>(null)

  const selectedChat = chats.find((c) => c.id === selectedChatId)

  const filteredChats = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return chats
    return chats.filter((c) => c.title.toLowerCase().includes(q))
  }, [chats, query])

  const selectedMessages = useMemo(() => {
    return messages.filter((m) => m.chatId === selectedChatId)
  }, [messages, selectedChatId])

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [selectedChatId, selectedMessages.length])

  function send() {
    const text = draft.trim()
    if (!text || !selectedChatId) return
    setDraft('')

    const now = formatNowHHmm()
    const newMsg: Message = {
      id: String(Date.now()),
      chatId: selectedChatId,
      from: 'me',
      text,
      at: now,
    }

    setMessages((prev) => [...prev, newMsg])
    setChats((prev) => {
      const idx = prev.findIndex((c) => c.id === selectedChatId)
      if (idx < 0) return prev
      const updated = {
        ...prev[idx],
        lastMessage: text,
        lastAt: now,
        unread: 0,
      }
      const next = [...prev]
      next.splice(idx, 1)
      return [updated, ...next]
    })
  }

  const chatBg =
    colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]

  const wallpaper =
    colorScheme === 'dark'
      ? 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)'
      : 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)'

  return (
    <Box
      h="100%"
      style={{
        display: 'flex',
        minHeight: 0,
      }}
    >
      <Box
        style={{
          width: 360,
          flexShrink: 0,
          borderRight: `1px solid ${
            colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
          }`,
          display: 'flex',
          flexDirection: 'column',
          padding: 12,
          minHeight: 0,
        }}
      >
        <Stack gap="sm" h="100%" style={{ minHeight: 0 }}>
          <Group justify="space-between" wrap="nowrap">
            <Text fw={700}>Chats</Text>
            <ActionIcon variant="subtle" radius="xl" aria-label="New chat">
              +
            </ActionIcon>
          </Group>
          <TextInput
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            placeholder="Search"
            radius="xl"
          />
          <Divider />
          <ScrollArea type="hover" style={{ flex: 1 }}>
            <Stack gap={4}>
              {filteredChats.map((c) => (
                <ChatRow
                  key={c.id}
                  active={c.id === selectedChatId}
                  title={c.title}
                  subtitle={c.subtitle}
                  lastMessage={c.lastMessage}
                  lastAt={c.lastAt}
                  unread={c.unread}
                  avatarColor={c.avatarColor}
                  onClick={() => setSelectedChatId(c.id)}
                />
              ))}
              {filteredChats.length === 0 ? (
                <Text size="sm" c="dimmed" ta="center" mt="md">
                  No chats found
                </Text>
              ) : null}
            </Stack>
          </ScrollArea>
        </Stack>
      </Box>

      <Box
        h="100%"
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          background: chatBg,
          backgroundImage: wallpaper,
          backgroundSize: '14px 14px',
        }}
      >
        <Box
          px="md"
          py="sm"
          style={{
            borderBottom: `1px solid ${
              colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
            backdropFilter: 'blur(8px)',
            background:
              colorScheme === 'dark'
                ? 'rgba(20,20,24,0.85)'
                : 'rgba(255,255,255,0.85)',
          }}
        >
          <Group justify="space-between" wrap="nowrap">
            <Group wrap="nowrap" gap="sm" style={{ minWidth: 0 }}>
              <Avatar
                radius="xl"
                size={38}
                style={{
                  background: selectedChat?.avatarColor ?? theme.colors.gray[5],
                  color: 'white',
                }}
              >
                {(selectedChat?.title ?? '?').slice(0, 1).toUpperCase()}
              </Avatar>
              <Box style={{ minWidth: 0 }}>
                <Text fw={700} size="sm" truncate>
                  {selectedChat?.title ?? 'Select a chat'}
                </Text>
                <Text size="xs" c="dimmed" truncate>
                  {selectedChat?.subtitle ?? ' '}
                </Text>
              </Box>
            </Group>
            <Group gap={6} wrap="nowrap">
              <ActionIcon variant="subtle" radius="xl" aria-label="Search">
                ⌕
              </ActionIcon>
              <ActionIcon variant="subtle" radius="xl" aria-label="More">
                ⋮
              </ActionIcon>
            </Group>
          </Group>
        </Box>

        <ScrollArea
          viewportRef={viewportRef}
          type="auto"
          offsetScrollbars
          style={{ flex: 1 }}
        >
          <Box px="md" py="lg">
            <Stack gap="sm">
              {selectedMessages.map((m) => (
                <MessageBubble key={m.id} msg={m} />
              ))}
              {selectedMessages.length === 0 ? (
                <Text size="sm" c="dimmed" ta="center" mt="lg">
                  No messages yet
                </Text>
              ) : null}
            </Stack>
          </Box>
        </ScrollArea>

        <Box
          px="md"
          py="sm"
          style={{
            borderTop: `1px solid ${
              colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
            background: colorScheme === 'dark' ? theme.colors.dark[7] : 'white',
          }}
        >
          <Group align="flex-end" gap="sm" wrap="nowrap">
            <ActionIcon variant="subtle" radius="xl" aria-label="Attach">
              +
            </ActionIcon>
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.currentTarget.value)}
              placeholder="Message"
              autosize
              minRows={1}
              maxRows={6}
              radius="lg"
              style={{ flex: 1 }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
            />
            <ActionIcon
              variant="filled"
              radius="xl"
              aria-label="Send"
              onClick={send}
              disabled={!draft.trim()}
            >
              ➤
            </ActionIcon>
          </Group>
        </Box>
      </Box>
    </Box>
  )
}

