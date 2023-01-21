import { useRef } from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
import { useChildCounter, useOnScreen } from '@/presentation/hooks';
import { fromBottom } from '@/presentation/styles/animations';

export const AboutMeSection = () => {
    const headingRef = useRef<HTMLAnchorElement>(null);
    const p1Ref = useRef<HTMLAnchorElement>(null);
    const p2Ref = useRef<HTMLAnchorElement>(null);
    const p3Ref = useRef<HTMLAnchorElement>(null);
    const p4Ref = useRef<HTMLAnchorElement>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);

    const [isHeadingOnScreen] = useOnScreen(headingRef);
    const [isP1OnScreen] = useOnScreen(p1Ref);
    const [isP2OnScreen] = useOnScreen(p2Ref);
    const [isP3OnScreen] = useOnScreen(p3Ref);
    const [isP4OnScreen] = useOnScreen(p4Ref);
    const [isLinkOnScreen] = useOnScreen(linkRef);

    return (
        <Section id="about-me">
            <Heading ref={headingRef} isOnScreen={isHeadingOnScreen}>
                Sobre mim
            </Heading>

            <Paragraph ref={p1Ref} isOnScreen={isP1OnScreen}>
                Então, você quer saber sobre mim? Bem, eu sou um desenvolvedor de software e amo tudo o que envolve código.
                Já trabalhei em projetos de sites e aplicativos, e adoro experimentar novas tecnologias.
            </Paragraph>

            <Paragraph ref={p2Ref} isOnScreen={isP2OnScreen}>
                Algumas das minhas linguagens favoritas são Golang e TypeScript, e também
                entendo bastante sobre banco de dados e arquitetura de software.
            </Paragraph>

            <Paragraph ref={p3Ref} isOnScreen={isP3OnScreen}>
                Eu sou uma pessoa colaborativa e adoro trabalhar em equipe. Acredito
                que juntos somos mais fortes, e sempre busco ajudar meus amigos a alcançarem seus objetivos.
                Além disso, sou uma pessoa proativa e sempre estou em busca de aprender coisas novas.
            </Paragraph>

            <Paragraph ref={p4Ref} isOnScreen={isP4OnScreen}>
                Minha meta é compartilhar meus conhecimentos e experiência com novos desenvolvedores,
                ajudando-os a crescer e alcançar seus objetivos na carreira. Seja como
                mentor, líder de equipe ou colega, eu quero ajudar a moldar as próximas
                gerações de desenvolvedores e contribuir para o sucesso da indústria de tecnologia.
            </Paragraph>

            <Link
                isOnScreen={isLinkOnScreen}
                ref={linkRef}
                href="/sobre-mim"
                passHref
            >
                &gt; Veja informações técnicas
            </Link>
        </Section>
    );
};

interface WithAnimProps {
    isOnScreen: boolean;
    ref?: any
}

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    row-gap: ${({ theme }) => theme.gutter.sm};
    padding-bottom: ${({ theme }) => theme.gutter.xl};

    @media (min-width: 768px) {
        padding: 0 ${({ theme }) => theme.gutter.xxl};
    }
`;

export const Heading = styled.h1<WithAnimProps>`
    padding: ${({ theme }) => theme.gutter.md};
    ${fromBottom}
    transition-delay: .2s;
`;

export const Paragraph = styled.p<WithAnimProps>`
    padding: ${({ theme }) => theme.gutter.md};
    background-color: ${({ theme }) => theme.darkGray};
    border-radius: ${({ theme }) => theme.radii.sm};

    ${fromBottom}
    transition-delay: .2s;
`;

export const Link = styled(NextLink)<WithAnimProps>`
    display: block;
    ${fromBottom}
    transition-delay: .2s;

    &:hover {
        text-decoration: underline;
    }
`;
