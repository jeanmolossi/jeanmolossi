import { Footer } from "@/presentation/components/_layout/footer";
import "@/presentation/helpers";
import React, { Suspense } from "react";

const HireLogo = React.lazy(() => import('@/presentation/components/_layout/hire-logo'))

export default function Layout({
    children,
    navigation,
    modal,
}: {
    children: React.ReactNode,
    navigation: React.ReactNode,
    modal: React.ReactNode,
}) {
    return (
        <div className="app-layout-child mx-auto w-full max-w-screen-2xl bg-background pt-[4.5rem]">
            {navigation}

            {children}
            {modal}

            <Suspense><HireLogo /></Suspense>

            <Footer />
        </div>
    )
}
