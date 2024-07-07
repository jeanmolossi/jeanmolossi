import { strapi } from '@/data/api/strapi';
import { notify } from '@/data/telegram/notify';
import { Article } from '@/domain/article';
import { Strapi } from '@/domain/entities/strapi';
import { Author } from '@/domain/entities/strapi/article';
import { WithRel } from '@/domain/entities/strapi/playlist';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type AuthorWithRel = WithRel<Author, 'avatar', Strapi.File>;
type ArticlesWithRelations = WithRel<Article, 'cover', Strapi.File> &
    WithRel<Article, 'author', AuthorWithRel>;
type FilteredArticlesRespose = Strapi.ListResponse<ArticlesWithRelations>;

async function getArticleBySlug(slug: string): Promise<Article> {
    try {
        const {
            data: { data, meta },
        } = await strapi.get<FilteredArticlesRespose>('/artigos', {
            params: {
                limit: 1,
                filters: { uid: slug },
                populate: {
                    cover: '*',
                    author: { populate: ['avatar'] },
                },
            },
        });

        const article = data.at(0)?.attributes;

        if (!article) return notFound();

        const author = article.author.data.attributes;
        const avatar = author.avatar.data.attributes;

        const coverSize = article.cover.data.attributes.formats;

        return {
            title: article.title,
            subtitle: article.subtitle || '',
            content: article.content,
            author: {
                name: author.name,
                profileImg: avatar.formats.thumbnail.url || avatar.url,
                slug: author.canonicalUrl,
            },
            cover:
                coverSize.large.url ||
                coverSize.medium.url ||
                coverSize.small.url ||
                coverSize.thumbnail.url ||
                article.cover.data.attributes.url,
            readingTimeMinutes: article.readingTimeMinutes || 5,
            publishedAt: article.publishedAt,
            tags: article.tags || [],
        };
    } catch (error) {
        notify({
            method: 'getArticleBySlug',
            message: `failed to fetch article ${slug}`,
            error: error as any,
        });
        return notFound();
    }
}

const cachedGetArticleBySlug = cache(getArticleBySlug);
export { cachedGetArticleBySlug as getArticleBySlug };
