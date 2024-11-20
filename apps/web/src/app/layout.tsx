'use client';

import { gtag } from '@/config/constants';
import WebVitals from '@/presentation/components/global/web-vitals';
import { ThemeProvider } from '@/presentation/components/theme-provider';
import {
    AnalyticsScript,
    FontLoader,
    TagManager,
    TagManagerNoScript,
} from '@/presentation/scripts';
import '@/presentation/styles/github-dark.min.css';
import '@/presentation/styles/global.css';
import { cn } from '@jeanmolossi/utils';
import { Inter, Ubuntu } from 'next/font/google';
import React, { Suspense } from 'react';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-inter',
});

const ubuntu = Ubuntu({
    subsets: ['latin'],
    weight: ['300', '400', '500', '700'],
    variable: '--font-ubuntu',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR" className={cn(inter.variable, ubuntu.variable)}>
            <head>
                <FontLoader />
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

                <link
                    rel="preload"
                    href={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
                    as="script"
                />

                <link
                    rel="preload"
                    href={`https://www.googletagmanager.com/gtm.js?id=${gtag.GTM_TRACKING_TAG}`}
                    as="script"
                />
            </head>
            <body className={'min-h-screen bg-background antialiased'}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TagManagerNoScript />

                    {children}
                </ThemeProvider>

                <Suspense>
                    <TagManager />
                </Suspense>
                <Suspense>
                    <AnalyticsScript />
                </Suspense>

                <WebVitals />
            </body>
        </html>
    );
}

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//     if (typeof window !== 'undefined' && window.gtag) {
//         // Use `window.gtag` if you initialized Google Analytics as this example:
//         // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js
//         window.gtag('event', metric.name, {
//             event_category: metric.label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
//             value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
//             event_label: metric.id,
//             non_interaction: true,
//         })
//     }
// }
