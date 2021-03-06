import { YTPlaylist, YTPlaylistItems, YTVideo } from './request';

export interface Playlist {
    id: string;
    title: string;
    description: string;
    thumbnail: {
        small: YTPlaylist.Resolution;
        big: YTPlaylist.Resolution;
    };
    slug: string;
    publishedAt: string;
}

export type PlaylistItem = YTPlaylistItems.Item;

export type Video = YTVideo.Item;
