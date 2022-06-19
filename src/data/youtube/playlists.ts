import { AxiosError } from 'axios';
import logger from '@/config/logger/logger';
import { YTPlaylist } from '@/domain/entities/youtube/request';
import { youtube } from '../api/youtube';

export async function getPlaylists() {
    try {
        const { data } = await youtube.get<YTPlaylist.Response>('/playlists', {
            params: {
                part: 'id,snippet',
            },
        });

        const filteredPlaylists = data.items.filter(
            item => item.snippet.title.toLowerCase() !== 'favorites',
        );

        data.items = filteredPlaylists;

        return data;
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
