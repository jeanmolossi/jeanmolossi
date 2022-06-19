import React, { FunctionComponent, useMemo } from "react"
import Image, { ImageLoader } from "next/image"
import dynamic from "next/dynamic"
import { FiEye, FiMessageCircle } from "react-icons/fi"
import { Article } from "@/domain/entities/dev.to/article"
import { MarkdownProps, SocialLinks } from "@/presentation/components"
import { TagList } from "@/presentation/pages/article/tag-list"
import { Article as ArticleContainer } from "@/presentation/pages/article/styles"
import * as S from './styles'

const LazyMd = dynamic(
    () => import("@/presentation/components/_layout/markdown")
        .then((mod) => mod.Markdown),
    { loading: () => <div>Carregando...</div> },
) as FunctionComponent<MarkdownProps>

const devToCdnLoader: ImageLoader = ({ src, width, quality }) => `${src}?w=${width}&q=${quality}`

interface TheArticleProps {
    article: Article
}

export const TheArticle = ({ article }: TheArticleProps) => {
    const readingTime = useMemo(() => {
        const min = article.reading_time_minutes <= 1
            ? 'minuto'
            : 'minutos';

        return `${article.reading_time_minutes} ${min}`
    }, [article.reading_time_minutes])

    return (
        <ArticleContainer>
            <S.Cover>
                <div>
                    <Image
                        loader={devToCdnLoader}
                        loading="lazy"
                        objectFit="cover"
                        src={{
                            src: article.cover_image,
                            width: 1280,
                            height: 720,
                        }}
                    />
                </div>
            </S.Cover>

            <h1>{ article.title }</h1>

            <S.Metadata>
                <Reactions article={article} />
                <TagList tagList={article.tag_list} />
                <span>Publicado { article.published_at.toRelativeTime() }</span>
                <span>Tempo de leitura: Aprox. { readingTime } </span>
            </S.Metadata>

            <S.Author>
                <S.AuthorPhoto>
                    <div>
                        <Image
                            loader={devToCdnLoader}
                            loading="lazy"
                            objectFit="cover"
                            src={{
                                src: article.user.profile_image_90,
                                width: 100,
                                height: 100,
                            }}
                        />
                    </div>
                </S.AuthorPhoto>

                <S.AuthorInfos>
                    <span>{article.user.name}</span>

                    <SocialLinks />
                </S.AuthorInfos>

            </S.Author>

            <LazyMd>
                { article.body_markdown }
            </LazyMd>

            <Reactions article={article} />
        </ArticleContainer>
    )
}

const Reactions = React.memo(({ article }: TheArticleProps) => {
    return (
        <S.Reactions>
            <span><FiEye /> { article.public_reactions_count.compress() }</span>
            <span><FiMessageCircle /> { article.comments_count.compress() }</span>
        </S.Reactions>
    )
})
