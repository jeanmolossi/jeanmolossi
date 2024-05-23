import { ComponentType } from "react";

interface RenderIfProps {
    condition: boolean;
    children: React.ReactNode;
}

export const RenderIf = ({ condition, children }: RenderIfProps) => {
    if (condition) {
        return <>{children}</>
    }

    return null
}

// @ts-ignore
export function NoSsrComponent<T>(Component: ComponentType<T>): ComponentType<T> {
    if (typeof window === 'undefined') {
        return (props: T) => null
    }

    // @ts-ignore
    return (props: T) => <Component {...props} />
}
