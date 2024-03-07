import { CollectionResult, getArticles, getPlaylistVideos, getPlaylists } from "@/data/strapi";
import { PartialVideo } from "@/domain/playlist";
import '@/presentation/helpers/index';
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [articlesResult, playlistsResult] = await Promise.allSettled([
        getArticles(),
        getPlaylists({ pageSize: 30 }),
    ])

    let articlesSiteMap: any[] = [];
    if (articlesResult.status === 'fulfilled') {
        const articles = articlesResult.value.data
        articlesSiteMap = articles.map(article => {
            return {
                ...url({
                    url: baseUrl(`/artigo/${article.slug}`)
                })
            }
        })
    }

    let videosPromises: Array<Promise<CollectionResult<PartialVideo>>> = [];

    let playlistsSiteMap: any[] = []
    if (playlistsResult.status === 'fulfilled') {
        const playlists = playlistsResult.value.data
        playlistsSiteMap = playlists.map(playlist => {
            videosPromises.push(
                getPlaylistVideos({ canonicalUrl: playlist.slug })
            )

            return {
                ...url({
                    url: baseUrl(`/playlist/${playlist.slug}`)
                })
            }
        })
    }

    const videos: Array<PartialVideo> = [];
    const videosResults = await Promise.allSettled(videosPromises)
    videosResults.forEach(videoResult => {
        if (videoResult.status === 'rejected') return;

        videos.push(...videoResult.value.data)
    })

    const videosSiteMap = videos.map(video => {
        return {
            ...url({
                url: baseUrl(`/video/${video.slug}`)
            })
        }
    })


    return [
        { ...url({ priority: 1, changeFrequency: 'yearly' }) },
        { ...url({ url: baseUrl('/playlists') }) },
        { ...url({ url: baseUrl('/blog') }) },
        { ...url({ url: baseUrl('/contato'), changeFrequency: 'yearly' }) },
        ...articlesSiteMap,
        ...videosSiteMap,
        ...playlistsSiteMap,
    ]
}

function baseUrl(path: string) {
    if (path.substring(0,1) !== '/')
        path = "/" + path

    return `${process.env.BASE_URL || 'https://jeanmolossi.com.br'}${path}`
}

type Route = MetadataRoute.Sitemap[0];

function url(route: Partial<Route>) {
    const result: Route = {
        url: baseUrl('/'),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
        ...route,
    }

    return result
}
