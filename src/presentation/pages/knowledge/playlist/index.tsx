import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { SiYoutube } from "react-icons/si";
import { Playlist } from "@/domain/entities/youtube/view";
import { RenderIf } from "@/presentation/helpers";
import { useMediaQuery } from "@/presentation/hooks";
import * as S from "./styles";

export interface PlaylistItemProps {
    playlist: Playlist;
}

export const PlaylistItem = React.memo(({ playlist }: PlaylistItemProps) => {
    const isUpMediaQuery = useMediaQuery('(min-width: 768px)')

    const src = useMemo(() => {
        return isUpMediaQuery
                ? playlist.thumbnail.big.url
                : playlist.thumbnail.small.url;
    }, [isUpMediaQuery])

    const description = useMemo(() => {
        const maxLength = isUpMediaQuery ? 200 : 350;
        return playlist
            .description
            .nlToBr()
            .trimAfter(maxLength)
    }, [playlist.description, isUpMediaQuery])

    return (
        <S.ItemContainer>
            <Link
                href="/playlists/[...slug]"
                as={`/playlists/${playlist.slug}`}
            >
                <S.ItemCover>
                    <Image
                        alt={`capa da playlist ${playlist.title}`}
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                        src={{ src, width: 1280, height: 720 }}
                        fill
                    />
                </S.ItemCover>
            </Link>

            <S.ItemDescription>
                <Link
                    href="/playlists/[...slug]"
                    as={`/playlists/${playlist.slug}`}
                >
                    <h1>{playlist.title}</h1>
                </Link>

                <small>Publicada {playlist.publishedAt.toRelativeTime()}</small>

                <RenderIf condition={!!playlist.description}>
                    <Link
                        href="/playlists/[...slug]"
                        as={`/playlists/${playlist.slug}`}
                    >
                        <p
                            title={playlist.description}
                            dangerouslySetInnerHTML={{ __html: description }}>
                        </p>
                    </Link>
                </RenderIf>

                <Link
                    href="/playlists/[...slug]"
                    as={`/playlists/${playlist.slug}`}
                >
                    <SiYoutube /> Ver vídeos desta playlist
                </Link>
            </S.ItemDescription>
        </S.ItemContainer>
    );
})
