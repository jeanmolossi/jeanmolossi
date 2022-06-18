import { Article } from "@/domain/entities/dev.to/article";
import { Container } from "@/presentation/components"

export interface BlogProps {
    articles: Article[];
}

export const Blog = ({ articles }: BlogProps) => {
    return (
        <Container>
            <br />
            <br />
            <br />
            <br />
            <h1>Página do blog em desenvolvimento</h1>
            <h2>{articles.length}</h2>
        </Container>
    )
}
