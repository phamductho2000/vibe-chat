import {
    ActionIcon,
    Avatar,
    Badge,
    Box,
    Group,
    ScrollArea,
    Stack,
    Text,
    TextInput,
    Title,
    UnstyledButton,
    useMantineColorScheme,
} from '@mantine/core'
import { IconDots, IconEdit } from '@tabler/icons-react'
import { useMemo, useState } from 'react'

type ThreadItem = {
    id: string
    name: string
    preview: string
    time: string
    unread?: number
    active?: boolean
    image: string
}

const mockThreads: ThreadItem[] = [
    {
        id: 't1',
        name: 'Trung tâm rắc rối 👊',
        preview: 'Đã bày tỏ cảm xúc 😆 về tin nhắ...',
        time: '5 giờ',
        active: true,
        image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    },
    {
        id: 't2',
        name: 'Phương Hoa CS2 Đặng Tiến D...',
        preview: 'Dạ vâng ạ',
        time: '1 ngày',
        unread: 1,
        image:
            'https://images.unsplash.com/photo-1542202229-75bc5e9d2f4e?auto=format&fit=crop&w=120&q=80',
    },
    {
        id: 't3',
        name: 'Bloomin - Hoa tươi cắt cành',
        preview: 'da 125k/10c',
        time: '1 ngày',
        image:
            'https://images.unsplash.com/photo-1524594154908-edd2c7f60b28?auto=format&fit=crop&w=120&q=80',
    },
    {
        id: 't4',
        name: 'Máy Hoa cornerr',
        preview: 'Dạ em còn màu cam và đỏ ạ',
        time: '2 ngày',
        image:
            'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=120&q=80',
    },
    {
        id: 't5',
        name: 'Giang Nguyen Headhunter',
        preview: 'Chào anh, em đang có job mới ...',
        time: '3 ngày',
        image:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=120&q=80',
    },
]

const filterTabs = [
    { key: 'all', label: 'Tất cả' },
    { key: 'unread', label: 'Chưa đọc' },
    { key: 'group', label: 'Nhóm' },
    { key: 'more', label: '...' },
] as const

export function ChatList() {
    const { colorScheme } = useMantineColorScheme()
    const [query, setQuery] = useState('')
    const [activeTab, setActiveTab] = useState<(typeof filterTabs)[number]['key']>('all')

    const data = useMemo(() => {
        const q = query.trim().toLowerCase()
        return mockThreads.filter((t) => {
            const matchQ =
                !q ||
                t.name.toLowerCase().includes(q) ||
                t.preview.toLowerCase().includes(q)
            const matchTab = activeTab !== 'unread' || (t.unread ?? 0) > 0
            return matchQ && matchTab
        })
    }, [query, activeTab])

    return (
        <Stack h="100%" gap="xs" p="sm" style={{ minHeight: 0 }}>
            <Group justify="space-between" wrap="nowrap">
                <Title order={3}>Đoạn chat</Title>
                <Group gap={8} wrap="nowrap">
                    <ActionIcon variant="light" radius="xl" aria-label="More">
                        <IconDots size={24} />
                    </ActionIcon>
                    <ActionIcon variant="light" radius="xl" aria-label="Compose">
                        <IconEdit size={24} />
                    </ActionIcon>
                </Group>
            </Group>

            <TextInput
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
                placeholder="Tìm kiếm trên Messenger"
                radius="lg"
            />

            <Group gap={8} wrap="nowrap">
                {filterTabs.map((tab) => {
                    const active = activeTab === tab.key
                    return (
                        <Badge
                            key={tab.key}
                            size="lg"
                            radius="xl"
                            variant={active ? 'filled' : 'light'}
                            onClick={() => setActiveTab(tab.key)}
                            style={{ cursor: 'pointer' }}
                        >
                            {tab.label}
                        </Badge>
                    )
                })}
            </Group>

            <ScrollArea type="auto" style={{ flex: 1 }}>
                <Stack gap={6} pr={6}>
                    {data.map((thread) => {
                        const selected = !!thread.active
                        return (
                            <UnstyledButton
                                key={thread.id}
                                style={{
                                    width: '100%',
                                    borderRadius: 12,
                                    padding: 8,
                                    background: selected
                                        ? colorScheme === 'dark'
                                            ? 'rgba(66, 153, 225, 0.2)'
                                            : 'rgba(66, 153, 225, 0.15)'
                                        : 'transparent',
                                }}
                            >
                                <Group align="center" wrap="nowrap">
                                    <Avatar src={thread.image} radius="xl" size={52} />
                                    <Box style={{ flex: 1, minWidth: 0 }}>
                                        <Text fw={700} size="lg" truncate>
                                            {thread.name}
                                        </Text>
                                        <Text size="sm" c="dimmed" truncate>
                                            {thread.preview} <Text span c="dimmed">· {thread.time}</Text>
                                        </Text>
                                    </Box>
                                    {(thread.unread ?? 0) > 0 ? (
                                        <Box
                                            style={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: 999,
                                                background: '#4dabf7',
                                                flexShrink: 0,
                                            }}
                                        />
                                    ) : null}
                                </Group>
                            </UnstyledButton>
                        )
                    })}
                </Stack>
            </ScrollArea>
        </Stack>
    )
}