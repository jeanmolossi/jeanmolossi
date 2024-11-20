import { redirect } from 'next/navigation';

interface PlaylistProps {
    params: Promise<{
        playlistId: string;
    }>;
    searchParams?: Promise<{
        page?: string;
        pageSize?: string;
        search?: string;
    }>;
}

export default async function Page(props: PlaylistProps) {
    const params = await props.params;
    return redirect(`/curso/${params?.playlistId}`);
}
