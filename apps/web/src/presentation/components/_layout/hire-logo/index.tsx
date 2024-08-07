import hireGlobe from '@/presentation/assets/images/hire-globe.png';
import hireText from '@/presentation/assets/images/hire-text.png';
import { cn } from '@jeanmolossi/utils';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';

const HireLogo = () => {
    return (
        <Link href={'/links?referer=contrate-me'} className={cn(styles.hire_container)}>
            <div>
                <Image
                    src={hireText}
                    alt="texto contrate-me"
                    width={120}
                    height={120}
                    className="invert dark:invert-0"
                />
            </div>

            <div>
                <Image
                    src={hireGlobe}
                    width={110}
                    height={110}
                    alt="globo"
                    className="invert dark:invert-0"
                />
            </div>
        </Link>
    );
};

export default HireLogo;
