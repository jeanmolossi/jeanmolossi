import hireGlobe from '@/presentation/assets/images/hire-globe.png';
import hireText from '@/presentation/assets/images/hire-text.png';
import Image from "next/image";
import Link from "next/link";
import styles from './styles.module.css';

export const HireLogo = () => {
    return (
        <Link href={"/links"} className={styles.hire_container}>
            <div>
                <Image
                    src={hireText}
                    alt="texto contrate-me"
                    width={120}
                    height={120}
                />
            </div>

            <div>
                <Image
                    src={hireGlobe}
                    width={110}
                    height={110}
                    alt="globo"
                />
            </div>
        </Link>
    )
}
