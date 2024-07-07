import Container from "@/presentation/components/_layout/container";
import { AspectRatio, Skeleton } from "@jeanmolossi/ui";
import styles from './artigo.module.css';

export default function Loading() {
    return(
        <Container className="my-6 max-w-5xl mx-auto">
            <article className={styles.article}>
                <AspectRatio ratio={16 / 9}>
                    <Skeleton className="w-full h-full" />
                </AspectRatio>

                <Skeleton className="h-9 w-[min(580px,100%)]" />
                <Skeleton className="h-7 w-[min(780px,100%)]" />

                <div className={styles.metadata}>
                    <div className="text-muted-foreground">
                        <div className="flex gap-2 items-center">
                            <Skeleton className="h-2 w-[180px]" />
                            <small> &#8226; </small>
                            <Skeleton className="h-2 w-[180px]" />
                        </div>

                        <div className="flex gap-2">
                            <Skeleton className="w-32 h-4" />
                            <Skeleton className="w-30 h-4" />
                            <Skeleton className="w-28 h-4" />
                        </div>
                    </div>

                    <div className={styles.author}>
                        <Skeleton className="rounded-full w-24 h-24" />

                        <div className={styles.author_infos}>
                            <Skeleton className="h-4 w-[200px]" />

                            <div className="flex gap-4">
                                <Skeleton className="w-5 h-5" />
                                <Skeleton className="w-5 h-5" />
                                <Skeleton className="w-5 h-5" />
                                <Skeleton className="w-5 h-5" />
                                <Skeleton className="w-5 h-5" />
                                <Skeleton className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>

                <Skeleton className="h-8 w-[min(100%,500px)]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[min(100%,320px)]" />
            </article>
        </Container>
    )
}
