import { social } from "@/config/constants"
import { timeIn } from "@/presentation/helpers"
import { getContrast } from "@/presentation/helpers/contrast-calc"
import { Links, LinksProps } from "@/presentation/pages/links"
import { socialColors } from "@/presentation/styles"
import { GetStaticProps, InferGetStaticPropsType } from "next"

const LinksPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <Links {...props} />
}

export default LinksPage

type Link = LinksProps['links'][0]
export const getStaticProps: GetStaticProps<LinksProps> = async () => {
    const baseLinks: Link[] = Object.entries(social).map((item) => {

        const index = item[0] as keyof typeof socialColors;
        const bgColor = socialColors[index];

        return {
            href: item[1],
            label: capitalize(item[0]),
            bgColor: bgColor,
            txtColor: getContrast(bgColor),
        }
    })

    const fakeJson: Link[] = [
        ...baseLinks,
    ]

    return {
        props: {
            links: fakeJson,
        },
        revalidate: timeIn('10m')
    }
}

function capitalize (text: string) {
    return text
        .split('')
        .map((char, i) => i === 0 ? char.toUpperCase() : char)
        .join('')
}
