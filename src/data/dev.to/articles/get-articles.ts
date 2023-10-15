import { ListingArticle } from '@/domain/entities/dev.to/article';
import { devToApi } from '@/data/api/dev.to';
import logger from '@/config/logger/logger';

interface GetArticlesParams {
    page?: number;
    perPage?: number;
}

export async function getArticles({ page = 1, perPage = 10 }: GetArticlesParams = {}) {
    const searchParams = new URLSearchParams()

    if (typeof page != 'number') {
        page = page[0]
    }

    searchParams.set('page', page.toString())
    searchParams.set('per_page', perPage.toString())

    try {
        const { data: articles } = await devToApi.get<ListingArticle[]>(
            `/articles/me/published?${searchParams.toString()}`,
        );

        logger.info({ articles: articles.length }, 'articles fetched');
        return articles || [];
    } catch (e) {
        const err = e as Error;

        logger.error(err, 'failed to fetch articles');

        return [];
    }
}
