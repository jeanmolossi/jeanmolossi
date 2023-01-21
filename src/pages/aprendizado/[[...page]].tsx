import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Knowledge, KnowledgeProps } from "@/presentation/pages/knowledge";
import { getPlaylists } from "@/data/youtube/playlists";

const Aprendizado = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <Knowledge {...props} />
}

export default Aprendizado

export const getServerSideProps: GetServerSideProps<KnowledgeProps> = async ({ params, res }) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=120'
    )

    let page;
    if (Array.isArray(params?.page)) {
        page = params?.page?.[0]
    }

    const {
        playlists,
        pageInfo,
        nextPageToken,
        prevPageToken
    } = await getPlaylists({ page })

    const total = pageInfo.totalResults
    const prevPage = prevPageToken || null
    const nextPage = Boolean(nextPageToken) ? nextPageToken! : null

    return {
        props: {
            playlists,
            total,
            prevPage,
            nextPage,
        },
    }
}
