import { VideoWrapper } from "@/app/components/video-wrapper";
import { getVideo } from "@/data/youtube/video";
import Container from "@/presentation/components/_layout/container";
import React, { Suspense } from "react";

const LazyMD = React.lazy(() => import('@/presentation/components/markdown'))

interface VideoProps {
    params?: {
        videoId: string;
    }
}

export default async function Video({ params }: VideoProps) {
    const videoId = params?.videoId

    if (!videoId) {
        return (
            <Container>
                <h2>Oops, não encontrado!</h2>
            </Container>
        )
    }

    const video = await getVideo(videoId)

    return (
        <Container className="my-4 max-w-5xl mx-auto">
            <h1 className="text-4xl my-4 font-semibold">{video.snippet.title}</h1>

            <VideoWrapper video={video} />

            <div className="my-4">
                <Suspense fallback="Carregando...">
                    <LazyMD>
                        {video.snippet.description}
                    </LazyMD>
                </Suspense>
            </div>
        </Container>
    )
}

