import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { Article, ArticleProps } from "@/presentation/pages/article";

export default function Artigo(props: InferGetStaticPropsType<typeof getStaticProps>) {
    return <Article {...props} />;
}

type ArticleType = ArticleProps['article'];
export const getStaticProps: GetStaticProps<ArticleProps> = async ({ params }) => {
    if (!params) {
        return { props: { article: {} as ArticleType } }
    }

    const username = 'ben';
    const { slug } = params as { slug: string };

    const article: ArticleType = await fetch(`${process.env.DEV_TO_BASE_URL}/articles/${username}/${slug}`)
        .then(res => res.json());

    return {
        props: {
            article,
        },
        revalidate: false,
    }
}


export const getStaticPaths: GetStaticPaths = async () => {
    const articles: ArticleType[] = await fetch(
        // `${process.env.DEV_TO_BASE_URL}/articles/me/published`,
        `${process.env.DEV_TO_BASE_URL}/articles?username=ben`,
        // { headers: { 'api_key': `${process.env.DEV_TO_API_KEY}` } }
    )
        .then(r => r.json())

    const paths = articles.map(article => ({
        params: { slug: article.slug },
    }));

    return {
        paths: paths,
        fallback: false,
    };
}
