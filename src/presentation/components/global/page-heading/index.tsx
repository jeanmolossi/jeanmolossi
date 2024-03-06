import { PropsWithChildren } from "react";

interface PageHeadingProps extends PropsWithChildren {
    subheading?: string;
}

export default function PageHeading({ children, subheading }: PageHeadingProps) {
    return (
        <>
            <h1 className="text-7xl font-bold leading-loose">{children}</h1>
            {!!subheading && (
                <h2 className='text-lg font-medium text-gray-500'>{subheading}</h2>
            )}
        </>
    )
}
