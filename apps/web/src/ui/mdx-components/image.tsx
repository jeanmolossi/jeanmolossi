import { cn } from '@jeanmolossi/utils';
import Image from 'next/image';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

const UNOPTIMIZED_EXTENSIONS_REGEX = /\.(gif|svg)/;

export default function Img(
    props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
) {
    const { src = '', className, alt = 'Alt text', ref: _, title = '', ...imgProps } = props;

    const isUnoptimized = UNOPTIMIZED_EXTENSIONS_REGEX.test(src);

    const srcObj = {
        src,
        width: 380,
        height: 380,
    };

    return (
        // @ts-expect-error some typing errors
        <Image
            className={cn('border rounded-md border-black/10 dark:border-white/10 p-2', className)}
            src={srcObj}
            alt={alt}
            unoptimized={isUnoptimized}
            title={title}
            {...imgProps}
        />
    );
}
