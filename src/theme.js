import { theme } from '@blocks/editor'

export default {
    ...theme,
    initialColorMode: 'light',
    colors: {
        ...theme.colors,
        background: '#fff',
        modes: {
            dark: {
                ...theme.colors.dark,
                background: '#000',
            }
        }
    }
}