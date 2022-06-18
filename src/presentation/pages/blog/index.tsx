import { Article } from "@/domain/entities/dev.to/article";
import { Container } from "@/presentation/components"
import { RenderIf } from "@/presentation/helpers";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { FiBookOpen } from "react-icons/fi";
import { ArticleExcerpt } from "./article-thumb";
import * as S from './styles';

export interface BlogProps {
    articles: Article[];
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
