import dynamic from "next/dynamic";
import { Video as VideoModel } from "@/domain/entities/youtube/view";
import { Container, MarkdownProps } from "@/presentation/components"
import { VideoWrapper } from "./video-wrapper";
import * as S from './styles'
import { FunctionComponent } from "react";

const LazyMD = dynamic(() => import('@/presentation/components/_layout/markdown').then(mod => mod.Markdown)) as FunctionComponent<MarkdownProps>

export interface VideoProps {
    video: VideoModel;
}

export const Video = ({ video }: VideoProps) => {

    return (
        <Container>
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
