'use client';

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="max-w-7xl px-6 xl:p-0">
            <h2 className="text-2xl">Algo de errado aconteceu!</h2>

            <button
                onClick={
                    // tenta se recuperar tentando re-renderizar o segmento
                    () => reset()
                }
                className="text-cyan-500 hover:underline"
            >
                Tentar novamente
            </button>
        </div>
    )
}
