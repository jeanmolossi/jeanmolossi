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
        <div className="app-layout-child mx-auto w-full bg-background">
            <Navigation />

            {children}
            {modal}
        </div>
    )
}
