'use client';

import { gtagActions } from '@/config/analytics';
import { gtag } from '@/config/constants';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

export const AnalyticsScript = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleChangeRoute = (url: string) => {
            gtagActions.pageView(url);
        };

        const url = pathname + (searchParams ? '?'.concat(searchParams.toString()) : '');
        handleChangeRoute(url);
    }, [pathname, searchParams]);

    return (
        <>
            {/* Global site tag (gtag.js) - Google Analytics */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
                strategy="afterInteractive"
                id="gtag-load"
                async
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${gtag.GA_TRACKING_ID}',{
                        page_path: window.location.pathname,
                    });
                    `,
                }}
            />
        </>
    );
};
