export namespace YTPlaylist {
    export interface Query {
        part: 'id' | 'snippet' | 'status';
    }

    export interface Resolution {
        url: string;
        width: number;
        height: number;
    }

    export interface Item {
        kind: 'youtube#playlist';
        etag: string;
        id: string;
        snippet: {
            publishedAt: string;
            channelId: string;
            title: string;
            description: string;
            thumbnails: {
                default: Resolution;
                medium: Resolution;
                high: Resolution;
                standard: Resolution;
            };
            channelTitle: string;
            localized: {
                title: string;
                description: string;
            };
        };
    }

    export interface Response {
        kind: 'youtube#playlistListResponse';
        etag: string;
        pageInfo: {
            totalResults: number;
            resultsPerPage: number;
        };
        items: Item[];
    }
}

export namespace YTPlaylistItems {
    export interface Response {
        kind: 'youtube#playlistItemListResponse';
        etag: string;
        nextPageToken: string;
        prevPageToken: string;
        pageInfo: {
            totalResults: number;
            resultsPerPage: number;
        };
        items: Item[];
    }

    export interface Item {
        kind: 'youtube#playlistItem';
        etag: string;
        id: string;
        snippet: {
            publishedAt: string;
            channelId: string;
            title: string;
            description: string;
            thumbnails: {
                default: YTPlaylist.Resolution;
                medium: YTPlaylist.Resolution;
                high: YTPlaylist.Resolution;
            };
            channelTitle: string;
            playlistId: string;
            position: number;
            resourceId: {
                kind: string;
                videoId: string;
            };
        };
        contentDetails: {
            videoId: string;
            startAt: string;
            endAt: string;
            note: string;
        };
        status: {
            privacyStatus: string;
        };
    }
}
