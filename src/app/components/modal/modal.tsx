'use client';

import { useRouter } from "next/navigation";
import React, { MouseEventHandler, useCallback, useEffect, useRef } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
    const overlay = useRef<HTMLDivElement>(null!)
    const wrapper = useRef<HTMLDivElement>(null!)
    const router = useRouter()

    const onDismiss = useCallback(() => router.back(), [router])

    const onClick: MouseEventHandler = useCallback(
        (e) => {
            if (e.target === overlay.current || e.target === wrapper.current) {
                onDismiss?.()
            }
        },
        [onDismiss, overlay, wrapper]
    )

    const onEscape = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onDismiss()
        },
        [onDismiss]
    )

    useEffect(() => {
        document.addEventListener('keydown', onEscape)
        return () => document.removeEventListener('keydown', onEscape)
    }, [onEscape])

    return (
        <div
            ref={overlay}
            className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
            onClick={onClick}
        >
            <div
                ref={wrapper}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
            >
                {children}
            </div>
        </div>
    )
}
