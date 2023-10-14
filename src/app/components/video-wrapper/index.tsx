'use client';

import React, { FunctionComponent, useCallback, useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FaPlay } from "react-icons/fa";
import { SwapComponents } from "@/presentation/helpers";
import { Loader } from "@/app/components/loader";
import { Video as VideoModel } from "@/domain/entities/youtube/view";
import styles from './video-wrapper.module.css'

const LazyIFrame = dynamic(
    () => import('./iframe-loader'),
    { loading: () => <Loader />}
) as FunctionComponent<{ videoId: string }>

interface VideoWrapperProps {
    video: VideoModel;
}

export const VideoWrapper = React.memo(({ video }: VideoWrapperProps) => {
    const [shouldPlay, setShouldPlay] = useState(false);

    const wantPlayVideo = useCallback(() => {
        setShouldPlay(true);
    }, [])

    const src = useMemo(() => {
        return video.snippet.thumbnails.maxres?.url
            || video.snippet.thumbnails.high?.url
            || video.snippet.thumbnails.medium!.url;
    }, [video.snippet.thumbnails])

    return (
        <div className={styles.video_wrapper}>
            <SwapComponents
                condition={shouldPlay}
                componentIfConditionTrue={
                    <LazyIFrame videoId={video.id} />
                }
                componentIfConditionFalse={
                    <button className={styles.image_button} onClick={wantPlayVideo}>
                        <Image
                            alt={`Capa do vídeo ${video.snippet.title}`}
                            style={{ objectFit:"cover" }}
                            src={{ src, width: 1280, height: 720 }}
                            fill
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
