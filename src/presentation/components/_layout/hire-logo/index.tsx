import Image from "next/image"
import { HireContainer } from './styles'

export const HireLogo = () => {
    return (
        <HireContainer href={"/links"}>
            <div>
                <Image
                    src={{
                        src: '/images/hire-text.png',
                        width: 120,
                        height: 120
                    }}
                    alt="texto contrate-me"
                />
            </div>

            <div>
                <Image
                    src={{
                        src: '/images/hire-globe.png',
                        width: 110,
                        height: 110
                    }}
                    alt="globo"
                />
            </div>
        </HireContainer>
    )
}
