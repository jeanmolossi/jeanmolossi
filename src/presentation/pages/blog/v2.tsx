import Link from "next/link";
import styled from "styled-components";
import { ListingArticle } from "@/domain/entities/dev.to/article";
import { backdrop, BaseHead, Container } from "@/presentation/components";
import { RenderIf } from "@/presentation/helpers";
import { Pagination } from "@/presentation/components";
import { ArticleExcerpt } from "./article-thumb";
import { article } from "@/config/constants";

export interface BlogProps {
    articles: ListingArticle[];
    total: number;
    hasNextPage?: boolean
    page?: number;
    nextPage?: number;
    prevPage?: number;
}

export const Blog = ({
    articles,
    total,
    hasNextPage = false,
    page = 1,
    nextPage = 2,
    prevPage = 1,
}: BlogProps) => {

    const smallExcerpt =  total <= 1
        ? `Mostrando ${total} artigo`
        : `Mostrando ${total} artigos`;

    return (
        <Container>
            <BaseHead
                title="Blog"
                description="Artigos sobre tecnologia, frameworks, padrões de projeto, dicas e truques, exemplos, etc."
                canonical="/blog"
            />

            <Heading>
                <h1>Blog</h1>
                <small>{smallExcerpt}</small>
            </Heading>

            <ArticleList>
                {articles.map(article => (
                    <ArticleExcerpt article={article} key={article.id.toString()} />
                ))}
            </ArticleList>

            <Pagination
                page={page}
                next_page={nextPage}
                prev_page={prevPage}
                total={total}
                per_page={article.per_page}
            />
        </Container>
    )
}

const Heading = styled.div`
    ${backdrop}
    padding: ${({theme}) => theme.gutter.md};

    > small {
        color: ${({ theme }) => theme.silverMetallic};
    }
`;

const ArticleList = styled.div`
    ${backdrop}

    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.gutter.sm};

    background-color: ${({ theme }) => theme.darkGray};

    > article:not(:last-child) {
        padding-bottom: ${({ theme }) => theme.gutter.sm};
        border-bottom: 0.05rem solid ${({ theme }) => theme.gray};
    }
`;
