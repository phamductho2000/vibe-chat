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

