import styled, { css } from 'styled-components';
import { backdrop } from '@/presentation/components';
import { socialColors } from '@/presentation/styles';

const inset = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const ItemContainer = styled.a`
    ${backdrop};
    display: grid;
    grid-template-columns: 1fr;
    padding: ${({ theme }) => theme.gutter.md};
    row-gap: ${({ theme }) => theme.gutter.md};

    @media (min-width: 768px) {
        grid-template-columns: 1.5fr 2.5fr;
        column-gap: ${({ theme }) => theme.gutter.md};
    }
`;

export const ItemCover = styled.div`
    background-color: ${({ theme }) => theme.blackChocolate};
    border-radius: ${({ theme }) => theme.radii.md};
    margin-bottom: ${({ theme }) => `${theme.gutter.md}`};
    overflow: hidden;
    display: flex;
    justify-content: stretch;
    align-items: center;
    flex: 0 1 auto;

    > div {
        display: block;
        width: 100%;
    }

    @media (min-width: 768px) {
        max-width: 30rem;
    }
`;

export const ItemDescription = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: ${({ theme }) => theme.gutter.xs};

    > small {
        color: ${({ theme }) => theme.silverMetallic};
    }

    > p {
        position: relative;
        text-overflow: ellipsis;
        padding: ${({ theme }) => `${theme.gutter.xs} ${theme.gutter.md}`};
        border-radius: ${({ theme }) => theme.radii.xs};
        color: ${({ theme }) => theme.beige};
        overflow-y: hidden;
        background-color: ${({ theme }) => theme.blackChocolate}EB;
    }

    > span {
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
