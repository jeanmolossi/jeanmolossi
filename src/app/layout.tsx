'use client';

import { cn } from "@/lib/helpers";
import { Footer } from "@/presentation/components/_layout/footer";
import { ThemeProvider } from "@/presentation/components/theme-provider";
import {
    AnalyticsScript,
    FontLoader,
    HotjarScript,
    TagManager,
    TagManagerNoScript
} from "@/presentation/scripts";
import '@/presentation/styles/github-dark.min.css';
import '@/presentation/styles/global.css';
import { Poppins } from 'next/font/google';
import NextNProgress from 'nextjs-progressbar';
import React from "react";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--poppins',
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <html lang="pt-BR">
            <head>
                <FontLoader />
                <TagManager />
                <AnalyticsScript />
                <HotjarScript />
                <NextNProgress />
            </head>
            <body className={cn(
                'min-h-screen bg-background font-sans antialiased',
                poppins.variable,
            )}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TagManagerNoScript />

                    {children}


                    <Footer />
                </ThemeProvider>
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
