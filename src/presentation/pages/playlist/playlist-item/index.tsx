import { PlaylistItem as PlaylistItemModel } from "@/domain/entities/youtube/view";
import { MarkdownProps } from "@/presentation/components";
import { cdnLoader } from "@/presentation/helpers";
import { useMediaQuery } from "@/presentation/hooks";
import dynamic from "next/dynamic";
import Image from "next/legacy/image";
import Link from "next/link";
import { FunctionComponent, useMemo } from "react";
import * as S from './styles';

const LazyMD = dynamic(() => import("@/presentation/components/_layout/markdown").then(mod => mod.Markdown)) as FunctionComponent<MarkdownProps>

interface PlaylistItemProps {
    item: PlaylistItemModel;
}

export const PlaylistItem = ({ item }: PlaylistItemProps) => {
    const isUpMedia = useMediaQuery("(min-width: 768px)");

    const slug = useMemo(() => {
        return `${item.snippet.title.toSlug()}/${item.snippet.resourceId.videoId}`;
    }, [item.snippet.title, item.snippet.resourceId.videoId]);

    const description = useMemo(() => {
        const length = isUpMedia ? 250 : 350
        return item.snippet.description.trimAfter(length, '... _**ver mais**_')
    }, [item.snippet.description, isUpMedia]);

    const thumb = useMemo(() => {
        const size: keyof typeof item.snippet.thumbnails = isUpMedia
            ? 'high'
            : 'medium'
        return {
            src: item.snippet.thumbnails[size].url,
            width: 1280,
            height: 720
        }
    }, [item.snippet.thumbnails, isUpMedia])

    return (
        <S.ItemContainer>
            <Link href="/video/[...slug]" as={`/video/${slug}`} passHref legacyBehavior>
                <S.Cover>
                    <Image
                        loader={cdnLoader}
                        loading="lazy"
                        objectFit="cover"
                        src={thumb}
                    />
                </S.Cover>
            </Link>

            <Link href="/video/[...slug]" as={`/video/${slug}`} passHref legacyBehavior>
                <S.Details>
                    <h1>{item.snippet.title}</h1>

                    <LazyMD>
                        {description}
                    </LazyMD>
                </S.Details>
            </Link>
        </S.ItemContainer>
    )
}
