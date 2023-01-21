import React, { FunctionComponent } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import { Article } from "@/domain/entities/dev.to/article"
import { BaseHead, MarkdownProps, Robots, SocialLinks } from "@/presentation/components";
import { TagList } from "../../tag-list";
import styled from "styled-components";

const LazyMd = dynamic(
    () => import("@/presentation/components/_layout/markdown")
        .then((mod) => mod.Markdown),
    { loading: () => <div>Carregando...</div> },
) as FunctionComponent<MarkdownProps>

interface TheArticleProps {
    article: Article
}

export const TheArticle = ({ article }: TheArticleProps) => {
    const min = article.reading_time_minutes <= 1
        ? 'minuto'
        : 'minutos';

    const readingTime = `${article.reading_time_minutes} ${min}`

    return (
        <Article>
            <BaseHead
                title={article.title}
                description={article.description}
                og={{
                    type: 'article',
                    url: `https://jeanmolossi.com.br/artigo/${article.slug}`,
                    image: article.cover_image ? [article.cover_image] : undefined
                }}
                robots={[Robots.index, Robots.follow, Robots.noimageindex]}
                canonical={`/artigo/${article.slug}`}
            />

            <Cover>
                <Image
                    alt={`Capa do artigo ${ article.title }`}
                    style={{ objectFit: "cover" }}
                    src={{
                        src: article.cover_image,
                        width: 1280,
                        height: 720,
                    }}
                    fill
                />
            </Cover> {/* cover */}

            <h1>{ article.title }</h1>

            <Metadata>
                <Reactions article={article} />
                <TagList tagList={article.tag_list} />
                <span>Publicado { article.published_at.toRelativeTime() }</span>
                <span>Tempo de leitura: Aprox. { readingTime } </span>
            </Metadata> {/* metadata */}

            <Author>
                <AuthorPhoto>
                    <Image
                        alt={`Imagem do author do artigo`}
                        style={{ objectFit: "cover" }}
                        src={{
                            src: article.user.profile_image_90,
                            width: 100,
                            height: 100,
                        }}
                        fill
                    />
                </AuthorPhoto> {/* author foto */}

                <AuthorInfos>
                    <span>{ article.user.name }</span>

                    <SocialLinks />
                </AuthorInfos> {/* author infos */}
            </Author> {/* author */}

            <LazyMd>
                { article.body_markdown }
            </LazyMd>

            <Reactions article={article} />
        </Article>
    )
}


const Reactions = React.memo(({ article }: TheArticleProps) => {
    return (
        <ReactionsDiv>
            <span><FiHeart /> { article.public_reactions_count.compress() }</span>
            <span><FiMessageCircle /> { article.comments_count.compress() }</span>
        </ReactionsDiv>
    )
})

const Article = styled.article`
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.gutter.md};
    row-gap: ${({ theme }) => theme.gutter.md};
    background-color: ${({ theme }) => theme.darkGray};
    margin: 0 auto;
    width: min(100%, 768px);

    > h1 {
        font-size: 2rem;
        font-weight: 400;
    }

    > h2 {
        font-size: 1.25rem;
        color: ${({ theme }) => theme.beige};
        text-shadow: 1px 1px 0 ${({ theme }) => theme.oxfordBlue};
        border-bottom: 1px solid ${({ theme }) => theme.beige}40;
        padding-bottom: ${({ theme }) => theme.gutter.md};
    }
`;

export const Cover = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;

    > img {
        border-radius: ${({ theme }) => `${theme.radii.xs}`};
    }
`;

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
    position: relative;
    display: flex;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: ${({ theme }) => theme.radii.full};

    > img {
        border-radius: ${({ theme }) => theme.radii.full};
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

export const ReactionsDiv = styled.div`
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
