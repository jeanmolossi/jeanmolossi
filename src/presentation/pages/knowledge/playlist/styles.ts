import styled, { css } from 'styled-components';
import { socialColors } from '@/presentation/styles';

export const ItemContainer = styled.a`
    display: grid;
    grid-template-columns: 1fr;
    padding: ${({ theme }) => theme.gutter.md};
    row-gap: ${({ theme }) => theme.gutter.md};
    border-radius: ${({ theme }) => theme.radii.sm};

    @media (min-width: 768px) {
        grid-template-columns: 1.5fr 2.5fr;
        column-gap: ${({ theme }) => theme.gutter.md};
    }

    background-color: ${({ theme }) => theme.darkGray};
`;

export const ItemCover = styled.div`
    position: relative;
    width: min(100%, 425px);
    padding-bottom: 56.25%;
    border-radius: ${({ theme }) => theme.radii.md};
    flex-shrink: 0;

    ${({ theme }) => css`
        background-image: linear-gradient(
            135deg,
            ${theme.lightGray}20 0%,
            ${theme.aqueBlue}20 100%
        );

        &:hover {
            background-image: linear-gradient(
                45deg,
                ${theme.lightGray}50 0%,
                ${theme.aqueBlue}50 100%
            );
        }
    `}
`;

export const ItemDescription = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: ${({ theme }) => theme.gutter.xs};

    > small {
        color: ${({ theme }) => theme.silverMetallic};
    }

    > a {
        > p {
            position: relative;
            text-overflow: ellipsis;
            padding: ${({ theme }) => `${theme.gutter.xs} 0`};
            border-radius: ${({ theme }) => theme.radii.xs};
            color: ${({ theme }) => theme.grafitiWhite};
            overflow-y: hidden;
        }

        > h1 {
            flex: 1;
        }

        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: ${({ theme }) => theme.gutter.xs};

        > svg {
            font-size: 1.25rem;
            color: ${socialColors.youtube};
        }
    }

    @media (min-width: 768px) {
        row-gap: ${({ theme }) => theme.gutter.md};
    }
`;
