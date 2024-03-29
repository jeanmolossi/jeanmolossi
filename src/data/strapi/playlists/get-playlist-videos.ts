import { strapi } from "@/data/api/strapi";
import { notify } from "@/data/telegram/notify";
import { Strapi } from "@/domain/entities/strapi";
import { Video } from "@/domain/entities/strapi/video";
import { PartialVideo } from "@/domain/playlist";
import { addSearch, handlePagination } from "@/lib/helpers/handle-pagination";
import { notFound } from "next/navigation";
import { format } from "util";
import { CollectionResult } from "../types";

interface GetPlalistVideos {
    canonicalUrl: string;
    page?: number;
    pageSize?: number;
    search?: string;
}

type VideosListResponse = Strapi.ListResponse<Video>

export async function getPlaylistVideos({
    canonicalUrl,
    page = 1,
    pageSize: limit = 10,
    search
}: GetPlalistVideos): Promise<CollectionResult<PartialVideo>> {
    try {
        const start = limit * (page - 1);

        let title: object | undefined;

        if (!!search) {
            title = { '$containsi': search };
        }

        const { data: { data, meta } } = await strapi.get<VideosListResponse>('/videos', { params: {
            pagination: {
                start,
                limit,
            },
            filters: {
                playlist: { canonicalUrl: { '$eq': canonicalUrl } },
                title,
            }
        }})

        if (data.length === 0)
            return notFound()

        const videos: PartialVideo[] = data.map(item => ({
            id: item.attributes.videoID,
            slug: item.attributes.canonicalUrl,
            cover: format('https://i.ytimg.com/vi/%s/sddefault.jpg', item.attributes.videoID),
            description: item.attributes.excerpt,
            title: item.attributes.title,
            publishedAt: item.attributes.publishedAt,
        }))

        const { pagination } = meta;
        const hook = addSearch(search);

        const {
            nextPageParams,
            prevPageParams,
        } = handlePagination(page, limit, pagination, hook, hook)

        return {
            data: videos,
            pagination: {
                nextPageParams,
                prevPageParams,
            }
        }
    } catch (error: any) {
        notify({
            method: 'getPlaylistVideos',
            message: 'failed to fetch playlist videos',
            error
        })

        return notFound()
    }
}
