import { CSSProperties, ReactNode } from "react";
import { Navbar } from "../navbar";
import { MainContainer } from './styles'
import { HireLogo } from "../hire-logo";
import { Footer } from "../footer";

interface LayoutProps {
    children?:ReactNode;
    className?: string;
}

const backgroundStyle: CSSProperties = {
    backgroundImage: 'url("/images/main_bg.png")',
    backgroundAttachment: 'fixed'
}

export function Layout({ children, className = '' }: LayoutProps) {
    return (
        <div style={backgroundStyle}>
            <MainContainer>
                {children}

                <HireLogo />
                <Navbar />

                <Footer />
            </MainContainer>
        </div>
    )
}
