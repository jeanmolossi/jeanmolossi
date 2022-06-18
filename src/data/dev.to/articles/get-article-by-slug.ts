import { AxiosError } from 'axios';
import { Article } from '@/domain/entities/dev.to/article';
import { devToApi } from '@/data/api/dev.to';

export async function getArticleBySlug(slug: string): Promise<Article> {
    const username = 'jeanmolossi';

    try {
        const { data: article } = await devToApi.get<Article>(
            `/articles/${username}/${slug}`,
        );

        return article || {};
    } catch (e) {
        const err = e as Error;
        console.log(err.message);

        const aErr = e as AxiosError;
        console.log(aErr.response?.data);

        return {
            title: 'Artigo não disponível',
            description: 'Este artigo não pode ser encontrado, sinto muito',
            body_markdown: '[Voltar ao Blog](/blog)',
            tag_list: '',
            id: 0,
        } as Article;
    }
}
