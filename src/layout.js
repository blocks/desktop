import React from 'react'
import { ThemeProvider, ColorMode } from 'theme-ui'
import { theme } from '@blocks/editor'
import desktopTheme from './theme'

export default ({ children }) => (
  <ThemeProvider theme={theme && desktopTheme}>
    <ColorMode />
    {children}
  </ThemeProvider>
)
