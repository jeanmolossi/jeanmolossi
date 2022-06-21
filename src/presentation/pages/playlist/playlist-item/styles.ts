import { backdrop } from '@/presentation/components';
import styled from 'styled-components';

export const ItemContainer = styled.div`
    ${backdrop}

    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.gutter.md};
    padding: ${({ theme }) => `${theme.gutter.sm} ${theme.gutter.md}`};

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

export const Cover = styled.a``;

export const Details = styled.a`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.gutter.md};

    > h1 {
        font-size: 1.25rem;
    }

    > div {
        color: ${({ theme }) => theme.beige};

        > p > em > strong {
            color: ${({ theme }) => theme.lightGreen};
        }
    }
`;
