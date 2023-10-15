import Image from "next/image";
import { IconType } from "react-icons";
import { FiBook, FiCheck } from "react-icons/fi";
import styles from './styles.module.css'

const items = [
    {
        modText: 'Fundamentos da Carreira em Desenvolvimento',
        description: 'Aprenda os pilares essenciais para construir uma base sólida em sua jornada como desenvolvedor.'
    },
    {
        modText: 'Aperfeiçoamento Técnico',
        description: 'Domine as habilidades técnicas mais importantes para se destacar no mercado de trabalho, desde algoritmos e estruturas de dados até frameworks populares.',
    },
    {
        modText: 'Desenvolvimento de Habilidades Complementares',
        description: 'Descubra como desenvolver habilidades não técnicas, como comunicação eficaz, resolução de problemas e gerenciamento de projetos, para se tornar um desenvolvedor completo.'
    },
    {
        modText: 'Estratégias de Crescimento na Carreira',
        description: 'Receba orientações práticas sobre como planejar seu crescimento profissional, definir metas alcançáveis e aproveitar ao máximo as oportunidades de promoção.'
    },
    {
        modText: 'Networking e Oportunidades',
        description: 'Descubra como expandir sua rede profissional, encontrar mentores e aproveitar as oportunidades de colaboração para impulsionar sua carreira.'
    },
] as const;

export function Contents () {
    return (
        <section id="content" className="bg-neutral-800 w-full py-8 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr,_clamp(20rem,100%,34rem)] gap-8">
                <div className="flex flex-col gap-8">
                    <h2 className="inline-flex gap-2 items-center text-lg md:text-2xl">
                        <span className="text-2xl md:text-3xl"><FiBook /></span> O que você encontrará neste e-book:
                    </h2>

                    <div className="flex flex-col gap-4">
                        {items.map(({ modText, description }, i) => (
                            <Item
                                key={i}
                                idx={i+1}
                                moduleText={modText}
                                description={description}
                                icon={FiCheck}
                            />
                        ))}
                    </div>

                    <div className="flex flex-col justify-stretch md:flex-row gap-4 px-8">
                        <a href="#" className={[styles.link_button].join(' ')}>Comprar agora</a>
                        <a href="#" className={[styles.link_button, styles.link_preview].join(' ')}>Preview</a>
                    </div>
                </div>

                <div>
                    <Image
                        className="mx-auto my-auto"
                        alt="Amostra do e-book"
                        src={{
                            src: '/images/ebook-amostra.svg',
                            width: 467,
                            height: 559,
                        }}
                    />
                </div>
            </div>
        </section>
    )
}

interface ItemProps {
    icon: IconType;
    idx?: number;
    moduleText: string;
    description: string;
}

function Item({
    icon: Icon,
    idx,
    moduleText,
    description
}: ItemProps) {
    const Idx = () => idx ? <>{idx}. </> : null

    return (
        <div className="flex gap-2">
            <div className="text-2xl">
                <Icon className="text-orange-500" />
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-lg"><Idx />{moduleText}</h3>
                <p className="text-sm text-gray-400">{description}</p>
            </div>
        </div>
    )
}
