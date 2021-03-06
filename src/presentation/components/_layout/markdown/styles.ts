import styled, { css } from 'styled-components';

export const MarkdownWrapper = styled.div`
    display: flex;
    flex-direction: column;

    word-wrap: break-word;
    text-overflow: ellipsis;

    gap: ${({ theme }) => theme.gutter.md};
    flex-grow: 0;

    > pre {
        display: flex;
        border-radius: ${({ theme }) => theme.radii.sm};
        align-items: stretch;
        overflow: hidden;
        flex: 1;
        flex-wrap: wrap;
        max-width: 100%;

        > code {
            flex: 1;
            padding: ${({ theme }) => theme.gutter.md};
            overflow-x: scroll;
            width: 100%;

            ${[280, 320, 375, 425, 500, 600, 668].map(
                (w: number) => css`
                    @media (min-width: ${w}px) {
                        max-width: ${w}px;
                    }
                `,
            )}
        }
    }

    > p > code {
        background-color: #222;
        border-radius: ${({ theme }) => theme.radii.sm};
        padding: ${({ theme }) => `${theme.gutter.xs}`};
        overflow-x: hidden;
    }

    > blockquote {
        background-color: #333;
        border-left: 3px solid ${({ theme }) => theme.rust};
        padding: ${({ theme }) => `${theme.gutter.sm}`};
    }

    > ol,
    > ul {
        margin-left: ${({ theme }) => theme.gutter.lg};

        > li {
            margin: ${({ theme }) => theme.gutter.sm} 0;

            ul > li {
                margin: ${({ theme }) =>
                    `${theme.gutter.xs} ${theme.gutter.lg}`};
            }
        }
    }

    > p {
        margin: 0;

        > img {
            display: block;
            width: 100%;
            border-radius: ${({ theme }) => theme.radii.sm};
        }
    }

    > hr {
        border-color: ${({ theme }) => theme.beige}15;
    }
`;
