export interface PartialArticle {
    slug: string;
    cover: string;
    title: string;
    excerpt: string;
    author: {
        name: string;
        profileImg: string;
        slug: string;
    };
    readingTimeMinutes: number;
    publishedAt: string;
    reactionsCount: number;
    views: number;
}

export interface Article {}
