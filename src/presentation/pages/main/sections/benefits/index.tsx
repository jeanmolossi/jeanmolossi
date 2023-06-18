import { IconType } from "react-icons"
import { IoFootstepsOutline } from "react-icons/io5";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { SiSkillshare } from "react-icons/si";
import { BsPersonVideo2 } from "react-icons/bs";
import styles from './styles.module.css'
import { FiGift } from "react-icons/fi";
import { MouseEvent } from "react";

export function Benefits() {
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        for(const item of document.getElementsByClassName(styles.benefit_item)) {
            const cardItem = item as HTMLDivElement

            const rect = item.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

            cardItem.style.setProperty("--mouse-x", `${x}px`);
            cardItem.style.setProperty("--mouse-y", `${y}px`);
        }
    }

    return (
        <section className="bg-neutral-800 w-full">
            <div className="max-w-7xl mx-auto py-28">
                <h2 className="p-4 inline-flex text-2xl gap-2 items-center">
                    <FiGift />
                    Bônus exclusivos
                </h2>

                <div className={styles.benefits_wrapper} onMouseMove={handleMouseMove}>
                    <Item
                        icon={IoFootstepsOutline}
                        benefit="Orientações passo a passo para avançar em sua carreira como desenvolvedor."
                    />

                    <Item
                        icon={MdOutlineTipsAndUpdates}
                        benefit="Dicas e truques de especialistas do setor para maximizar seu potencial."
                    />

                    <Item
                        icon={SiSkillshare}
                        benefit="Exercícios práticos e projetos para aprimorar suas habilidades de programação."
                    />

                    <Item
                        icon={BsPersonVideo2}
                        benefit="Acesso antecipado ao curso gravado!"
                    />
                </div>
            </div>
        </section>
    )
}

interface ItemProps {
    icon: IconType;
    benefit: string;
}

function Item({ icon: Icon, benefit }: ItemProps) {
    return (
        <div className={styles.benefit_item}>
            <div className={styles.benefit_item_border}></div>
            <div className={styles.benefit_item_content}>
                <span className="text-4xl text-white">
                    <Icon color="white" />
                </span>

                <p>{benefit}</p>
            </div>
        </div>
    )
}
