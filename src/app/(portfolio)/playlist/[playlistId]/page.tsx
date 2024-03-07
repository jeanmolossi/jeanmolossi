import { getPlaylistVideos } from "@/data/strapi";
import { getPlaylist } from "@/data/strapi/playlists/get-playlist";
import { PartialVideo } from "@/domain/playlist";
import { cn } from "@/lib/helpers";
import Container from "@/presentation/components/_layout/container";
import AspectRatioCover from "@/presentation/components/global/aspect-ratio-cover";
import PageHeading from "@/presentation/components/global/page-heading";
import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { ArrowLeftCircle } from "lucide-react";
import { Metadata, ResolvedMetadata } from "next";
import Link from "next/link";
import React from "react";
import styles from './playlist-item.module.css';

const LazyMD = React.lazy(() => import('@/presentation/components/markdown'))

interface PlaylistProps {
    params?: {
        playlistId: string;
    }
    searchParams?: {
        page?: string;
        pageSize?: string;
        search?: string;
    }
}

export async function generateMetatada(
    { params }: PlaylistProps,
    _parent: ResolvedMetadata
): Promise<Metadata> {
    console.log('generateMeta')
    const playlistId = params?.playlistId!
    const playlist = await getPlaylist(playlistId);

    let title = playlist.title;
    if (title.length > 60)
        title = playlist.title.trimAfter(60, '');
    else if ((title.length + ' | Jean Molossi'.length) <= 60)
        title = [playlist.title, 'Jean Molossi'].join(' | ')

    return {
        title,
        description: playlist.excerpt.trimAfter(150, ''),
        authors: [{ name: 'Jean Molossi', url: 'https://jeanmolossi.com.br' }],
        creator: 'Jean Molossi',
        publisher: 'Jean Molossi',
    }
}

export default async function Page({ params, searchParams }: PlaylistProps) {
    const {
        page: qsPage = '1',
        pageSize: qsPageSize = '10',
        search
    } = searchParams || {}

    const playlistId = params?.playlistId

    if (!playlistId) {
        return <Container>Nada encontrado</Container>
    }

    const { data: playlistVideos, pagination } = await getPlaylistVideos({
        canonicalUrl: playlistId,
        page: +qsPage,
        pageSize: +qsPageSize,
        search,
    })

    const { nextPageParams, prevPageParams } = pagination

    const emptyVideos = playlistVideos.length === 0;

    const hasPrevPage = !!prevPageParams
    const hasNextPage = !!nextPageParams

    return (
        <Container className="my-4">
            <PageHeading>Vídeos</PageHeading>

            <div className={cn({'hidden': !emptyVideos}, 'mx-auto max-w-[768px]')}>
                <h1 className="text-7xl mb-8">Oops! Nenhum vídeo</h1>

                <p>
                    Nenhum vídeo foi adicionado à essa playlist ainda.{' '}
                    Seja o primeiro a saber quando um vídeo for adicionado!
                </p>

                <div className="my-4">
                    <label htmlFor="mail">Quero ser avisado: </label>
                    <input id="mail" placeholder="Deixe seu e-mail" className="p-2 rounded" />
                </div>

                <Button asChild variant={'link'} size="lg">
                    <Link href="/playlists">
                        <ArrowLeftCircle />
                        Volte para as playlists
                    </Link>
                </Button>
            </div>


            <div className={styles.items_wrapper}>
                {playlistVideos.map(item => <Video key={item.slug} video={item} />)}
            </div>

            <div className={styles.divider}></div>

            <div
                className={styles.pagination}
                aria-hidden={(!hasPrevPage && !hasNextPage)}
            >
                <Link
                    className={styles.page_link}
                    aria-hidden={!hasPrevPage}
                    href={`/playlist/${playlistId}?${prevPageParams}`}
                >
                    Página anterior
                </Link>

                <Link
                    className={styles.page_link}
                    aria-hidden={!hasNextPage}
                    href={`/playlist/${playlistId}?${nextPageParams}`}
                >
                        Proxima página
                </Link>
            </div>
        </Container>
    )
}

interface VideoProps {
    video: PartialVideo
}

function Video({ video }: VideoProps) {
    const description = video
        .description
        .nlToBr()
        .trimAfter(250, '... _**ver mais**_');

    return (
        <Card className={styles.item_wrapper}>
            <AspectRatioCover
                priority
                src={{
                    src: video.cover,
                    width: 1280,
                    height: 720,
                }}
                alt={video.title}
                sizes="1280x720"
                wrapperClassName="rounded overflow-hidden"
            />

            <CardContent>
                <h2 className="text-2xl">{video.title}</h2>
                <small>Publicado {video.publishedAt.toRelativeTime()}</small>

                <Link href={`/video/${video.slug}`}>
                    <LazyMD>{description}</LazyMD>
                </Link>
            </CardContent>
        </Card>
    )
}
