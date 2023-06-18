'use client';

import React from "react"
import { AnalyticsScript, AwsRum, FontLoader, HotjarScript, TagManager, TagManagerNoScript } from "@/presentation/scripts"
import NextNProgress from 'nextjs-progressbar';
// import type { NextWebVitalsMetric } from "next/app";
import { Layout as LayoutComponent } from "@/presentation/components";
import '@/presentation/styles/global.css'

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR">
            <head>
                <FontLoader />
                <TagManager />
                <AnalyticsScript />
                <HotjarScript />
                <AwsRum />
                <NextNProgress />
            </head>
            <body>
                <LayoutComponent>
                    <TagManagerNoScript />

                    {children}
                </LayoutComponent>
            </body>
        </html>
    )
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
