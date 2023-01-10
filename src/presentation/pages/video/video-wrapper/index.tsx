import React, { FunctionComponent, useCallback, useMemo, useState } from "react";
import Image from "next/legacy/image";
import dynamic from "next/dynamic";
import { FaPlay } from "react-icons/fa";
import { cdnLoader, SwapComponents } from "@/presentation/helpers";
import { Loader } from "@/presentation/components";
import { VideoProps } from "../";
import * as S from './styles'

const LazyIFrame = dynamic(
    () => import('./iframe-loader'),
    { loading: () => <Loader />}
) as FunctionComponent<{ videoId: string }>

export const VideoWrapper = React.memo(({ video }: VideoProps) => {
    const [shouldPlay, setShouldPlay] = useState(false);

    const wantPlayVideo = useCallback(() => {
        setShouldPlay(true);
    }, [])

    const src = useMemo(() => {
        return video.snippet.thumbnails.maxres?.url
            || video.snippet.thumbnails.high?.url
            || video.snippet.thumbnails.medium.url;
    }, [video.snippet.thumbnails])

    return (
        <S.VideoWrapper>
            <SwapComponents
                condition={shouldPlay}
                componentIfConditionTrue={
                    <LazyIFrame videoId={video.id} />
                }
                componentIfConditionFalse={
                    <S.ImageButton onClick={wantPlayVideo}>
                        <div>
                            <Image
                                loader={cdnLoader}
                                priority
                                objectFit="cover"
                                src={{ src, width: 1280, height: 720 }}
                            />
                        </div>

                        <span>
                            <FaPlay />
                        </span>
                    </S.ImageButton>
                }
            />
        </S.VideoWrapper>
    )
})
