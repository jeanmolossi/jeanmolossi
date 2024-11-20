import { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Playlists | Vídeo aulas',
    description: 'Aprenda com projetos práticos comigo',
};

export default async function PlaylistsPage() {
    return permanentRedirect('/cursos');
}

export const revalidate = 300;
