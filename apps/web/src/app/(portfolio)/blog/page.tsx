import { getArticles } from '@/data/strapi';
import { PartialArticle } from '@/domain/article';
import Container from '@/presentation/components/_layout/container';
import AspectRatioCover from '@/presentation/components/global/aspect-ratio-cover';
import PageHeading from '@/presentation/components/global/page-heading';
import SearchBar from '@/presentation/components/global/page-heading/search-bar';
import {
    HeadSubtitle,
    HeadTitle,
    Headings,
} from '@/presentation/components/global/page-heading/title';
import { trimAfter } from '@/presentation/helpers/string';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@jeanmolossi/ui';
import { Link2 } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import styles from './blog.module.css';

interface BlogProps {
    params?: {};
    searchParams?: {
        page?: string;
        pageSize?: string;
        search?: string;
    };
}

export const metadata: Metadata = {
    title: trimAfter.call('Jean Molossi | Blog', 50),
    description: trimAfter.call('Artigos sobre tecnologia e programação', 150),
    publisher: 'https://jeanmolossi.com.br',
};

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
        search: searchParams?.search,
    });

    const showingText =
        articles.length <= 1
            ? `Mostrando ${articles.length} artigo`
            : `Mostrando ${articles.length} artigos`;

    const { nextPageParams, prevPageParams } = pagination;

    const hasNextPage = !!nextPageParams;
    const hasPrevPage = !!prevPageParams;

    return (
        <Container className="my-6">
            <PageHeading>
                <Headings>
                    <HeadTitle>Blog</HeadTitle>
                    <HeadSubtitle>{showingText}</HeadSubtitle>
                </Headings>

                <Suspense>
                    <SearchBar placeholder="Pesquise por um artigo" />
                </Suspense>
            </PageHeading>

            <div className={styles.articles_wrapper}>
                {articles.map(article => (
                    <Article key={article.slug} article={article} />
                ))}
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
    );
}

interface ArticleProps {
    article: PartialArticle;
}

function Article({ article }: ArticleProps) {
    const href = `/artigo/${article.slug}`;

    return (
        <Card>
            <CardHeader>
                <Link
                    className="data-[hidden='true']:hidden border-2 border-transparent hover:border-primary transition-all rounded-md"
                    href={href}
                    aria-hidden={!article.cover}
                    data-hidden={!article.cover}
                >
                    <AspectRatioCover
                        loading="lazy"
                        src={{
                            src: article.cover,
                            width: 1280,
                            height: 720,
                        }}
                        alt={`Capa do artigo ${article.title}`}
                        wrapperClassName="rounded overflow-hidden"
                    />
                </Link>

                <CardTitle className="leading-8">
                    <Link href={href}>{article.title}</Link>
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <Link
                    href={href}
                    className="hover:text-cyan-500 flex-1 shrink-0"
                >
                    {article.excerpt}
                </Link>

                <p className="text-muted-foreground">
                    <small>{article.publishedAt.toRelativeTime()}</small>
                    <small> &#8226; </small>
                    <small>{article.readingTimeMinutes} min. leitura</small>
                </p>
            </CardContent>

            <CardFooter className="justify-end">
                <Link
                    href={href}
                    className="flex items-center self-end gap-2 text-cyan-500 hover:underline underline-offset-2"
                >
                    <Link2 />
                    Veja o artigo completo
                </Link>
            </CardFooter>
        </Card>
    );
}
