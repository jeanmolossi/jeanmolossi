import kumala from '@/presentation/assets/images/kumala-la-kumala.gif';
import Container from "@/presentation/components/_layout/container";
import PageHeading from '@/presentation/components/global/page-heading';
import { HeadTitle } from '@/presentation/components/global/page-heading/title';
import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Jean Molossi | Entre em contato'.trimAfter(50),
    description: 'Contatos do Desenvolvedor Jean Molossi'.trimAfter(150),
    publisher: 'https://jeanmolossi.com.br'
}

export default function Contato () {
    return (
        <Container>
            <div className="flex flex-col gap-4 mt-4 p-4 max-w-2xl mx-auto">
                <PageHeading>
                    <HeadTitle>Contato ?</HeadTitle>
                </PageHeading>

                <p>Não achou que seria tão facil, achou ? &#128514;&#128514;&#128514;</p>

                <hr className="opacity-50" />

                <p>Atualmente respondo mais rápido por alguma das minhas redes sociais</p>

                <div className="mx-auto">
                    <Image
                        priority
                        className="object-cover"
                        src={kumala}
                        alt="fake contacts"
                        width={640}
                        height={594}
                    />
                </div>

                <Link href="/links" className="text-right">
                    &#128073; Ver links
                </Link>
            </div>
        </Container>
    )
}
