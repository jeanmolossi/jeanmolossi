import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from '@/presentation/styles'
import { Layout } from '@/presentation/components'
import { AnalyticsScript, HotjarScript, TagManager } from '@/presentation/scripts'
import '@/presentation/styles/github-dark.min.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <GlobalStyle />
        <TagManager />
        <AnalyticsScript />
        <HotjarScript />
        <ThemeProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    </>
  )
}

export default MyApp
