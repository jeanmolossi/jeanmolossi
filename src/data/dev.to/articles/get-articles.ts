import { Article } from '@/domain/entities/dev.to/article';
import { devToApi } from '@/data/api/dev.to';

export async function getArticles() {
    try {
        const { data: articles } = await devToApi.get<Article[]>(
            // `${process.env.DEV_TO_BASE_URL}/articles/me/published`,
            `${process.env.DEV_TO_BASE_URL}/articles?username=ben`,
            // { headers: { 'api_key': `${process.env.DEV_TO_API_KEY}` } }
        );

        return articles || [];
    } catch (e) {
        const err = e as Error;
        console.log(err.message);

        return [];
    }
}
