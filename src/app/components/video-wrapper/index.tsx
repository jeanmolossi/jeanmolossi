'use client';

import { Loader } from "@/app/components/loader";
import { Video } from "@/domain/playlist";
import AspectRatioCover from "@/presentation/components/global/aspect-ratio-cover";
import { SwapComponents } from "@/presentation/helpers";
import dynamic from "next/dynamic";
import React, { FunctionComponent, useCallback, useMemo, useState } from "react";
import { FaPlay } from "react-icons/fa";
import styles from './video-wrapper.module.css';

const LazyIFrame = dynamic(
    () => import('./iframe-loader'),
    { loading: () => <Loader />}
) as FunctionComponent<{ videoId: string }>

interface VideoWrapperProps {
    video: Video;
}

export const VideoWrapper = React.memo(({ video }: VideoWrapperProps) => {
    const [shouldPlay, setShouldPlay] = useState(false);

    const wantPlayVideo = useCallback(
        () => setShouldPlay(true),
        [],
    )

    const src = useMemo(() => {
        return video.cover.maxres
            || video.cover.high
            || video.cover.medium
            || video.cover.default;
    }, [video.cover])

    return (
        <div className={styles.video_wrapper}>
            <SwapComponents
                condition={shouldPlay}
                componentIfConditionTrue={
                    <LazyIFrame videoId={video.id} />
                }
                componentIfConditionFalse={
                    <button className={styles.image_button} onClick={wantPlayVideo}>
                        <AspectRatioCover
                            alt={`Capa do vídeo ${video.title}`}
                            src={{ src, width: 1280, height: 720 }}
                            wrapperClassName="rounded overflow-hidden"
                            priority
                        />

                        <span>
                            <FaPlay />
                        </span>
                    </button>
                }
            />
        </div>
    )
})
