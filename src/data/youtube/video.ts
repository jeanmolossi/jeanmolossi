import logger from '@/config/logger/logger';
import { Strapi } from '@/domain/entities/strapi';
import { Video } from '@/domain/entities/strapi/video';
import { YTSearch, YTVideo } from '@/domain/entities/youtube/request';
import { AxiosError } from 'axios';
import { format } from 'util';
import { strapi } from '../api/strapi';
import { youtube } from '../api/youtube';

export async function getVideo(videoId: string): Promise<YTVideo.Item> {
    try {
        const { data } = await strapi.get<Strapi.ListResponse<Video>>('/videos', {
            params: {
                filters: {
                    canonicalUrl: {
                        '$eq': videoId
                    }
                }
            },
        });

        console.log(data.data)

        const item = data.data.at(0)?.attributes;

        const video: YTVideo.Item = {
            id: item ? `${item?.videoID}` : '',
            etag: 'r3s9OiVXgY__0i7yIGnPyt0-gjM',
            kind: 'youtube#video',
            snippet: {
                title: item?.title || 'No title',
                thumbnails: {
                    maxres: {
                        url: format(
                            'https://i.ytimg.com/vi/%s/sddefault.jpg',
                            item?.videoID,
                        ),
                        width: 1920,
                        height: 9/16*1920
                    },
                },
                publishedAt: item?.publishedAt || (new Date().toISOString()),
                description: item?.excerpt || '',
                tags: ['video'],
                categoryId: '',
                channelId: '',
                channelTitle: '',
                defaultAudioLanguage: 'Português - Brasil',
                liveBroadcastContent: '',
                localized: { description: '', title: '' }
            }
        }

        if (!video) throw new Error('not found');

        logger.info({ videoId }, `video ${video.snippet.title} fetched`);

        return video;
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

export async function getLastVideos(videos = 1) {
    try {
        const { data } = await youtube.get<YTSearch.Response>('/search', {
            params: {
                part: 'snippet',
                maxResults: videos,
                order: 'date'
            }
        })

        return data.items;
    }catch (error) {
        let err = 'Ocorreu algum erro!';

        if (error instanceof AxiosError) {
            err = error.response?.data.error.message || error.message;

            logger.error(
                err,
                error.response?.data.error.errors
                    ?.map(({ reason }: any) => reason)
                    .join(', '),
            );
        } else {
            logger.error(error);
        }

        throw new Error(err)
    }
}
