import { AxiosError } from 'axios';
import logger from '@/config/logger/logger';
import { YTPlaylist } from '@/domain/entities/youtube/request';
import { Playlist } from '@/domain/entities/youtube/view';
import { youtube } from '../api/youtube';

interface GetPlaylistsProps {
    page?: string
}

export async function getPlaylists({ page }: GetPlaylistsProps) {
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
