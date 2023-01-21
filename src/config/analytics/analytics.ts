import { gtag } from '@/config/constants';

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
    }
}

export namespace Gtag {
    export type Event = {
        action: string;
        category: string;
        label: string;
        value: string;
    };

    export type Actor = {
         /**
         * pageView - This method is used to send a pageview hit to Google Analytics.
         * @param url is the url to be tracked
         */
        pageView(url: string): void;
        /**
         * event - This method is used to send an event hit to Google Analytics.
         * @param {Gtag.Event} event is the event to be tracked
         */
        event(e: Event): void;
    };
}

export const gtagActions: Gtag.Actor = {
    /**
     * pageView - This method is used to send a pageview hit to Google Analytics.
     * @param url is the url to be tracked
     */
    pageView(url: string) {
        window.gtag('config', gtag.GA_TRACKING_ID, { page_path: url });
    },

    /**
     * event - This method is used to send an event hit to Google Analytics.
     * @param {Gtag.Event} event is the event to be tracked
     */
    event({ action, category, label, value }: Gtag.Event) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    },
};
