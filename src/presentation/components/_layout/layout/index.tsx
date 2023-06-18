import styles from './styles.module.css'
import { ReactNode } from "react";
import { Navbar } from "../navbar";
import { HireLogo } from "../hire-logo";
import { Footer } from "../footer";

interface LayoutProps {
    children?:ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <main className={styles.main_container}>
            {children}

            <HireLogo />
            <Navbar />

            <Footer />
        </main>
    )
}
