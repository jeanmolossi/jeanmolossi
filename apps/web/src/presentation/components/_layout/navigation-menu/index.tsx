'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { DesktopNavigation } from './desktop-menu';
import { MobileNavigation } from './mobile-menu';

export default function Navigation() {
    const pathname = usePathname();

    return (
        <React.Fragment key={pathname}>
            <div className="hidden lg:block">
                <DesktopNavigation />
            </div>
            <div className="block lg:hidden">
                <MobileNavigation />
            </div>
        </React.Fragment>
    );
}
