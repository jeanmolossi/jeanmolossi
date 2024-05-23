declare global {
    interface Window {
        dataLayer: any[];
    }
}

export namespace GTM {
    export type Actor = {
        pageView(url: string): void;
    };
}

export const gtm: GTM.Actor = {
    /**
     * pageView - Google Analytics page view tracking
     * @param url - URL of the page
     */
    pageView(url: string): void {
        window.dataLayer.push({
            event: 'pageview',
            page: url,
        });
    },
};
