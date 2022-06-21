import { backdrop } from '@/presentation/components';
import styled from 'styled-components';

export const VideoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.gutter.md};
    padding-top: 4.5rem;
`;

export const Heading = styled.h1`
    ${backdrop}

    display: block;
    padding: ${({ theme }) => `${theme.gutter.md} ${theme.gutter.lg}`};
    border-radius: ${({ theme }) => theme.radii.sm};
`;

export const Description = styled.div`
    ${backdrop}

    display: block;
    padding: ${({ theme }) => `${theme.gutter.md} ${theme.gutter.lg}`};
    background-color: #000000bf;

    > span {
        display: block;
        margin-top: ${({ theme }) => theme.gutter.md};
    }
`;
