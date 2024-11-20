import { Course } from '@/types/entities/courses';
import { readdir, readFile } from 'fs/promises';
import { resolve } from 'path';
import { readJson } from './utils';

const JSON_DB_PATH = resolve(process.cwd(), 'src/lib/api/database');
const COURSE_FILE_REGEX = /^course\-/i;

async function retrieveCourseFiles(): Promise<string[]> {
    const files = await readdir(JSON_DB_PATH);
    const coursesFiles = files.flatMap(file => (COURSE_FILE_REGEX.test(file) ? [file] : []));
    return coursesFiles;
}

export async function getCourses(): Promise<Course[]> {
    const coursesFiles = await retrieveCourseFiles();

    return Promise.all(
        coursesFiles.map(async file => {
            return await readJson<Course>(`${JSON_DB_PATH}/${file}`);
        }),
    ).then(list => list.reverse());
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
    const courseFilesPromise = retrieveCourseFiles();

    function createAsyncIterator() {
        let index = 0;
        let done = false;

        return {
            next: async () => {
                const courseFiles = await courseFilesPromise;
                if (index >= courseFiles.length) {
                    return { value: null, done: true };
                }

                const courseFile = await readJson<Course>(
                    `${JSON_DB_PATH}/${courseFiles[index++]}`,
                );

                done = courseFile.slug === slug;
                return { value: courseFile, done };
            },
        };
    }

    const iterator = createAsyncIterator();

    let result: { value: Course | null; done: boolean };
    do {
        result = await iterator.next();
        if (result.done) {
            break;
        }
    } while (!result.done);

    return result.value;
}
