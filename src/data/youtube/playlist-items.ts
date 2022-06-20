import { AxiosError } from 'axios';
import logger from '@/config/logger/logger';
import { YTPlaylistItems } from '@/domain/entities/youtube/request';
import { youtube } from '../api/youtube';

export async function getPlaylistItems(playlistId: string) {
    try {
        const { data } = await youtube.get<YTPlaylistItems.Response>(
            '/playlistItems',
            {
                params: {
                    part: 'snippet',
                    playlistId,
                },
            },
        );

        return data.items;
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
