import { getCourseBySlug } from '@/lib/api/repositories/courses/get-courses';
import CoursePage from '../_components/page-tpl';
import { notFound } from 'next/navigation';
import { getLesson } from '@/lib/api/repositories/courses/get-lessons';
import { CourseItem } from '@/types/entities/courses';
import { Metadata } from 'next';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params;
    const course = await getCourseBySlug(params.slug);

    if (!course) {
        return notFound();
    }

    let title = course.title;
    if (title.length > 60) title = course.title.trimAfter(60, '');
    else if (title.length + ' | Jean Molossi'.length <= 60)
        title = [course.title, 'Jean Molossi'].join(' | ');

    return {
        title,
        description: `Curso ${title}`,
        authors: [{ name: 'Jean Molossi', url: 'https://jeanmolossi.com.br' }],
        creator: 'Jean Molossi',
        publisher: 'Jean Molossi',
    };
}

export default async function Page({ params }: PageProps) {
    const pathParams = await params;
    const course = await getCourseBySlug(pathParams.slug);
    if (!course) {
        return notFound();
    }

    const lessons = await Promise.all(course.contents.lessons.reverse().map(getLesson));

    const courseItem: CourseItem = {
        ...course,
        contents: {
            ...course.contents,
            lessons,
        },
    };

    return CoursePage({ course: courseItem });
}
