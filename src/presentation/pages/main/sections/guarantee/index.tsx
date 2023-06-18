import { IconType } from "react-icons";
import { FaMedal } from "react-icons/fa";
import { GiLifeBar } from "react-icons/gi";

export function Guarantee() {
    return (
        <section className="bg-neutral-800 w-full py-8 px-4">
            <div className="max-w-7xl mx-auto flex flex-wrap gap-8 py-20">
                <Item
                    icon={FaMedal}
                    title="Garantia de satisfação"
                    paragraph="Estou tão confiante de que você encontrará valor neste e-book que ofereço uma garantia de satisfação de 7 dias. Se você não ficar satisfeito com o conteúdo, reembolsaremos seu dinheiro sem questionamentos."
                />

                <Item
                    icon={GiLifeBar}
                    title="Acesso vitalício"
                    paragraph="Você tem acesso a todas as atualizações de forma vitalícia. Você só precisa acessar a área de membros e fazer o download do material atualizado!"
                />
            </div>
        </section>
    )
}

interface ItemProps {
    icon: IconType;
    title: string;
    paragraph: string;
}

function Item({ icon: Icon, title, paragraph }: ItemProps) {
    return (
        <div className="basis-full md:basis-[calc(50%-1rem)] bg-neutral-700 p-4 rounded-lg relative drop-shadow-lg md:hover:scale-105 transition-all">
            <span className="absolute right-4 top-4 opacity-30 text-7xl text-orange-300">
                <Icon />
            </span>
            <h2 className="mb-4 text-xl">{title}</h2>
            <p>{paragraph}</p>
        </div>
    )
}
