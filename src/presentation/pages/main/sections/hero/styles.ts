import { backdrop } from '@/presentation/components';
import { fromLeft, pulse } from '@/presentation/styles/animations';
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
    grid-template-rows: repeat(2, 1fr) 30px;
    place-items: center;
    padding: 0 ${({ theme }) => theme.gutter.md};

    @media (min-width: 768px) {
        grid-template-columns: minmax(400px, 1fr) minmax(367px, 1fr);
        grid-template-rows: auto 30px;
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

    > h1 {
        font-weight: bold;
        font-size: 2rem;
    }

    > h2 {
        font-weight: 500;
        font-size: 3rem;
        color: ${({ theme }) => theme.beige};
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
`;
