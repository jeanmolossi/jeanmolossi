import { YTPlaylist, YTPlaylistItems, YTVideo, Resolution } from './request';

export interface Playlist {
    id: string;
    title: string;
    description: string;
    thumbnail: {
        small: Resolution;
        big: Resolution;
    };
    slug: string;
    publishedAt: string;
}

export type PlaylistItem = YTPlaylistItems.Item;

export type Video = YTVideo.Item;
