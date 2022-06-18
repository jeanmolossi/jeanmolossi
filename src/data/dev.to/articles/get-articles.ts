import { Article } from '@/domain/entities/dev.to/article';
import { devToApi } from '@/data/api/dev.to';

export async function getArticles() {
    try {
        const { data: articles } = await devToApi.get<Article[]>(
            `${process.env.DEV_TO_BASE_URL}/articles/me/published`,
        );

        return articles || [];
    } catch (e) {
        const err = e as Error;
        console.log(err.message);

        return [];
    }
}
