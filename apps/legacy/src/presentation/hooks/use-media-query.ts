'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
    const [mediaQuery, setMediaQuery] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mql = window.matchMedia(query);
            setMediaQuery(mql.matches);
        }
    }, [query]);

    return mediaQuery;
}
