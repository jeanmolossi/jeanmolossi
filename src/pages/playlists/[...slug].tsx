import logger from "@/config/logger/logger"
import { getPlaylistItems } from "@/data/youtube/playlist-items"
import { getPlaylists } from "@/data/youtube/playlists"
import { timeIn } from "@/presentation/helpers"
import { Playlist, PlaylistProps } from "@/presentation/pages/playlist"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"

const PlaylistVideos = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    return null
    // return <Playlist {...props} />
}

export default PlaylistVideos

export const getStaticPaths: GetStaticPaths = async () => {
    const { playlists } = await getPlaylists();

    const paths = playlists.map((playlist) => ({
        params: { slug: playlist.slug.split('/') },
    }))

    return {
        paths: paths,
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<PlaylistProps> = async ({ params }) => {
    let notFound = false;
    let playlistItems: PlaylistProps['playlistItems'] = [];

    try {
        const playlistId = params!.slug![1];
        playlistItems = await getPlaylistItems(playlistId)
    } catch (error) {
        notFound = true;
        logger.error(error, 'items not found')
    }

    return {
        props: {
            playlistItems
        },
        revalidate: timeIn('01d'),
        notFound,
    }
}
