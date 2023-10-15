import { Suspense } from "react";
import { Playlists, PlaylistsSkeleton } from "@/app/components/playlists/playlists";

interface PlaylistsPageProps {
    params?: {};
    searchParams?: {
        page?: string;
    }
}

export default function PlaylistsPage({ searchParams }: PlaylistsPageProps) {
    const page = searchParams?.page;

    return (
        <>
            <h1 className="text-3xl">Playlists</h1>
            <h2 className="text-xl">Aprenda com projetos práticos!</h2>

            <Suspense fallback={<PlaylistsSkeleton />}>
                <Playlists page={page} />
            </Suspense>
        </>
    )
}
