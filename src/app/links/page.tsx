import { social } from "@/config/constants";
import { Links, LinksProps } from "@/presentation/pages/links"
import { getContrast } from "@/presentation/helpers/contrast-calc"
import { socialColors } from "@/presentation/styles";

type Link = LinksProps['links'][0]

export default function LinksPage() {
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

    return <Links links={baseLinks} />
}

function capitalize (text: string) {
    return text
        .split('')
        .map((char, i) => i === 0 ? char.toUpperCase() : char)
        .join('')
}
