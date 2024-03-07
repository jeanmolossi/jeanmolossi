export interface PartialPlaylist {
    id: number | string;
    slug: string;
    title: string;
    cover: string;
    excerpt: string;
    publishedAt: string;
}

export interface PartialVideo {
    cover: string;
    title: string;
    publishedAt: string;
    slug: string;
    description: string;
}
