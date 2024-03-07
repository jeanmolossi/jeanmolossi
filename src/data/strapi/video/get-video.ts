import { strapi } from "@/data/api/strapi";
import { notify } from "@/data/telegram/notify";
import { Strapi } from "@/domain/entities/strapi";
import { Video as StrapiVideo } from "@/domain/entities/strapi/video";
import { Video } from "@/domain/playlist";
import { notFound } from "next/navigation";
import { format } from "util";

type VideosFilterResult = Strapi.ListResponse<StrapiVideo>;

export async function getVideo(canonicalUrl: string): Promise<Video> {
    try {
        const { data: { data } } =
            await strapi.get<VideosFilterResult>('/videos', { params: {
                filters: { canonicalUrl: { '$eq': canonicalUrl } },
                pagination: { limit: 1 }
            } })

        const video = data.at(0)?.attributes;
        if (!video)
            return notFound();

        const {
            title,
            videoID,
            excerpt: description,
            publishedAt,
        } = video;

        // "default": {
        //     "url": "https://i.ytimg.com/vi/dhVTQ825k30/default.jpg",
        //     "width": 120,
        //     "height": 90
        //   },
        //   "medium": {
        //     "url": "https://i.ytimg.com/vi/dhVTQ825k30/mqdefault.jpg",
        //     "width": 320,
        //     "height": 180
        //   },
        //   "high": {
        //     "url": "https://i.ytimg.com/vi/dhVTQ825k30/hqdefault.jpg",
        //     "width": 480,
        //     "height": 360
        //   },
        //   "standard": {
        //     "url": "https://i.ytimg.com/vi/dhVTQ825k30/sddefault.jpg",
        //     "width": 640,
        //     "height": 480
        //   },
        //   "maxres": {
        //     "url": "https://i.ytimg.com/vi/dhVTQ825k30/maxresdefault.jpg",
        //     "width": 1280,
        //     "height": 720
        //   }
        const getCover = (id: string, size: string) => format('https://i.ytimg.com/vi/%s/%sdefault.jpg', id, size)

        return {
            id: videoID,
            title,
            canonicalUrl,
            description,
            publishedAt,
            cover: {
                maxres: getCover(videoID, 'maxres'),
                high: getCover(videoID, 'hq'),
                medium: getCover(videoID, 'mq'),
                default: getCover(videoID, 'sd'),
            },
        }
    } catch (error: any) {
        notify({
            method: 'getVideo',
            message: `failed to get video from ${canonicalUrl}`,
            error,
        })
        return notFound();
    }
}
