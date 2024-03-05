import { Strapi } from ".";

export interface Playlist {
    title: string;
    cover: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    canonicalUrl: string;
    excerpt: string;
}

export type ArrayRel<T> = {
    data: Array<Strapi.Entry<T>>;
}

export type Rel<T> = {
    data: Strapi.Entry<T>
}

export type WithArrayRel<T, K extends string, R> = T & Record<K, ArrayRel<R>>
export type WithRel<T, K extends string, R> = T & Record<K, Rel<R>>
