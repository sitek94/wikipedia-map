import * as React from 'react'
import { AppBar, Box, Toolbar, useTheme } from '@material-ui/core'

import { SidebarToggler, SidebarProvider } from 'components/Sidebar'
import ThemeToggler from 'components/ThemeToggler'
import GitHubLink from 'components/GitHubLink'

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </SidebarProvider>
  )
}

export function Header({ children }) {
  const { zIndex } = useTheme()

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        zIndex: zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <SidebarToggler />

        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          {children}
        </Box>

        <ThemeToggler />
        <GitHubLink />
      </Toolbar>
    </AppBar>
  )
}

export function Content({ children }) {
  return <Box sx={{ flex: 'auto' }}>{children}</Box>
}
