import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { Knowledge, KnowledgeProps } from "@/presentation/pages/knowledge";
import { getPlaylists } from "@/data/youtube/playlists";

const Aprendizado = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <Knowledge {...props} />
}

export default Aprendizado

export const getStaticProps: GetStaticProps<KnowledgeProps> = async () => {
    const result = await getPlaylists()

    const playlists: KnowledgeProps['playlists'] = result.items.map(playlist => ({
        id: playlist.id,
        title: playlist.snippet.title,
        description: playlist.snippet.description,
        thumbnail: {
            small: playlist.snippet.thumbnails.medium,
            big: playlist.snippet.thumbnails.standard
        },
        slug: playlist.snippet.title.toSlug(),
        publishedAt: playlist.snippet.publishedAt
    }));

    return {
        props: {
            playlists,
        },
    }
}
