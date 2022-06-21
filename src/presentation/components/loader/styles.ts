import styled from 'styled-components';
import { rotation } from '@/presentation/styles/animations';

export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    cursor: progress;

    > div {
        display: flex;
        justify-content: center;
        align-items: center;
        animation: ${rotation} 1s linear infinite;
        font-size: 3rem;
        padding: ${({ theme }) => theme.gutter.md};
        border-radius: ${({ theme }) => theme.radii.full};
        background-color: ${({ theme }) => theme.blackChocolate};
    }
`;
