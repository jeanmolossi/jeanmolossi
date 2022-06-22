import { backdrop } from '@/presentation/components';
import styled from 'styled-components';

export const ItemContainer = styled.div`
    ${backdrop}

    display: grid;
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.gutter.md};
    padding: ${({ theme }) => `${theme.gutter.sm} ${theme.gutter.md}`};

    @media (min-width: 768px) {
        grid-template-columns: 1fr 2fr;
    }
`;

export const Cover = styled.a`
    display: flex;
    width: 100%;

    align-items: center;
    justify-content: stretch;
    flex: 0 1 auto;
`;

export const Details = styled.a`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.gutter.md};
    overflow-x: hidden;

    > h1 {
        font-size: 1.25rem;
    }

    > div {
        display: block;
        color: ${({ theme }) => theme.beige};

        > p > em > strong {
            color: ${({ theme }) => theme.lightGreen};
        }
    }
`;
