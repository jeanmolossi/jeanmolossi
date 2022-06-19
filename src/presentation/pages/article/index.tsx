import { Article as ArticleModel } from "@/domain/entities/dev.to/article";
import { Container } from "@/presentation/components";
import { SwapComponents } from "@/presentation/helpers";
import { TheArticle } from "./typeof/article";
import { NotFoundArticle } from "./typeof/not-found";
import * as S from "./styles";

export interface ArticleProps {
    article: ArticleModel;
}

export const Article = ({ article }: ArticleProps) => {
    return (
        <Container>
            <S.Divider />

            <SwapComponents
                condition={article.id !== 0}
                componentIfConditionTrue={<TheArticle article={article} />}
                componentIfConditionFalse={<NotFoundArticle article={article} />}
            />
        </Container>
    )
}
