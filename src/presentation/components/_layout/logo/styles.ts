import styled from 'styled-components';

export const Heading = styled.h1`
    align-self: flex-start;
    color: ${({ theme }) => theme.beige};

    > small {
        color: ${({ theme }) => theme.bronze};
        display: block;
        font-size: 1rem;
    }
`;
