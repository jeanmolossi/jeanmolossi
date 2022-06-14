import { fromTop } from '@/presentation/styles/animations';
import styled from 'styled-components';

const switchSize = `875px`;

export const NavbarContainer = styled.div`
    display: block;
    width: 100%;
    background-color: 'black';
    backdrop-filter: brightness(20%);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    @media (min-width: ${switchSize}) {
        flex-direction: row;
        bottom: auto;
        min-height: 2.5rem;
    }
`;

export const Navbar = styled.nav`
    max-width: 100%;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.gutter.xs};
    padding: ${({ theme }) => theme.gutter.sm};

    > div:first-child {
        display: flex;
        justify-content: space-between;
    }

    @media (min-width: ${switchSize}) {
        max-width: ${({ theme }) => theme.dimensions.maxWidth};
        align-items: stretch;
        flex-direction: row;
        justify-content: space-between;
        position: relative;
        gap: ${({ theme }) => theme.gutter.md};

        > div:nth-child(2) {
            display: flex;
            flex: 1;
        }
    }
`;

export const CloseIcon = styled.button`
    font-size: 2rem;
    color: ${({ theme }) => theme.silverMetallic};
    background-color: transparent;
    z-index: 1;

    border: none;
    padding: ${({ theme }) => theme.gutter.sm};
    border-radius: ${({ theme }) => theme.radii.full};

    align-self: flex-start;
    justify-self: flex-end;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: background-color 200ms ease-in-out;

    &:hover {
        background-color: ${({ theme }) => theme.bronze}20;
    }

    &:active {
        background-color: ${({ theme }) => theme.bronze}50;
    }

    @media (min-width: ${switchSize}) {
        display: none;
    }
`;

export const OpenMenu = styled(CloseIcon)`
    background-color: #00000099;
`;

interface WithChildProps {
    child: number;
    isOnScreen: boolean;
}

interface WithOpenProps {
    isOpen: boolean;
}

export const NavList = styled.div<WithOpenProps>`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-end;
    background-color: #000000aa;
    backdrop-filter: hue-rotate(180deg);
    transition: all 100ms ease-out;

    @media (max-width: ${switchSize}) {
        pointer-events: none;
        justify-content: center;
        opacity: 0;
        visibility: hidden;

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100vh;

        padding: ${({ theme }) => theme.gutter.sm};
        padding-top: 4rem;

        ${({ isOpen }) =>
            isOpen &&
            `
            pointer-events: initial;
            opacity: 1;
            visibility: visible;
        `}
    }

    @media (min-width: ${switchSize}) {
        flex-direction: row;
    }
`;

export const NavbarItem = styled.div<WithChildProps>`
    line-height: 100%;

    @media (max-width: ${switchSize}) {
        margin: ${({ theme }) => `${theme.gutter.xs} 0`};
        ${fromTop}
        transition-delay: ${({ child }) => child * 50}ms;
    }

    @media (min-width: ${switchSize}) {
        transform: none;
    }

    a {
        line-height: 2.5rem;
    }
`;

export const NavbarLink = styled.a`
    height: 100%;
    padding: ${({ theme }) => `0 ${theme.gutter.md}`};

    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.gutter.sm};
    color: ${({ theme }) => theme.silverMetallic};
    border-radius: ${({ theme }) => theme.radii.xs};

    &:hover {
        text-decoration: underline;
    }

    @media (max-width: ${switchSize}) {
        color: ${({ theme }) => theme.blackChocolate};
        background-color: ${({ theme }) => theme.silverMetallic};
        padding: ${({ theme }) => `${theme.gutter.md}`};
    }
`;
