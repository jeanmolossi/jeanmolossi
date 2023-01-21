import styled from 'styled-components';

export const KnowledgeContainer = styled.section`
    padding-top: 4.5rem;
`;

export const Heading = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.gutter.md};
    margin-bottom: ${({ theme }) => theme.gutter.md};
    padding: ${({ theme }) => theme.gutter.md};
    background-color: ${({ theme }) => theme.darkGray};

    > h1 {
        font-size: 2rem;
    }

    > h2 {
        color: ${({ theme }) => theme.grafitiWhite};
        font-weight: 400;
    }
`;

export const Playlists = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.gutter.md};
`;
