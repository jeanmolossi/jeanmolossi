import styled from 'styled-components';

export const Tags = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.gutter.md};
    flex-wrap: wrap;
`;
