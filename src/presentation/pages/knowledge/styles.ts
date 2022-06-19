import styled from 'styled-components';

export const KnowledgeContainer = styled.section`
    padding-top: 4.5rem;
`;

export const Playlists = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.gutter.md};
`;
