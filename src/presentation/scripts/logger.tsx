'use client';

import { useRouter } from "next/router";
import { useEffect } from "react";
import { isClientSide } from "../helpers";

export function TrackSessions() {
    const _url = '/api/log';

    const router = useRouter();

    useEffect(() => {
        const handleChangeRoute = (url: string) => {
            if (navigator.sendBeacon) {
                const body: BodyInit = JSON.stringify({
                    level: 'info',
                    url,
                })
                navigator.sendBeacon(_url, body)
            }
        }

        router.events.on('routeChangeComplete', handleChangeRoute);
        router.events.on('hashChangeComplete', handleChangeRoute);

        return () => {
            router.events.off('routeChangeComplete', handleChangeRoute);
            router.events.off('hashChangeComplete', handleChangeRoute);
        }
    }, [router.events])

    useEffect(() => {
        function onError(e: ErrorEvent) {
            alert('error catched ' + e.error.message)
            if (navigator.sendBeacon) {
                const body: BodyInit = JSON.stringify({
                    level: 'error',
                    message: e.error.message || e.message
                })

                navigator.sendBeacon(_url, body)
            }
        }

        if (isClientSide()) {
            window.addEventListener('error', onError)

            return () => {
                window.removeEventListener('error', onError)
            }
        }
    }, [])

    return <></>
}
