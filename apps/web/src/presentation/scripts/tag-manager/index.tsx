'use client';

import { gtm } from '@/config/analytics';
import { gtag } from '@/config/constants';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

export const TagManager = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = pathname + (searchParams ? '?'.concat(searchParams.toString()) : '');
        gtm.pageView(url);
    }, [pathname, searchParams]);

    return (
        <>
            {/* Google Tag Manager */}
            <Script
                id="tag-manager-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${gtag.GTM_TRACKING_TAG}');
                    `,
                }}
                async
            />
            {/* End Google Tag Manager */}
        </>
    );
};

export const TagManagerNoScript = () => {
    return (
        // <!-- Google Tag Manager (noscript) -->
        <noscript id="tag-manager-noscript-init">
            <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtag.GTM_TRACKING_TAG}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
        </noscript>
        // <!-- End Google Tag Manager (noscript) -->
    );
};
