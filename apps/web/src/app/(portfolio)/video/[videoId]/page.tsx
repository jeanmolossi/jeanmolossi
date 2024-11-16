import { VideoComponent } from "@/app/components/video-wrapper/server-video";
import { cachedGetVideo as getVideo } from "@/data/strapi";
import Container from "@/presentation/components/_layout/container";
import { PlayCircle } from "lucide-react";
import { Metadata } from "next";
import React, { Suspense } from "react";

const LazyMD = React.lazy(() => import('@/presentation/components/markdown'))

interface VideoProps {
    params?: Promise<{
        videoId: string;
    }>
}

export default async function Video(props: VideoProps) {
    const params = await props.params;
    const slug = params?.videoId

    if (!slug) {
        return (
            <Container>
                <h2>Oops, não encontrado!</h2>
            </Container>
        )
    }

    const video = await getVideo(slug)

    return (
        <Container className="my-4 max-w-5xl mx-auto">
            <h1 className="text-4xl my-4 font-semibold">{video.title}</h1>

            <Suspense fallback={(
                <div className="flex flex-col items-center justify-center w-full aspect-video animate-pulse bg-muted-foreground rounded">
                    <div className="sr-only">Carregando vídeo...</div>
                    <PlayCircle size={72} />
                </div>
            )}>
                <VideoComponent videoId={video.id} />
            </Suspense>

            <div className="my-4">
                <Suspense fallback="Carregando...">
                    <LazyMD>
                        {video.description}
                    </LazyMD>
                </Suspense>
            </div>
        </Container>
    )
}


export async function generateMetadata(props: VideoProps): Promise<Metadata> {
    const params = await props.params;
    const video = await getVideo(params?.videoId!);

    let title = video.title;
    if (title.length > 60)
        title = video.title.trimAfter(60, '');
    else if ((title.length + ' | Jean Molossi'.length) <= 60)
        title = [video.title, 'Jean Molossi'].join(' | ')

    return {
        title,
        description: video.description.trimAfter(150, ''),
        authors: [{ name: 'Jean Molossi', url: 'https://jeanmolossi.com.br' }],
        creator: 'Jean Molossi',
        publisher: 'Jean Molossi',
        openGraph: {
            type: 'video.episode',
            images: [video.cover.default],
            url: `https://jeanmolossi.com.br/video/${video.canonicalUrl}`,
            title,
            description: video.description.trimAfter(150, ''),
        },
    }
}

export const revalidate = 300
