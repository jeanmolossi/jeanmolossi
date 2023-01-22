import { useState, useEffect, RefObject, MutableRefObject } from 'react';

export function useOnScreen<T extends HTMLElement = any>(
    ref: RefObject<T> | MutableRefObject<T>,
    rootMargin = '0px',
) {
    const [isIntersecting, setIntersecting] = useState(false);

    if (typeof window === 'undefined') {
        return [true] as const;
    }

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => {
                setIntersecting(entry.isIntersecting);

                ref.current?.classList
                    .toggle(
                        'isOnScreen',
                        entry.isIntersecting,
                    );
            },
            { rootMargin },
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return [isIntersecting] as const;
}
