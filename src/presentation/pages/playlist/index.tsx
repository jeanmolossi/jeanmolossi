import { PlaylistItem } from "@/domain/entities/youtube/view";
import { Container } from "@/presentation/components";
import { PlaylistItem as Item } from './playlist-item'
import * as S from './styles'

export interface PlaylistProps {
    playlistItems: PlaylistItem[];
}

export const Playlist = ({ playlistItems }: PlaylistProps) => {

    return (
        <Container>
            <S.Heading>
                Videos
            </S.Heading>

            <S.ListContainer>
                {playlistItems.map(item => (
                    <Item item={item} key={item.id.toString()} />
                ))}
            </S.ListContainer>
        </Container>
    );
}
