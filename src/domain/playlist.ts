export interface PartialPlaylist {
    id: number | string;
    slug: string;
    title: string;
    cover: string;
    excerpt: string;
    publishedAt: string;
}

export interface PartialVideo {
    id: string;
    cover: string;
    title: string;
    publishedAt: string;
    slug: string;
    description: string;
}

export interface Video {
    id: string;
    title: string;
    description: string;
    cover: {
        maxres?: string;
        high?: string;
        medium?: string;
        default: string;
    };
    canonicalUrl: string;
    publishedAt: string;
}
