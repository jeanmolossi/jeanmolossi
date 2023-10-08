import Modal from "@/app/components/modal/modal";
import React, { Suspense } from "react";
import { experiences } from "@/data/content";
import { expSelector } from "@/app/components/sections/experiences";

interface ModalParams {
    params: {
        slug: string;
    }
}

export default function ExpModal({ params }: ModalParams) {
    const { slug } = params

    const experience = experiences.get(slug)
    const Content = expSelector.get(slug);

    if (!experience || !Content) {
        return (
            <Modal>
                <h1>Oops! Não encontrado</h1>
                <p>
                    Não encontrei a página que você está procurando =(
                </p>
                <small>{slug}</small>
            </Modal>
        )
    }

    const { title, role, start_period, end_period } = experience;

    return (
        <Modal>
            <header className="mb-4">
                <h1 className="text-2xl">{title} | {role}</h1>
                <small className="text-gray-400">De {start_period} à {end_period}</small>
            </header>

            <Suspense fallback={'Carregando...'}>
                <Content />
            </Suspense>
        </Modal>
    )
}
