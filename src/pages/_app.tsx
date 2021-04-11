import 'modern-normalize/modern-normalize.css'
import type { AppProps } from 'next/app'
import { useRef } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Layout from '../components/Layout'
import '../styles/global.css'
import snippets from '../styles/snippets'
import { defaultTheme } from '../styles/theme'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.bodyBg};
    ${snippets.fontFamily.sans};
    ${snippets.colors.textOnBody};
  }
`

function App({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
