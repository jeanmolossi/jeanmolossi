import Image from "next/image";
import styles from './styles.module.css'

export function HeroSection() {
    return (
        <div className="bg-neutral-800 p-4 w-full inline-flex justify-center md:bg-[url('/images/book-1868068_1920.jpg')] bg-cover bg-bottom bg-blend-multiply">
            <div className={styles.hero_wrapper}>
                <div className="my-auto px-4">
                    <h1 className="text-3xl md:text-5xl md:leading-tight mb-8 font-medium">
                        Alavanque sua <span className="text-orange-500">carreira</span>{' '}
                        com o e-book de{' '}
                        <span className="text-orange-500">Alavancagem</span> Profissional
                    </h1>
                    <h2 className="text-lg font-normal text-gray-400">
                        Descubra os segredos para construir uma base sólida, dominar habilidades técnicas e alcançar o sucesso profissional no mundo da programação.
                    </h2>
                </div>

                <div className={styles.offer_card}>
                    <div className="flex gap-2 text-lg items-center">
                        <span className="uppercase py-2 px-4 bg-stone-900 rounded">90% Off</span>
                        <span className="animate-pulse">Por tempo limitado</span>
                    </div>

                    <div className={styles.pricing}>
                        <span className={styles.from}>De <span className="line-through">R$ 197,00</span> por</span>
                        <span className={styles.to}>R$ 19,70</span>
                    </div>

                    <div className="flex flex-col gap-4 text-center">
                        <a href="#" className={styles.grant_book}>Quero o meu agora!</a>
                        <span className="font-medium">Cartão de crédito, Boleto à vista e Pix</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
