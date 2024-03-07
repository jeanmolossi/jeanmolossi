import { social } from "@/config/constants";
import { cn } from "@/lib/helpers";
import Container from "@/presentation/components/_layout/container";
import { SwapComponents } from "@/presentation/helpers";
import { getContrast } from "@/presentation/helpers/contrast-calc";
import { socialColors } from "@/presentation/styles";
import { Metadata } from "next";
import styles from './links.module.css';

interface Link {
    href: string;
    label: string;
    bgColor: string;
    txtColor?: 'black' | 'white';
}

export const metadata: Metadata = {
    title: 'Jean Molossi | Link tree'.trimAfter(50),
    description: 'Links de acesso à Jean'.trimAfter(150),
    publisher: 'https://jeanmolossi.com.br'
}

export default function LinksPage() {
    const links: Link[] = Object.entries(social).map((item) => {

        const index = item[0] as keyof typeof socialColors;
        const bgColor = socialColors[index];

        return {
            href: item[1],
            label: capitalize(item[0]),
            bgColor: bgColor,
            txtColor: getContrast(bgColor),
        }
    })

    return (
        <Container>
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
            className={cn(styles.link_anchor, 'dark:shadow-white hover:dark:shadow-white')}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    )
}

function capitalize (text: string) {
    return text
        .split('')
        .map((char, i) => i === 0 ? char.toUpperCase() : char)
        .join('')
}
