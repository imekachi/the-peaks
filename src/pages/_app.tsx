import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import fontawesome CSS
import 'modern-normalize/modern-normalize.css'
import type { AppProps } from 'next/app'
import { useRef } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import GlobalToast from '../components/GlobalToast'
import Layout from '../components/Layout'
import { reduxStore } from '../lib/redux'
import { GlobalStyleWithTheme } from '../styles/global'
import '../styles/global.css'
import { defaultTheme } from '../styles/theme'

// Tell Font Awesome to skip adding the CSS automatically since it's being imported above
fontAwesomeConfig.autoAddCss = false

function App({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <ReduxProvider store={reduxStore}>
      <ThemeProvider theme={defaultTheme}>
        <QueryClientProvider client={queryClientRef.current}>
          <Hydrate state={pageProps.dehydratedState}>
            <GlobalStyleWithTheme />
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <GlobalToast />
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </ReduxProvider>
  )
}

export default App
