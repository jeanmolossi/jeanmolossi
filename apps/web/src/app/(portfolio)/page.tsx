import Timeline from "@/app/components/sections/timeline/timeline";
import IAimg from '@/presentation/assets/images/cinematic_profile_pic_of_a_young_developer_inspired_cyberpunk_colors_style-Photographic.webp';
import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

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
    },
}

export default function HomePage() {
    const startedIn = 2010
    const currentYear = new Date().getFullYear()
    const experienceInYears = currentYear - startedIn

    const items = [
        {
            heading: 'Informatic Center | Dev Fullstack',
            subheading: 'De 2012 à 2017',
            content: (
            <>
                Desenvolvia websites para clientes utilizando WordPress.
                Além de também customizar temas e plugins usando <b>PHP</b>,
                Gulp, Sass, <b>Javascript</b>, jQuery, Ajax, etc.
            </>
            ),
            href: "/experiencia/informatic-center"
        },
        {
            heading: 'Bokas Restaurante | Garçom',
            subheading: 'De 2017 à 2020',
            content: (
            <>
                Trabalhando como garçom desenvolvi diversas habilidades
                que melhoraram minha <b>comunicação</b> de forma clara
                e objetiva.
            </>
            ),
            href: '/experiencia/bokas-restaurante'
        },
        {
            heading: 'Khube | Dev Fullstack',
            subheading: 'De 2020 à 2021',
            content: (
            <>
                Desenvolvi sistemas web completos, desde <b>Frontend</b> até os
                serviços de <b>Backend</b>.
                Utilizei majoritariamente NodeJS no Backend e ReactJS no
                Frontend
            </>
            ),
            href: '/experiencia/khube'
        },
        {
            heading: 'Catho Online | Dev Fullstack',
            subheading: 'De 2021 - Atualmente',
            content: (
            <>
                Desenvolvo aplicações de <b>grande porte</b>. Atuo, como{' '}
                <b>Desenvolvedor Sênior</b> utilizando diversas techs, dentre
                elas, as principais são Golang, Javascript/Typescript e PHP.
            </>
            ),
            href: '/experiencia/catho-online'
        }
    ];

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center min-h-[calc(100vh-15rem)] p-6">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl md:text-4xl md:leading-tight font-semibold">
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
                        <Suspense>
                            <Image
                                priority
                                title="Foto gerada por IA"
                                alt="Imagem de um desenvolvedor gerado por IA"
                                src={IAimg}
                                style={{ objectFit: 'cover' }}
                                fill
                                loading="eager"
                            />
                        </Suspense>
                    </div>
                </div>
            </div>

            <Timeline
                id="experiencias"
                className='py-16 px-0 min-h-screen'
                header="Experiência profissional"
                items={items}
            />
        </>
    )
}
