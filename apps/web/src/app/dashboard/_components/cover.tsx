'use client';

import Image from 'next/image';

export default function Cover({ title, src, blurhash }) {
    return (
        <Image
            alt={`${title}`}
            loader={({ src }) => src}
            src={{
                src,
                blurDataURL: blurhash || undefined,
                width: 320,
                height: 180,
            }}
            className='max-w-24 max-h-[54px] object-cover rounded'
        />
    );
}
