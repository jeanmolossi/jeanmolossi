import styles from './styles.module.css'
import Link from 'next/link'

export const Logo = () => {
    return (
        <Link href="/" passHref>
            <h1 className={styles.heading}>
                Jean Molossi
                <small>Fullstack Software Developer</small>
            </h1>
        </Link>
    )
}
