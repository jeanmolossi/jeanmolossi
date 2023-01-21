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
    position: relative;
    width: min(100%, 768px);
    padding-bottom: 56.25%;
    border-radius: ${({ theme }) => theme.radii.xs};

    > img {
        border-radius: ${({ theme }) => theme.radii.xs};
    }
`;

export const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.gutter.md};
    overflow-x: hidden;

    > h1 {
        font-size: 1.25rem;
    }

    > div {
        display: block;
        color: ${({ theme }) => theme.grafitiWhite};

        > p > em > strong {
            color: ${({ theme }) => theme.lightGreen};
        }
    }
`;
