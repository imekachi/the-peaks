import { DefaultTheme } from 'styled-components'
import COLORS from './colors'

export const defaultTheme: DefaultTheme = Object.freeze({
  fontFamily: {
    serif: 'Georgia, "Times New Roman", serif',
    sans: 'Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  fontSize: {
    sm: '14px',
    base: '16px',
    md: '20px',
    lg: '24px',
    xl: '34px',
    '2xl': '48px',
  },
  colors: {
    primary: COLORS.BLUE_800,
    bodyBg: COLORS.GRAY_100,
    text: 'rgba(0,0,0,0.87)',
    textOnPrimaryBg: COLORS.WHITE,
  },
  screen: {
    sm: '640px',
    md: '768',
    lg: '1072px',
    xl: '1280px',
  },
})
