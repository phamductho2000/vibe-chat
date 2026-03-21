import { ActionIcon, Popover } from '@mantine/core';
import { IconMoodSmile } from '@tabler/icons-react';
import Picker from 'emoji-picker-react';

export default function EmojiInput() {
  return (
    <Popover position="top-start" shadow="md" trapFocus>
      <Popover.Target>
        <ActionIcon variant="subtle" radius="xl" aria-label="Emoji" >
          <IconMoodSmile size={26} />
        </ActionIcon>
      </Popover.Target>

      <Popover.Dropdown p={0}>
        <Picker
          lazyLoadEmojis={true}
          onEmojiClick={(emojiData) => console.log(emojiData.emoji)}
          autoFocusSearch={false}
        />
      </Popover.Dropdown>
    </Popover>
  );
}