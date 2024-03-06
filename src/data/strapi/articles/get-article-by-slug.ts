import { strapi } from "@/data/api/strapi";
import { Article } from "@/domain/article";
import { notFound } from "next/navigation";
import { ArticlesResponse } from "./get-articles";

export type FilteredArticlesRespose = ArticlesResponse;

export async function getArticleBySlug(slug: string): Promise<Article> {
    try {
        const { data: { data, meta } } = await strapi.get<FilteredArticlesRespose>('/artigos', {
            params: {
                limit: 1,
                filters: { uid: slug },
                populate: {
                    cover: '*',
                    author: { populate: ['avatar'] }
                }
            }
        })

        const article = data.at(0)?.attributes;

        if (!article) return notFound();

        const author = article.author.data.attributes;
        const avatar = author.avatar.data.attributes;

        const coverSize = article.cover.data.attributes.formats;

        return {
            title: article.title,
            content: article.content,
            author: {
                name: author.name,
                profileImg: avatar.formats.thumbnail.url
                    || avatar.url,
                slug: author.canonicalUrl
            },
            cover: coverSize.large.url
                || coverSize.medium.url
                || coverSize.small.url
                || coverSize.thumbnail.url
                || article.cover.data.attributes.url,
            reactionsCount: article.reactions || 0,
            readingTimeMinutes: article.readingTimeMinutes || 5,
            publishedAt: article.publishedAt,
            taglist: article.tags || [],
            views: article.reactions || 0
        }
    } catch (error) {
        return notFound();
    }
}