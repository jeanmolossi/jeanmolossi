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
                    maxResults: 50
                },
            },
        );

        logger.info(
            { ...data.pageInfo },
            `playlist ${playlistId} items fetched`,
        );

        return filterPrivateVideos(data.items);
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

function filterPrivateVideos(items: YTPlaylistItems.Item[]) {
    return items.filter(({ snippet }: YTPlaylistItems.Item) => {
        const { title } = snippet;
        return title !== 'Private video';
    });
}
