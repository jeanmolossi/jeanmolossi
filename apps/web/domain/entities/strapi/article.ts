export interface Article {
    title: string;
    subtitle?: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    uid: string;
    cover?: string;
    readingTimeMinutes?: number;
    reactions?: number;
    tags?: string[];
}

export interface Author {
    name: string;
    bio: string | null;
    canonicalUrl: string;
    updatedAt: string;
}
