import styled from 'styled-components';
import { backdrop } from '@/presentation/components';
import { pulseAnim } from '@/presentation/styles/animations';

export const VideoWrapper = styled.div`
    display: flex;
    flex-direction: column;

    > iframe.video-iframe {
        display: flex;
        width: 100%;
        aspect-ratio: 16 / 9;
    }
`;

export const ImageButton = styled.button`
    ${backdrop}

    border: none;
    background-color: transparent;
    padding: 0;

    display: flex;
    justify-content: stretch;
    align-items: center;
    flex: 0 1 auto;

    position: relative;

    > span {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 2rem;
        color: ${({ theme }) => theme.beige};
        background-color: ${({ theme }) => theme.darkGray};
        transition: all 200ms ease-in-out;
        z-index: 1;

        &:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(calc(-50% - 0.25rem), -50%);
            width: 4.5rem;
            height: 4.5rem;
            background-color: ${({ theme }) => theme.rust};
            z-index: -1;
            border-radius: 9999px;
        }

        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(calc(-50% - 0.25rem), -50%);
            width: 4.5rem;
            height: 4.5rem;
            background-color: ${({ theme }) => theme.bronze};
            border-radius: 9999px;
            z-index: -1;
            transition: all 200ms ease-in-out;
        }

        &:hover,
        &:active {
            background-color: ${({ theme }) => theme.blackChocolate}10;

            &::before {
                animation: ${pulseAnim} 500ms ease-in-out infinite;
            }
        }
    }

    > div {
        display: block;
        width: 100%;
    }
`;
