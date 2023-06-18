'use client';

import { Benefits } from "./sections/benefits";
import { Contents } from "./sections/contents";
import { HeroSection } from "./sections/hero"

export const Main = () => {
    return (
        <>
            <HeroSection />
            <Contents />
            <Benefits />

            {/* <Container>
                <AboutMeSection />
            </Container> */}
        </>
    )
}
