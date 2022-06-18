import { Article } from "@/domain/entities/dev.to/article";
import { Container } from "@/presentation/components"
import Link from "next/link";
import { FiBookOpen } from "react-icons/fi";
import * as S from './styles';

export interface BlogProps {
    articles: Article[];
}

export const Blog = ({ articles }: BlogProps) => {
    return (
        <Container>
            <S.Heading>
                <h1>Blog</h1>
                <small>Mostrando {articles.length} artigos</small>
            </S.Heading>

            <S.ArticleList>
                {articles.map(article => (
                    <Link key={article.id.toString()} href="/artigo/[slug]" as={`/artigo/${article.slug}`} passHref>
                        <S.ArticleItem>
                            <h1>{article.title}</h1>
                            <h2>{article.description}</h2>

                            <S.ArticleLink>
                                <FiBookOpen />
                                Veja artigo completo
                            </S.ArticleLink>
                        </S.ArticleItem>
                    </Link>
                ))}
            </S.ArticleList>
        </Container>
    )
}
