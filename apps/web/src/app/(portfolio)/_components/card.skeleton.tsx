import { Skeleton } from "@jeanmolossi/ui";

export function CardSkeleton() {
    return (
        <div className="flex flex-col gap-2 border border-muted rounded p-8">
            <Skeleton className="h-6 w-[min(100%,320px)]" />
            <Skeleton className="w-full h-[min(230px,30vh)]" />

            <div className="flex flex-col gap-2">
                <Skeleton className="h-2 w-16 mt-6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[min(100%,320px)]" />
                <Skeleton className="h-10 w-[242px]" />
            </div>
        </div>
    )
}
