'use client';

import { gtagActions } from '@/config/analytics';
import { useReportWebVitals } from 'next/web-vitals';

const WebVitals = () => {
    useReportWebVitals(metric => {
        gtagActions.event({
            category: 'portfolio',
            action: 'web-vitals',
            label: metric.name,
            value: Math.round(
                metric.name === 'CLS' ? metric.value * 1000 : metric.value,
            ).toString(),
        });
    });

    return null;
};

export default WebVitals;
