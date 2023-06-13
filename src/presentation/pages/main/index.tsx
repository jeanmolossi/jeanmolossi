'use client';

import { BaseHead, Container } from "@/presentation/components"
import { AboutMeSection } from "./sections/about-me"
import { HeroSection } from "./sections/hero"

export const Main = () => {
    return (
        <>
            <HeroSection />

            {/* <Container>
                <AboutMeSection />
            </Container> */}
        </>
    )
}
