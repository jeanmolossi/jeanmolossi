export enum TypeofArticle {
    Article = 'article',
}

/**
 * @param {string} tag_list - Comma separated list of tags (e.g. "tag1, tag2, tag3")
 */
interface BaseArticle {
    type_of: TypeofArticle;
    id: number;
    title: string;
    description: string;
    cover_image: string;
    published_at: string;
    // comma separated list of tags
    tag_list: string;
    slug: string;
    comments_count: number;
    positive_reactions_count: number;
    public_reactions_count: number;
    published_timestamp: string;
    body_markdown: string;
    user: {
        name: string;
        username: string;
        twitter_username: string;
        github_username: string;
        website_url: string;
        profile_image: string;
        profile_image_90: string;
    };
    reading_time_minutes: number;
}

export interface ListingArticle extends BaseArticle {
    page_views_count: number;
}

export interface Article extends BaseArticle {}

export interface ArticleResult {
    slug: string;
    cover_image: string;
    title: string;
    user: {
        profile_image_90: string;
        name: string;
    };
    published_at: string;
    reading_time_minutes: number;
    public_reactions_count: number;
    page_views_count: number;
    description: string;
}
