import { getCourseBySlug } from '@/lib/api/repositories/courses/get-courses';
import CoursePage from '../_components/page-tpl';
import { notFound } from 'next/navigation';
import { getLesson } from '@/lib/api/repositories/courses/get-lessons';
import { CourseItem } from '@/types/entities/courses';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
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
