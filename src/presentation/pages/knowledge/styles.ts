import { backdrop } from '@/presentation/components';
import styled from 'styled-components';

export const KnowledgeContainer = styled.section`
    padding-top: 4.5rem;
`;

export const Heading = styled.div`
    ${backdrop}

    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.gutter.md};
    margin-bottom: ${({ theme }) => theme.gutter.md};
    padding: ${({ theme }) => theme.gutter.md};

    > h1 {
        font-size: 1.75rem;
    }

    > h2 {
        color: ${({ theme }) => theme.beige};
    }
`;

export const Playlists = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.gutter.md};
`;
