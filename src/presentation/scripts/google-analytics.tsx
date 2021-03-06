import { useEffect } from 'react';
import Script from 'next/script'
import { useRouter } from 'next/router'
import { gtag } from '@/config/constants'
import { gtagActions } from '@/config/analytics';



export const AnalyticsScript = () => {
    const router = useRouter();

    useEffect(() => {
        const handleChangeRoute = (url: string) => {
            gtagActions.pageView(url);
        }

        router.events.on('routeChangeComplete', handleChangeRoute);
        router.events.on('hashChangeComplete', handleChangeRoute);

        return () => {
            router.events.off('routeChangeComplete', handleChangeRoute);
            router.events.off('hashChangeComplete', handleChangeRoute);
        }
    }, [router.events])

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
