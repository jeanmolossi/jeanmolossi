import Image from "next/image"
import Link from "next/link"
import styles from './styles.module.css'

export const HireLogo = () => {
    return (
        <Link href={"/links"} className={styles.hire_container}>
            <div>
                <Image
                    src={{
                        src: '/images/hire-text.png',
                        width: 120,
                        height: 120
                    }}
                    alt="texto contrate-me"
                />
            </div>

            <div>
                <Image
                    src={{
                        src: '/images/hire-globe.png',
                        width: 110,
                        height: 110
                    }}
                    alt="globo"
                />
            </div>
        </Link>
    )
}
