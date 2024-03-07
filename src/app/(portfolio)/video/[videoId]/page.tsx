import { VideoWrapper } from "@/app/components/video-wrapper";
import { getVideo } from "@/data/strapi";
import Container from "@/presentation/components/_layout/container";
import { Metadata, ResolvedMetadata } from "next";
import React, { Suspense } from "react";

const LazyMD = React.lazy(() => import('@/presentation/components/markdown'))

interface VideoProps {
    params?: {
        videoId: string;
    }
}

export default async function Video({ params }: VideoProps) {
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

            <VideoWrapper video={video} />

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


export async function generateMetatada(
    { params }: VideoProps,
    _parent: ResolvedMetadata
): Promise<Metadata> {
    console.log('generateMeta')
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
    }
}
