import type { ChatImageItem } from '../components/ChatImageGrid'

export type ChatMessage = {
  id: string
  from: 'me' | 'them'
  text: string
  at: string
  images?: ChatImageItem[]
  document?: {
    fileName: string
    size?: number
  }
}

/** Ảnh cố định từ Picsum (seed → URL ổn định) */
const pic = (seed: string, label: string): ChatImageItem => ({
  src: `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/600`,
  alt: label,
})

export const mockConversation: ChatMessage[] = [
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

  /* Demo ChatImageGrid: 1 / 2 / 3 / 4 / 7 ảnh (+3) */
  {
    id: 'img-1',
    from: 'them',
    text: 'Gửi bạn 1 ảnh',
    at: '11:43',
    images: [pic('chat-a', 'Một ảnh')],
  },
  {
    id: 'img-2',
    from: 'me',
    text: 'Hai tấm side by side',
    at: '11:44',
    images: [pic('chat-b', 'Trái'), pic('chat-c', 'Phải')],
  },
  {
    id: 'img-3',
    from: 'them',
    text: 'Layout 1 + 2',
    at: '11:45',
    images: [pic('chat-d', 'Lớn'), pic('chat-e', 'Nhỏ 1'), pic('chat-f', 'Nhỏ 2')],
  },
  {
    id: 'img-4',
    from: 'me',
    text: 'Lưới 2×2',
    at: '11:46',
    images: [
      pic('chat-g', 'A'),
      pic('chat-h', 'B'),
      pic('chat-i', 'C'),
      pic('chat-j', 'D'),
    ],
  },
  {
    id: 'img-7',
    from: 'them',
    text: 'Còn 3 ảnh nữa bên dưới…',
    at: '11:47',
    images: [
      pic('chat-k', '1'),
      pic('chat-l', '2'),
      pic('chat-m', '3'),
      pic('chat-n', '4'),
      pic('chat-o', '5'),
      pic('chat-p', '6'),
      pic('chat-q', '7'),
    ],
  },
  { id: '9', from: 'me', text: 'Ok đẹp 👍', at: '11:48' },
]
