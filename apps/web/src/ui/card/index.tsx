import { HTMLAttributes, PropsWithChildren } from 'react';
import styles from './card.module.css';
import { cn } from '@jeanmolossi/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    highlight?: boolean;
}

export default function Card({
    children,
    highlight = false,
    className,
    ...divProps
}: PropsWithChildren<CardProps>) {
    return (
        <div
            className={cn(styles.root, highlight ? styles.highlighted : '', className)}
            {...divProps}
        >
            <div>{children}</div>
        </div>
    );
}
