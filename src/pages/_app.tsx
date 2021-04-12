import 'modern-normalize/modern-normalize.css'
import type { AppProps } from 'next/app'
import { useRef } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ThemeProvider } from 'styled-components'
import Layout from '../components/Layout'
import { GlobalStyleWithTheme } from '../styles/global'
import '../styles/global.css'
import { defaultTheme } from '../styles/theme'

function App({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <GlobalStyleWithTheme />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
