import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getArticles, getArticleBySlug } from "@/data/dev.to";
import { Article, ArticleProps } from "@/presentation/pages/article";

export default function Artigo(props: InferGetStaticPropsType<typeof getStaticProps>) {
    return <Article {...props} />;
}

type ArticleType = ArticleProps['article'];
export const getStaticProps: GetStaticProps<ArticleProps> = async ({ params }) => {
    if (!params) {
        return { props: { article: {} as ArticleType } }
    }

    const { slug } = params as { slug: string };

    const article = await getArticleBySlug(slug)

    return {
        props: {
            article,
        },
        revalidate: false,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const articles = await getArticles()

    const paths = articles.map(article => ({
        params: { slug: article.slug },
    }));

    return {
        paths: paths,
        fallback: 'blocking',
    };
}
