'use client';

import { useRef } from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
import { useOnScreen } from '@/presentation/hooks';
import { fromBottom } from '@/presentation/styles/animations';

export const AboutMeSection = () => {
    const headingRef = useRef(null);
    const p1Ref = useRef(null);
    const p2Ref = useRef(null);
    const p3Ref = useRef(null);
    const p4Ref = useRef(null);
    const linkRef = useRef(null);

    useOnScreen(headingRef);
    useOnScreen(p1Ref);
    useOnScreen(p2Ref);
    useOnScreen(p3Ref);
    useOnScreen(p4Ref);
    useOnScreen(linkRef);

    return (
        <Section id="about-me">
            <Heading ref={headingRef}>
                Sobre mim
            </Heading>

            <Paragraph ref={p1Ref}>
                Então, você quer saber sobre mim? Bem, eu sou um desenvolvedor de software e amo tudo o que envolve código.
                Já trabalhei em projetos de sites e aplicativos, e adoro experimentar novas tecnologias.
            </Paragraph>

            <Paragraph ref={p2Ref}>
                Algumas das minhas linguagens favoritas são Golang e TypeScript, e também
                entendo bastante sobre banco de dados e arquitetura de software.
            </Paragraph>

            <Paragraph ref={p3Ref}>
                Eu sou uma pessoa colaborativa e adoro trabalhar em equipe. Acredito
                que juntos somos mais fortes, e sempre busco ajudar meus amigos a alcançarem seus objetivos.
                Além disso, sou uma pessoa proativa e sempre estou em busca de aprender coisas novas.
            </Paragraph>

            <Paragraph ref={p4Ref}>
                Minha meta é compartilhar meus conhecimentos e experiência com novos desenvolvedores,
                ajudando-os a crescer e alcançar seus objetivos na carreira. Seja como
                mentor, líder de equipe ou colega, eu quero ajudar a moldar as próximas
                gerações de desenvolvedores e contribuir para o sucesso da indústria de tecnologia.
            </Paragraph>

            <Link ref={linkRef}>
                <NextLink href="/sobre-mim" passHref>
                    &gt; Veja informações técnicas
                </NextLink>
            </Link>
        </Section>
    );
};

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

export const Heading = styled.h1`
    ${fromBottom}

    padding: ${({ theme }) => theme.gutter.md};
    transition-delay: .2s;
`;

export const Paragraph = styled.p`
    padding: ${({ theme }) => theme.gutter.md};
    background-color: ${({ theme }) => theme.darkGray};
    border-radius: ${({ theme }) => theme.radii.sm};

    ${fromBottom}
    transition-delay: .2s;
`;

export const Link = styled.div`
    ${fromBottom}

    > a {
        display: block;
        transition-delay: .2s;

        &:hover {
            text-decoration: underline;
        }
    }
`;
