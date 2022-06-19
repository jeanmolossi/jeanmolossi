import { YTPlaylist } from "@/domain/entities/youtube/request";
import { Container } from "@/presentation/components"
import * as S from './styles'

export interface Playlist {
    id: string;
    title: string;
    description: string;
    thumbnail: {
        small: YTPlaylist.Resolution;
        big: YTPlaylist.Resolution;
    },
    slug: string;
}

export interface KnowledgeProps {
    playlists: Playlist[];
}

export const Knowledge = ({ playlists }: KnowledgeProps) => {
    return (
        <Container>
            <S.KnowledgeContainer>
                <h1>Página de aprendizado em desenvolvimento</h1>

                {playlists.map(playlist => (
                    <div key={playlist.id}>
                        <img src={playlist.thumbnail.small.url} alt={playlist.title} />
                        <span>{playlist.title}</span>
                        <p>{playlist.description}</p>
                        <hr />
                    </div>
                ))}
            </S.KnowledgeContainer>
        </Container>
    )
}
