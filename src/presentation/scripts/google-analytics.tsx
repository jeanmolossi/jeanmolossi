'use client';

import { useEffect } from 'react';
import Script from 'next/script'
import { useRouter } from 'next/router'
import { gtag } from '@/config/constants'
import { gtagActions } from '@/config/analytics';
import { usePathname, useSearchParams } from 'next/navigation';

export const AnalyticsScript = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const handleChangeRoute = (url: string) => {
            gtagActions.pageView(url);
        }

        const url = pathname + (searchParams?.toString() || '')
        handleChangeRoute(url)
    }, [pathname, searchParams])

    return (
        <>
            {/* Global site tag (gtag.js) - Google Analytics */}
            <Script
                strategy='afterInteractive'
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
            <Script
                id='gtag-init'
                strategy='afterInteractive'
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${gtag.GA_TRACKING_ID}',{
                        page_path: window.location.pathname,
                    });
                    `
                }}
            />
        </>
    )
}
