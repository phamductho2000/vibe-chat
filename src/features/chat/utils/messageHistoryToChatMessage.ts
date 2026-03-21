import type { ChatImageItem } from '../components/ChatImageGrid'
import type { ChatMessage } from '../data/mockConversation'
import type { Document, MessageHistory, Photo } from '../types/chat'

function photoToChatImage(p: Photo): ChatImageItem {
  return {
    src: `https://picsum.photos/seed/${encodeURIComponent(p.id)}/800/600`,
    alt: p.fileName,
  }
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

/** Map domain `MessageHistory` → props shape dùng cho `MessageBubble` / `computeGroupPositions`. */
export function messageHistoryToChatMessage(m: MessageHistory): ChatMessage {
  const from = m.senderId === 'u_me' ? 'me' : 'them'
  const at = formatTime(m.sentAt)
  const c = m.content

  const photos = c.photo
  if (photos && photos.length > 0) {
    return {
      id: m.id,
      from,
      text: '',
      at,
      images: photos.map(photoToChatImage),
    }
  }

  const videos = c.video
  if (videos && videos.length > 0) {
    const v = videos[0]
    return {
      id: m.id,
      from,
      text: `🎬 ${v.fileName} (${formatDuration(v.duration)})`,
      at,
    }
  }

  const docs = c.document
  if (docs && docs.length > 0) {
    const d = docs[0]
    return {
      id: m.id,
      from,
      text: '',
      at,
      document: documentToChatDocument(d),
    }
  }

  if (c.action) {
    return {
      id: m.id,
      from,
      text: '📌 Đã ghim tin nhắn',
      at,
    }
  }

  return {
    id: m.id,
    from,
    text: c.text?.text ?? '',
    at,
  }
}

function documentToChatDocument(d: Document): NonNullable<ChatMessage['document']> {
  return {
    fileName: d.fileName,
    size: d.size,
  }
}

export function messageHistoryListToChatMessages(
  list: MessageHistory[],
  conversationId?: string,
): ChatMessage[] {
  const filtered = conversationId
    ? list.filter((m) => m.conversationId === conversationId)
    : list
  return [...filtered]
    .sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime())
    .map(messageHistoryToChatMessage)
}
