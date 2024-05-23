import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@jeanmolossi/ui';
import Link from 'next/link';
import React, { HtmlHTMLAttributes } from 'react';
import styles from './styles.module.css';

interface TimelineProps extends HtmlHTMLAttributes<HTMLTableSectionElement> {
    header: string;
    items: Array<ItemProps>;
    className?: string;
}

export default function Timeline({
    header,
    items,
    className,
    ...rest
}: TimelineProps) {
    const renderItems = () =>
        items.map((item, i) => {
            let left = i % 2 !== 0;
            if (typeof item.left !== 'undefined') left = item.left;

            return (
                <Item
                    key={i.toString()}
                    heading={item.heading}
                    subheading={item.subheading}
                    content={item.content}
                    href={item.href}
                    left={left}
                />
            );
        });

    return (
        <section {...rest} className={[styles.wrapper, className].join(' ')}>
            <h2 className="text-2xl mb-8">{header}</h2>

            <div className={styles.timeline}>
                {renderItems()}

                {/* LAST ITEM - empty */}
                <div className={styles.timeline_empty}></div>

                <div className={styles.timeline_middle}>
                    <div className={styles.timeline_circle}></div>
                </div>

                <div className={styles.timeline_empty}></div>
            </div>
        </section>
    );
}

interface ItemProps {
    left?: boolean;
    heading: string | React.ReactNode;
    subheading: string | React.ReactNode;
    content: React.ReactNode;
    href?: string | null;
}

function Item({
    left = false,
    heading = null,
    subheading = null,
    content = null,
    href = null,
}: ItemProps) {
    const contents = [
        <div className={styles.timeline_empty}></div>,

        <div className={styles.timeline_middle}>
            <div className={styles.timeline_circle}></div>
        </div>,

        <Card className={styles.timeline_content}>
            <CardHeader>
                <CardTitle>{heading}</CardTitle>
                <CardDescription>{subheading}</CardDescription>
            </CardHeader>

            <CardContent>
                <p>{content}</p>
            </CardContent>

            {href && (
                <CardFooter>
                    <Link className="mt-4 text-sm" href={href}>
                        Ver experiência completa
                    </Link>
                </CardFooter>
            )}
        </Card>,
    ];

    if (!left) contents.sort(() => -1);

    return (
        <>
            {contents.map((child, i) => (
                <React.Fragment key={i.toString()}>{child}</React.Fragment>
            ))}
        </>
    );
}
