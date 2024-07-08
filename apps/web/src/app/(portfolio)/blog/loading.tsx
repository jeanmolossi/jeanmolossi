import { CardSkeleton } from "@/app/(portfolio)/_components/card.skeleton";
import { Skeleton } from "@jeanmolossi/ui";

export default function Loading() {
    return (
        <div className="my-12 py-6 flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 lg:gap-0 p-8 lg:p-0">
                <Skeleton className="h-[72px] w-[320px]" />

                <div className="flex flex-col justify-end items-end gap-2">
                    <Skeleton className="h-10 w-[238px]" />
                    <Skeleton className="h-4 w-[80px]" />
                </div>
            </div>

            <Skeleton className="h-4 w-[280px] ml-8 lg:ml-0" />

            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
        </div>
    )
}

