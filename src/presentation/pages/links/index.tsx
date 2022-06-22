import { Container } from "@/presentation/components"
import { SwapComponents } from "@/presentation/helpers"
import React from "react";
import * as S from './styles'

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
    return (
        <Container>
            <S.LinksContainer>
                <h1>Link Tree</h1>

                <SwapComponents
                    condition={!!links && links.length > 0}
                    componentIfConditionTrue={
                        <S.LinkList>
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
                        </S.LinkList>
                    }
                    componentIfConditionFalse={
                        <h1>Oops, nenhum link encontrado</h1>
                    }
                />

                <h3>O que são estes links ?</h3>
                <p>Estes links são atalhos para minhas referências, como por exemplo:</p>
                <p>Meu Github, canal do Youtube, etc.</p>
            </S.LinksContainer>
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
        <S.LinkAnchor
            bgColor={bgColor}
            color={txtColor}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </S.LinkAnchor>
    )
}
