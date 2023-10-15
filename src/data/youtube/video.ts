import { AxiosError } from 'axios';
import logger from '@/config/logger/logger';
import { YTSearch, YTVideo } from '@/domain/entities/youtube/request';
import { youtube } from '../api/youtube';

export async function getVideo(videoId: string) {
    try {
        const { data } = await youtube.get<YTVideo.Response>('/videos', {
            params: {
                part: 'snippet',
                id: videoId,
                maxResults: 1,
            },
        });

        const video = data.items[0];
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
