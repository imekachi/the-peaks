import { DefaultTheme } from 'styled-components'
import COLORS from './colors'

export const defaultTheme: DefaultTheme = Object.freeze({
  fontFamily: {
    serif: '"Guardian Headline Full", Georgia, "Times New Roman", serif',
    sans: 'system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif',
  },
  fontSize: {
    sm: '14px',
    base: '16px',
    lg: '21px',
    xl: '36px',
    '2xl': '42px',
  },
  colors: {
    primary: COLORS.BLUE_800,
    bodyBg: COLORS.WHITE,
    text: COLORS.GRAY_700,
    textOnPrimaryBg: COLORS.WHITE,
  },
  screen: {
    sm: '640px',
    md: '768',
    lg: '1072px',
    xl: '1280px',
  },
})
