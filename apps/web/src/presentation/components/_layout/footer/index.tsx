import styles from './styles.module.css'

export const Footer = () => {
    const year = (new Date()).getFullYear()
    return (
        <div className={styles.footer}>
            <p>Todos os direitos reservados &copy; {year}</p>
        </div>
    )
}
