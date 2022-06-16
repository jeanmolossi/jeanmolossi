import styled from 'styled-components';
import { backdrop } from '@/presentation/components';
import { fromBottom } from '@/presentation/styles/animations';

interface WithAnimProps {
    isOnScreen: boolean;
    child: number;
}

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;

    @media (min-width: 768px) {
        padding: 0 ${({ theme }) => theme.gutter.xxl};
    }
`;

export const Heading = styled.h1<WithAnimProps>`
    ${backdrop}
    ${fromBottom}
    ${({ child }) => `transition-delay: ${child * 0.2}s;`}
`;

export const Paragraph = styled.p<WithAnimProps>`
    ${backdrop}
    ${fromBottom}
    ${({ child }) => `transition-delay: ${child * 0.2}s;`}
`;

export const Link = styled.a<WithAnimProps>`
    display: block;
    ${backdrop}
    ${fromBottom}
    ${({ child }) => `transition-delay: ${child * 0.2}s;`}

    &:hover {
        text-decoration: underline;
    }
`;
