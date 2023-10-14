import Image from "next/image";
import Container from "@/app/components/_layout/container";
import { getVideo } from "@/data/youtube/video";
import React, { Suspense } from "react";
import { VideoWrapper } from "@/app/components/video-wrapper";

const LazyMD = React.lazy(() => import('@/app/components/_layout/markdown'))

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
        <Container className="my-4">
            <VideoWrapper video={video} />

            <h1 className="text-4xl my-4">{video.snippet.title}</h1>

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

