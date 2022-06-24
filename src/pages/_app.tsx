import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from '@/presentation/styles'
import { Layout } from '@/presentation/components'
import { AnalyticsScript, HotjarScript, TagManager, TrackSessions } from '@/presentation/scripts'
import '@/presentation/styles/github-dark.min.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <GlobalStyle />
        <TagManager />
        <AnalyticsScript />
        <HotjarScript />
        <TrackSessions />
        <ThemeProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    </>
  )
}

export default MyApp

export function reportWebVitals(metric: NextWebVitalsMetric) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
            event_category: metric.label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            event_label: metric.id,
            non_interaction: true,
        })
    }
}
