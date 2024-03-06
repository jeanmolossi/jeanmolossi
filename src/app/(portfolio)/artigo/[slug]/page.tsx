import { SocialLinks } from "@/app/components/social-links";
import { App } from "@/config/constants";
import { getArticleBySlug } from "@/data/dev.to";
import { Article } from "@/domain/entities/dev.to/article";
import Container from "@/presentation/components/_layout/container";
import Image from "next/image";
import React, { Suspense } from "react";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import styles from './artigo.module.css';

const LazyMd = React.lazy(() => import('@/presentation/components/markdown'))

interface ArticleProps {
    params?: {
        slug: string;
    }
}

export default async function Article({ params }: ArticleProps) {
    const slug = params?.slug!

    const article = await getArticleBySlug(slug)
    const {
        title,
        reading_time_minutes,
        cover_image,
        tag_list,
        published_at,
        user,
        body_markdown,
    } = article;

    const min = reading_time_minutes <= 1 ? 'minuto' : 'minutos';
    const readingTime = `${reading_time_minutes} ${min}`

    return (
        <Container className="my-6 max-w-5xl mx-auto">
            <article className={styles.article}>
                <h1 className="text-3xl">{title}</h1>

                <div className={styles.cover}>
                    <Image
                        alt={`Capa do artigo ${title}`}
                        className="object-cover"
                        src={{
                            src: cover_image,
                            width: 1280,
                            height: 720,
                        }}
                        fill
                        priority={true}
                    />
                </div>

                <div className={styles.metadata}>
                    <Reactions article={article} />
                    <TagList taglist={tag_list} />
                    <span>Publicado { published_at.toRelativeTime() }</span>
                    <span>Tempo de leitura: Aprox. { readingTime } </span>
                </div>

                <div className={styles.author}>
                    <div className={styles.author_photo}>
                        <Image
                            alt={`Imagem do author do artigo`}
                            style={{ objectFit: "cover" }}
                            src={{
                                src: user.profile_image_90,
                                width: 100,
                                height: 100,
                            }}
                            fill
                            sizes="(max-width: 768px) 100px"
                        />
                    </div>

                    <div className={styles.author_infos}>
                        <span>{user.name}</span>
                        <SocialLinks />
                    </div>
                </div>

                <Suspense fallback="Carregando...">
                    <LazyMd>{body_markdown}</LazyMd>
                </Suspense>

                <Reactions article={article} />
            </article>
        </Container>
    )
}

interface WithArticle {
    article: Article
}

function Reactions({ article }: WithArticle) {
    return (
        <div className={styles.reactions}>
            <span><FiHeart /> { article.public_reactions_count.compress() }</span>
            <span><FiMessageCircle /> { article.comments_count.compress() }</span>
        </div>
    )
}

interface TagListProps {
    taglist?: string;
}

function TagList({ taglist = '' }: TagListProps) {
    const tags = taglist.split(', ').filter(Boolean).map((tag) => (
        <a
            href={`${App().NEXT_PUBLIC_DEV_TO_BASE_URL}/t/${tag}`}
            key={tag}
            target="_blank"
        >
            #{tag}
        </a>
    ));

    if (tags.length === 0)
        return null

    return <div className="flex gap-4 flex-wrap">{tags}</div>
}
