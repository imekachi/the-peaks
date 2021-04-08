import 'modern-normalize/modern-normalize.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import Layout from '../components/Layout'
import '../styles/global.css'
import { defaultTheme } from '../styles/theme'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default App
