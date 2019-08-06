/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui'
import { Sun, Moon } from 'react-feather'

export default props => {
  const [ mode, setMode ] = useColorMode()

  return (
    <a
      {...props}
      onClick={e => {
        const next = mode === 'dark' ? 'light' : 'dark'
        setMode(next)
      }}
    >
      {mode == 'dark' ? <Sun /> : <Moon />}
    </a>
  )
}