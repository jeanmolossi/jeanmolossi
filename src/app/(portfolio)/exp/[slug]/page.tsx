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
            <h1>Oops! Não encontrado</h1>
        )
    }

    const { title, role, start_period, end_period } = experience;


    return (
        <div className="max-w-screen-lg flex flex-col min-h-[70vh] justify-center">
            <header className="mb-4">
                <h1 className="text-lg">{title} | {role}</h1>
                <small className="text-gray-400">{start_period} à {end_period}</small>
            </header>

            <Suspense fallback={'Carregando...'}>
                <Content />
            </Suspense>
        </div>
    )
}
