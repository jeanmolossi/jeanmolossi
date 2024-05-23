import { PropsWithChildren } from "react";

interface PageHeadingProps extends PropsWithChildren {}

export default function PageHeading({ children }: PageHeadingProps) {
    return (
        <div className="inline-flex flex-col lg:flex-row w-full">{children}</div>
    )
}
