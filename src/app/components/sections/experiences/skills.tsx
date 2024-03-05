import { IconType } from "react-icons";
import styles from './skills.module.css';

type Enumerate<N extends number, Acc extends number[] = []> =
    Acc['length'] extends N
        ? Acc[number]
        : Enumerate<N, [...Acc, Acc['length']]>

type HexaLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
type HexaNumber = Range<1,9>

type HexaChar = HexaNumber | HexaLetter;

type Hexa3 = `${HexaChar}${HexaChar}${HexaChar}`;
type Hexa4 = `${Hexa3}${HexaChar}`;

type Color = `#${Hexa3 | Hexa4}`;

export type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export type Skill = {
    alt: string;
    usageFrequency: Range<0, 101>
    color: Color | string;
    icon?: IconType;
    href: string;
}

interface SkillsProps {
    skills: Skill[]
}

export function Skills({ skills }: SkillsProps) {
    return (
        <div className="flex flex-col gap-1 p-4 hover:bg-background rounded transition-all">
            {skills.map((skill, i) => <Skill key={i.toString()} {...skill} />)}
        </div>
    )
}

export function Skill({
    alt,
    color,
    usageFrequency = 0,
    icon: Icon,
    href,
}: Skill) {
    return (
        <div>
            <a
                className="flex items-center gap-2"
                href={href}
                target="_blank"
                style={{ color }}
            >
                {!!Icon && <Icon size={24} />} {alt}
            </a>

            <div className="flex w-full items-center gap-2">
                <div
                    className={styles.skill_bar}
                    style={{
                        backgroundColor: color,
                        width: `${usageFrequency}%`,
                    }}
                ></div>
                <small className="text-sm">{usageFrequency}%</small>
            </div>
        </div>
    )
}
