import { useRouter } from "next/router";
import { PlaylistItem } from "@/domain/entities/youtube/view";
import { Container } from "@/presentation/components";

export interface PlaylistProps {
    playlistItems: PlaylistItem[];
}

export const Playlist = ({ playlistItems }: PlaylistProps) => {

    return (
        <Container>
            <br />
            <br />
            <br />
            <br />
            <h1>Ok</h1>

            {playlistItems.map(item => (
                <div>
                    <img src={item.snippet.thumbnails.medium.url} />
                    <h1>{item.snippet.title}</h1>
                    <p>{item.snippet.description}</p>
                </div>
            ))}
        </Container>
    );
}
