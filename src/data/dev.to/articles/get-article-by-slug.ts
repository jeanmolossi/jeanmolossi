import { Api } from '@/config/constants';
import logger from '@/config/logger/logger';
import { strapi } from '@/data/api/strapi';
import { Article as DevArticle, TypeofArticle } from '@/domain/entities/dev.to/article';
import { Strapi } from '@/domain/entities/strapi';
import { Article, Publisher } from '@/domain/entities/strapi/article';
import { WithRel } from '@/domain/entities/strapi/playlist';
import { AxiosError } from 'axios';
import { format } from 'util';

export async function getArticleBySlug(slug: string): Promise<DevArticle> {
    const username = 'jeanmolossi';

    try {
        const { data: { data: articles, meta } } =
            await strapi.get<Strapi.ListResponse<WithRel<Article, 'publisher', Publisher> & WithRel<Article, 'cover', Strapi.File>>>(
            `/artigos`,
            {
                params: {
                    filters: {
                        uid: slug,
                    },
                    populate: {
                        publisher: {
                            fields: [
                                'firstname',
                                'lastname'
                            ]
                        },
                        cover: true,
                    }
                }
            }
        );

        const article = articles.at(0);

        if (!article) throw new Error('Not found')

        const result: DevArticle = {
            id: article.id,
            body_markdown: article.attributes.content,
            slug: article.attributes.uid,
            user: {
                profile_image_90: format(
                    '%s%s',
                    process.env.NODE_ENV === 'production'
                        ? `https://cms-strapi.p2r8jl.easypanel.host`
                        : `http://localhost:1337`,
                    process.env.NODE_ENV === 'production'
                        ? `/uploads/foto_perfil_google_c341e0e3bc.jpeg`
                        : `/uploads/foto_perfil_google_812f84b6b3.jpeg`,
                ),
                github_username: 'jeanmolossi',
                name: 'Jean Carlos Molossi',
                profile_image: 'http://github.com/jeanmolossi.png',
                twitter_username: '@JeanMolossi',
                username: 'JeanMolossi',
                website_url: Api().BASE_URL,
            },
            published_at: article.attributes.updatedAt,
            comments_count: 0,
            public_reactions_count: article.attributes.reactions || 0,
            cover_image: format(
                '%s%s',
                Api().STRAPI_URL,
                article.attributes.cover.data.attributes.url
            ),
            title: article.attributes.title,
            description: article.attributes.subtitle,
            reading_time_minutes: article.attributes.readingTimeMinutes || 5,
            positive_reactions_count: article.attributes.reactions || 0,
            published_timestamp: article.attributes.updatedAt,
            tag_list: article.attributes.tags?.join(', ') || '',
            type_of: TypeofArticle.Article,
        }

        logger.info({ slug, author: result.user.username }, 'article fetched');
        return result || {};
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
        } as DevArticle;
    }
}
