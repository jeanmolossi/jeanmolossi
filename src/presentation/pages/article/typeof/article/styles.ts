import styled from 'styled-components';

export const Cover = styled.div``;

export const Metadata = styled.div`
    display: grid;
    grid-template-rows: repeat(3, min-content);
    gap: ${({ theme }) => theme.gutter.md};

    padding: ${({ theme }) => theme.gutter.md} 0;
    border-top: 2px solid ${({ theme }) => theme.rust}66;
    border-bottom: 2px solid ${({ theme }) => theme.rust}66;

    > span {
        color: ${({ theme }) => theme.silverMetallic};
        font-size: 0.75rem;
    }

    @media (min-width: 768px) {
        grid-template-rows: repeat(2, min-content);
        grid-template-columns: minmax(min-content, max-content) 1fr;
        column-gap: ${({ theme }) => theme.gutter.lg};
        row-gap: ${({ theme }) => theme.gutter.sm};
    }
`;

export const Author = styled.div`
    display: inline-flex;
    column-gap: ${({ theme }) => theme.gutter.md};
    border-bottom: 2px solid ${({ theme }) => theme.rust}66;
    padding-bottom: ${({ theme }) => theme.gutter.md};
`;

export const AuthorPhoto = styled.div`
    display: flex;
    width: 4.5rem;
    height: 4.5rem;

    > div {
        display: block;
        border-radius: ${({ theme }) => theme.radii.full};
        overflow: hidden;
    }
`;

export const AuthorInfos = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    row-gap: ${({ theme }) => theme.gutter.sm};

    > span {
        font-size: 1rem;
        font-weight: bold;
    }
`;

export const Reactions = styled.div`
    display: inline-flex;
    gap: ${({ theme }) => theme.gutter.md};

    > span {
        display: inline-flex;
        align-items: center;
        gap: ${({ theme }) => theme.gutter.xs};
        font-size: 1.25rem;
        color: ${({ theme }) => theme.silverMetallic};
    }
`;

export const Comments = styled.div``;
