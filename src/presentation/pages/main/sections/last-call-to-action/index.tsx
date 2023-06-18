import { ImBooks } from "react-icons/im";
import styles from './styles.module.css'

export function LastCallToAction() {
    return (
        <section className="bg-neutral-800 w-full py-8 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8">
                <div className="max-w-2xl mx-auto">
                    <p className="inline-flex gap-2">
                        <span className="text-5xl"><ImBooks /></span>
                        Faça o download agora mesmo e comece a alavancar sua carreira como desenvolvedor!
                    </p>

                    <a className={styles.grant_book_link} href="#">Garantir e-book</a>
                </div>
            </div>
        </section>
    )
}
