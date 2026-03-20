export type MessageGroupPosition = 'first' | 'middle' | 'last' | 'single'

type WithSender = { id: string; from: string }

/** Cùng `from` liên tiếp = một cụm: first = đuôi góc trên, last/single = đuôi góc dưới, middle = không đuôi */
export function computeGroupPositions<T extends WithSender>(
  messages: T[],
): Map<string, MessageGroupPosition> {
  const map = new Map<string, MessageGroupPosition>()
  let i = 0
  while (i < messages.length) {
    const from = messages[i].from
    let j = i + 1
    while (j < messages.length && messages[j].from === from) j++
    const len = j - i
    if (len === 1) {
      map.set(messages[i].id, 'single')
    } else {
      for (let k = 0; k < len; k++) {
        const id = messages[i + k].id
        if (k === 0) map.set(id, 'first')
        else if (k === len - 1) map.set(id, 'last')
        else map.set(id, 'middle')
      }
    }
    i = j
  }
  return map
}
