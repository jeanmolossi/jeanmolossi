import Container from "@/presentation/components/_layout/container";

export default function Loading() {
    return (
        <Container className="py-4">
            <div className="animate-pulse flex flex-col items-stretch gap-4 w-full">
                <div className="aspect-video bg-neutral-700 rounded-md"></div>

                <div className="h-10 w-[min(512px,100%)] bg-neutral-700 rounded-full"></div>

                <div className="h-4 w-full bg-neutral-700 rounded-full"></div>
                <div className="h-4 w-full bg-neutral-700 rounded-full"></div>

                <div className="h-4 w-full bg-neutral-700 rounded-full"></div>
                <div className="h-4 w-56 bg-neutral-700 rounded-full -mt-2"></div>

                <div className="h-4 w-full bg-neutral-700 rounded-full"></div>
                <div className="h-4 w-64 bg-neutral-700 rounded-full -mt-2"></div>

                <div className="h-4 w-full bg-neutral-700 rounded-full"></div>
                <div className="h-4 w-full bg-neutral-700 rounded-full"></div>
            </div>
        </Container>
    )
}
