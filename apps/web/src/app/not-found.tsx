import { Button } from '@jeanmolossi/ui';
import { ArrowLeftCircle, BookDown, LinkIcon, ListVideo, Newspaper } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="mx-auto max-w-screen-sm py-20 space-y-8">
            <h1 className="text-7xl font-semibold">Oops!</h1>
            <p>A Página que você está buscando não existe, tente de outra forma!</p>
            <Button asChild variant="link">
                <Link href="/">
                    <ArrowLeftCircle />
                    Voltar
                </Link>
            </Button>

            <div className="flex flex-col gap-2 items-start">
                <span>Links úteis</span>

                <Button asChild variant="link">
                    <Link href="/cursos">
                        <ListVideo />
                        Navegue pelos cursos
                    </Link>
                </Button>

                <Button asChild variant="link">
                    <Link href="/eap">
                        <BookDown />
                        E-book de alavancagem de carreira
                    </Link>
                </Button>

                <Button asChild variant="link">
                    <Link href="/links">
                        <LinkIcon />
                        Links de contato
                    </Link>
                </Button>
            </div>
        </div>
    );
}
