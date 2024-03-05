import logger from '@/config/logger/logger';
import { Strapi } from '@/domain/entities/strapi';
import { Playlist, WithRel } from '@/domain/entities/strapi/playlist';
import { Video } from '@/domain/entities/strapi/video';
import { YTPlaylistItems } from '@/domain/entities/youtube/request';
import { AxiosError } from 'axios';
import { format } from 'util';
import { strapi } from '../api/strapi';

interface GetPlalistItems {
    playlistId: string;
    page?: string;
    pageSize?: string;
}

export async function getPlaylistItems({
    playlistId,
    page: qsPage = '1',
    pageSize: qsPageSize = '10'
}: GetPlalistItems) {
    try {
        const page = +(qsPage || 1)
        const limit = +(qsPageSize || 10);
        const start = limit * (page - 1);

        const { data } = await strapi.get<Strapi.ListResponse<WithRel<Video, 'playlist', Playlist>>>(
            '/videos',
            {
                params: {
                    filters: {
                        playlist: {
                            canonicalUrl: {
                                '$eq': playlistId
                            }
                        }
                    },
                    populate: 'playlist',
                    pagination: {
                        limit,
                        start,
                    }
                },
            },
        );

        const playlistVideos = data.data

        logger.info(
            { ...data.meta },
            `playlist ${playlistId} has ${playlistVideos.length} items fetched`,
        );


        const hasNextPage = (data.meta.pagination?.total || 0) > limit + (data.meta.pagination?.start || 0)
        const hasPrevPage = page > 1

        const nextPageParams = new URLSearchParams({
            page: `${page+1}`,
            pageSize: limit.toString(),
        })

        const prevPageParams = new URLSearchParams({
            page: `${page-1}`,
            pageSize: limit.toString(),
        })

        const result = {
            items: playlistVideos.map(item => ({
                id: `${item.id}`,
                snippet: {
                    title: item.attributes.title,
                    description: item.attributes.excerpt,
                    thumbnails: {
                        medium: {
                            url: format(
                                'https://i.ytimg.com/vi/%s/sddefault.jpg',
                                item.attributes.videoID,
                            ),
                            width: 1920,
                            height: 9/16*1920
                        }
                    },
                    publishedAt: item.attributes.publishedAt,
                    playlistId,
                    position: item.attributes.order,
                    resourceId: {
                        kind: 'video',
                        videoId: item.attributes.canonicalUrl
                    }
                },
                contentDetails: {
                    videoId: item.attributes.videoID,
                }
            })) as YTPlaylistItems.Item[],
            nextPageParams: hasNextPage ? nextPageParams.toString() : null,
            prevPageParams: hasPrevPage ? prevPageParams.toString() : null,
        }

        return result
    } catch (error) {
        if (error instanceof AxiosError) {
            logger.error(
                error.response?.data.error.message || error.message,
                error.response?.data.error.errors
                    ?.map(({ reason }: any) => reason)
                    .join(', '),
            );
        } else {
            Object.assign({ playlistId }, error);
            logger.error(error, 'failed to fetch playlist items');
        }

        throw error;
    }
}

function filterPrivateVideos(data: YTPlaylistItems.Response) {
    data.items = data.items.filter((item: YTPlaylistItems.Item) => {
        const { title } = item.snippet;
        return (title !== 'Private video')
    });

    return data
}
