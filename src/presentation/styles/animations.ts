import { css } from 'styled-components';

interface WithAppear {
    isOnScreen: boolean;
    paddingFrom?: number;
}

export const fromBottom = css<WithAppear>`
    opacity: 0;
    transform: translateY(${({ paddingFrom = 50 }) => paddingFrom}px);
    transition: transform 0.2s, opacity 0.2s;

    ${({ isOnScreen }) =>
        isOnScreen &&
        `
    opacity: 1;
    transform: translateY(0);
    `}
`;

export const fromTop = css<WithAppear>`
    opacity: 0;
    transform: translateY(-${({ paddingFrom = 50 }) => paddingFrom}px);
    transition: transform 0.2s, opacity 0.2s;

    ${({ isOnScreen }) =>
        isOnScreen &&
        `
    opacity: 1;
    transform: translateY(0);
    `}
`;

export const fromLeft = css<WithAppear>`
    opacity: 0;
    transform: translateX(-50px);
    transition: transform 0.2s, opacity 0.2s;

    ${({ isOnScreen }) =>
        isOnScreen &&
        `
    opacity: 1;
    transform: translateX(0);
    `}
`;

export const fromRight = css<WithAppear>`
    opacity: 0;
    transform: translateX(50px);
    transition: transform 0.2s, opacity 0.2s;

    ${({ isOnScreen }) =>
        isOnScreen &&
        `
    opacity: 1;
    transform: translateX(0);
    `}
`;
