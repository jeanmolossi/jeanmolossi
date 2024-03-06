import { cn } from "@/lib/helpers";
import { AspectRatio } from "@/presentation/components/ui/aspect-ratio";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { ImageProps } from "next/image";

interface AspectRatioCoverProps extends ImageProps {
    ratio?: number;
    alt: string;
    src: string | StaticImport
    prority?: boolean;
    wrapperClassName?: string;
}

export default function AspectRatioCover({
    ratio = 16 / 9,
    alt,
    src,
    prority = false,
    wrapperClassName,
    className,
    ...rest
}: AspectRatioCoverProps) {
    return (
        <AspectRatio ratio={ratio} className={cn('bg-muted', wrapperClassName)}>
            <Image
                alt={alt}
                src={src}
                priority={prority}
                fill
                className={cn('object-cover', className)}
                {...rest}
            />
        </AspectRatio>
    )
}
