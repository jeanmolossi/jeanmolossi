import { SocialLinks } from "@/app/components/social-links";
import { App } from "@/config/constants";
import { getArticleBySlug } from "@/data/strapi";
import Container from "@/presentation/components/_layout/container";
import AspectRatioCover from "@/presentation/components/global/aspect-ratio-cover";
import AuthorPic from "@/presentation/components/global/author-pic";
import { Metadata } from "next";
import Link from "next/link";
import React, { Suspense } from "react";
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
        subtitle,
        readingTimeMinutes = 0,
        cover,
        tags: taglist,
        publishedAt,
        author,
        content,
    } = article;

    const min = readingTimeMinutes <= 1 ? 'minuto' : 'minutos';
    const readingTime = `${readingTimeMinutes} ${min}`

    return (
        <Container className="my-6 max-w-5xl mx-auto">
            <article className={styles.article}>
                <AspectRatioCover
                    alt={`Capa do artigo ${title}`}
                    src={{
                        src: cover,
                        width: 1280,
                        height: 720,
                    }}
                    prority
                />

                <h1 className="text-3xl font-bold leading-10">{title}</h1>
                <h2 className="text-xl">{subtitle}</h2>

                <div className={styles.metadata}>
                    <div className="text-muted-foreground">
                        <small>Publicado { publishedAt.toRelativeTime() }</small>
                        <small> &#8226; </small>
                        <small>~{ readingTime } min. de leitura </small>

                        <TagList taglist={taglist.join(', ')} />
                    </div>

                    <div className={styles.author}>
                        <AuthorPic src={author.profileImg} className="w-20" />

                        <div className={styles.author_infos}>
                            <Link href={`/links`}>{author.name}</Link>
                            <SocialLinks />
                        </div>
                    </div>
                </div>

                <Suspense fallback="Carregando...">
                    <LazyMd>{content}</LazyMd>
                </Suspense>
            </article>
        </Container>
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
            rel="noopener noreferer"
        >
            #{tag}
        </a>
    ));

    if (tags.length === 0)
        return null

    return <div className="flex gap-4 flex-wrap">{tags}</div>
}

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
    const slug = params?.slug!

    const article = await getArticleBySlug(slug)
    let {
        title,
        subtitle,
        readingTimeMinutes = 0,
        cover,
        tags,
        publishedAt,
        author,
    } = article;

    const titleParts = title.split(/[:\?]/)
    let description = subtitle.trimAfter(150);

    if (titleParts.length > 1) {
        title = titleParts[0].trimAfter(50)
        description = titleParts[1].trimAfter(150)
    } else {
        title = title.trimAfter(50)
    }

    cover = cover.replace(/^https?:\/\/(.+)(\/uploads.+)/, '$2')
    cover = 'https://cdn.jeanmolossi.com.br'.concat(cover)

    return {
        title,
        description,
        keywords: tags,
        authors: [{ name: author.name }],
        openGraph: {
            images: [new URL(cover)],
            title,
            description,
            publishedTime: publishedAt,
            type: 'article',
            countryName: 'Brazil'
        }
    }
}
