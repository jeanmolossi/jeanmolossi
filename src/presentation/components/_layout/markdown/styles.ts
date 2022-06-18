import styled from 'styled-components';

export const MarkdownWrapper = styled.div`
    display: flex;
    flex-direction: column;

    word-wrap: break-word;
    text-overflow: ellipsis;
    overflow-x: hidden;

    gap: ${({ theme }) => theme.gutter.md};
`;
