import { getCourses } from '@/lib/api/repositories/courses/get-courses';
import { formatDuration } from '@/lib/helpers/format-duration';
import Card from '@/ui/card';
import { Button, Typography } from '@jeanmolossi/ui';
import { Book, Clock } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { GiSkills } from 'react-icons/gi';

export const metadata: Metadata = {
    title: 'Cursos | Vídeo aulas',
    description: 'Aprenda em projetos práticos comigo',
};

export default async function Page() {
    const courses = await getCourses();

    return (
        <div className="p-8 gap-4 flex flex-col max-w-screen-xl mx-auto w-full">
            <Typography variant="h1" center asChild>
                <h1>Cursos</h1>
            </Typography>

            <hr className="my-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map(course => (
                    <Card
                        key={course.id}
                        highlight={course.highlight}
                        className="animate-slide-up-fade [animation-duration:1.3s] [animation-fill-mode:both]"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-[140px,_auto] place-items-center h-full">
                            <Image
                                alt="Capa"
                                src={{
                                    src: course.cover,
                                    width: 160,
                                    height: 80,
                                }}
                                className="rounded"
                            />

                            <div className="grid-cols-1 grid gap-2 p-2">
                                <Typography variant="h5" asChild>
                                    <h2 className="leading-6">{course.title}</h2>
                                </Typography>

                                <div className="grid grid-cols-[2fr,1fr] gap-2">
                                    <Typography
                                        variant="xsmall"
                                        className="flex items-center gap-1"
                                    >
                                        <Book size={12} className="inline" />
                                        {switchSingularPlural(course.contents.lessons.length, [
                                            'aula',
                                            'aulas',
                                        ])}
                                    </Typography>
                                    <Typography
                                        variant="xsmall"
                                        className="flex items-center gap-1"
                                    >
                                        <GiSkills size={12} className="inline" />
                                        {course.contents.level}
                                    </Typography>
                                    <Typography
                                        variant="xsmall"
                                        className="flex items-center gap-1"
                                    >
                                        <Clock size={12} className="inline" />
                                        {formatDuration(course.contents.total_lesson_time)}
                                    </Typography>
                                </div>

                                <Button variant="link" size="sm" asChild className="py-0 h-fit">
                                    <Link href={course._links._self!}>Detalhes</Link>
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

function switchSingularPlural(total: number, pronouns: [string, string]) {
    const [singular, plural] = pronouns;
    if (!total) {
        return `sem ${singular}`;
    }

    if (total === 1) {
        return `${total} ${singular}`;
    }

    return `${total} ${plural}`;
}
