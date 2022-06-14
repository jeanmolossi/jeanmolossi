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

export function NoSsrComponent<T>(Component: ComponentType<T>): ComponentType<T> {
    if (typeof window === 'undefined') {
        return (props: T) => null
    }

    return (props: T) => <Component {...props} />
}