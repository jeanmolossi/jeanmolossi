import { useMemo } from "react";
import { ListingArticle } from "@/domain/entities/dev.to/article";
import { Container } from "@/presentation/components"
import { ArticleExcerpt } from "./article-thumb";
import * as S from './styles';

export interface BlogProps {
    articles: ListingArticle[];
}

export const Blog = ({ articles }: BlogProps) => {

    const smallExcerpt = useMemo(() => {
        const total = articles.length;

        return total <= 1
            ? `Mostrando ${total} artigo`
            : `Mostrando ${total} artigos`;
    }, [articles]);

    return (
        <Container>
            <S.Heading>
                <h1>Blog</h1>
                <small>{smallExcerpt}</small>
            </S.Heading>

            <S.ArticleList>
                {articles.map(article => (
                    <ArticleExcerpt article={article} key={article.id.toString()} />
                ))}
            </S.ArticleList>
        </Container>
    )
}
