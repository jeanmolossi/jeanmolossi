'use client';

import { Suspense } from "react";
import { usePathname } from 'next/navigation'
import { RenderIf } from "@/presentation/helpers";

export default function Layout({
    children,
    modal,
    lastVideo,
}: {
    children: React.ReactNode,
    modal: React.ReactNode,
    lastVideo: React.ReactNode,
}) {
    const pathname = usePathname();

    console.log(pathname)

    return (
        <div className="app-layout-child mx-auto w-full max-w-7xl">
            {children}
            {modal}
            <RenderIf condition={pathname === '/'}>
                <Suspense>
                    {lastVideo}
                </Suspense>
            </RenderIf>
        </div>
    )
}
