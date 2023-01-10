import Link from "next/link";
import { ArticleProps } from "../";
import * as S from '../styles'

export const NotFoundArticle = ({ article }: ArticleProps) => (
    <S.Article>
        <h1>Oops! { article.title }</h1>
        <h2>{ article.description }</h2>

        <Link href="/blog" passHref>
            Voltar ao blog
        </Link>
    </S.Article>
)
