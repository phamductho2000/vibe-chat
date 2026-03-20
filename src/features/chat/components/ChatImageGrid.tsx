import { Box, Image, Text } from '@mantine/core'
import clsx from 'clsx'
import type { CSSProperties } from 'react'
import classes from './ChatImageGrid.module.css'

export type ChatImageItem = {
  src: string
  alt?: string
}

export type ChatImageGridProps = {
  images: ChatImageItem[]
  /** Giới hạn chiều ngang cả khối grid (px) */
  maxWidth?: number
  /** Ảnh đơn: max-width riêng (px) */
  singleMaxWidth?: number
  className?: string
}

function Cell({
  item,
  overlay,
  className,
}: {
  item: ChatImageItem
  overlay?: string
  className?: string
}) {
  return (
    <Box className={clsx(classes.cell, className)}>
      <Image
        src={item.src}
        alt={item.alt ?? 'Ảnh chat'}
        fit="cover"
        radius={0}
        style={{
          width: '100%',
          height: '100%',
          minHeight: 0,
          display: 'block',
          objectFit: 'cover',
        }}
      />
      {overlay ? (
        <Box className={classes.overlay}>
          <Text c="white" fw={800} fz={28} lh={1}>
            {overlay}
          </Text>
        </Box>
      ) : null}
    </Box>
  )
}

export function ChatImageGrid({
  images,
  maxWidth = 320,
  singleMaxWidth = 280,
  className,
}: ChatImageGridProps) {
  const n = images.length
  if (n === 0) return null

  const vars = {
    '--chat-image-grid-max': `${maxWidth}px`,
    '--chat-image-single-max': `${singleMaxWidth}px`,
  } as CSSProperties

  if (n === 1) {
    const item = images[0]
    return (
      <Box className={clsx(classes.single, className)} style={vars}>
        <Image
          src={item.src}
          alt={item.alt ?? 'Ảnh chat'}
          fit="cover"
          radius="md"
          mah={320}
          maw="100%"
          w="100%"
        />
      </Box>
    )
  }

  const display = images.slice(0, 4)
  const extra = n > 4 ? n - 4 : 0

  if (n === 2) {
    return (
      <Box className={clsx(classes.root, classes.grid2, className)} style={vars}>
        <Cell item={display[0]} />
        <Cell item={display[1]} />
      </Box>
    )
  }

  if (n === 3) {
    return (
      <Box className={clsx(classes.root, classes.grid3, className)} style={vars}>
        <Cell item={display[0]} className={classes.cell3Main} />
        <Cell item={display[1]} className={classes.cell3Top} />
        <Cell item={display[2]} className={classes.cell3Bottom} />
      </Box>
    )
  }

  /* 4+ ảnh: lưới 2x2, ô thứ 4 có +N nếu còn ẩn */
  return (
    <Box className={clsx(classes.root, classes.grid4, className)} style={vars}>
      <Cell item={display[0]} />
      <Cell item={display[1]} />
      <Cell item={display[2]} />
      <Cell
        item={display[3]}
        overlay={extra > 0 ? `+${extra}` : undefined}
      />
    </Box>
  )
}
