import { BaseHead, Container } from "@/presentation/components"
import { AboutMeSection } from "./sections/about-me"
import * as S from './styles'

export const Main = () => {

    return (
        <>
            <Container>
                <BaseHead />
                
                <AboutMeSection />            
            </Container>
        </>
    )
}