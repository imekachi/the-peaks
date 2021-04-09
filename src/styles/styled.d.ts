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
      text: string
      textOnPrimaryBg: string
    }
    screen: {
      sm: string
      md: string
      lg: string
      xl: string
    }
  }
}
