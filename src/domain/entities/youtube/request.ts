export type Resolution = {
    url: string;
    width: number;
    height: number;
};

export type Thumbnails = Partial<Record<'default' | 'medium' | 'high' | 'standard' | 'maxres', Resolution>>;

export namespace YTPlaylist {
    export interface Query {
        part: 'id' | 'snippet' | 'status';
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
            thumbnails: Thumbnails;
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
        nextPageToken?: string;
        prevPageToken?: string;
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
            thumbnails: Thumbnails;
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

export namespace YTVideo {
    export interface Response {
        kind: 'youtube#videoListResponse';
        etag: 'LcCLmWj5WQ9mp-scXMkvZDQ9eW4';
        items: Item[];
    }

    export interface Item {
        kind: 'youtube#video';
        etag: 'r3s9OiVXgY__0i7yIGnPyt0-gjM';
        id: string;
        snippet: {
            publishedAt: string;
            channelId: string;
            title: string;
            description: string;
            thumbnails: Thumbnails;
            channelTitle: string;
            tags: string[];
            categoryId: string;
            liveBroadcastContent: string;
            localized: {
                title: string;
                description: string;
            };
            defaultAudioLanguage: string;
        };
    }
}

export namespace YTSearch {
    export interface Response {
        kind: 'youtube#searchListResponse';
        etag: 'QKNg6h-mboftpkGSADf4P0pv0dM';
        items: Item[];
    }

    export interface Item {
        kind: 'youtube#searchResult';
        etag: 'nEQUaFuKJtAPJSvwItE0MTF0gPI';
        id: {
            kind: 'youtube#video';
            videoId: string;
        };
        snippet: {
            publishedAt: string;
            channelId: string;
            title: string;
            description: string;
            thumbnails: Thumbnails;
            channelTitle: string;
            liveBroadcastContent: string;
            publishTime: string;
        };
    }
}
