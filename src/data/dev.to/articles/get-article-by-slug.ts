import { Article } from '@/domain/entities/dev.to/article';
import { devToApi } from '@/data/api/dev.to';

export async function getArticleBySlug(slug: string): Promise<Article> {
    const username = 'ben';

    try {
        const { data: article } = await devToApi.get<Article>(
            `/articles/${username}/${slug}`,
        );

        return article || {};
    } catch (e) {
        const err = e as Error;
        console.log(err.message);

        return {} as Article;
    }
}
