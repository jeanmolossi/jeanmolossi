import { BaseHead, Container } from "@/presentation/components"
import { AboutMeSection } from "./sections/about-me"
import { HeroSection } from "./sections/hero"

export const Main = () => {
    return (
        <>
            <BaseHead title="Inicio" description="Recentemente comecei a ensinar e você pode me acompanhar e aprender mais sobre esse mundo de Software Development (desenvolvimento de software)." />

            <HeroSection />

            <Container>
                <AboutMeSection />
            </Container>
        </>
    )
}
