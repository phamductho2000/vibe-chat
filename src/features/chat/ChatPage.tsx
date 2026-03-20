import { Split } from '@gfazioli/mantine-split-pane';
import { Paper } from '@mantine/core';
import { ChatContent } from './components/ChatContent';
import { ChatList } from './components/ChatList';

export function ChatPage() {
  const paperProps = { withBorder: true, w: '100%', h: '100%', radius: 'none' };

  return (
    <Split h="100vh" size="xs" variant="transparent">
      <Split.Pane initialWidth={"20%"} minWidth={"5%"}>
        <Paper {...paperProps}>
          <ChatList />
        </Paper>
      </Split.Pane>

      <Split.Resizer />

      <Split.Pane initialWidth={"80%"} minWidth={"30%"}>
        <Paper {...paperProps}>
          <ChatContent />
        </Paper>
      </Split.Pane>
    </Split>
  )
}

