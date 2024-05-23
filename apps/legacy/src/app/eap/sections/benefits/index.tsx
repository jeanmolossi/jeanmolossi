'use client';

import Image, { ImageProps } from "next/image";
import { MouseEvent } from "react";
import { IconType } from "react-icons";
import { BsGraphUp, BsPersonVideo2 } from "react-icons/bs";
import { FiGift } from "react-icons/fi";
import { IoFootstepsOutline } from "react-icons/io5";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { SiSkillshare } from "react-icons/si";
import styles from './styles.module.css';

import proof1CDFTV from '@/presentation/assets/images/social-prof/cdftv-salary.jpg';
import proof2Forbes from '@/presentation/assets/images/social-prof/forbes-dev.jpg';

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
        <section className="bg-neutral-800 w-full" id="bonus">
            <div className="max-w-7xl mx-auto py-8">
                <h2 className="py-4 inline-flex text-2xl gap-2 items-center">
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

            <div className="max-w-7xl mx-auto" id="tech-market">
                <h3 className="inline-flex text-2xl gap-2 mb-4 py-4 mx-auto">
                    <BsGraphUp />
                    Veja o mercado de tecnologia
                </h3>

                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
                    <ProofItem
                        alt="Vagas na área de tecnologia"
                        backlink="https://forbes.com.br/carreira/2022/08/empregos-em-ti-veja-os-cargos-em-alta-e-os-salarios-da-area/"
                        image={proof2Forbes}
                    />

                    <ProofItem
                        alt="Média de salários por nível de desenvolvedores"
                        backlink="https://pesquisa.codigofonte.com.br/2022"
                        image={proof1CDFTV}
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

interface ProofProps {
    alt: string;
    backlink: string;
    image: ImageProps['src'];
}

function ProofItem({ alt, backlink, image }: ProofProps) {
    const url = new URL(backlink)

    return (
        <div className={['group', styles.proof_wrapper].join(' ')}>
            <a href={backlink} className={styles.proof} rel="noopener noreferer" target="_blank">
                <Image
                    alt={alt}
                    src={image}
                    style={{ objectFit: 'contain' }}
                    fill
                />
            </a>

            <small className="group-hover:text-white">Fonte: {url.hostname}</small>
        </div>
    )
}
