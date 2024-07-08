import { Skeleton } from "@jeanmolossi/ui";
import { CardSkeleton } from "../_components/card.skeleton";

export default function Loading() {
    return (
        <div className="my-12 py-6 flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                <Skeleton className="h-[72px] w-[320px]" />

                <div className="flex flex-col lg:justify-end lg:items-end gap-2">
                    <Skeleton className="h-4 w-[238px] lg:hidden" />
                    <Skeleton className="h-10 w-full lg:w-[238px]" />
                    <Skeleton className="hidden lg:block h-4 w-[80px]" />
                </div>
            </div>

            <Skeleton className="h-4 w-[280px] hidden lg:block" />

            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
        </div>
    )
}

