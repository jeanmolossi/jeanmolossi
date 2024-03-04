import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/presentation/components/ui/navigation-menu";
import Link from "next/link";
import { items } from "./config";
import { ToggleTheme } from "./toggle-theme";

export function DesktopNavigation() {
    const desktopClassName = navigationMenuTriggerStyle({
        className: 'gap-2 hidden lg:flex'
    });

    return (
        <div className="mx-auto fixed top-0 inline-flex items-center justify-between w-full p-4 z-10 bg-background">
            <Link href='/' className="font-semibold">Jean Molossi</Link>
            <NavMenu className={desktopClassName} />
            <ToggleTheme />
        </div>
    )
}

function NavMenu({ className }: { className?: string }) {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {items.map(({ href, as, label, icon: Icon }) => (
                    <NavigationMenuItem>
                        <Link href={href} as={as}>
                            <NavigationMenuLink className={className}>
                                <Icon />
                                {label}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}
