import { AxiosError } from 'axios';
import logger from '@/config/logger/logger';
import { YTVideo } from '@/domain/entities/youtube/request';
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

        return data.items[0];
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
