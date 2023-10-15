import React from "react";
import Image from "next/image";
import Container from "@/app/components/_layout/container";
import { getPlaylistItems } from "@/data/youtube/playlist-items";
import { YTPlaylistItems } from "@/domain/entities/youtube/request";
import styles from './playlist-item.module.css'
import Link from "next/link";

const LazyMD = React.lazy(() => import('@/app/components/_layout/markdown'))

interface PlaylistProps {
    params?: {
        playlistId: string;
    }
}

export default async function Playlist({ params }: PlaylistProps) {
    const playlistId = params?.playlistId

    if (!playlistId) {
        return <Container>Nada encontrado</Container>
    }

    const playlistVideos = await getPlaylistItems(playlistId)
    const { items, nextPageToken, prevPageToken } = playlistVideos

    return (
        <Container className="my-4">
            <h1 className="text-4xl my-4">Vídeos</h1>

            <div className={styles.items_wrapper}>
                {items.map(item => <Video key={item.id} video={item} />)}
            </div>

            <div className={styles.divider}></div>

            <div
                className={styles.pagination}
                aria-hidden={(!prevPageToken && !nextPageToken)}
            >
                <Link
                    className={styles.page_link}
                    aria-hidden={!prevPageToken}
                    href={`/playlist/${playlistId}?page=${prevPageToken}`}
                >
                    Página anterior
                </Link>

                <Link
                    className={styles.page_link}
                    aria-hidden={!prevPageToken}
                    href={`/playlist/${playlistId}?page=${nextPageToken}`}
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
        <div className={styles.item_wrapper}>
            <div className="relative aspect-video w-full rounded-md">
                <Image
                    src={{
                        src: video.snippet.thumbnails.medium?.url!,
                        width: video.snippet.thumbnails.medium?.width!,
                        height: video.snippet.thumbnails.medium?.height!,
                    }}
                    alt={video.snippet.title}
                    fill
                />
            </div>

            <div className={styles.item_content}>
                <h2 className="text-2xl">{video.snippet.title}</h2>
                <small>Publicado {video.snippet.publishedAt.toRelativeTime()}</small>

                <Link href={`/video/${video.contentDetails.videoId}`}>
                    <LazyMD>{description}</LazyMD>
                </Link>
            </div>
        </div>
    )
}
