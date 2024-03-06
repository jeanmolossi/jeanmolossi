export interface PartialArticle {
    slug: string;
    cover: string;
    title: string;
    excerpt: string;
    readingTimeMinutes: number;
    publishedAt: string;
}

export interface Article {
    cover: string;
    title: string;
    subtitle: string;
    content: string;
    tags: string[];
    author: {
        name: string;
        profileImg: string;
        slug: string;
    };
    readingTimeMinutes: number;
    publishedAt: string;
}
