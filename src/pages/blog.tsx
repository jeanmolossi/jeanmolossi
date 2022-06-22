import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getArticles } from "@/data/dev.to";
import { Blog as BlogPage, BlogProps } from '@/presentation/pages/blog'
import { timeIn } from "@/presentation/helpers";

const Blog = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <BlogPage {...props} />;
}

export default Blog;

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
    const articles = await getArticles();

    return {
        props: {
            articles
        },
        revalidate: timeIn('06h')
    }
}

