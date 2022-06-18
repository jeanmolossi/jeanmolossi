import { Article as ArticleModel } from "@/domain/entities/dev.to/article";
import { Container, Markdown } from "@/presentation/components";
import * as S from './styles'
import { TagList } from "./tag-list";

export interface ArticleProps {
    article: ArticleModel;
}

export const Article = ({ article }: ArticleProps) => {
    return (
        <Container>
            <br />
            <br />
            <br />
            <br />

            <S.Article>
                <h1>{ article.title }</h1>
                <h2>{ article.description }</h2>

                <Markdown>
                    { article.body_markdown }
                </Markdown>

                <TagList tagList={article.tag_list} />
            </S.Article>
        </Container>
    )
}
