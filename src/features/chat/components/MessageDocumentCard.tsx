import { Group, Image, Stack, Text } from '@mantine/core'
import docIcon from '../../../assets/doc.png'
import documentIcon from '../../../assets/document.png'
import pdfIcon from '../../../assets/pdf.png'
import xlsIcon from '../../../assets/xls.png'
import type { ChatMessage } from '../data/mockConversation'
import classes from './MessageDocumentCard.module.css'

type MessageDocumentCardProps = {
  document: NonNullable<ChatMessage['document']>
}

function getDocumentIcon(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase() ?? ''
  if (ext === 'pdf') return pdfIcon
  if (ext === 'doc' || ext === 'docx') return docIcon
  if (ext === 'xls' || ext === 'xlsx' || ext === 'csv') return xlsIcon
  return documentIcon
}

function formatBytes(size?: number): string {
  if (!size || size <= 0) return ''
  const kb = size / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

export function MessageDocumentCard({ document }: MessageDocumentCardProps) {
  return (
    <Group className={classes.documentCard} gap={10} wrap="nowrap">
      <Image
        src={getDocumentIcon(document.fileName)}
        alt={document.fileName}
        w={50}
        h={50}
        radius="sm"
      />
      <Stack gap={0} style={{ minWidth: 0 }}>
        <Text size="sm" fw={600} className={classes.documentName} title={document.fileName}>
          {document.fileName}
        </Text>
        {document.size ? (
          <Text size="xs" fw={400} c="green">
            {formatBytes(document.size)}
          </Text>
        ) : null}
      </Stack>
    </Group>
  )
}
