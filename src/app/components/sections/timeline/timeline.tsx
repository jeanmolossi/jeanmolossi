import React from 'react';
import styles from './styles.module.css';
import Link from 'next/link';

interface TimelineProps {
    items: Array<ItemProps>
}

export default function Timeline({ items }: TimelineProps) {
    const renderItems = () => items.map((item, i) => {
        let left = i % 2 !== 0
        if (typeof item.left !== 'undefined')
            left = item.left

        return (
            <Item
                key={i.toString()}
                heading={item.heading}
                subheading={item.subheading}
                content={item.content}
                href={item.href}
                left={left}
            />
        )
    })

    return (
        <section className={styles.wrapper}>
            <h1 className='text-2xl mb-8'>Experiência profissional</h1>

            <div className={styles.timeline}>
                {renderItems()}
            </div>
        </section>
    )
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

        <div className={styles.timeline_content}>
            <h3>{heading}</h3>
            <small>{subheading}</small>
            <p>{content}</p>
            {href && (
                <Link className='mt-4 text-sm' href={href}>
                    Ver experiência completa
                </Link>
            )}
        </div>
    ];

    if (!left)
        contents.sort(() => -1)

    return (
        <>
            {contents.map((child, i) => (
                <React.Fragment key={i.toString()}>
                    {child}
                </React.Fragment>
            ))}
        </>
    )
}
