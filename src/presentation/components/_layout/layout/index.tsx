import styles from './styles.module.css'
import { CSSProperties, ReactNode } from "react";
import { Navbar } from "../navbar";
import { HireLogo } from "../hire-logo";
import { Footer } from "../footer";

interface LayoutProps {
    children?:ReactNode;
}

const backgroundStyle: CSSProperties = {
    backgroundImage: 'url("/images/main_bg.png")',
    backgroundAttachment: 'fixed'
}

export function Layout({ children }: LayoutProps) {
    return (
        <div style={backgroundStyle}>
            <main className={styles.main_container}>
                {children}

                <HireLogo />
                <Navbar />

                <Footer />
            </main>
        </div>
    )
}
