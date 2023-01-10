import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { SiYoutube } from "react-icons/si";
import { Playlist } from "@/domain/entities/youtube/view";
import { cdnLoader, RenderIf } from "@/presentation/helpers";
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
        <Link href="/playlists/[...slug]" as={`/playlists/${playlist.slug}`} passHref legacyBehavior>
            <S.ItemContainer>
                <S.ItemCover>
                    <div>
                        <Image
                            alt={`capa da playlist ${playlist.title}`}
                            loader={cdnLoader}
                            loading="lazy"
                            objectFit="cover"
                            src={{ src, width: 1280, height: 720 }}
                        />
                    </div>
                </S.ItemCover>

                <S.ItemDescription>
                    <h1>{playlist.title}</h1>

                    <small>Publicada {playlist.publishedAt.toRelativeTime()}</small>

                    <RenderIf condition={!!playlist.description}>
                        <p
                            title={playlist.description}
                            dangerouslySetInnerHTML={{ __html: description }}>
                        </p>
                    </RenderIf>

                    <span>
                        <SiYoutube /> Ver vídeos desta playlist
                    </span>
                </S.ItemDescription>
            </S.ItemContainer>
        </Link>
    );
})
