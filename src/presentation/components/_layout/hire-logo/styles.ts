import Link from "next/link";
import styled, { keyframes } from "styled-components";

const spinHourly = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`

const spinInverse = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(-360deg);
    }
`

export const HireContainer = styled(Link)`
    @media (max-width: 768px) {
        display: none;
    }

    position: fixed;
    right: 1rem;
    bottom: 1rem;
    width: 120px;
    height: 120px;

    > div {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        &:first-child > img {
            transform-origin: center;
            animation: ${spinInverse} 8s linear infinite;
        }

        &:last-child > img {
            transform-origin: center;
            animation: ${spinHourly} 8s linear infinite;
        }
    }
`

