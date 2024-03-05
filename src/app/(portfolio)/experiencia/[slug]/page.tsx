import { expSelector } from "@/app/components/sections/experiences";
import { experiences } from "@/data/content";
import { Suspense } from "react";

interface ExpParams {
    params: {
        slug: string;
    }
}

export default function Experience({ params }: ExpParams) {
    const { slug } = params

    const experience = experiences.get(slug)
    const Content = expSelector.get(slug);

    if (!experience || !Content) {
        return (
            <div className="py-4">
                <h1 className="text-2xl">Oops! Não encontrado</h1>
                <p>
                    Não encontrei a página que você está procurando =(
                </p>
                <small>{slug}</small>
            </div>
        )
    }

    const { title, role, start_period, end_period } = experience;


    return (
        <div className="max-w-screen-lg flex flex-col min-h-[70vh] mx-auto justify-center py-8">
            <header className="mb-4">
                <h1 className="text-3xl">{title} | {role}</h1>
                <small className="text-gray-400">De {start_period} à {end_period}</small>
            </header>

            <Suspense fallback={'Carregando...'}>
                <Content />
            </Suspense>
        </div>
    )
}
