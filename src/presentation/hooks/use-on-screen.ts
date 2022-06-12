import { useState, useEffect, RefObject } from 'react';

export function useOnScreen<T extends HTMLElement>(
    ref: RefObject<T>,
    rootMargin = '0px',
) {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIntersecting(entry.isIntersecting);
            },
            {
                rootMargin,
            },
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
