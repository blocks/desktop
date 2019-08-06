import React from 'react'
import { ThemeProvider, ColorMode } from 'theme-ui'
import ThemeSwitcher from './themeSwitcher';
import theme from './theme'

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <ThemeSwitcher />
    <ColorMode />
    {children}
  </ThemeProvider>
)
