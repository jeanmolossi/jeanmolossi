import { getPlaylist } from '@/data/strapi/playlists/get-playlist';
import { Metadata } from 'next';
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

export async function generateMetadata(props: PlaylistProps): Promise<Metadata> {
    const params = await props.params;
    const playlistId = params?.playlistId!;
    const playlist = await getPlaylist(playlistId);

    let title = playlist.title;
    if (title.length > 60) title = playlist.title.trimAfter(60, '');
    else if (title.length + ' | Jean Molossi'.length <= 60)
        title = [playlist.title, 'Jean Molossi'].join(' | ');

    return {
        title,
        description: playlist.excerpt.trimAfter(150, ''),
        authors: [{ name: 'Jean Molossi', url: 'https://jeanmolossi.com.br' }],
        creator: 'Jean Molossi',
        publisher: 'Jean Molossi',
    };
}

export default async function Page(props: PlaylistProps) {
    const params = await props.params;
    return redirect(`/curso/${params?.playlistId}`);
}
