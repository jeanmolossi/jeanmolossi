import Image from "next/image";
import styled, { css } from "styled-components"

export const HeroSection = () => {
    return (
        <Container>
            <ImageWrapper>
                <Image
                    alt="avatar"
                    src={"/images/avatar-posing.png"}
                    style={{ objectFit: 'cover' }}
                    fill
                />
            </ImageWrapper>

            <Excerpt>
                <h1>Jean Carlos Molossi</h1>
                <h3>Fullstack Software Developer</h3>

                <p>Recentemente comecei a ensinar e você pode me acompanhar e aprender mais sobre esse mundo de Software Development (desenvolvimento de software).</p>
            </Excerpt>
        </Container>
    )
}

export const Container = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    --spacing: ${({theme}) => theme.gutter.xl};
    gap: ${({theme}) => theme.gutter.md};
    padding: var(--spacing);
    min-height: 100vh;

    ${({theme}) => css`
        width: min(100%, ${theme.dimensions.desktop});

        @media (max-width: ${theme.dimensions.desktop}) {
            --spacing: ${({theme}) => theme.gutter.lg};
        }

        @media (max-width: ${theme.dimensions.tablet}) {
            --spacing: ${({theme}) => theme.gutter.md};
        }

        @media (max-width: ${theme.dimensions.landscape}) {
            --spacing: ${({theme}) => theme.gutter.md};
            grid-template-columns: 1fr;
        }
    `}
`;

export const ImageWrapper = styled.div`
    position: relative;
    display: block;
    --spacing: ${({theme}) => theme.gutter.md};

    width: clamp(200px, calc(100% - var(--spacing)), 360px);
    padding-bottom: clamp(200px, calc(100% - var(--spacing)), 360px);
    border-radius: 100%;
    overflow: hidden;
    background-color: ${({ theme }) => theme.gray};
    margin: 0 auto;
`;

export const Excerpt = styled.div`
    text-align: center;
    align-self: center;
    --spacing: ${({ theme }) => theme.gutter.xl};
    padding: var(--spacing);

    > p {
        margin-top: var(--spacing);
    }

    ${({theme}) => css`
        > h1 {
            font-size: 3rem;
        }

        > h3 {
            color: ${theme.lightGray};
            font-weight: 300;
        }


        background-color: ${theme.darkGray};
        border-radius: ${theme.radii.md};

        @media (max-width: ${theme.dimensions.desktop}) {
            --spacing: ${({theme}) => theme.gutter.lg};
        }

        @media (max-width: ${theme.dimensions.tablet}) {
            --spacing: ${({theme}) => theme.gutter.md};
        }

        @media (max-width: ${theme.dimensions.landscape}) {
            --spacing: ${({theme}) => theme.gutter.md};
        }
    `}
`
