import { BaseHead, Container } from "@/presentation/components"
import { AboutMeSection } from "./sections/about-me"
import { HeroSection } from "./sections/hero"
import * as S from './styles'

export const Main = (props: any) => {
    return (
        <>
            <BaseHead />
                
            <HeroSection />
            
            <Container>
                <AboutMeSection />
            </Container>
        </>
    )
}