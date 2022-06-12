import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from '@/presentation/styles'
import { Layout } from '@/presentation/components'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    </>
  )
}

export default MyApp
