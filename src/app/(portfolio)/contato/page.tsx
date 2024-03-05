import Container from "@/app/components/_layout/container";
import kumala from '@/presentation/assets/images/kumala-la-kumala.gif';
import Image from "next/image";
import Link from "next/link";

export default function Contato () {
    return (
        <Container>
            <div className="flex flex-col gap-4 mt-4 p-4 max-w-2xl mx-auto">
                <h1 className="text-4xl">Contato ?</h1>

                <p>Não achou que seria tão facil, achou ? &#128514;&#128514;&#128514;</p>

                <hr className="opacity-50" />

                <p>Atualmente respondo mais rápido por alguma das minhas redes sociais</p>

                <div className="mx-auto">
                    <Image
                        loading="lazy"
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
