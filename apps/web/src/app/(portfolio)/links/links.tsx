'use client';

import { gtagActions } from "@/config/analytics";
import { cn } from "@jeanmolossi/utils";
import React from "react";
import styles from './links.module.css';

export interface Link {
    name: string;
    href: string;
    label: string;
    bgColor: string;
    txtColor?: 'black' | 'white';
}

interface BlankLinkProps {
    name: string;
    href?: string;
    children?: React.ReactNode;
    txtColor: 'black' | 'white';
    bgColor: string;
}

export default function LinkList({ links = [] }: { links: Link[] }) {
    return (
        <React.Fragment key="link-list">
            {links.map(
                (
                    {
                        name,
                        href,
                        label,
                        bgColor,
                        txtColor = 'black',
                    },
                    i,
                ) => (
                    <div key={i.toString()}>
                        <BlankLink
                            name={name}
                            href={href}
                            txtColor={txtColor}
                            bgColor={bgColor}
                        >
                            {label}
                        </BlankLink>
                    </div>
                ),
            )}
        </React.Fragment>
    )
}

const BlankLink = ({
    name,
    href = '#',
    children,
    txtColor,
    bgColor,
}: BlankLinkProps) => {
    return (
        <a
            onClick={() => sendEvent(name)}
            style={{
                '--bg-color': bgColor,
                '--txt-color': txtColor,
            }}
            className={cn(
                styles.link_anchor,
                'dark:shadow-white hover:dark:shadow-white',
            )}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    );
};


function sendEvent(name: string) {
    gtagActions.event({
        category: 'link-tree',
        action: 'click:link',
        label: name,
        value: new Date().toISOString()
    })
}
