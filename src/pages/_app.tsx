import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from '@/presentation/styles'
import { Layout } from '@/presentation/components'
import '@/presentation/styles/github-dark.min.css'
import { AnalyticsScript } from '@/presentation/scripts'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <GlobalStyle />
        <AnalyticsScript />
        <ThemeProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    </>
  )
}

export default MyApp
