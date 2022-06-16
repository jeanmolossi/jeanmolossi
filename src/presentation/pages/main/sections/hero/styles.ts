import { backdrop } from '@/presentation/components';
import { fromLeft } from '@/presentation/styles/animations';
import styled, { keyframes } from 'styled-components';

export const Section = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`;

export const Content = styled.article`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto auto;
    place-items: center;
    padding: 0 ${({ theme }) => theme.gutter.md};
    padding-top: 4rem;
    height: 100%;

    @media (min-width: 768px) {
        padding-top: 0;
        grid-template-columns: minmax(400px, 1fr) minmax(367px, 1fr);
        grid-template-rows: auto 100px;
    }
`;

export const Hero = styled.div`
    ${backdrop}
    ${fromLeft}

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${({ theme }) => theme.gutter.lg};
    background-color: ${({ theme }) => theme.beige}05;
    transition-delay: 200ms;

    > h1 {
        font-weight: bold;

        @media (min-width: 768px) {
            font-size: 2rem;
        }
    }

    > h2 {
        font-weight: 500;
        color: ${({ theme }) => theme.beige};

        @media (min-width: 768px) {
            font-size: 3rem;
        }
    }

    > p {
        margin: ${({ theme }) => theme.gutter.lg} 0;
        text-align: center;

        @media (min-width: 768px) {
            font-size: 1.25rem;
            line-height: 2rem;
            padding: 0 ${({ theme }) => theme.gutter.xl};
        }
    }

    @media (min-width: 768px) {
        gap: ${({ theme }) => theme.gutter.md};
    }
`;

const shakeAnimation = keyframes`
    0% {
        transform: rotateZ(0);
    }

    33% {
        transform: rotateZ(1deg) scale(1.03);
    }

    66% {
        transform: rotateZ(-1deg) scale(1.03);
    }

    100% {
        transform: rotateZ(0);
    }
`;

export const LinkButton = styled.a`
    display: flex;
    align-items: center;
    column-gap: ${({ theme }) => theme.gutter.sm};

    background-color: ${({ theme }) => theme.rust};
    color: ${({ theme }) => theme.beige};
    border: 2px solid ${({ theme }) => theme.beige};

    padding: ${({ theme }) => `${theme.gutter.md}`};
    border-radius: ${({ theme }) => theme.radii.md};
    font-family: 'Poiret One', cursive;
    font-weight: bold;
    font-size: 1.625rem;
    transition: all 200ms linear;

    animation: ${shakeAnimation} 1s ease-in-out infinite;

    &:active {
        animation: step-end;
        box-shadow: inset 0 0 12px ${({ theme }) => theme.beige};
    }
`;

export const VideoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 100vw;
    overflow: hidden;

    @media (min-width: 768px) {
        padding: 2.5rem;
    }

    > video {
        display: block;
        width: 100%;
        transition: all 100ms ease-in-out;
        border-radius: ${({ theme }) => theme.radii.sm};
    }
`;

export const upAndDown = keyframes`
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(10px);
    }

    100% {
        transform: translateY(0);
    }
`;

export const ScrollDownButton = styled.a`
    background-color: transparent;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.beige};

    display: flex;
    padding: ${({ theme }) => theme.gutter.md};

    animation: ${upAndDown} 1s ease-in-out infinite;

    @media (min-width: 768px) {
        grid-column: span 2;
        background-color: ${({ theme }) => theme.rust}70;
        border-radius: ${({ theme }) => theme.radii.md};
    }
`;
