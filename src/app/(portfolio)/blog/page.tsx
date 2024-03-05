import Container from '@/app/components/_layout/container';
import { getArticles } from "@/data/dev.to";
import { ArticleResult } from '@/domain/entities/dev.to/article';
import Image from 'next/image';
import Link from 'next/link';
import { FiBookOpen, FiEye, FiHeart } from 'react-icons/fi';
import styles from './blog.module.css';

interface BlogProps {
    params?: {};
    searchParams?: {
        page?: string;
        per_page?: string;
    }
}

export default async function Blog({ searchParams }: BlogProps) {
    let page: number | undefined = Number(searchParams?.page);
    let perPage: number | undefined = Number(searchParams?.per_page);

    if (isNaN(page))
        page = undefined;

    if (isNaN(perPage))
        perPage = undefined;

    const articles = await getArticles({ page, perPage })

    const showingText = articles.length <= 1
        ? `Mostrando ${articles.length} artigo`
        : `Mostrando ${articles.length} artigos`

    const hasNextPage = !perPage || articles.length >= perPage;
    const hasPrevPage = !!page && page > 1

    const prevParams = new URLSearchParams(searchParams)
    if (hasPrevPage)
        prevParams.set('page', ((page || 2)-1).toString())

    const nextParams = new URLSearchParams(searchParams)
    if (hasNextPage)
        nextParams.set('page', ((page || 1)+1).toString())

    if (!perPage)
        nextParams.set('per_page', '10')

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
                    href={`/blog?${prevParams.toString()}`}
                    className={styles.page_link}
                >
                    Página anterior
                </Link>

                <Link
                    aria-hidden={!hasNextPage}
                    href={`/blog?${nextParams.toString()}`}
                    className={styles.page_link}
                >
                    Próxima página
                </Link>
            </div>
        </Container>
    )
}

interface ArticleProps {
    article: ArticleResult;
}

function Article({ article }: ArticleProps) {
    const href = `/artigo/${article.slug}`;

    return (
        <article className={styles.article}>
            <Link
                className={styles.article_cover}
                href={href}
                aria-hidden={!article.cover_image}
            >
                <Image
                    loading='lazy'
                    className='object-cover'
                    src={{
                        src: article.cover_image,
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
                                src: article.user.profile_image_90,
                                width: 90,
                                height: 90
                            }}
                            alt={`Foto de perfil do autor`}
                        />
                    </div>

                    {/* AUTHOR INFO */}
                    <div className={styles.article_author}>
                        <span>{article.user.name}</span>
                        <small>Publicado {article.published_at.toRelativeTime()}</small>
                        <span>Aprox. {article.reading_time_minutes} minutos de leitura</span>
                    </div>

                    {/* REACTIONS */}
                    <div className={styles.article_reactions}>
                        <span title={`${article.public_reactions_count.compress()} curtidas`}>
                            <FiHeart /> {article.public_reactions_count.compress()}
                        </span>

                        <span title={`${article.page_views_count.compress()} visualizações pelo dev.to`}>
                            <FiEye /> {article.page_views_count.compress()}
                        </span>
                    </div>
                </div>

                <Link
                    href={href}
                    className='text-white hover:text-cyan-500 flex-1 shrink-0'
                >
                    {article.description}
                </Link>

                <Link href={href} className='flex items-center self-end gap-2 text-cyan-500 hover:underline underline-offset-2'>
                    <FiBookOpen />
                    Veja o artigo completo
                </Link>
            </div>
        </article>
    )
}
