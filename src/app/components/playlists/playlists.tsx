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
    return (
        <div>Loading</div>
    )
}
