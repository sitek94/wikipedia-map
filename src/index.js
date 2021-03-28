import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'antd/dist/antd.css'

import App from './App'
import { ThemeProvider as MyThemeProvider } from 'theme'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    mode: 'dark',
  },
})

const app = (
  <ThemeProvider theme={theme}>
    <MyThemeProvider>
      <App />
    </MyThemeProvider>
  </ThemeProvider>
)

ReactDOM.render(app, document.getElementById('root'))
