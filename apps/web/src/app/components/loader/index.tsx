import { CgSpinner } from "react-icons/cg"
import styles from './styles.module.css'

export const Loader = () => {
    return (
        <div className={styles.loader_container}>
            <div><CgSpinner color="white" /></div>
        </div>
    )
}
