import { FunctionComponent } from "react"
import dynamic from "next/dynamic"
import { MarkdownProps } from "@/presentation/components"
import { TagList } from "../tag-list"
import { ArticleProps } from ".."
import * as S from "../styles"

const LazyMd = dynamic(
    () => import("../../../components/_layout/markdown")
        .then((mod) => mod.Markdown),
    { loading: () => <div>Carregando...</div> },
) as FunctionComponent<MarkdownProps>

export const TheArticle = ({ article }: ArticleProps) => {
    return (
        <S.Article>
            <h1>{ article.title }</h1>
            <h2>{ article.description }</h2>

            <LazyMd>
                { article.body_markdown }
            </LazyMd>

            <TagList tagList={article.tag_list} />
        </S.Article>
    )
}
