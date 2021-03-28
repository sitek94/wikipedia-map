import { Box } from '@material-ui/core'

import Header from 'components/Header'
import Sidebar from 'pages/map/HistorySidebar'

export default function Page({ children }) {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Sidebar />
      <Box sx={{ flex: 'auto' }}>{children}</Box>
    </Box>
  )
}
