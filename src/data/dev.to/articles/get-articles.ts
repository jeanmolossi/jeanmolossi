import { Article } from '@/domain/entities/dev.to/article';
import { devToApi } from '@/data/api/dev.to';
import logger from '@/config/logger/logger';

export async function getArticles() {
    try {
        const { data: articles } = await devToApi.get<Article[]>(
            `${process.env.DEV_TO_BASE_URL}/articles/me/published`,
        );

        logger.info('Articles fetched', { articles: articles.length });
        return articles || [];
    } catch (e) {
        const err = e as Error;

        logger.error('failed to fetch articles', err);

        return [];
    }
}
