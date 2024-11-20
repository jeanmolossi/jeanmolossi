import { APP_HOSTNAMES, cn } from '@jeanmolossi/utils';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

export default function Anchor(
    props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
) {
    const { href = '#', children, className, target, ...aProps } = props;
    const linkStyles = cn('hover:text-primary hover:underline underline-offset-4', className);

    const hostname =
        href
            .replace(/(https?:\/\/)(www\.)?/, '')
            .split('/')
            .at(0) || '#';

    const isAbsoluteLink = href[0] === '/';

    if (APP_HOSTNAMES.has(hostname) || isAbsoluteLink) {
        return (
            <Link href={href} className={linkStyles} target={target} {...aProps}>
                <>{children}</>
            </Link>
        );
    }

    return (
        <a href={href} className={linkStyles} target={target || '_blank'} {...aProps}>
            <>{children}</>
            <ExternalLink className="ml-2 -mt-1 w-4 inline" />
        </a>
    );
}
