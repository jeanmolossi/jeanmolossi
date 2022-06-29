import styled from 'styled-components';

export const Tags = styled.div`
    display: inline-flex;
    gap: ${({ theme }) => theme.gutter.md};
    flex-wrap: wrap;
`;
