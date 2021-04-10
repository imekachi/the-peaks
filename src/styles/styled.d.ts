// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    fontFamily: {
      serif: string
      sans: string
    }
    fontSize: {
      xs: string
      sm: string
      base: string
      md: string
      lg: string
      xl: string
      '2xl': string
    }
    colors: {
      primary: string
      bodyBg: string
      textOnBody: string
      textOnPrimaryBg: string
      sectionBorder: string
    }
    screen: {
      sm: string
      md: string
      lg: string
      xl: string
    }
  }
}
