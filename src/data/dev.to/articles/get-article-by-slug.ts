import { AxiosError } from 'axios';
import { Article } from '@/domain/entities/dev.to/article';
import { devToApi } from '@/data/api/dev.to';
import logger from '@/config/logger/logger';

export async function getArticleBySlug(slug: string): Promise<Article> {
    const username = 'jeanmolossi';

    try {
        const { data: article } = await devToApi.get<Article>(
            `/articles/${username}/${slug}`,
        );

        logger.info('article fetched', { slug, author: article.user.username });
        return article || {};
    } catch (e) {
        if (e instanceof AxiosError) {
            logger.error('failed to fetch article', {
                err: e.response?.data,
                isAxios: true,
            });
        } else {
            logger.error('failed to fetch article', { err: e, isAxios: false });
        }

        return {
            title: 'Artigo não disponível',
            description: 'Este artigo não pode ser encontrado, sinto muito',
            body_markdown: '[Voltar ao Blog](/blog)',
            tag_list: '',
            id: 0,
        } as Article;
    }
}
