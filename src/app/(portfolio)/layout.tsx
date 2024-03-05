import { HireLogo } from "@/presentation/components/_layout/hire-logo";
import Navigation from "@/presentation/components/_layout/navigation-menu";
import "@/presentation/helpers";

export default function Layout({
    children,
    modal,
}: {
    children: React.ReactNode,
    modal: React.ReactNode,
}) {
    return (
        <div className="app-layout-child mx-auto w-full max-w-screen-2xl bg-background pt-[4.5rem]">
            <Navigation />

            {children}
            {modal}

            <HireLogo />
        </div>
    )
}
