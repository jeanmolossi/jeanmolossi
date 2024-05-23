'use client';

import { gtagActions } from '@/config/analytics';
import { useReportWebVitals } from 'next/web-vitals';

const WebVitals = () => {
    useReportWebVitals(metric => {
        console.log(metric);

        gtagActions.event({
            category: 'portfolio',
            action: 'web-vitals',
            label: metric.id,
            value: Math.round(
                metric.name === 'CLS' ? metric.value * 1000 : metric.value,
            ).toString(),
        });
    });

    return null;
};

export default WebVitals;
