import { backdrop } from '@/presentation/components';
import { fromLeft } from '@/presentation/styles/animations';
import styled from 'styled-components';

export const Section = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 8rem 1fr 1fr;
    grid-gap: 1rem;
    width: 100%;

    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
        min-height: 100vh;
    }
`;

export const Heading = styled.h2`
    ${backdrop};

    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    align-self: flex-end;

    @media (min-width: 768px) {
        grid-column: span 2;
    }
`;

export const Column = styled.div`
    ${backdrop}

    display: flex;
    flex-direction: column;
    width: 100%;
    padding: ${({ theme }) => theme.gutter.md};

    @media (min-width: 768px) {
        height: 100%;
    }
`;

export const TechList = styled.ul`
    display: flex;
    flex-direction: column;

    margin-top: ${({ theme }) => theme.gutter.md};
    list-style: none;
    overflow-x: hidden;
`;

interface WithChildCounter {
    child: number;
    isOnScreen: boolean;
}

export const TechListItem = styled.li<WithChildCounter>`
    ${fromLeft};

    margin: ${({ theme }) => theme.gutter.xs} 0;
    transition-delay: ${({ child }) => `${child * 0.1}s`};
    display: flex;
    justify-content: flex-end;

    > a {
        display: flex;
        flex-direction: row-reverse;
        gap: 1rem;
        font-size: 1.5rem;
        align-items: center;
        padding: ${({ theme }) => theme.gutter.sm} 0;

        transition: all 100ms linear;

        &:hover {
            transform: translateX(-1rem);

            @media (min-width: 768px) {
                transform: translateX(1rem);
            }
        }

        @media (min-width: 768px) {
            flex-direction: row;
        }
    }

    @media (min-width: 768px) {
        justify-content: flex-start;
    }
`;

interface WithColorProp {
    color: string;
}

export const TechListItemIcon = styled.span<WithColorProp>`
    display: flex;
    color: ${({ color }) => color};
`;

export const TechListItemText = styled.span`
    display: flex;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.beige};
`;
