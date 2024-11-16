import { supabase } from '@/lib/supabase/client';
import { Button } from '@jeanmolossi/ui';
import { ChevronRight, PlusSquare } from 'lucide-react';
import Link from 'next/link';
import Cover from '../_components/cover';
import { getArticles } from './action';

export default async function Page(props: { searchParams: Promise<Record<string, string>> }) {
    const searchParams = await props.searchParams;
    const articles = await getArticles({
        limit: parseInt(searchParams.limit || '10'),
        offset: parseInt(searchParams.offset || '0'),
    })

    return (
        <div className="p-4 flex flex-col gap-6">
            <h1 className='text-2xl'>Menu rápido</h1>

            <nav>
                <Button asChild>
                    <Link href="/dashboard/artigos/new">
                        <PlusSquare />
                        Novo
                    </Link>
                </Button>
            </nav>

            <h1 className='text-2xl'>Seus artigos</h1>

            <div className='flex flex-col gap-4'>
                {articles.map(article => (
                    <div className='border rounded group/link'>
                        <Link href={`/dashboard/artigos/${article.id}`} className='flex gap-4 p-4 items-center'>
                            <Cover
                                src={supabase.storage.from('media').getPublicUrl(article.cover!).data.publicUrl}
                                blurhash={article.blurhash || undefined}
                                title={article.title}
                            />

                            <div className='flex flex-1 gap-4'>
                                <div className='flex flex-col'>
                                    <h1 className='text-lg'>{article.title}</h1>
                                    <h1 className=''>{article.subtitle}</h1>
                                </div>

                                <div className='flex gap-4 self-end'>
                                    {article.tags.map(({ tag }) => (
                                        <span>#{tag.name}</span>
                                    ))}
                                </div>
                            </div>

                            <ChevronRight className='w-8 h-8 group-hover/link:translate-x-3 transition-all' />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export const dynamic = 'force-dynamic'
