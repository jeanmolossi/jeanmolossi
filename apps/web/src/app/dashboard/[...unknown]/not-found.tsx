import { Button } from '@jeanmolossi/ui';
import { ArrowLeftCircle, ListVideo, Newspaper, Video } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="mx-auto max-w-screen-sm py-20 space-y-8">
            <h1 className="text-7xl font-semibold">Oops!</h1>
            <p>
                A Página que você está buscando não existe, tente de outra
                forma!
            </p>

            <Button asChild variant="link">
                <Link href="/dashboard">
                    <ArrowLeftCircle />
                    Voltar
                </Link>
            </Button>

            <div className="flex flex-col gap-2 items-start">
                <span>Links úteis</span>

                <Button asChild variant="link">
                    <Link href="/dashboard/playlists">
                        <ListVideo />
                        Navegue por playlists
                    </Link>
                </Button>

                <Button asChild variant="link">
                    <Link href="/dashboard/videos">
                        <Video />
                        Navegue por videos
                    </Link>
                </Button>

                <Button asChild variant="link">
                    <Link href="/dashboard/artigos">
                        <Newspaper />
                        Navegue por artigos
                    </Link>
                </Button>
            </div>
        </div>
    );
}
