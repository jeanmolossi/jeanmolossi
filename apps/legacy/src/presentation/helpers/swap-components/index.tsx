import { ReactNode } from "react";

export interface SwapComponentsProps {
    condition: boolean;
    componentIfConditionTrue: ReactNode;
    componentIfConditionFalse: ReactNode;
}

export const SwapComponents = ({
    condition,
    componentIfConditionFalse,
    componentIfConditionTrue
}: SwapComponentsProps) => {
    if (condition === true) {
        return <>{componentIfConditionTrue}</>
    }

    return <>{componentIfConditionFalse}</>
}