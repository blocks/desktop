import React from 'react'
import { useColorMode, Styled } from 'theme-ui'

export default () => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <Styled.root
      css={{
        maxWidth: '48em',
        padding: 32,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '40px'
      }}
    >
      <Styled.button
        css={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={e => {
          setColorMode(colorMode === 'light' ? 'dark' : 'light')
        }}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Styled.button>
    </Styled.root>
  )
}