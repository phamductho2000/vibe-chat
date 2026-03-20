import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/core/styles.layer.css'
import { ContextMenuProvider } from 'mantine-contextmenu'
import 'mantine-contextmenu/styles.layer.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import 'mantine-contextmenu/styles.css';
import { AuthProvider } from './store/auth/auth'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="auto">
      <AuthProvider>
        <BrowserRouter>
          <ContextMenuProvider shadow="md" borderRadius="md">
            <App />
          </ContextMenuProvider>
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  </StrictMode>,
)
