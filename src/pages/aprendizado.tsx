import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { Knowledge, KnowledgeProps } from "@/presentation/pages/knowledge";
import { getPlaylists } from "@/data/youtube/playlists";
import { timeIn } from "@/presentation/helpers";

const Aprendizado = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <Knowledge {...props} />
}

export default Aprendizado

export const getStaticProps: GetStaticProps<KnowledgeProps> = async () => {
    const playlists = await getPlaylists()

    return {
        props: {
            playlists,
        },
        revalidate: timeIn('06h'),
    }
}
