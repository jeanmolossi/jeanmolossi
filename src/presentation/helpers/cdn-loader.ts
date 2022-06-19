import { ImageLoader } from 'next/image';

export const cdnLoader: ImageLoader = ({ src, width, quality }) =>
    `${src}?w=${width}&q=${quality}`;
