import { Container } from './styles'

export const Footer = () => {
    const year = (new Date()).getFullYear()
    return (
        <Container>
            <p>
                Todos os direitos reservados &copy; {year}
            </p>
        </Container>
    )
}
