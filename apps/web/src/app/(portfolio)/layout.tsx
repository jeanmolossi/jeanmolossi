import { Footer } from '@/presentation/components/_layout/footer';
import Navigation from '@/presentation/components/_layout/navigation-menu';
import '@/presentation/helpers';
import React, { Suspense } from 'react';

const HireLogo = React.lazy(() => import('@/presentation/components/_layout/hire-logo'));

export default function Layout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        <div className="mx-auto w-full max-w-screen-2xl bg-background min-h-screen grid grid-cols-1 grid-rows-[72px,auto,160px]">
            <Navigation />

            <div className="grid grid-cols-1 min-h-full">
                {children}
                {modal}
            </div>

            <Suspense>
                <HireLogo />
            </Suspense>

            <Footer />
        </div>
    );
}
