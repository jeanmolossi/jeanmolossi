import styled from 'styled-components';
import { backdrop } from '@/presentation/components';

export const Article = styled.article`
    ${backdrop};

    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.gutter.md};
    row-gap: ${({ theme }) => theme.gutter.md};
    background-color: ${({ theme }) => theme.blackChocolate}CC;

    > h1 {
        font-size: 2rem;
    }

    > h2 {
        font-size: 1.25rem;
        color: ${({ theme }) => theme.beige};
        text-shadow: 1px 1px 0 ${({ theme }) => theme.oxfordBlue};
        border-bottom: 1px solid ${({ theme }) => theme.beige}40;
        padding-bottom: ${({ theme }) => theme.gutter.md};
    }
`;
