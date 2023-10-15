export default function Loading() {
    return (
        <div className="flex flex-col gap-2 max-w-7xl px-6 xl:-p0">
            <h2 className="h-10 bg-neutral-700 rounded-full w-56"></h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                <VideoSkeleton />
                <VideoSkeleton />
                <VideoSkeleton />
                <VideoSkeleton />
            </div>
        </div>
    )
}

function VideoSkeleton() {
    return (
        <div className="animate-pulse flex flex-col items-stretch gap-2 mb-4">
            <h2 className="h-9 bg-neutral-700 rounded-full w-full"></h2>
            <h2 className="h-9 bg-neutral-700 rounded-full w-48"></h2>

            <div className="flex items-center justify-center w-full bg-neutral-700 rounded aspect-video">
                <svg className="w-10 h-10 text-neutral-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                </svg>
            </div>

            <div className="w-full">
                <p className="h-2.5 bg-neutral-700 rounded-full w-60 mb-2"></p>
                <p className="h-2.5 bg-neutral-700 rounded-full mb-2"></p>
                <p className="h-2.5 bg-neutral-700 rounded-full w-56 mb-2"></p>
            </div>

            <div className="flex justify-end w-full">
                <div className="flex gap-2 items-center">
                    <div className="h-8 w-8 bg-neutral-700 rounded-md"></div>
                    <div className="h-2.5 w-28 bg-neutral-700 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}
