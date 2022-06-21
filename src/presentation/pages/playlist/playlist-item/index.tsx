import { PlaylistItem as PlaylistItemModel } from "@/domain/entities/youtube/view";
import { MarkdownProps } from "@/presentation/components";
import { useMediaQuery } from "@/presentation/hooks";
import dynamic from "next/dynamic";
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

    return (
        <S.ItemContainer>
            <Link href="/video/[...slug]" as={`/video/${slug}`} passHref>
                <S.Cover>
                    <img src={item.snippet.thumbnails.medium.url} />
                </S.Cover>
            </Link>

            <Link href="/video/[...slug]" as={`/video/${slug}`} passHref>
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
