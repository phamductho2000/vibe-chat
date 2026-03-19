import '@gfazioli/mantine-split-pane/styles.css';
import {
  AppShell,
  Box,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/sidebar/Navbar';

export function AppLayout() {
  const [opened] = useDisclosure();

  return (
    <AppShell
      navbar={{
        width: 80,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}>
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Box h="100%">
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  )
}

