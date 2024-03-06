import logger from "@/config/logger/logger";
import { strapi } from "@/data/api/strapi";
import { PartialArticle } from "@/domain/article";
import { Strapi } from "@/domain/entities/strapi";
import { Article, Author } from "@/domain/entities/strapi/article";
import { WithRel } from "@/domain/entities/strapi/playlist";
import { CollectionResult } from "../types";

interface GetArticlesParams {
    page?: number;
    pageSize?: number;
    search?: string;
}

type AuthorRel = WithRel<Author, 'avatar', Strapi.File>;
type ArticlesWithRelations = WithRel<Article, 'author', AuthorRel> & WithRel<Article, 'cover', Strapi.File>
type ArticlesResponse = Strapi.ListResponse<ArticlesWithRelations>;

const filterConfig = (pagination: any) => {
    return {
        pagination,
        populate: {
            cover: '*',
            author: { populate: ['avatar'] }
        }
    }
}

export async function getArticles({ page = 1, pageSize: limit = 10, search }: GetArticlesParams = {}): Promise<CollectionResult<PartialArticle>> {
    try {
        const start = limit * (page - 1);

        const { data: { data: articles, meta } } =
            await strapi.get<ArticlesResponse>(
            `/artigos`,
            {
                params: filterConfig({
                    start,
                    limit,
                })
            }
        );

        logger.info({ articles: articles.length, ...meta }, 'articles fetched');

        const listing: PartialArticle[] = articles.map(item => ({
            title: item.attributes.title,
            slug: item.attributes.uid,
            author: {
                name: item.attributes.author.data.attributes.name,
                profileImg: item.attributes.author.data.attributes.avatar.data.attributes.formats.thumbnail.url,
                slug: item.attributes.author.data.attributes.canonicalUrl,
            },
            cover: item.attributes.cover.data.attributes.formats.small.url
                || item.attributes.cover.data.attributes.url,
            excerpt: item.attributes.subtitle.trimAfter(120),
            publishedAt: item.attributes.publishedAt,
            reactionsCount: item.attributes.reactions || 0,
            readingTimeMinutes: item.attributes.readingTimeMinutes || 5,
            views: item.attributes.reactions || 0,
        }));

        const hasPrevPage = page > 1;
        const hasNextPage = (meta.pagination?.total || 0) > (limit + (meta.pagination?.start || 0))

        const nextPageParams = new URLSearchParams({ page: `${page+1}`, pageSize: `${limit}` })
        if (search) nextPageParams.append('search', search);

        const prevPageParams = new URLSearchParams({ page: `${page-1}`, pageSize: `${limit}` })
        if (search) nextPageParams.append('search', search);

        return {
            data: listing || [],
            pagination: {
                nextPageParams: hasNextPage ? nextPageParams.toString() : null,
                prevPageParams: hasPrevPage ? prevPageParams.toString() : null,
            }
        }
    } catch (e) {
        const err = e as Error;

        logger.error(err, 'failed to fetch articles');

        return {
            data: [],
            pagination: {
                nextPageParams: null,
                prevPageParams: null,
            }
        };
    }
}
