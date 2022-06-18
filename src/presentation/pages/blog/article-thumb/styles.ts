import styled from 'styled-components';

export const ArticleItem = styled.a`
    padding: ${({ theme }) => `${theme.gutter.sm} ${theme.gutter.md}`};
    line-height: 1.75rem;
    transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);

    display: grid;
    grid-template-columns: 1fr;
    column-gap: ${({ theme }) => `${theme.gutter.md}`};

    @media (min-width: 768px) {
        grid-template-columns: minmax(10rem, 0.6fr) 1.4fr;
    }

    &:hover,
    &:active {
        background-color: ${({ theme }) => theme.outrageousOrange}46;
    }
`;

export const ArticleCover = styled.div`
    background-color: ${({ theme }) => theme.blackChocolate};
    border-radius: ${({ theme }) => theme.radii.md};
    margin-bottom: ${({ theme }) => `${theme.gutter.md}`};
    overflow: hidden;
    display: flex;
    justify-content: stretch;
    align-items: center;

    > div {
        display: block;
        width: 100%;
    }
`;

export const Excerpt = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => `${theme.gutter.md}`};

    @media (min-width: 768px) {
        row-gap: ${({ theme }) => `${theme.gutter.xs}`};
    }

    > h1 {
        font-size: 1.5rem;
        color: ${({ theme }) => theme.beige};
        transition: color 100ms linear;
    }

    > h2 {
        font-size: 1rem;
        color: ${({ theme }) => theme.beige}AF;
        transition: color 100ms linear;
    }

    > small {
        display: block;
        color: ${({ theme }) => theme.rust};
    }

    &:hover,
    &:active {
        > h1,
        > h2 {
            color: white;
        }
    }
`;

export const ArticleAuthor = styled.div`
    display: inline-flex;
    align-items: center;
    column-gap: ${({ theme }) => `${theme.gutter.sm}`};
`;

export const AuthorPhoto = styled.div`
    display: flex;
    width: 3rem;
    border-radius: ${({ theme }) => theme.radii.full};
    overflow: hidden;
`;

export const AuthorDetails = styled.div`
    display: flex;
    flex-direction: column;
    line-height: normal;

    > span {
        color: ${({ theme }) => theme.bronze}AA;
    }

    > span:last-child {
        font-size: 0.75rem;
        color: ${({ theme }) => theme.silverMetallic}AA;
    }

    > small {
        color: ${({ theme }) => theme.silverMetallic}AA;
    }
`;

export const ArticleLink = styled.span`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.gutter.xs};
`;

export const Reactions = styled.aside`
    display: flex;
    flex-direction: column;

    > div {
        display: flex;
        gap: ${({ theme }) => theme.gutter.md};

        > span {
            gap: ${({ theme }) => theme.gutter.xs};
            display: inline-flex;
            align-items: center;
            font-size: 1.25rem;
            color: ${({ theme }) => theme.silverMetallic}AA;
        }
    }
`;
