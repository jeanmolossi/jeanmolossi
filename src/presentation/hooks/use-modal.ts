import { useCallback, useEffect, useState } from 'react';

type OnCloseCb = () => void;
type OnOpenCb = () => void;

type UseModalReturn = [boolean, OnCloseCb, OnOpenCb];

export function useModal(): UseModalReturn {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const original = document.body.style.overflow;

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = original;
        }

        return () => {
            document.body.style.overflow = original;
        };
    }, [isOpen]);

    const onClose = useCallback(() => setIsOpen(false), []);
    const onOpen = useCallback(() => setIsOpen(true), []);

    return [isOpen, onClose, onOpen];
}
