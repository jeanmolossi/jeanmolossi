import Container from '@/presentation/components/_layout/container';
import { redirect } from 'next/navigation';
import React from 'react';

interface VideoProps {
    params?: Promise<{
        videoId: string;
    }>;
}

export default async function Video(props: VideoProps) {
    const params = await props.params;
    const slug = params?.videoId;

    if (!slug) {
        return (
            <Container>
                <h2>Oops, não encontrado!</h2>
            </Container>
        );
    }

    return redirect(`/cursos`);
}
