import { ListingArticle } from '@/domain/entities/dev.to/article';
import { devToApi } from '@/data/api/dev.to';
import logger from '@/config/logger/logger';

export async function getArticles() {
    try {
        const { data: articles } = await devToApi.get<ListingArticle[]>(
            `${process.env.DEV_TO_BASE_URL}/articles/me/published`,
        );

        logger.info({ articles: articles.length }, 'articles fetched');
        return articles || [];
    } catch (e) {
        const err = e as Error;

        logger.error(err, 'failed to fetch articles');

        return [];
    }
}
