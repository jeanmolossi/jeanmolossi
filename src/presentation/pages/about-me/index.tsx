import { useMemo } from "react"
import { BaseHead, Container } from "@/presentation/components"
import { WhatIveBeenDone } from './sections/what-ive-been-done'
import { techs, tools } from './sections/what-ive-been-done/techonologies'

export const AboutMe = () => {
    const description = useMemo(() => [...getAlt(techs), ...getAlt(tools)].join(', '), [])

    return (
        <>
            <BaseHead
                title="Tecnologias com as quais trabalho"
                description={description}
                canonical="/sobre-mim"
            />
            <Container>
                <WhatIveBeenDone />
            </Container>
        </>
    )
}

type Techs = typeof techs[0];
function getAlt(_techs: Techs[]): string[] {
    return _techs.map(t => t.alt)
}
