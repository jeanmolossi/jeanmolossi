import Sidebar from '@/presentation/components/dashboard/sidebar/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[clamp(150px,_100%,_280px),_1fr] h-screen gap-2">
            <div className="overflow-y-auto">
                <Sidebar />
            </div>

            <div className="overflow-y-auto pt-4">{children}</div>
        </div>
    );
}
