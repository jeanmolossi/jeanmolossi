import { PropsWithChildren } from "react";

interface PageHeadingProps extends PropsWithChildren {}

export default function PageHeading({ children }: PageHeadingProps) {
    return (
        <div>{children}</div>
    )
}
