import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@jeanmolossi/ui';
import Link from 'next/link';
import { items } from './config';
import { ToggleTheme } from './toggle-theme';

export function DesktopNavigation() {
    const desktopClassName = navigationMenuTriggerStyle({
        className: 'gap-2 hidden lg:flex',
    });

    return (
        <div className="mx-auto fixed top-0 left-0 inline-flex items-center justify-between w-full p-4 z-10 bg-background">
            <Link href="/" className="font-semibold">
                Jean Molossi
            </Link>
            <NavMenu className={desktopClassName} />
            <ToggleTheme />
        </div>
    );
}

function NavMenu({ className }: { className?: string }) {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {items.map(({ href, as, label, icon: Icon }, i) => (
                    // @ts-ignore
                    <NavigationMenuItem key={i}>
                        {/* @ts-ignore */}
                        <NavigationMenuLink className={className} asChild>
                            <Link href={href} as={as}>
                                <Icon />
                                {label}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
