import { Box } from '@material-ui/core'

import Header from 'components/Header'

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
      <Box sx={{ flex: 'auto' }}>{children}</Box>
    </Box>
  )
}
