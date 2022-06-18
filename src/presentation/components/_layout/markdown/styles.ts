import styled from 'styled-components';

export const MarkdownWrapper = styled.div`
    display: flex;
    flex-direction: column;

    word-wrap: break-word;
    text-overflow: ellipsis;

    gap: ${({ theme }) => theme.gutter.md};

    > pre {
        display: flex;
        border-radius: ${({ theme }) => theme.radii.sm};
        align-items: stretch;

        > code {
            flex: 1;
            padding: ${({ theme }) => theme.gutter.md};
        }
    }

    > p > code {
        background-color: #222;
        border-radius: ${({ theme }) => theme.radii.sm};
        padding: ${({ theme }) => `${theme.gutter.xs}`};
    }

    > blockquote {
        background-color: #333;
        border-left: 3px solid ${({ theme }) => theme.rust};
        padding: ${({ theme }) => `${theme.gutter.sm}`};
    }

    > ol,
    > ul {
        margin-left: ${({ theme }) => theme.gutter.lg};
    }

    > p {
        margin: 0;

        > img {
            display: block;
            width: 100%;
            border-radius: ${({ theme }) => theme.radii.sm};
        }
    }
`;
