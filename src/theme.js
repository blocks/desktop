import { theme } from '@blocks/editor'

export default {
    ...theme,
    initialColorMode: 'light',
    useCustomProperties: true,
    colors: {
        background: '#fff',
        modes: {
            dark: {
                background: '#000',
            }
        }
    }
}