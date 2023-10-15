import { getArticles } from "@/data/dev.to";
import { getPlaylists } from "@/data/youtube/playlists";
import { getLastVideos } from "@/data/youtube/video";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [articles, videos, playlists] = await Promise.all([
        getArticles({ perPage: 30 }),
        getLastVideos(30),
        getPlaylists({}),
    ])

    const articlesSiteMap = articles.map(article => {
        return {
            ...url({
                url: baseUrl(`/artigo/${article.slug}`)
            })
        }
    })

    const videosSiteMap = videos.map(video => {
        return {
            ...url({
                url: baseUrl(`/video/${video.id.videoId}`)
            })
        }
    })

    const playlistsSiteMap = playlists.playlists.map(playlist => {
        return {
            ...url({
                url: baseUrl(`/playlist/${playlist.id}`)
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
