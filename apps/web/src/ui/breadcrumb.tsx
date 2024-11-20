import { Button } from '@jeanmolossi/ui';
import { Slash } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbProps {
    href: string;
    label: string;
}

export function Breadcrumb({ href, label }: BreadcrumbProps) {
    return (
        <>
            <Slash className="inline" size={16} />
            <Button asChild variant="link" className="h-fit p-0">
                <Link href={href}>{label}</Link>
            </Button>
        </>
    );
}
