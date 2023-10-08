'use client';

import { useRouter } from "next/navigation";
import React, { MouseEventHandler, useCallback, useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

export default function Modal({
    children
}: {
    children: React.ReactNode
}) {
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

    const handleHtmlOverflow = useCallback(
        (hide = false) => {
            if (hide)
                document.querySelector('html')!.style.overflowY = 'hidden'
            else
                document.querySelector('html')!.style.overflowY = 'initial'
        },
        []
    )

    useEffect(() => {
        handleHtmlOverflow(true)
        document.addEventListener('keydown', onEscape)

        return () => {
            handleHtmlOverflow()
            document.removeEventListener('keydown', onEscape)
        }
    }, [onEscape])

    return (
        <div
            ref={overlay}
            className="fixed z-10 left-0 right-0 top-0 h-screen mx-auto bg-black/70 overflow-y-scroll py-8"
            onClick={onClick}
        >
            <div
                ref={wrapper}
                className={
                    'mx-auto ' +
                    'max-w-3xl w-full p-4 rounded bg-neutral-900 min-h-[16rem] ' +
                    'z-10 ' +
                    'grid grid-rows-[2rem_1fr]'
                }
            >
                <div className="grid grid-cols-[1fr_2rem]">
                    <span></span>
                    <button className="p-1" onClick={onDismiss}><FiX size={24} /></button>
                </div>

                <div>{children}</div>
            </div>
        </div>
    )
}
