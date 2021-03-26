import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'antd/dist/antd.css'

import App from './App'
import { ThemeProvider } from 'theme'

const app = (
  <ThemeProvider>
    <App />
  </ThemeProvider>
)

ReactDOM.render(app, document.getElementById('root'))
