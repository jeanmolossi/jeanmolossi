import { Course } from './courses';

interface LessonContents {
    total_lesson_time: number;
    level: string;
}

interface Lesson {
    id: string;
    title: string;
    slug: string;
    thumbnail: string;
    videoID: string;
    contents: LessonContents;
    created_at: number;
    course: {
        title: string;
    };
    _links: Record<'_self' | '_course' | '_previous' | '_next', string | null>;
}

export type { Lesson, LessonContents };
