import { css, keyframes } from 'styled-components';

interface WithAppear {
    paddingFrom?: number;
}

export const fromBottom = css<WithAppear>`
    opacity: 0;
    transform: translateY(${({ paddingFrom = 50 }) => paddingFrom}px);
    transition: transform 0.2s, opacity 0.2s;

    &.isOnScreen {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const fromTop = css<WithAppear>`
    opacity: 0;
    transform: translateY(-${({ paddingFrom = 50 }) => paddingFrom}px);
    transition: transform 0.2s, opacity 0.2s;

    &.isOnScreen {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const fromLeft = css<WithAppear>`
    opacity: 0;
    transform: translateX(-50px);
    transition: transform 0.2s, opacity 0.2s;

    &.isOnScreen {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const fromRight = css<WithAppear>`
    opacity: 0;
    transform: translateX(50px);
    transition: transform 0.2s, opacity 0.2s;

    &.isOnScreen {
        opacity: 1;
        transform: translateX(0);
    }
`;

const pulseAnimation = keyframes`
    0% {
        transform: scale(0);
        opacity: 0;
    }

    50% {
        transform: scale(1.1);
        opacity: 1;
    }

    100% {
        transform: scale(1.02);
        opacity: 0;
    }
`;

export const pulse = css`
    position: relative;

    &:before {
        content: '';
        position: absolute;

        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        border-radius: ${({ theme }) => theme.radii.md};
        box-shadow: 0 0 12px ${({ theme }) => theme.beige},
            inset 0 0 24px ${({ theme }) => theme.beige};

        transform: scale(0);
        transition: all 0.2s ease-in-out;
        z-index: -1;
    }

    &:hover {
        &:before {
            animation: ${pulseAnimation} 1s ease-in-out infinite;
        }
    }
`;

export const pulseAnim = keyframes`
    0% {
        transform: translate(calc(-50% - 0.25rem), -50%) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(calc(-50% - 0.25rem), -50%) scale(1.3);
        opacity: 0;
    }
`;

export const rotation = keyframes`
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
`;
