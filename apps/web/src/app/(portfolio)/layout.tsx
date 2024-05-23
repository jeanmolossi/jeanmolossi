import { Footer } from "@/presentation/components/_layout/footer";
import Navigation from "@/presentation/components/_layout/navigation-menu";
import "@/presentation/helpers";
import React, { Suspense } from "react";

const HireLogo = React.lazy(() => import('@/presentation/components/_layout/hire-logo'))

export default function Layout({
    children,
    modal,
}: {
    children: React.ReactNode,
    modal: React.ReactNode,
}) {
    return (
        <div className="app-layout-child mx-auto w-full max-w-screen-2xl bg-background pt-[4.5rem]">
            <Navigation />

            {children}
            {modal}

            <Suspense><HireLogo /></Suspense>

            <Footer />
        </div>
    )
}
