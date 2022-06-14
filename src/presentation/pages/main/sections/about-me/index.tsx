import { useRef } from 'react'
import Link from 'next/link'
import { useOnScreen } from '@/presentation/hooks'
import * as S from './styles'
import { useChildCounter } from '@/presentation/hooks/use-child-counter'

export const AboutMeSection = () => {
    const linkRef = useRef<HTMLAnchorElement>(null)
    const [isLinkOnScreen] = useOnScreen(linkRef)
    const next = useChildCounter();
    
    return (
        <S.Section id='about-me'>
            <S.Heading child={next()} isOnScreen={isLinkOnScreen}>Bem vindo(a)</S.Heading>

            <S.Paragraph
                child={next()}
                isOnScreen={isLinkOnScreen}
            >
                Seja muito bem vindo ao meu projeto pessoal, ele chama-se vida.
            </S.Paragraph>

            <S.Paragraph
                child={next()}
                isOnScreen={isLinkOnScreen}
            >
                Uma breve apresentação sobre minha vida. Atualmente, estou com 27 anos de idade, amo programar.
            </S.Paragraph>

            <S.Paragraph
                child={next()}
                isOnScreen={isLinkOnScreen}
            >
                Isso significa que, se há algo que possa ser automatizado com um script, uma API ou algo parecido, conte comigo.
            </S.Paragraph>


            <Link href="/sobre" passHref>
                <S.Link child={next()} isOnScreen={isLinkOnScreen} ref={linkRef}>
                    Ficou curioso(a) ?
                </S.Link>
            </Link>
        </S.Section>
    )
}