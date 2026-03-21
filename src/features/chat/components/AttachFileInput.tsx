import { ActionIcon, Menu } from "@mantine/core";
import { IconFile, IconMapPin, IconPaperclip, IconPhoto } from "@tabler/icons-react";

export function AttachFileInput() {
    return (
        <Menu shadow="md" width={200} position="top-start">
            <Menu.Target>
                <ActionIcon variant="subtle" radius="xl" aria-label="Attach">
                    <IconPaperclip size={26} />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item leftSection={<IconPhoto size={20} />}>
                    Photo or Video
                </Menu.Item>
                <Menu.Item leftSection={<IconFile size={20} />}>
                    File
                </Menu.Item>
                <Menu.Item leftSection={<IconMapPin size={20} />}>
                    Location
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}