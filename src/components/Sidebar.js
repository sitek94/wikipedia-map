import * as React from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos'
import { Box, Drawer, IconButton, List, Toolbar } from '@material-ui/core'

const SidebarContext = React.createContext()

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = React.useState(false)

  const contextValue = [isOpen, setIsOpen]

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

export function SidebarToggler() {
  const [isOpen, setIsOpen] = useSidebar()
  const toggle = () => setIsOpen(!isOpen)

  return (
    <IconButton
      onClick={toggle}
      edge="start"
      color="inherit"
      aria-label="toggle sidebar"
      sx={{ mr: 2 }}
    >
      {isOpen ? <ArrowBackIcon /> : <MenuIcon />}
    </IconButton>
  )
}

export default function Sidebar({ open, onClose, children }) {
  const [isOpen, setIsOpen] = useSidebar()
  const handleClose = () => setIsOpen(false)

  return (
    <Drawer
      anchor="left"
      variant="persistent"
      open={isOpen}
      onClose={handleClose}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List sx={{ width: 250 }}>{children}</List>
      </Box>
    </Drawer>
  )
}
