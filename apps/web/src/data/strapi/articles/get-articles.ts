import logger from '@/config/logger/logger';
import { strapi } from '@/data/api/strapi';
import { notify } from '@/data/telegram/notify';
import { PartialArticle } from '@/domain/article';
import { Strapi } from '@/domain/entities/strapi';
import { Article } from '@/domain/entities/strapi/article';
import { WithRel } from '@/domain/entities/strapi/playlist';
import { addSearch, handlePagination } from '@/lib/helpers/handle-pagination';
import { cache } from 'react';
import { CollectionResult } from '../types';

interface GetArticlesParams {
    page?: number;
    pageSize?: number;
    search?: string;
}

type ArticlesWithRelations = WithRel<Article, 'cover', Strapi.File>;
type ArticlesResponse = Strapi.ListResponse<ArticlesWithRelations>;

async function getArticles({
    page = 1,
    pageSize: limit = 10,
    search,
}: GetArticlesParams = {}): Promise<CollectionResult<PartialArticle>> {
    try {
        const start = limit * (page - 1);

        let filters;
        if (search) {
            filters = {
                title: { $containsi: search },
            };
        }

        const {
            data: { data: articles, meta },
        } = await strapi.get<ArticlesResponse>(`/artigos`, {
            params: {
                pagination: {
                    start,
                    limit,
                },
                populate: 'cover',
                filters,
            },
        });

        logger.info({ articles: articles.length, ...meta }, 'articles fetched');

        const listing: PartialArticle[] = articles.map(item => ({
            title: item.attributes.title,
            slug: item.attributes.uid,
            cover:
                item.attributes.cover.data.attributes.formats.small.url ||
                item.attributes.cover.data.attributes.url,
            excerpt:
                item.attributes.subtitle?.trimAfter(120) ||
                item.attributes.content.trimAfter(120),
            publishedAt: item.attributes.publishedAt,
            readingTimeMinutes: item.attributes.readingTimeMinutes || 5,
        }));

        const { pagination } = meta;
        const hook = addSearch(search);

        const { nextPageParams, prevPageParams } = handlePagination(
            page,
            limit,
            pagination,
            hook,
            hook,
        );

        return {
            data: listing || [],
            pagination: {
                nextPageParams,
                prevPageParams,
            },
        };
    } catch (e) {
        const err = e as Error;

        logger.error(err, 'failed to fetch articles');
        notify({
            method: 'getArticles',
            message: 'failed to fetch articles',
            error: err,
        });

        return {
            data: [],
            pagination: {
                nextPageParams: null,
                prevPageParams: null,
            },
        };
    }
}

const cachedGetArticles = cache(getArticles);
export { cachedGetArticles as getArticles };
// export { getArticles };
