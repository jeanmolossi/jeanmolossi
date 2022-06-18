import { backdrop } from '@/presentation/components';
import styled from 'styled-components';

export const Heading = styled.div`
    ${backdrop}

    padding-top: 4.5rem;

    > small {
        color: ${({ theme }) => theme.silverMetallic};
    }
`;

export const ArticleList = styled.div`
    ${backdrop}

    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.gutter.sm};

    background-color: ${({ theme }) => theme.blackChocolate}CC;
`;

export const ArticleItem = styled.a`
    padding: ${({ theme }) => `${theme.gutter.sm} ${theme.gutter.md}`};
    line-height: 1.75rem;
    transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);

    &:hover,
    &:active {
        background-color: ${({ theme }) => theme.outrageousOrange}46;

        > h1,
        > h2 {
            color: white;
        }
    }

    > h1 {
        font-size: 1.25rem;
        color: ${({ theme }) => theme.beige};
        transition: color 100ms linear;
    }

    > h2 {
        font-size: 1rem;
        color: ${({ theme }) => theme.silverMetallic};
        transition: color 100ms linear;
    }
`;

export const ArticleLink = styled.span`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.gutter.xs};
`;
