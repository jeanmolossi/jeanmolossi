import { FunctionComponent, useMemo } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Video as VideoModel } from "@/domain/entities/youtube/view";
import { BaseHead, Container, MarkdownProps } from "@/presentation/components"
import { VideoWrapper } from "./video-wrapper";
import * as S from './styles'

const LazyMD = dynamic(() => import('@/presentation/components/_layout/markdown').then(mod => mod.Markdown)) as FunctionComponent<MarkdownProps>

export interface VideoProps {
    video: VideoModel;
}

export const Video = ({ video }: VideoProps) => {
    const router = useRouter();
    const slug = useMemo(() => router.asPath, [])

    return (
        <Container>
            <BaseHead
                title={video.snippet.title}
                description={video.snippet.description}
                og={{
                    type: 'article',
                    url: `https://jeanmolossi.com.br${slug}`,
                    image: [video.snippet.thumbnails.default.url]
                }}
                canonical={`${slug}`}
            />
            <S.VideoContainer>
                <S.Heading>
                    {video.snippet.title}
                </S.Heading>

                <VideoWrapper video={video} />

                <S.Description>
                    <LazyMD>
                        {video.snippet.description}
                    </LazyMD>

                    <span>
                        Tags: <br />
                        {video.snippet.tags.join(', ')}
                    </span>
                </S.Description>
            </S.VideoContainer>
        </Container>
    )
}
