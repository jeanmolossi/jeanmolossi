import { FunctionComponent, useMemo } from "react";
import dynamic from "next/dynamic";
import { Playlist } from "@/domain/entities/youtube/view";
import { BaseHead, Container } from "@/presentation/components"
import { PlaylistItemProps } from './playlist'
import * as S from './styles'

const LazyPlaylistItem = dynamic(
    () => import('./playlist').then(mod => mod.PlaylistItem)
) as FunctionComponent<PlaylistItemProps>

export interface KnowledgeProps {
    playlists: Playlist[];
}

export const Knowledge = ({ playlists }: KnowledgeProps) => {
    const playlistsNames = useMemo(() => playlists.map(p => p.title).join(', '), [playlists])

    return (
        <Container>
            <BaseHead
                title="Aprenda na prática"
                description={`Projetos práticos como ${playlistsNames.trimAfter(37)}`}
                canonical="/aprendizado"
            />
            <S.KnowledgeContainer>
                <S.Heading>
                    <h1>Aprenda com projetos práticos</h1>
                    <h2>Playlists organizadas</h2>
                </S.Heading>

                <S.Playlists>
                    {playlists.map(playlist => (
                        <LazyPlaylistItem key={playlist.id} playlist={playlist} />
                    ))}
                </S.Playlists>
            </S.KnowledgeContainer>
        </Container>
    )
}
