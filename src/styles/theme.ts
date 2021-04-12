import { DefaultTheme } from 'styled-components'

export const defaultTheme: DefaultTheme = Object.freeze({
  fontFamily: {
    serif: 'Georgia, "Times New Roman", serif',
    sans: 'Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  fontSize: {
    xs: '12px',
    sm: '13px',
    base: '14px',
    md: '20px',
    lg: '24px',
    xl: '34px',
    '2xl': '48px',
  },
  lineHeight: {
    base: 17 / 14,
    md: 20 / 14,
    lg: 1.45,
    xl: 1.5,
  },
  colors: {
    primary: '#09357b',
    bodyBg: '#fafafa',
    textOnBody: 'rgba(0,0,0,0.87)',
    textOnPrimaryBg: '#ffffff',
    sectionBorder: '#ededed',
    articleDefaultBg: '#0d47a1',
    link: '#0e52be',
  },
  screen: {
    sm: '640px',
    md: '768px',
    lg: '1110px',
    xl: '1280px',
  },
})
