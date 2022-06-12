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