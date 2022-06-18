import { backdrop } from '@/presentation/components';
import styled from 'styled-components';

export const Heading = styled.div`
    ${backdrop}

    padding-top: 4.5rem;

    > small {
        color: ${({ theme }) => theme.silverMetallic};
    }
`;

export const ArticleList = styled.div`
    ${backdrop}

    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.gutter.sm};

    background-color: ${({ theme }) => theme.blackChocolate}CC;
`;
