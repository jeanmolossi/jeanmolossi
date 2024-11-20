import { formatDuration } from '@/lib/helpers/format-duration';
import { CourseItem } from '@/types/entities/courses';
import { Breadcrumb } from '@/ui/breadcrumb';
import Card from '@/ui/card';
import { Button, Typography } from '@jeanmolossi/ui';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { GiSkills } from 'react-icons/gi';

interface CoursePageProps {
    course: CourseItem;
}

export default function CoursePage({ course }: CoursePageProps) {
    return (
        <div className="max-w-screen-xl flex flex-col gap-8 w-full mx-auto">
            <Typography variant="h1" asChild center>
                <h1>{course.title}</h1>
            </Typography>

            <Typography className="flex gap-4 items-center">
                <Breadcrumb href="/cursos" label="cursos" />
            </Typography>

            <hr className="my-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {course.contents.lessons.map(lesson => (
                    <Card className="animate-slide-up-fade [animation-duration:1.3s] [animation-fill-mode:both]">
                        <div className="grid grid-cols-1 sm:grid-cols-[140px,_auto] place-items-center h-full">
                            <Image
                                alt={lesson.title}
                                src={{
                                    src: lesson.thumbnail,
                                    width: 160,
                                    height: 80,
                                }}
                                className="rounded"
                            />

                            <div className="grid-cols-1 grid gap-2 p-2">
                                <Typography variant="h5" asChild>
                                    <h2 className="leading-6">{lesson.title}</h2>
                                </Typography>

                                <div className="grid grid-cols-[2fr,1fr] gap-2">
                                    <Typography
                                        variant="xsmall"
                                        className="flex items-center gap-1"
                                    >
                                        <Clock size={12} className="inline" />
                                        {formatDuration(lesson.contents.total_lesson_time)}
                                    </Typography>
                                    <Typography
                                        variant="xsmall"
                                        className="flex items-center gap-1"
                                    >
                                        <GiSkills size={12} className="inline" />
                                        {lesson.contents.level}
                                    </Typography>
                                </div>

                                <Button variant="link" size="sm" asChild className="py-0 h-fit">
                                    <Link href={lesson._links._self!}>Detalhes</Link>
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
