import { Lesson } from '@/types/entities/lessons';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { getCourseBySlug } from './get-courses';
import { readJson } from './utils';

const JSON_DB_PATH = resolve(process.cwd(), 'src/lib/api/database');

export async function readLessonFile<T>(filepath: string) {
    const lessonFile = await readFile(filepath, { encoding: 'utf8' })
        .then(buf => JSON.parse(buf.toString()) as T)
        .catch(() => null);

    return lessonFile as T;
}

export async function getLesson(filename: string) {
    return readLessonFile<Lesson>(`${JSON_DB_PATH}/${filename}`);
}

export async function getLessonBySlug(courseSlug: string, lessonSlug: string) {
    const courseFile = await getCourseBySlug(courseSlug);

    if (!courseFile) {
        return null;
    }

    function createAsyncIterator() {
        let index = 0;
        let done = false;

        return {
            next: async () => {
                if (index >= courseFile!.contents.lessons.length) {
                    return { value: null, done: true };
                }

                const filename = courseFile?.contents.lessons[index++];
                const lesson = await readJson<Lesson>(`${JSON_DB_PATH}/${filename}`);
                done = lesson?.slug === lessonSlug;

                return { value: lesson, done };
            },
        };
    }

    const iterator = createAsyncIterator();

    let result: { value: Lesson | null; done: boolean };
    do {
        result = await iterator.next();
        if (result.done) {
            break;
        }
    } while (!result.done);

    return result.value;
}
