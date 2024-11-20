import { VideoComponent } from '@/app/components/video-wrapper/server-video';
import { getLessonBySlug } from '@/lib/api/repositories/courses/get-lessons';
import { formatDuration } from '@/lib/helpers/format-duration';
import { Breadcrumb } from '@/ui/breadcrumb';
import { Typography } from '@jeanmolossi/ui';
import { ArrowLeftCircle, ArrowRightCircle, Clock, PlayCircle } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface LessonPageProps {
    params: Promise<{
        slug: string;
        lesson_slug: string;
    }>;
}

export async function generateMetadata(props: LessonPageProps): Promise<Metadata> {
    const { slug, lesson_slug } = await props.params;

    const lesson = await getLessonBySlug(slug, lesson_slug);
    if (!lesson) {
        return notFound();
    }

    let title = lesson.title;
    if (title.length > 60) title = lesson.title.trimAfter(60, '');
    else if (title.length + ' | Jean Molossi'.length <= 60)
        title = [lesson.title, 'Jean Molossi'].join(' | ');

    return {
        title,
        description: `Aula ${title}`,
        authors: [{ name: 'Jean Molossi', url: 'https://jeanmolossi.com.br' }],
        creator: 'Jean Molossi',
        publisher: 'Jean Molossi',
        openGraph: {
            type: 'video.episode',
            images: [lesson.thumbnail],
            url: `https://jeanmolossi.com.br/${lesson._links._self}`,
            title,
            description: `Aula ${title}`,
        },
    };
}

export default async function LessonPage({ params }: LessonPageProps) {
    const { slug, lesson_slug } = await params;

    const lesson = await getLessonBySlug(slug, lesson_slug);
    if (!lesson) {
        return notFound();
    }

    return (
        <div className="max-w-screen-xl flex flex-col gap-8 w-full mx-auto">
            <Typography variant="h1" asChild center>
                <h1>{lesson.title}</h1>
            </Typography>

            <Typography className="flex gap-4 items-center">
                <Breadcrumb href="/cursos" label="cursos" />
                <Breadcrumb href={lesson._links._course!} label={lesson.course.title} />
            </Typography>

            <hr className="my-10" />

            <div className="grid grid-cols-1 gap-4 items-center">
                <Suspense
                    fallback={
                        <div className="flex flex-col items-center justify-center w-full aspect-video animate-pulse bg-muted-foreground rounded">
                            <div className="sr-only">Carregando vídeo...</div>
                            <PlayCircle size={72} />
                        </div>
                    }
                >
                    <VideoComponent videoId={lesson.videoID} />
                </Suspense>

                <div className="flex gap-4 items-center justify-between border-b border-muted-foreground/10 pb-4">
                    <Typography variant="h4" className="font-sans">
                        Sobre a aula
                    </Typography>

                    <div className="flex gap-4 items-center">
                        <Typography variant="small" asChild>
                            <span className="flex gap-1 items-center">
                                <Clock className="inline" size={16} />
                                {formatDuration(lesson.contents.total_lesson_time)}
                            </span>
                        </Typography>

                        <Typography variant="small" asChild>
                            <span className="flex gap-1 items-center">
                                <Clock className="inline" size={16} />
                                {lesson.contents.level}
                            </span>
                        </Typography>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="flex ">
                        {lesson._links._previous && (
                            <Link
                                href={lesson._links._previous}
                                className="flex gap-2 items-center border rounded-md p-6 text-muted-foreground bg-primary/5 hover:text-primary hover:border-primary hover:bg-primary/10 hover:drop-shadow-md transition-all"
                            >
                                <ArrowLeftCircle />
                                Aula anterior
                            </Link>
                        )}
                    </div>

                    <div className="flex justify-end">
                        {lesson._links._next && (
                            <Link
                                href={lesson._links._next}
                                className="flex gap-2 items-center border rounded-md p-6 text-muted-foreground bg-primary/5 hover:text-primary hover:border-primary hover:bg-primary/10 hover:drop-shadow-md transition-all"
                            >
                                Proxima aula
                                <ArrowRightCircle />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
