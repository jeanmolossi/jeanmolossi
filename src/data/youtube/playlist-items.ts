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
                    part: 'snippet,contentDetails,status',
                    playlistId,
                    maxResults: 5
                },
            },
        );

        logger.info(
            { ...data.pageInfo },
            `playlist ${playlistId} items fetched`,
        );

        return filterPrivateVideos(data);
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
