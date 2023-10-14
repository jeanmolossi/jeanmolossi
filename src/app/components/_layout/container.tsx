import { HtmlHTMLAttributes } from "react";

interface ContainerProps extends HtmlHTMLAttributes<HTMLDivElement> {}

export default function Container({
    children,
    className = '',
    ...rest
}: ContainerProps) {
    return (
        <div {...rest} className={['w-full max-w-7xl px-6 xl:p-0', className].join(' ')}>
            {children}
        </div>
    )
}
