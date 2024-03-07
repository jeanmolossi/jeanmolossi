import { getPlaylistItems } from "@/data/youtube/playlist-items";
import { YTPlaylistItems } from "@/domain/entities/youtube/request";
import { cn } from "@/lib/helpers";
import Container from "@/presentation/components/_layout/container";
import AspectRatioCover from "@/presentation/components/global/aspect-ratio-cover";
import PageHeading from "@/presentation/components/global/page-heading";
import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { ArrowLeftCircle } from "lucide-react";
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
    }
}

export default async function Playlist({ params, searchParams }: PlaylistProps) {
    const playlistId = params?.playlistId
    const page = searchParams?.page || '1'
    const pageSize = searchParams?.pageSize || '10'

    if (!playlistId) {
        return <Container>Nada encontrado</Container>
    }

    const playlistVideos = await getPlaylistItems({ playlistId, page, pageSize })
    const { items, nextPageParams, prevPageParams } = playlistVideos

    const emptyVideos = items.length === 0;

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
                {items.map(item => <Video key={item.id} video={item} />)}
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
    video: YTPlaylistItems.Item
}

function Video({ video }: VideoProps) {
    const description = video
        .snippet
        .description
        .nlToBr()
        .trimAfter(250, '... _**ver mais**_');

    return (
        <Card className={styles.item_wrapper}>
            <AspectRatioCover
                src={{
                    src: video.snippet.thumbnails.medium?.url!,
                    width: video.snippet.thumbnails.medium?.width!,
                    height: video.snippet.thumbnails.medium?.height!,
                }}
                alt={video.snippet.title}
                wrapperClassName="rounded overflow-hidden"
            />

            <CardContent>
                <h2 className="text-2xl">{video.snippet.title}</h2>
                <small>Publicado {video.snippet.publishedAt.toRelativeTime()}</small>

                <Link href={`/video/${video.snippet.resourceId.videoId}`}>
                    <LazyMD>{description}</LazyMD>
                </Link>
            </CardContent>
        </Card>
    )
}
