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

        logger.info({ slug, author: article.user.username }, 'article fetched');
        return article || {};
    } catch (e) {
        if (e instanceof AxiosError) {
            logger.error(
                {
                    err: e.response?.data,
                    isAxios: true,
                },
                'failed to fetch article',
            );
        } else {
            logger.error({ err: e, isAxios: false }, 'failed to fetch article');
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
