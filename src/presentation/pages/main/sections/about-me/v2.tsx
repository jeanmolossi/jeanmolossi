import { useRef } from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
import { useChildCounter, useOnScreen } from '@/presentation/hooks';
import { fromBottom } from '@/presentation/styles/animations';
import { calcAge } from './helpers';

export const AboutMeSection = () => {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const [isLinkOnScreen] = useOnScreen(linkRef);
    const next = useChildCounter();

    const currentAge = calcAge(new Date(1995, 3, 8, 7, 31, 0));

    return (
        <Section id="about-me">
            <Heading child={next()} isOnScreen={isLinkOnScreen}>
                Sobre mim
            </Heading>

            <Paragraph child={next()} isOnScreen={isLinkOnScreen}>
                Então, você quer saber sobre mim? Bem, eu sou um desenvolvedor de software e amo tudo o que envolve código.
                Já trabalhei em projetos de sites e aplicativos, e adoro experimentar novas tecnologias.
            </Paragraph>

            <Paragraph child={next()} isOnScreen={isLinkOnScreen}>
                Algumas das minhas linguagens favoritas são Golang e TypeScript, e também
                entendo bastante sobre banco de dados e arquitetura de software.
            </Paragraph>

            <Paragraph child={next()} isOnScreen={isLinkOnScreen}>
                Eu sou uma pessoa colaborativa e adoro trabalhar em equipe. Acredito
                que juntos somos mais fortes, e sempre busco ajudar meus amigos a alcançarem seus objetivos.
                Além disso, sou uma pessoa proativa e sempre estou em busca de aprender coisas novas.
            </Paragraph>

            <Paragraph child={next()} isOnScreen={isLinkOnScreen}>
                Minha meta é compartilhar meus conhecimentos e experiência com novos desenvolvedores,
                ajudando-os a crescer e alcançar seus objetivos na carreira. Seja como
                mentor, líder de equipe ou colega, eu quero ajudar a moldar as próximas
                gerações de desenvolvedores e contribuir para o sucesso da indústria de tecnologia.
            </Paragraph>

            <Link
                child={next()}
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
    child: number;
}

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    row-gap: ${({ theme }) => theme.gutter.md};

    @media (min-width: 768px) {
        padding: 0 ${({ theme }) => theme.gutter.xxl};
    }
`;

export const Heading = styled.h1<WithAnimProps>`
    ${fromBottom}
    ${({ child }) => `transition-delay: ${child * 0.2}s;`}
`;

export const Paragraph = styled.p<WithAnimProps>`
    ${fromBottom}
    ${({ child }) => `transition-delay: ${child * 0.2}s;`}
`;

export const Link = styled(NextLink)<WithAnimProps>`
    display: block;
    ${fromBottom}
    ${({ child }) => `transition-delay: ${child * 0.2}s;`}

    &:hover {
        text-decoration: underline;
    }
`;
