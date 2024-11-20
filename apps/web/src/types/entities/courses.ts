import { Lesson } from '@/types/entities/lessons';

interface CourseBase {
    id: string;
    slug: string;
    title: string;
    cover: string;
    highlight: boolean;
    created_at: number;
    _links: Record<'_self' | '_previous' | '_next', string | null>;
}

interface Course extends CourseBase {
    contents: CourseContents;
}

interface CourseContentsBase {
    total_lesson_time: number;
    level: string;
}

interface CourseContents extends CourseContentsBase {
    lessons: string[];
}

interface CourseContentsWithLesson extends CourseContentsBase {
    lessons: Lesson[];
}

interface CourseItem extends CourseBase {
    contents: CourseContentsWithLesson;
}

export type { Course, CourseItem };
