import 'modern-normalize/modern-normalize.css'
import type { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Layout from '../components/Layout'
import '../styles/global.css'
import { defaultTheme } from '../styles/theme'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.bodyBg};
  }
`

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default App
