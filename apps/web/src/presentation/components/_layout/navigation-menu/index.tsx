'use client';

import { DesktopNavigation } from './desktop-menu';
import { MobileNavigation } from './mobile-menu';

export default function Navigation() {
    return (
        <>
            <div className="hidden lg:block">
                <DesktopNavigation />
            </div>
            <div className="block lg:hidden">
                <MobileNavigation />
            </div>
        </>
    );
}
