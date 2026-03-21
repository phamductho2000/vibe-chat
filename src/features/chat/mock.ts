export type ChatId = string

export type ChatListItem = {
  id: ChatId
  title: string
  subtitle?: string
  lastMessage: string
  lastAt: string
  unread?: number
  avatarColor: string
}

export type Message = {
  id: string
  chatId: ChatId
  from: 'me' | 'them'
  text: string
  at: string
}

import type { MessageHistory } from './types/chat'

export const initialChats: ChatListItem[] = [
  {
    id: 'c1',
    title: 'Wintel',
    subtitle: 'last seen recently',
    lastMessage: 'Ok',
    lastAt: '19:53',
    unread: 2,
    avatarColor: '#22c55e',
  },
  {
    id: 'c2',
    title: 'Trà đá',
    subtitle: 'Hữu: E @thơihậu xuống thôi…',
    lastMessage: 'để mình xem nhé',
    lastAt: '15:01',
    unread: 0,
    avatarColor: '#f97316',
  },
  {
    id: 'c3',
    title: 'Tích Tắc 🎬',
    subtitle: 'Kể mạnh không than vãn…',
    lastMessage: 'Review: Loài…',
    lastAt: '14:43',
    unread: 0,
    avatarColor: '#ef4444',
  },
  {
    id: 'c4',
    title: 'onlybe',
    subtitle: 'A NHẬT: ok',
    lastMessage: 'ok',
    lastAt: '14:01',
    unread: 7,
    avatarColor: '#10b981',
  },
]

export const initialMessages: Message[] = [
  {
    id: 'm1',
    chatId: 'c1',
    from: 'them',
    text: 'Có thể check giúp mình file report không?',
    at: '19:52',
  },
  { id: 'm2', chatId: 'c1', from: 'me', text: 'Ok', at: '19:53' },
  {
    id: 'm3',
    chatId: 'c1',
    from: 'them',
    text: 'Gửi mình ảnh hiện trạng nha',
    at: '19:54',
  },
  {
    id: 'm4',
    chatId: 'c1',
    from: 'them',
    text: 'Mình cần UI giống Telegram Web như hình bạn chụp.',
    at: '19:55',
  },
  {
    id: 'm5',
    chatId: 'c1',
    from: 'me',
    text: 'Được, mình dựng layout Mantine trước, rồi bạn cắm API sau.',
    at: '19:56',
  },
]

const MOCK_TEXTS = [
  'Xin chao, ban oi',
  'Minh da gui file cho ban',
  'Ban check giup minh nhe',
  'Da xong, cam on ban',
  'Chut nua minh goi lai',
  'Da nhan duoc thong tin',
]

const MOCK_REACTIONS: Array<Record<string, number> | undefined> = [
  { like: 1 },
  { heart: 2 },
  { wow: 1, like: 2 },
  undefined,
]

const MESSAGE_STATUS: MessageHistory['status'] = {
  SENDING: 'SENDING',
  SENT: 'SENT',
  READ: 'READ',
  FAILED: 'FAILED',
  DELETED: 'DELETED',
}

const MESSAGE_ACTION_TYPE: MessageHistory['content'] extends { action?: infer T }
  ? T extends { type: infer U }
    ? U
    : never
  : never = {
  PIN_MESSAGE: 'PIN_MESSAGE',
}

const MESSAGE_TYPE: MessageHistory['type'] = {
  TEXT: 'TEXT',
  PHOTO: 'PHOTO',
  VIDEO: 'VIDEO',
  DOCUMENT: 'DOCUMENT',
  ACTION: 'ACTION',
}

export const messageHistoryMock: MessageHistory[] = Array.from({ length: 300 }, (_, i) => {
  const idx = i + 1
  const contentMode = idx % 10
  const sentDate = new Date(Date.UTC(2026, 2, 1, 8, Math.floor(i / 2), i % 60)).toISOString()
  const senderId = idx % 2 === 0 ? 'u_me' : 'u_them'
  let content: MessageHistory['content']

  if (contentMode === 0) {
    content = {
      action: {
        type: MESSAGE_ACTION_TYPE,
      },
    }
  } else if (contentMode % 3 === 0) {
    content = {
      photo: [
        {
          id: `photo-${idx}-1`,
          date: sentDate,
          size: 512000 + idx * 101,
          mimeType: 'image/jpeg',
          fileName: `photo_${idx}_1.jpg`,
        },
        ...(idx % 2 === 0
          ? [
              {
                id: `photo-${idx}-2`,
                date: sentDate,
                size: 412000 + idx * 89,
                mimeType: 'image/jpeg',
                fileName: `photo_${idx}_2.jpg`,
              },
            ]
          : []),
      ],
    } as unknown as MessageHistory['content']
  } else if (contentMode % 4 === 0) {
    content = {
      video: [
        {
          id: `video-${idx}`,
          duration: 15 + (idx % 120),
          fileName: `video_${idx}.mp4`,
          mediaType: 'video',
          mimeType: 'video/mp4',
          size: 1024000 + idx * 321,
          width: 1280,
          height: 720,
          date: sentDate,
        },
      ],
    } as unknown as MessageHistory['content']
  } else if (contentMode % 5 === 0) {
    content = {
      document: [
        {
          id: `doc-${idx}`,
          fileName: `report_report_report_reportreport_${idx}.pdf`,
          mimeType: 'application/pdf',
          size: 102400 + idx * 37,
          date: sentDate,
        },
      ],
    } as unknown as MessageHistory['content']
  } else {
    content = {
      text: {
        text: `${MOCK_TEXTS[i % MOCK_TEXTS.length]} #${idx}`,
      },
    }
  }

  return {
    id: `msg-${idx}`,
    msgId: 100000 + idx,
    clientMsgId: `client-${idx}`,
    conversationId: `conv-${(idx % 3) + 1}`,
    senderId,
    content,
    type: MESSAGE_TYPE,
    status: MESSAGE_STATUS,
    summaryReaction: MOCK_REACTIONS[idx % MOCK_REACTIONS.length],
    mentions:
      idx % 13 === 0
        ? [
            {
              userId: 'u_me',
              displayName: 'You',
            },
          ]
        : undefined,
    reply:
      idx > 3 && idx % 11 === 0
        ? {
            messageId: `msg-${idx - 3}`,
            senderId: idx % 2 === 0 ? 'u_them' : 'u_me',
            excerpt: `Reply to message #${idx - 3}`,
          }
        : undefined,
    isEdited: idx % 17 === 0,
    isPinned: idx % 29 === 0,
    groupId: idx % 4 === 0 ? `grp-${(idx % 8) + 1}` : undefined,
    sentAt: sentDate,
  }
})

