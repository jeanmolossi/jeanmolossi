import { getCourses } from '@/lib/api/repositories/courses/get-courses';
import { getLesson } from '@/lib/api/repositories/courses/get-lessons';
import '@/presentation/helpers/index';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const courses = await getCourses();

    const coursesWithLessons = await Promise.all(
        courses.map(async course => {
            const courseLessons = await Promise.all(course.contents.lessons.map(getLesson));

            return {
                ...course,
                contents: {
                    ...course.contents,
                    lessons: courseLessons,
                },
            };
        }),
    );

    let lessonsSiteMap: any[] = [];
    const coursesSiteMap = coursesWithLessons.map(course => {
        course.contents.lessons.forEach(lesson => {
            lessonsSiteMap.push({
                ...url({ url: baseUrl(lesson._links._self!), changeFrequency: 'yearly' }),
            });
        });

        return {
            ...url({
                url: baseUrl(course._links._self!),
            }),
        };
    });

    return [
        { ...url({ priority: 1, changeFrequency: 'yearly' }) },
        { ...url({ url: baseUrl('/cursos') }) },
        { ...url({ url: baseUrl('/contato'), changeFrequency: 'yearly' }) },
        ...lessonsSiteMap,
        ...coursesSiteMap,
    ];
}

function baseUrl(path: string) {
    if (path.substring(0, 1) !== '/') path = '/' + path;

    return `${process.env.BASE_URL || 'https://jeanmolossi.com.br'}${path}`;
}

type Route = MetadataRoute.Sitemap[0];

function url(route: Partial<Route>) {
    const result: Route = {
        url: baseUrl('/'),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
        ...route,
    };

    return result;
}
