import { PlaylistItem as PlaylistItemModel } from "@/domain/entities/youtube/view";
import { MarkdownProps } from "@/presentation/components";
import { cdnLoader } from "@/presentation/helpers";
import { useMediaQuery } from "@/presentation/hooks";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import * as S from './styles';

const LazyMD = dynamic(() => import("@/presentation/components/_layout/markdown").then(mod => mod.Markdown)) as FunctionComponent<MarkdownProps>

interface PlaylistItemProps {
    item: PlaylistItemModel;
}

export const PlaylistItem = ({ item }: PlaylistItemProps) => {
    const isUpMedia = useMediaQuery("(min-width: 768px)");

    const size: keyof typeof item.snippet.thumbnails = isUpMedia
            ? 'high'
            : 'medium'

    const slug = `${item.snippet.title.toSlug()}/${item.snippet.resourceId.videoId}`;

    const length = isUpMedia ? 250 : 350

    const description = item
        .snippet
        .description
        .nlToBr()
        .trimAfter(length, '... _**ver mais**_');

    const thumb = {
        src: item.snippet.thumbnails[size].url,
        width: 1280,
        height: 720
    }

    return (
        <S.ItemContainer>
            <Link href="/video/[...slug]" as={`/video/${slug}`} passHref legacyBehavior>
                <S.Cover>
                    <Image
                        alt={`Miniatura do vídeo ${item.snippet.title}`}
                        loader={ cdnLoader }
                        loading="lazy"
                        style={{ objectFit:"cover" }}
                        src={ thumb }
                        fill
                    />
                </S.Cover>
            </Link>

            <Link href="/video/[...slug]" as={`/video/${slug}`}>
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
