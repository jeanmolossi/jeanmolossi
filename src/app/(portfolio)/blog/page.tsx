import { getArticles } from "@/data/strapi";
import { PartialArticle } from "@/domain/article";
import Container from '@/presentation/components/_layout/container';
import Image from 'next/image';
import Link from 'next/link';
import { FiBookOpen, FiEye, FiHeart } from 'react-icons/fi';
import styles from './blog.module.css';

interface BlogProps {
    params?: {};
    searchParams?: {
        page?: string;
        pageSize?: string;
    }
}

export default async function Blog({ searchParams }: BlogProps) {
    const page = +(searchParams?.page || 0)
        ? +(searchParams?.page || 1)
        : undefined;

    const pageSize = +(searchParams?.pageSize || 0)
        ? +(searchParams?.pageSize || 10)
        : undefined;

    const { data: articles, pagination } = await getArticles({
        page,
        pageSize,
    })

    const showingText = articles.length <= 1
        ? `Mostrando ${articles.length} artigo`
        : `Mostrando ${articles.length} artigos`

    const { nextPageParams, prevPageParams } = pagination;

    const hasNextPage = !!nextPageParams
    const hasPrevPage = !!prevPageParams

    return (
        <Container className='my-6'>
            <h1 className="text-3xl">Blog</h1>
            <h2 className='text-lg font-medium text-gray-500'>{showingText}</h2>

            <div className={styles.articles_wrapper}>
                {articles.map((article) =>
                    <Article key={article.slug} article={article} />)}
            </div>

            <div
                aria-hidden={!hasPrevPage && !hasNextPage}
                className={styles.divider}
            ></div>

            <div
                aria-hidden={!hasPrevPage && !hasNextPage}
                className={styles.pagination}
            >
                <Link
                    aria-hidden={!hasPrevPage}
                    href={`/blog?${prevPageParams}`}
                    className={styles.page_link}
                >
                    Página anterior
                </Link>

                <Link
                    aria-hidden={!hasNextPage}
                    href={`/blog?${nextPageParams}`}
                    className={styles.page_link}
                >
                    Próxima página
                </Link>
            </div>
        </Container>
    )
}

interface ArticleProps {
    article: PartialArticle;
}

function Article({ article }: ArticleProps) {
    const href = `/artigo/${article.slug}`;

    return (
        <article className={styles.article}>
            <Link
                className={styles.article_cover}
                href={href}
                aria-hidden={!article.cover}
            >
                <Image
                    loading='lazy'
                    className='object-cover'
                    src={{
                        src: article.cover,
                        width: 1280,
                        height: 720
                    }}
                    alt={`Capa do artigo ${article.title}`}
                    fill
                />
            </Link>

            <div className={styles.article_content}>
                <h1 className='text-xl'>{article.title}</h1>

                {/* DETAILS */}
                <div className={styles.article_details}>
                    {/* FOTO */}
                    <div className='relative rounded-full overflow-hidden aspect-square w-12'>
                        <Image
                            src={{
                                src: article.author.profileImg,
                                width: 90,
                                height: 90
                            }}
                            alt={`Foto de perfil do autor`}
                        />
                    </div>

                    {/* AUTHOR INFO */}
                    <div className={styles.article_author}>
                        <span>{article.author.name}</span>
                        <small>Publicado {article.publishedAt.toRelativeTime()}</small>
                        <span>Aprox. {article.readingTimeMinutes} minutos de leitura</span>
                    </div>

                    {/* REACTIONS */}
                    <div className={styles.article_reactions}>
                        <span title={`${article.reactionsCount.compress()} curtidas`}>
                            <FiHeart /> {article.reactionsCount.compress()}
                        </span>

                        <span title={`${article.views.compress()} visualizações pelo dev.to`}>
                            <FiEye /> {article.views.compress()}
                        </span>
                    </div>
                </div>

                <Link
                    href={href}
                    className='text-white hover:text-cyan-500 flex-1 shrink-0'
                >
                    {article.excerpt}
                </Link>

                <Link href={href} className='flex items-center self-end gap-2 text-cyan-500 hover:underline underline-offset-2'>
                    <FiBookOpen />
                    Veja o artigo completo
                </Link>
            </div>
        </article>
    )
}
