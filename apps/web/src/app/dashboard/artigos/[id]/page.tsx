import NotFound from '@/app/not-found';
import { supabase } from '@/lib/supabase/client';
import Container from '@/presentation/components/_layout/container';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { getArticleById } from './actions';
import Cover from './cover';

interface PageProps {
    searchParams: Record<string, string>;
    params: Record<string, string>;
}

const LazyMd = React.lazy(() => import('@/presentation/components/markdown'))

export default async function Page({ params }: PageProps) {
    const { id } = params;
    const article = await getArticleById(id);

    if (!article) {
        return NotFound()
    }

    const { data } = supabase.storage.from('media').getPublicUrl(article?.cover!)

    return (
        <Container className='my-6 max-w-5xl mx-auto'>
            <article>
                <Cover
                    alt={`Capa do artigo ${article?.title}`}
                    src={{
                        src: data.publicUrl,
                        blurDataURL: article?.blurhash || undefined,
                        width: 1280,
                        height: 720,
                    }}
                />

                <h1 className="text-3xl font-bold leading-10">{article.title}</h1>
                <h2 className="text-xl">{article.subtitle}</h2>

                <div className=''>
                    <div className="text-muted-foreground">
                        {/* <small>Publicado { (article.published_at || new Date()).toRelativeTime() }</small> */}
                        <small> &#8226; </small>
                        <small>~{ article.reading_time } min. de leitura </small>

                        {/* <TagList taglist={taglist.join(', ')} /> */}
                    </div>

                    <div className='author'>
                        {/* <AuthorPic src={author.profileImg} className="w-20" /> */}

                        <div className=''>
                            <Link href={`/links`}>Jean Molossi</Link>
                            {/* <SocialLinks /> */}
                        </div>
                    </div>
                </div>

                <Suspense fallback="Carregando...">
                    <LazyMd>{article.content}</LazyMd>
                </Suspense>
            </article>
        </Container>
    )
}
