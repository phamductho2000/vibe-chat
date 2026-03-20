import { Avatar, Box, Group, Stack, Text, useMantineColorScheme } from '@mantine/core'
import { IconChecks } from '@tabler/icons-react'
import type { HTMLAttributes } from 'react'
import type { MessageGroupPosition } from '../utils/computeGroupPosition'
import { ChatImageGrid, type ChatImageItem } from './ChatImageGrid'
import classes from './MessageBubble.module.css'

export type MessageBubbleProps = {
  text: string
  time: string
  from: 'me' | 'them'
  read?: boolean
  /** Trong cụm cùng người gửi: first = đuôi góc trên, last/single = đuôi góc dưới, middle = không đuôi */
  groupPosition: MessageGroupPosition
  /** Chuột phải / context menu (vd. mantine-contextmenu) */
  onContextMenu?: HTMLAttributes<HTMLDivElement>['onContextMenu']
  images?: ChatImageItem[]
}

const timeOutgoingLight = '#667781'
const timeOutgoingDark = '#99beb7'
const checkGreen = '#34b76d'

function outgoingTailClass(pos: MessageGroupPosition) {
  if (pos === 'middle') return classes.outMiddle
  if (pos === 'first') return classes.outFirst
  return classes.outLast
}

function incomingTailClass(pos: MessageGroupPosition) {
  if (pos === 'middle') return classes.inMiddle
  if (pos === 'first') return classes.inFirst
  return classes.inLast
}

export function MessageBubble({
  text,
  time,
  from,
  read = true,
  groupPosition,
  onContextMenu,
  images,
}: MessageBubbleProps) {
  const { colorScheme } = useMantineColorScheme()
  const mine = from === 'me'

  const timeColor = mine
    ? colorScheme === 'dark'
      ? timeOutgoingDark
      : timeOutgoingLight
    : 'var(--mantine-color-dimmed)'

  const bubbleClass = [
    mine ? classes.bubbleOutgoing : classes.bubbleIncoming,
    mine ? outgoingTailClass(groupPosition) : incomingTailClass(groupPosition),
  ].join(' ')

  const bubble = (
    <Box className={bubbleClass}>
      <Stack gap={6}>
        {images && images.length > 0 ? <ChatImageGrid images={images} /> : null}
        <Group gap={8} align="flex-end" wrap="nowrap" justify="space-between">
          {text ? (
            <Text
              size="sm"
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                flex: 1,
                minWidth: 0,
                lineHeight: 1.35,
              }}
            >
              {text}
            </Text>
          ) : (
            <Box style={{ flex: 1, minWidth: 0 }} />
          )}
          <Group gap={4} wrap="nowrap" align="center" style={{ flexShrink: 0, marginBottom: 1 }}>
            <Text size="xs" style={{ color: timeColor }}>
              {time}
            </Text>
            {mine && read ? (
              <Text size="xs" style={{ color: checkGreen }} component="span">
                <IconChecks size={16} />
              </Text>
            ) : null}
          </Group>
        </Group>
      </Stack>
    </Box>
  )

  const avatarMine = (
    <Avatar radius="xl" size={40} className={classes.avatarOutgoing}>
      👀
    </Avatar>
  )

  const avatarThem = (
    <Avatar radius="xl" size={40} className={classes.avatarIncoming}>
      ?
    </Avatar>
  )

  if (mine) {
    return (
      <Group
        justify="flex-end"
        align="flex-end"
        gap={10}
        wrap="nowrap"
        onContextMenu={onContextMenu}
      >
        {bubble}
        {avatarMine}
      </Group>
    )
  }

  return (
    <Group
      justify="flex-start"
      align="flex-end"
      gap={10}
      wrap="nowrap"
      onContextMenu={onContextMenu}
    >
      {avatarThem}
      {bubble}
    </Group>
  )
}
