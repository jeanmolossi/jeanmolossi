import { ImageLoader } from 'next/legacy/image';

export const cdnLoader: ImageLoader = ({ src, width, quality }) =>
    `${src}?w=${width}&q=${quality}`;
