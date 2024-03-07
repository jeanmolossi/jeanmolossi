import { strapi } from "@/data/api/strapi";
import { Strapi } from "@/domain/entities/strapi";
import { Playlist } from "@/domain/entities/strapi/playlist";
import { PartialPlaylist } from "@/domain/playlist";
import { CollectionResult } from "../types";

interface GetPlaylists {
    page?: number;
    pageSize?: number;
    search?: string;
}

type PlaylistsListResponse = Strapi.ListResponse<Playlist>;

export async function getPlaylists({ page = 1, pageSize: limit = 10, search }: GetPlaylists): Promise<CollectionResult<PartialPlaylist>> {
    try {
        const start = limit * (page - 1);

        let filters: object | undefined = undefined;

        if (!!search) {
            filters = {
                title: { '$containsi': search }
            }
        }

        const { data: { data, meta } } = await strapi.get<PlaylistsListResponse>('/playlists', { params: {
            pagination: {
                start,
                limit,
            },
            filters,
        } })

        const playlists: PartialPlaylist[] = data.map(item => ({
            id: item.id.toString(),
            title: item.attributes.title,
            excerpt: item.attributes.excerpt || '',
            slug: item.attributes.canonicalUrl,
            publishedAt: item.attributes.publishedAt,
            cover: item.attributes.cover,
        }))

        const hasNextPage = (meta.pagination?.total || 0) >= limit + (meta.pagination?.start || 0);
        const hasPrevPage = page > 1

        const nextPageParams = new URLSearchParams({
            page: `${page+1}`,
            pageSize: limit.toString(),
        })

        const prevPageParams = new URLSearchParams({
            page: `${page-1}`,
            pageSize: limit.toString(),
        })

        if (hasNextPage && search)
            nextPageParams.set('search', search);

        if (hasPrevPage && search)
            prevPageParams.set('search', search);

        return {
            data: playlists,
            pagination: {
                nextPageParams: hasNextPage ? nextPageParams.toString() : null,
                prevPageParams: hasPrevPage ? prevPageParams.toString() : null,
            }
        }
    } catch(err: any) {
        return {
            data: [],
            pagination: {
                nextPageParams: null,
                prevPageParams: null,
            }
        }
    }
}
