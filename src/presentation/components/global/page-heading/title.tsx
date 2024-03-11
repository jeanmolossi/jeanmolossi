import { PropsWithChildren } from 'react';

interface HeadTitleProps extends PropsWithChildren {}

export const HeadTitle = ({ children }: HeadTitleProps) => {
    return <h1 className="text-7xl font-bold leading-loose">{children}</h1>;
};

interface HeadSubtitleProps extends PropsWithChildren {}

export const HeadSubtitle = ({ children }: HeadSubtitleProps) => {
    return <h2 className='text-lg font-medium text-gray-500'>{children}</h2>;
};
