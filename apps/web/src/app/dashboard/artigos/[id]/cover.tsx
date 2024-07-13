'use client';

import AspectRatioCover from "@/presentation/components/global/aspect-ratio-cover";

type Props = Parameters<typeof AspectRatioCover>[number];

export default async function Cover({ ...props }: Props) {
    return (
        <AspectRatioCover
            loader={({ src }) => src}
            {...props}
        />
    )
}
