import { getPlaylists } from "@/data/strapi";
import { PartialPlaylist } from "@/domain/playlist";
import AspectRatioCover from "@/presentation/components/global/aspect-ratio-cover";
import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import Link from "next/link";
import { ImYoutube } from "react-icons/im";
import styles from './playlists.module.css';

interface PlaylistsProps {
    page?: string;
    pageSize?: string;
    search?: string;
}

export async function Playlists({ page: qsPage = '1', pageSize: qsPageSize = '10', search }: PlaylistsProps) {
    const { data: playlists, pagination } = await getPlaylists({
        page: +qsPage,
        pageSize: +qsPageSize,
        search,
    })

    const { nextPageParams, prevPageParams } = pagination;

    const hasNextPage = !!nextPageParams;
    const hasPrevPage = !!prevPageParams;

    return (
        <div className="mt-6 grid grid-cols-1 gap-6">
            <div className={styles.playlist_list}>
                {playlists.map((playlist) => {
                    return (
                        <PlaylistItem
                            key={playlist.id}
                            playlist={playlist}
                        />
                    )
                })}
            </div>

            <div
                aria-hidden={(!hasNextPage && !hasPrevPage)}
                className={styles.divider}
            ></div>

            <div
                aria-hidden={(!hasNextPage && !hasPrevPage)}
                className={styles.pagination}
            >
                <Link
                    aria-hidden={!hasPrevPage}
                    className={styles.page_link}
                    href={`/playlists?${prevPageParams}`}
                >
                    Página anterior
                </Link>

                <Link
                    aria-hidden={!hasNextPage}
                    className={styles.page_link}
                    href={`/playlists?${nextPageParams}`}
                >
                    Próxima página
                </Link>
            </div>
        </div>
    )
}

interface PlaylistItemProps {
    playlist: PartialPlaylist;
}

function PlaylistItem({ playlist }: PlaylistItemProps) {
    const href = `/playlist/${playlist.slug}`;

    return (
        <Card key={playlist.id}>
            <CardHeader>
                <CardTitle>{playlist.title}</CardTitle>

                <Link
                    href={href}
                    className={styles.playlist_cover}
                >
                    <AspectRatioCover
                        src={{
                            src: playlist.cover,
                            width: 1280,
                            height: 1280 * (1 / 16 / 9),
                        }}
                        alt={playlist.title}
                        wrapperClassName="rounded overflow-hidden"
                    />
                </Link>
            </CardHeader>

            <CardContent>
                <small className="text-gray-400">{playlist.publishedAt.toRelativeTime()}</small>
                <p>{playlist.excerpt.trimAfter(120)}</p>
            </CardContent>

            <CardFooter>
                <div className="w-full block">
                    <Button variant="outline" asChild>
                        <Link
                            className="flex gap-2 items-center self-end hover:underline"
                            href={href}
                        >
                            <ImYoutube size={24} />
                            Assistir playlist
                        </Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}

export function PlaylistsSkeleton() {
    return (
        <div className="animate-pulse w-full">
            <div className="mt-6 grid grid-cols-1 gap-6">
                <div className={styles.playlist_list}>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Card key={i.toString()}>
                            <CardHeader>
                                <div className="h-8 w-96 bg-muted-foreground/25 rounded-full"></div>

                                <div className="w-full bg-muted-foreground/25 rounded-md aspect-video flex justify-center items-center p-2">
                                    <svg className="w-10 h-10 text-neutral-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                    </svg>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-2">
                                <div className="h-2 w-48 bg-muted-foreground/25 rounded-full my-2"></div>

                                <div className="h-4 w-full bg-muted-foreground/25 rounded-full"></div>
                                <div className="h-4 w-full bg-muted-foreground/25 rounded-full"></div>
                                <div className="h-4 w-72 bg-muted-foreground/25 rounded-full"></div>
                            </CardContent>

                            <CardFooter>
                                <div className="self-end place-self-end h-8 w-48 bg-muted-foreground/25 rounded-full"></div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div
                    aria-hidden={false}
                    className={styles.divider}
                ></div>

                <div
                    aria-hidden={false}
                    className={styles.pagination}
                >
                    <div className="h-8 w-48 bg-neutral-700 rounded-full"></div>
                    <div className="h-8 w-48 bg-neutral-700 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}
