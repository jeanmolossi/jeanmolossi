import { backdrop } from '@/presentation/components';
import styled from 'styled-components';

export const InTouchContainer = styled.div`
    ${backdrop}

    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.gutter.md};

    margin-top: 4.5rem;
    padding: ${({ theme }) => theme.gutter.md};

    > hr {
        opacity: 0.5;
    }

    > div {
        margin: 0 auto;
    }

    > a {
        text-align: right;
    }
`;
