import { YTPlaylist } from "@/domain/entities/youtube/request";
import { Container } from "@/presentation/components"
import dynamic from "next/dynamic";
import { FunctionComponent } from "react";
import { PlaylistItemProps } from './playlist'
import * as S from './styles'

const LazyPlaylistItem = dynamic(
    () => import('./playlist').then(mod => mod.PlaylistItem)
) as FunctionComponent<PlaylistItemProps>

export interface Playlist {
    id: string;
    title: string;
    description: string;
    thumbnail: {
        small: YTPlaylist.Resolution;
        big: YTPlaylist.Resolution;
    },
    slug: string;
    publishedAt: string;
}

export interface KnowledgeProps {
    playlists: Playlist[];
}

export const Knowledge = ({ playlists }: KnowledgeProps) => {
    return (
        <Container>
            <S.KnowledgeContainer>
                <h1>Aprenda com projetos práticos</h1>
                <h2>Playlists organizadas</h2>

                <S.Playlists>
                    {playlists.map(playlist => (
                        <LazyPlaylistItem key={playlist.id} playlist={playlist} />
                    ))}
                </S.Playlists>
            </S.KnowledgeContainer>
        </Container>
    )
}
