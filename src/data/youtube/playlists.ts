import logger from '@/config/logger/logger';
import { Strapi } from '@/domain/entities/strapi';
import { Playlist as StrapiPlaylist } from '@/domain/entities/strapi/playlist';
import { YTPlaylist } from '@/domain/entities/youtube/request';
import { Playlist } from '@/domain/entities/youtube/view';
import { AxiosError } from 'axios';
import { strapi } from '../api/strapi';
import { youtube } from '../api/youtube';

interface GetPlaylistsProps {
    page?: string
    pageSize?: string;
}

export async function getPlaylists({ page: qsPage, pageSize: qsPageSize }: GetPlaylistsProps) {
    try {
        const page = +(qsPage || 1)
        const limit = +(qsPageSize || 10);
        const start = limit * (page - 1);

        const { data } = await strapi.get<Strapi.ListResponse<StrapiPlaylist>>('/playlists', {
            params: {
                pagination: {
                    start,
                    limit,
                }
            }
        })

        const playlists: Playlist[] = data.data.map(item => ({
            id: item.id.toString(),
            title: item.attributes.title,
            description: item.attributes.excerpt,
            slug: item.attributes.canonicalUrl,
            thumbnail: {
                big: {
                    url: item.attributes.cover,
                    width: 1920,
                    height: 9/16*1920
                },
                small: {
                    url: item.attributes.cover,
                    width: 1024,
                    height: 9/16*1024
                }
            },
            publishedAt: item.attributes.publishedAt
        }))

        const hasNextPage = (data.meta.pagination?.total || 0) >= limit + (data.meta.pagination?.start || 0)
        const hasPrevPage = page > 1

        const nextPageParams = new URLSearchParams({
            page: `${page+1}`,
            pageSize: limit.toString(),
        })

        const prevPageParams = new URLSearchParams({
            page: `${page-1}`,
            pageSize: limit.toString(),
        })

        return {
            playlists,
            nextPageParams: hasNextPage
                ? nextPageParams.toString()
                : null,
            prevPageParams: hasPrevPage ? prevPageParams.toString() : null,
        };
    } catch (error: any) {
        if (error instanceof AxiosError) {
            console.log('getPlaylists error', error.response)
        } else {
            console.log('getPlaylists error', error)
        }

        return {
            playlists: [] as any[],
            nextPageParams: null,
            prevPageParams: null,
        }
    }
}

export async function getPlaylists_v1({ page }: GetPlaylistsProps) {
    try {
        const { data } = await youtube.get<YTPlaylist.Response>('/playlists', {
            params: {
                part: 'id,snippet',
                pageToken: page,
            },
        });

        const playlists: Playlist[] = data.items
            ?.flatMap((item) => {
                if (item.snippet.title.toLowerCase() === 'favorites')
                    return [] as any;

                return [{
                    id: item.id,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnail: {
                        small: item.snippet.thumbnails.medium,
                        big: item.snippet.thumbnails.standard,
                    },
                    slug: item.snippet.title
                        .toSlug()
                        .concat('/')
                        .concat(item.id),
                    publishedAt: item.snippet.publishedAt,
                }]
            }) || []

        const { pageInfo, prevPageToken, nextPageToken } = data

        logger.info(
            { playlists: playlists.length || 0 },
            'playlists fetched',
        );

        return {
            playlists,
            pageInfo,
            prevPageToken,
            nextPageToken
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            logger.error(
                error.response?.data.error.message || error.message,
                error.response?.data.error.errors
                    ?.map(({ reason }: any) => reason)
                    .join(', '),
            );
        } else {
            logger.error(error);
        }

        throw error;
    }
}
