import { Skeleton } from "@jeanmolossi/ui";

export default function Loading() {
    return (
        <div className="max-w-screen-lg flex flex-col gap-6 min-h-[70vh] mx-auto justify-center py-8">
            <div className="flex flex-col gap-2">
                <Skeleton className="w-[440px] h-8" />
                <Skeleton className="w-[100px] h-4" />
            </div>

            <div className="flex flex-col gap-2">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-[140px] h-4" />
            </div>

            <div className="flex flex-col gap-2">
                <Skeleton className="w-full h-4" />
            </div>

            <div className="flex flex-col gap-2">
                <Skeleton className="w-[min(600px,100%)] h-4" />
                <Skeleton className="w-[min(768px,100%)] h-4" />
            </div>

            <div className="flex flex-col gap-2">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-[140px] h-4" />
            </div>

            <div className="flex flex-col gap-2">
                <Skeleton className="w-full h-4" />
            </div>

            <div className="flex flex-col gap-2">
                <Skeleton className="w-[min(600px,100%)] h-4" />
                <Skeleton className="w-[min(768px,100%)] h-4" />
            </div>

            <div className="flex flex-col gap-2">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-[140px] h-4" />
            </div>

            <div className="flex flex-col gap-2">
                <Skeleton className="w-full h-4" />
            </div>

            <div className="flex flex-col gap-2">
                <Skeleton className="w-[min(600px,100%)] h-4" />
                <Skeleton className="w-[min(768px,100%)] h-4" />
            </div>
        </div>
    )
}
