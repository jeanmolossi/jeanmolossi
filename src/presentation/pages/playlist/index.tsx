import { useMemo } from "react";
import { useRouter } from "next/router";
import { PlaylistItem } from "@/domain/entities/youtube/view";
import { BaseHead, Container, Robots } from "@/presentation/components";
import { PlaylistItem as Item } from './playlist-item'
import * as S from './styles'

export interface PlaylistProps {
    playlistItems: PlaylistItem[];
}

export const Playlist = ({ playlistItems }: PlaylistProps) => {
    const router = useRouter()

    const slug = useMemo(() => router.asPath, [router])
    const description = useMemo(() => playlistItems[0].snippet.title, [playlistItems])
    const images = useMemo(() => playlistItems.map(p => p.snippet.thumbnails.medium.url), [playlistItems])

    return (
        <Container>
            <BaseHead
                title={`Playlists`}
                description={`Playlists de conteúdo. ${description}`}
                og={{
                    type: 'page',
                    url: `https://jeanmolossi.com.br${slug}`,
                    image: images
                }}
                robots={[Robots.index, Robots.follow, Robots.noimageindex]}
                canonical={`${slug}`}
            />
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
