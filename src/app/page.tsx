import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: 'Portfólio | Jean Molossi',
    description: 'Recentemente comecei a ensinar e você pode me acompanhar e aprender mais sobre esse mundo de Software Development (desenvolvimento de software).',
    alternates: {
        canonical: 'https://jeanmolossi.com.br',
    },
    publisher: 'https://jeanmolossi.com.br',
    robots: {
        index: true,
        follow: true,
    }
}

export default function HomePage() {
    const startedIn = 2010
    const currentYear = new Date().getFullYear()
    const experienceInYears = currentYear - startedIn

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center min-h-[calc(100vh-15rem)] max-w-7xl px-6 xl:p-0">
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl md:text-4xl md:leading-tight">
                    {experienceInYears} Anos de Experiência:
                    Elevando a Qualidade do Desenvolvimento de Software
                    sem Dores de Cabeça
                </h1>

                <p className="leading-normal">
                    Com mais de uma década de excelência em desenvolvimento de
                    software e um compromisso inabalável com a segurança, estou
                    aqui para transformar suas ideias em soluções digitais impecáveis.
                    Conte com minha vasta experiência para construir um futuro
                    digital incrível juntos
                </p>
            </div>

            <div>
                <div className="relative rounded-full w-96 lg:w-[512px] aspect-square overflow-hidden drop-shadow-md transition-all">
                    <Image
                        title="Foto gerada por IA"
                        alt="Imagem de um desenvolvedor gerado por IA"
                        src={{
                            src: '/images/cinematic_profile_pic_of_a_young_developer_inspired_cyberpunk_colors_style-Photographic.png',
                            height: 400,
                            width: 400
                        }}
                        style={{ objectFit: 'cover', transform: 'rotateY(180deg)' }}
                        fill
                    />
                </div>
            </div>
        </div>
    )
}
