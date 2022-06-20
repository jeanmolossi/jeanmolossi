import { AxiosError } from 'axios';
import logger from '@/config/logger/logger';
import { YTPlaylist } from '@/domain/entities/youtube/request';
import { Playlist } from '@/domain/entities/youtube/view';
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

        const playlists: Playlist[] = data.items.map(playlist => ({
            id: playlist.id,
            title: playlist.snippet.title,
            description: playlist.snippet.description,
            thumbnail: {
                small: playlist.snippet.thumbnails.medium,
                big: playlist.snippet.thumbnails.standard,
            },
            slug: playlist.snippet.title
                .toSlug()
                .concat('/')
                .concat(playlist.id),
            publishedAt: playlist.snippet.publishedAt,
        }));

        return playlists;
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
