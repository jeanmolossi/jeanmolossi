import { GetServerSideProps, GetStaticPaths, GetStaticPathsContext, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import { getArticles } from "@/data/dev.to";
import { Blog as BlogPage, BlogProps } from '@/presentation/pages/blog'
import { article } from "@/config/constants";

const Blog = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <BlogPage {...props} />;
}

export const getServerSideProps: GetServerSideProps<BlogProps> = async ({ params, res }) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=120'
    )

    let page = 1;
    if (Array.isArray(params?.page)) {
        page = Number(params?.page || 1)
    } else if (typeof params?.page == 'string') {
        page = Number(params?.page || 1)
    }

    const articles = await getArticles({ page });
    const total = articles.length
    const hasNextPage = total >= article.per_page

    return {
        props: {
            articles,
            total,
            nextPage: hasNextPage ? page + 1 : null,
            prevPage: page > 1 ? page - 1 : null
        },
        notFound: total == 0
    }
}

export default Blog;

// export const getStaticPaths: GetStaticPaths = async (context: GetStaticPathsContext) => {
//     console.log('Paths context', context)

//     return {
//         paths: [
//             { params: { page: '2' } },
//             { params: { page: '3' } },
//         ],
//         fallback: 'blocking'
//     }
// }

// export const getStaticProps: GetStaticProps<BlogProps> = async (context) => {
//     console.log('Props context', context)

//     const { params } = context

//     const articles = await getArticles(params ?? {});

//     return {
//         props: {
//             articles
//         },
//         revalidate: timeIn('10m')
//     }
// }
