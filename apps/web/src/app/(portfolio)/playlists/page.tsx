import {
    Playlists,
    PlaylistsSkeleton,
} from '@/app/components/playlists/playlists';
import PageHeading from '@/presentation/components/global/page-heading';
import SearchBar from '@/presentation/components/global/page-heading/search-bar';
import {
    HeadSubtitle,
    HeadTitle,
    Headings,
} from '@/presentation/components/global/page-heading/title';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Playlists | Vídeo aulas',
    description: 'Aprenda com projetos práticos comigo',
};

interface PlaylistsPageProps {
    params?: {};
    searchParams?: {
        page?: string;
        pageSize?: string;
        search?: string;
    };
}

export default function PlaylistsPage({ searchParams }: PlaylistsPageProps) {
    const page = searchParams?.page || '1';
    const pageSize = searchParams?.pageSize || '10';
    const search = searchParams?.search;

    return (
        <>
            <PageHeading>
                <Headings>
                    <HeadTitle>Playlists</HeadTitle>
                    <HeadSubtitle>Aprenda com projetos práticos</HeadSubtitle>
                </Headings>

                <Suspense>
                    <SearchBar placeholder="Pesquise por uma playlist" />
                </Suspense>
            </PageHeading>

            <Suspense fallback={<PlaylistsSkeleton />}>
                <Playlists page={page} pageSize={pageSize} search={search} />
            </Suspense>
        </>
    );
}

export const revalidate = 300;
