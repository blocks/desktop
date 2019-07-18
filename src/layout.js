import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { theme } from '@blocks/editor'

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)
