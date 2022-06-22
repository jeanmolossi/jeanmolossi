import Image from "next/image";
import Link from "next/link";
import { Container } from "@/presentation/components"
import * as S from './styles';
import { useMemo } from "react";

export const InTouch = () => {
    const src = useMemo(() => {
        return {
            src: '/kumala-la-kumala.gif',
            width: 640,
            height: 594
        }
    }, [])

    return (
        <Container>
            <S.InTouchContainer>
                <h1>Contato ?</h1>
                <p>Não achou que seria tão facil, achou ? &#128514;&#128514;&#128514;</p>
                <hr />
                <p>Atualmente respondo mais rápido por alguma das minhas redes sociais</p>

                <div>
                    <Image
                        loading="lazy"
                        objectFit="cover"
                        src={src}
                    />
                </div>

                <Link href="/links" passHref>
                    <a>&#128073; Ver links</a>
                </Link>
            </S.InTouchContainer>
        </Container>
    )
}
