import { Api } from '@/config/constants';
import logger from '@/config/logger/logger';
import { strapi } from '@/data/api/strapi';
import { ArticleResult } from '@/domain/entities/dev.to/article';
import { Strapi } from '@/domain/entities/strapi';
import { Article, Publisher } from '@/domain/entities/strapi/article';
import { WithRel } from '@/domain/entities/strapi/playlist';
import { format } from 'util';

interface GetArticlesParams {
    page?: number;
    perPage?: number;
}

export async function getArticles({ page = 1, perPage = 10 }: GetArticlesParams = {}): Promise<ArticleResult[]> {
    const searchParams = new URLSearchParams()

    if (typeof page != 'number') {
        page = page[0]
    }

    searchParams.set('page', page.toString())
    searchParams.set('per_page', perPage.toString())

    const limit = perPage;
    const start = perPage * (page - 1);

    try {
        const { data: { data: articles, meta } } =
            await strapi.get<Strapi.ListResponse<WithRel<Article, 'publisher', Publisher> & WithRel<Article, 'cover', Strapi.File>>>(
            `/artigos`,
            {
                params: {
                    pagination: {
                        start,
                        limit,
                    },
                    populate: 'cover'
                }
            }
        );

        logger.info({ articles: articles.length, ...meta }, 'articles fetched');

        const listing: ArticleResult[] = articles.map(item => ({
            title: item.attributes.title,
            description: item.attributes.subtitle,
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
            published_at: item.attributes.createdAt,
            public_reactions_count: item.attributes.reactions || 0,
            page_views_count: 0,
            reading_time_minutes: item.attributes.readingTimeMinutes || 5,
            slug: item.attributes.uid,
            cover_image: format(
                '%s%s',
                Api().STRAPI_URL, item.attributes.cover.data.attributes.url
            ),
        }));

        return listing || [];
    } catch (e) {
        const err = e as Error;

        logger.error(err, 'failed to fetch articles');

        return [];
    }
}
