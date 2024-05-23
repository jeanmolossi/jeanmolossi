'use client';

import { useRouter } from "next/navigation";
import React, { MouseEventHandler, useCallback, useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import styles from './modal.module.css';

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
            className={styles.overlay}
            onClick={onClick}
        >
            <div
                ref={wrapper}
                className={styles.wrapper}
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
