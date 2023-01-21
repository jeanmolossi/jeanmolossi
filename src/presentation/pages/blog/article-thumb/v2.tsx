import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import { FiBookOpen, FiEye, FiHeart } from 'react-icons/fi'
import { ListingArticle } from '@/domain/entities/dev.to/article'
import { RenderIf } from '@/presentation/helpers'

interface ArticleExcerptProps {
    article: ListingArticle
}

export const ArticleExcerpt = React.memo(({ article }: ArticleExcerptProps) => {
    return (
        <ArticleItem>
            <RenderIf condition={!!article.cover_image}>
                <ArticleCover>
                    <Link href="/artigo/[slug]" as={`/artigo/${article.slug}`}>
                        <Image
                            alt={`Capa do artigo ${article.title}`}
                            style={{objectFit: "cover"}}
                            src={{
                                src: article.cover_image,
                                width: 1280,
                                height: 720
                            }}
                            fill
                        />
                    </Link>
                </ArticleCover>
            </RenderIf>

            <Excerpt>
                <Link href="/artigo/[slug]" as={`/artigo/${article.slug}`}>
                    <h1>{article.title}</h1>
                </Link>

                <ArticleDetails>
                    <Link href="/sobre-mim">
                        <AuthorPhoto>
                                <Image
                                    alt={`Foto de perfil do autor ${article.user.name}`}
                                    style={{ objectFit: "cover" }}
                                    src={{
                                        src: article.user.profile_image_90,
                                        width: 90,
                                        height: 90
                                    }}
                                    fill
                                />
                        </AuthorPhoto>
                    </Link>

                    <ArticleInfo>
                        <span>{article.user.name}</span>
                        <small>Publicado {article.published_at.toRelativeTime()}</small>
                        <span>Aprox. {article.reading_time_minutes} minutos de leitura</span>
                    </ArticleInfo>

                    <Reactions>
                        <div>
                            <span><FiHeart /> {article.public_reactions_count.compress()}</span>
                            <span><FiEye /> {article.page_views_count.compress()}</span>
                        </div>
                    </Reactions>
                </ArticleDetails>

                <Link href="/artigo/[slug]" as={`/artigo/${article.slug}`}>
                    <h2>{article.description}</h2>
                </Link>

                <Link
                    href="/artigo/[slug]"
                    as={`/artigo/${article.slug}`}
                    className="article-link"
                >
                    <FiBookOpen />
                    Veja o artigo completo
                </Link>
            </Excerpt>
        </ArticleItem>
    )
})

const ArticleItem = styled.article`
    display: grid;
    grid-template-columns: 1fr;

    ${({ theme }) => css`
        column-gap: ${theme.gutter.md};
    `}

    @media (min-width: 768px) {
        grid-template-columns: minmax(20rem, 0.6fr) auto;
    }
`

const ArticleCover = styled.div`
    display: flex;
    align-items: center;
    transition: all 200ms ease-in-out;
    flex-shrink: 0;

    ${({ theme }) => css`
        border-radius: ${theme.radii.xs};

        background-image: linear-gradient(
            135deg,
            ${theme.lightGray}20 0%,
            ${theme.aqueBlue}20 100%
        );

        &:hover {
            background-image: linear-gradient(
                45deg,
                ${theme.lightGray}50 0%,
                ${theme.aqueBlue}50 100%
            );
        }
    `}

    > a {
        position: relative;
        display: block;
        width: 100%;
        padding-bottom: 56.25%;

        @media (min-width: 768px) {
            width: min(100%, 20rem);
        }

        > img {
            border-radius: ${({ theme }) => `${theme.radii.xs}`};
        }
    }
`

const Excerpt = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => `${theme.gutter.md}`};

    @media (min-width: 768px) {
        row-gap: ${({ theme }) => `${theme.gutter.xs}`};
    }

    > a > h1 {
        font-size: 1.5rem;
        color: ${({ theme }) => theme.grafitiWhite};
        transition: color 100ms linear;
    }

    > a > h2 {
        font-size: 1rem;
        color: ${({ theme }) => theme.lightGray};
        transition: color 100ms linear;
        font-weight: 400;
    }

    &:hover,
    &:active {
        > h1,
        > h2 {
            color: white;
        }
    }

    > a.article-link {
        display: flex;
        gap: ${({ theme }) => `${theme.gutter.xs}`};
        align-items: center;
        align-self: flex-end;
    }
`

const ArticleDetails = styled.div`
    display: inline-flex;
    align-items: center;
    column-gap: ${({ theme }) => `${theme.gutter.sm}`};
`

const AuthorPhoto = styled.div`
    position: relative;
    display: block;
    width: 3rem;
    height: 3rem;
    flex-shrink: 0;

    > img {
        border-radius: ${({ theme }) => theme.radii.full};
    }
`

const ArticleInfo = styled.div`
    display: flex;
    flex-direction: column;
    line-height: normal;
    flex-shrink: 0;

    > span {
        color: ${({ theme }) => theme.aqueBlue};
    }

    > span:last-child {
        font-size: 0.75rem;
        color: ${({ theme }) => theme.lightGray};
    }

    > small {
        color: ${({ theme }) => theme.lightGray};
    }
`

const Reactions = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: flex-end;
    padding: ${({ theme }) => theme.gutter.md};

    > div {
        display: flex;
        gap: ${({ theme }) => theme.gutter.md};

        > span {
            gap: ${({ theme }) => theme.gutter.xs};
            display: inline-flex;
            align-items: center;
            font-size: 1.25rem;
            color: ${({ theme }) => theme.lightGray};
        }

        @media (max-width: 768px) {
            flex-direction: column;
            justify-content: center;
            gap: 0;

            > span {
                font-size: 1rem;
            }
        }
    }
`
