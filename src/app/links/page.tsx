import { social } from "@/config/constants";
import { getContrast } from "@/presentation/helpers/contrast-calc"
import { socialColors } from "@/presentation/styles";
import Container from "../components/_layout/container";
import styles from './links.module.css'
import { SwapComponents } from "@/presentation/helpers";

interface Link {
    href: string;
    label: string;
    bgColor: string;
    txtColor?: 'black' | 'white';
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
            className={styles.link_anchor}
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
