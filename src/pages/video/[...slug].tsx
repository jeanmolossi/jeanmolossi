import logger from "@/config/logger/logger"
import { getPlaylistItems } from "@/data/youtube/playlist-items"
import { getPlaylists } from "@/data/youtube/playlists"
import { getVideo } from "@/data/youtube/video"
import { timeIn } from "@/presentation/helpers"
import { Video } from "@/presentation/pages/video"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { ParsedUrlQuery } from "querystring"

const VideoPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <Video {...props} />
}

export default VideoPage

export const getStaticPaths: GetStaticPaths = async () => {
    const paths: Array<{ params: ParsedUrlQuery }> = []

    try {
        const { playlists } = await getPlaylists()
        const playlistIds = playlists.map(playlist => playlist.id)

        const playlistItems = await Promise.all(
            playlistIds.map(async playlistId => {
                const playlistItems = await getPlaylistItems(playlistId)
                return playlistItems
            })
        )

        playlistItems
            .flatMap(items =>
                items.map(item => [item.snippet.title.toSlug(), item.snippet.resourceId.videoId]))
            .forEach(slug => paths.push({ params: { slug } }))

    } catch(error) {
        logger.error(error, 'items not found')
    }

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps<any> = async ({ params }) => {
    try {
        const videoId = params!.slug![1]

        const video = await getVideo(videoId)

        return {
            props: {
                video,
            },
            revalidate: timeIn('01d'),
        }
    } catch(e) {
        logger.error(e, 'video not found')
        return {
            props: { video: {} },
            notFound: true,
            revalidate: timeIn('05m'),
        }
    }
}
