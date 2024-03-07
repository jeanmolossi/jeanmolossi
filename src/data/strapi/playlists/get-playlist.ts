import { strapi } from "@/data/api/strapi";
import { notify } from "@/data/telegram/notify";
import { Strapi } from "@/domain/entities/strapi";
import { Playlist } from "@/domain/entities/strapi/playlist";
import { PartialPlaylist } from "@/domain/playlist";
import { notFound } from "next/navigation";

type PlaylistsListResponse = Strapi.ListResponse<Playlist>;

export async function getPlaylist(canonicalUrl: string): Promise<PartialPlaylist> {
    try {
        const { data: { data } } = await strapi.get<PlaylistsListResponse>('/playlists', { params: {
            pagination: {
                limit: 1,
            },
            filters: {
                canonicalUrl: { '$eq': canonicalUrl }
            },
        } })

        const playlist = data.at(0)?.attributes;

        if (!playlist) return notFound();

        return {
            id: playlist.canonicalUrl,
            title: playlist.title,
            excerpt: playlist.excerpt || '',
            slug: playlist.canonicalUrl,
            publishedAt: playlist.publishedAt,
            cover: playlist.cover,
        }
    } catch(err: any) {
        notify({
            method: 'getPlaylist',
            message: `failed to retrieve ${canonicalUrl} playlist`,
            error: err,
        })

        return notFound();
    }
}
