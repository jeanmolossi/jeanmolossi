import Link from "next/link";
import { getPlaylists } from "@/data/youtube/playlists"
import styles from './playlists.module.css';
import { Playlist } from "@/domain/entities/youtube/view";
import Image from "next/image";
import { ImYoutube } from "react-icons/im";

interface PlaylistsProps {
    page?: string;
}

export async function Playlists({ page }: PlaylistsProps) {
    const playlists = await getPlaylists({ page })

    const hasNextPage = !!playlists.nextPageToken;
    const hasPrevPage = !!playlists.prevPageToken;

    return (
        <div className="mt-6 grid grid-cols-1 gap-6">
            <div className={styles.playlist_list}>
                {playlists.playlists.map((playlist) => {
                    return (
                        <PlaylistItem
                            key={playlist.id}
                            playlist={playlist}
                        />
                    )
                })}
            </div>

            <div
                aria-hidden={!(hasNextPage && hasPrevPage)}
                className={styles.divider}
            ></div>

            <div
                aria-hidden={!(hasNextPage && hasPrevPage)}
                className={styles.pagination}
            >
                <Link
                    aria-hidden={!hasPrevPage}
                    className={styles.page_link}
                    href={`/playlists?page=${playlists.prevPageToken}`}
                >
                    Página anterior
                </Link>

                <Link
                    aria-hidden={!hasNextPage}
                    className={styles.page_link}
                    href={`/playlists?page=${playlists.nextPageToken}`}
                >
                    Próxima página
                </Link>
            </div>
        </div>
    )
}

interface PlaylistItemProps {
    playlist: Playlist;
}

function PlaylistItem({ playlist }: PlaylistItemProps) {
    const href = `/playlist/${playlist.id}`;

    return (
        <div key={playlist.id} className={styles.playlist_item}>
            <h3 className="text-2xl">{playlist.title}</h3>

            <Link
                href={href}
                className={styles.playlist_cover}
            >
                <Image
                    className="object-cover"
                    src={{
                        src: playlist.thumbnail.big.url,
                        width: playlist.thumbnail.big.width,
                        height: playlist.thumbnail.big.height,
                    }}
                    alt={playlist.title}
                    fill
                />
            </Link>

            <p>{playlist.description.trimAfter(120)}</p>

            <Link
                className="flex gap-2 items-center self-end hover:underline"
                href={href}
            >
                <ImYoutube size={24} />
                Assistir playlist
            </Link>
        </div>
    )
}

export function PlaylistsSkeleton() {
    const item = [styles.playlist_item, 'h-[458px]'].join(' ')

    return (
        <div className="animate-pulse w-full">
            <div className="mt-6 grid grid-cols-1 gap-6">
                <div className={styles.playlist_list}>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i.toString()} className={item}>
                            <div className="h-8 w-96 bg-neutral-700 rounded-full"></div>

                            <div className="w-full bg-neutral-700 rounded-md aspect-video flex justify-center items-center">
                                <svg className="w-10 h-10 text-neutral-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                            </div>

                            <div className="h-3 w-full bg-neutral-700 rounded-full"></div>
                            <div className="h-3 w-full bg-neutral-700 rounded-full"></div>
                            <div className="h-3 w-72 bg-neutral-700 rounded-full"></div>

                            <div className="self-end place-self-end h-8 w-48 bg-neutral-700 rounded-full"></div>
                        </div>
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
