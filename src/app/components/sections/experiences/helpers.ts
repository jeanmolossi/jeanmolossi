import { techs, tools, others } from "@/data/content/techonologies"
import { IconType } from "react-icons";
import { Range } from "./skills";

export const techSearch = (tag: string) => {
    return techs
        .concat(tools)
        .concat(others)
        .find(
            tech => tech.alt.toLocaleLowerCase() === tag.toLocaleLowerCase(),
        ) || null
}

export type Tech = {
    href: string;
    icon: IconType;
    alt: string;
    color: string;
    usageFrequency: Range<0, 101>
}
