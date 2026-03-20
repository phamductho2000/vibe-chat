import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Container,
  Group,
  Text,
  TextInput,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { IconCircleCheck, IconCopy, IconDotsVertical, IconMessageCircleShare, IconMessageReply, IconMicrophone, IconPencil, IconPhone, IconPinned, IconSearch, IconTrash, IconX } from '@tabler/icons-react'
import { useContextMenu, type ContextMenuItemOptions } from 'mantine-contextmenu'
import { useEffect, useMemo, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { AttachFileInput } from '../../../components/AttachFileInput'
import EmojiInput from '../../../components/EmojiInput'
import { mockConversation, type ChatMessage } from '../data/mockConversation'
import { computeGroupPositions } from '../utils/computeGroupPosition'
import { MessageBubble } from './MessageBubble'

const contextMenuItems: ContextMenuItemOptions[] = [
  {
    key: 'reply',
    icon: <IconMessageReply size={20} />,
    onClick: () => console.log('copy'),
  },
  {
    key: 'copy',
    icon: <IconCopy size={20} />,
    onClick: () => console.log('copy'),
  },
  {
    key: 'edit',
    icon: <IconPencil size={20} />,
    onClick: () => console.log('download'),
  },
  {
    key: 'pin',
    icon: <IconPinned size={20} />,
    onClick: () => console.log('download'),
  },
  {
    key: 'forward',
    icon: <IconMessageCircleShare size={20} />,
    onClick: () => console.log('download'),
  },
  {
    key: 'select',
    icon: <IconCircleCheck size={20} />,
    onClick: () => console.log('download'),
  },
  {
    key: 'delete',
    icon: <IconTrash size={20} />,
    onClick: () => console.log('download'),
  },
];

export function ChatContent() {
  const { showContextMenu, isContextMenuVisible } = useContextMenu()
  const theme = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const [contextMenuMessageId, setContextMenuMessageId] = useState<string | null>(null)

  useEffect(() => {
    if (!isContextMenuVisible) setContextMenuMessageId(null)
  }, [isContextMenuVisible])

  const groupPositions = useMemo(() => computeGroupPositions(mockConversation), [])

  const contextMenuHandler = useMemo(
    () => showContextMenu(contextMenuItems),
    [showContextMenu],
  )

  const lineColor = colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
  const listItems: Array<{ type: 'day' | 'message' | 'footer'; label?: string; item?: ChatMessage }> = [
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
            <ActionIcon variant="subtle" aria-label="Close" radius="xl">
              <IconX size={24} />
            </ActionIcon>
            <ActionIcon variant="subtle" aria-label="Search" radius="xl">
              <IconSearch size={24} />
            </ActionIcon>
            <ActionIcon variant="subtle" aria-label="Call" radius="xl">
              <IconPhone size={24} />
            </ActionIcon>
            <ActionIcon variant="subtle" aria-label="More" radius="xl">
              <IconDotsVertical size={24} />
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

            const messageId = row.item!.id
            const isRowHighlighted = contextMenuMessageId === messageId

            return (
              <Container fluid
                style={{
                  margin: '16px 0',
                  borderRadius: theme.radius.md,
                  transition: 'background-color 120ms ease',
                  backgroundColor: isRowHighlighted
                    ? colorScheme === 'dark'
                      ? 'rgba(99, 102, 241, 0.22)'
                      : 'rgba(99, 102, 241, 0.14)'
                    : undefined,
                }}
              >
                <Container>
                  <MessageBubble
                    onContextMenu={(e) => {
                      setContextMenuMessageId(messageId)
                      contextMenuHandler(e as never)
                    }}
                    text={row.item!.text}
                    time={row.item!.at}
                    from={row.item!.from}
                    read={row.item!.from === 'me'}
                    groupPosition={groupPositions.get(messageId) ?? 'single'}
                    images={row.item!.images}
                  />
                </Container>
              </Container>
            )
          }}
        />
      </Box>

      <Box
        px="md"
        // py="xs"
        style={{
          borderTop: `1px solid ${lineColor}`,
          background: 'transparent',
        }}
      >
        <Group wrap="nowrap">
          <EmojiInput />
          <TextInput size='lg' variant="unstyled" placeholder="Message" style={{ flex: 1 }} />
          <AttachFileInput />
          <ActionIcon variant="subtle" radius="xl" aria-label="Voice">
            <IconMicrophone size={26} />
          </ActionIcon>
        </Group>
      </Box>
    </Box>
  )
}