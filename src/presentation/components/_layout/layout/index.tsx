import { ReactNode, Suspense } from "react";
import { Footer } from "../footer";
import { HireLogo } from "../hire-logo";
import { Navbar } from "../navbar";
import styles from './styles.module.css';

interface LayoutProps {
    children?:ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <main className={styles.main_container}>
            {children}

            <HireLogo />
            <Suspense>
                <Navbar />
            </Suspense>

            <Footer />
        </main>
    )
}
