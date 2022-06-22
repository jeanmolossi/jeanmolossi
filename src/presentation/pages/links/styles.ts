import { backdrop } from '@/presentation/components';
import styled from 'styled-components';

export const LinksContainer = styled.div`
    ${backdrop};

    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 4.5rem;
    padding: ${({ theme }) => theme.gutter.sm};
    gap: ${({ theme }) => theme.gutter.md};
    max-width: 25rem;
    width: 100%;

    > h1 {
        text-align: center;
    }
`;

export const LinkList = styled.div`
    display: flex;
    flex-direction: column;
    margin: ${({ theme }) => theme.gutter.md} auto;
    row-gap: ${({ theme }) => theme.gutter.md};
    width: 100%;

    > div {
        display: block;
    }
`;

interface AnchorProps {
    bgColor: string;
}

export const LinkAnchor = styled.a<AnchorProps>`
    display: block;
    padding: ${({ theme }) => theme.gutter.md};

    background-color: ${({ bgColor }) => bgColor};
    color: ${({ color }) => color};

    box-shadow: 4px 4px 0 white;
    transition: all 100ms ease-out;

    &:hover {
        transform: translate(2px, 2px);
        box-shadow: 2px 2px 0 white;
    }
`;
