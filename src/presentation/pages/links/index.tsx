import React, { useMemo } from "react";
import { BaseHead, Container } from "@/presentation/components"
import { SwapComponents } from "@/presentation/helpers"
import styles from './styles.module.css'

interface Link {
    href: string;
    label: string;
    bgColor: string;
    txtColor?: 'black' | 'white';
}

export interface LinksProps {
    links: Link[]
}

export const Links = ({ links }: LinksProps) => {
    const linksDesc = useMemo(() => {
        return links.reduce((a, l, i) => {
            // First link label
            if (i === 0) return `${l.label}`;
            // Last link label
            if (i+1 === links.length) return `${a} e ${l.label}`;
            // Non first and non last link label
            return `${a}, ${l.label}`;
        }, '')
    }, [links])

    return (
        <Container>
            <BaseHead
                title="Link tree, árvore de links"
                description={`Links de fácil acesso. ${linksDesc}`}
                canonical="/links"
            />

            <div className={styles.links_container}>
                <h1>Link Tree</h1>

                <SwapComponents
                    condition={!!links && links.length > 0}
                    componentIfConditionTrue={
                        <div className={styles.link_list}>
                            {links?.map(({ href, label, bgColor, txtColor = 'black' }, i) => (
                                <div key={i.toString()}>
                                    <BlankLink
                                        href={href}
                                        txtColor={txtColor}
                                        bgColor={bgColor}
                                    >
                                        {label}
                                    </BlankLink>
                                </div>
                            ))}
                        </div>
                    }
                    componentIfConditionFalse={
                        <h1>Oops, nenhum link encontrado</h1>
                    }
                />

                <h3>O que são estes links ?</h3>
                <p>Estes links são atalhos para minhas referências, como por exemplo:</p>
                <p>Meu Github, canal do Youtube, etc.</p>
            </div>
        </Container>
    )
}

interface BlankLinkProps {
    href?: string;
    children?: React.ReactNode
    txtColor: 'black' | 'white'
    bgColor: string;
}

const BlankLink = ({ href = '#', children, txtColor, bgColor }: BlankLinkProps) => {
    return (
        <a
            style={{
                '--bg-color': bgColor,
                '--txt-color': txtColor,
            }}
            className={styles.link_anchor}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    )
}
