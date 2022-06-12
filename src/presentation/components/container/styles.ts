import styled from 'styled-components';

export const Container = styled.div`
    max-width: ${({ theme }) => theme.dimensions.maxWidth};
    width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
`;
