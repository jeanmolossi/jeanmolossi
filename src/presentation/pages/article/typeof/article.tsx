import { Markdown } from "@/presentation/components"
import { TagList } from "../tag-list"
import { ArticleProps } from ".."
import * as S from "../styles"

export const TheArticle = ({ article }: ArticleProps) => {
    return (
        <S.Article>
            <h1>{ article.title }</h1>
            <h2>{ article.description }</h2>

            <Markdown>
                { article.body_markdown }
            </Markdown>

            <TagList tagList={article.tag_list} />
        </S.Article>
    )
}
