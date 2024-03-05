import { Playlists, PlaylistsSkeleton } from "@/app/components/playlists/playlists";
import { Suspense } from "react";

interface PlaylistsPageProps {
    params?: {};
    searchParams?: {
        page?: string;
        pageSize?: string;
    }
}

export default function PlaylistsPage({ searchParams }: PlaylistsPageProps) {
    const page = searchParams?.page || '1';
    const pageSize = searchParams?.pageSize || '10';

    return (
        <>
            <h1 className="text-3xl">Playlists</h1>
            <h2 className="text-xl">Aprenda com projetos práticos!</h2>

            <Suspense fallback={<PlaylistsSkeleton />}>
                <Playlists page={page} pageSize={pageSize} />
            </Suspense>
        </>
    )
}
