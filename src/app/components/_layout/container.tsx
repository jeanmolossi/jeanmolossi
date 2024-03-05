import { HtmlHTMLAttributes } from "react";

interface ContainerProps extends HtmlHTMLAttributes<HTMLSelectElement> {}

export default function Container({
    children,
    className = '',
    ...rest
}: ContainerProps) {
    return (
        <section {...rest} className={['w-full max-w-screen-2xl px-6 xl:p-0', className].join(' ')}>
            {children}
        </section>
    )
}
