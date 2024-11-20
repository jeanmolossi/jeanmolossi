import { readdir, readFile, writeFile } from 'fs/promises';
import { DB_PATH } from './config';
import { readJson, writeJson } from './utils';

const COURSE_FILE_REGEX = /^course\-/i;

export async function retrieveCourseFiles(): Promise<string[]> {
    const files = await readdir(DB_PATH);
    return files.flatMap(file => (COURSE_FILE_REGEX.test(file) ? [file] : []));
}

export async function generateCourse() {
    const courses = await retrieveCourseFiles();

    const previousCourse = courses.length === 0 ? null : courses.at(courses.length - 1);
    let _previous = null;
    if (previousCourse) {
        const readCourse = await readJson(previousCourse);

        if (readCourse.title === 'Course title') {
            console.error(`O curso '${previousCourse}' ainda esta com valores padrao!`);
            console.warn(readCourse);
            return;
        }

        _previous = `/curso/${readCourse.slug}`;
    }

    const course = {
        id: `${courses.length + 1}`,
        slug: 'course-title',
        title: 'Course title',
        cover: 'https://i.ytimg.com/vi/{ videoID }/sddefault.jpg',
        highlight: false,
        contents: {
            total_lesson_time: 0,
            lessons: [],
            level: 'iniciante',
        },
        created_at: Date.now(),
        _links: {
            _self: '/curso/course-title',
            _previous,
            _next: null,
        },
    };

    const filename = `course-${Date.now()}.json`;
    await writeJson(filename, course);
    console.log(`Curso adicionado: ${DB_PATH}/${filename}`);
}
