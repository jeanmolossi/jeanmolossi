import { logout } from '@/lib/actions/logout';
import { Button } from '@jeanmolossi/ui';
import { cn } from '@jeanmolossi/utils';
import { LogOut } from 'lucide-react';
import Link, { type LinkProps } from 'next/link';
import { AnchorHTMLAttributes } from 'react';

const NavLink = (
    props: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>,
) => {
    const { children, className, ...linkProps } = props;

    return (
        <Link
            className={cn(
                'hover:underline underline-offset-4 bg-muted p-2 rounded',
                className,
            )}
            {...linkProps}
        >
            {children}
        </Link>
    );
};

function Sidebar() {
    return (
        <nav className="flex flex-col gap-4 items-stretch px-6 py-8 h-full border-r border-primary-foreground">
            <div className="flex flex-col gap-2 flex-1">
                <div className="my-4">
                    <h1 className="text-4xl font-bold">CRM</h1>
                </div>

                <NavLink href="/dashboard">Inicio</NavLink>
                <NavLink href="/dashboard/playlists">Playlists</NavLink>
                <NavLink href="/dashboard/videos">Videos</NavLink>
                <NavLink href="/dashboard/artigos">Artigos</NavLink>
            </div>

            <form action={logout} className="w-full">
                <Button type="submit" variant="destructive" className="w-full">
                    <LogOut />
                    Sair
                </Button>
            </form>
        </nav>
    );
}

export default Sidebar;
