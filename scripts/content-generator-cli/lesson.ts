import { readdir } from 'fs/promises';
import { retrieveCourseFiles } from './course';
import { questions } from './quiz';
import { DB_PATH } from './config';
import { readJson, slugify, updateJson, writeJson } from './utils';

const LESSON_FILE_REGEX = /^lesson\-/i;

export async function retrieveLessonFiles() {
    const files = await readdir(DB_PATH);
    return files.flatMap(file => (LESSON_FILE_REGEX.test(file) ? [file] : []));
}

export async function generateLesson() {
    const coursesFiles = await retrieveCourseFiles();

    if (coursesFiles.length === 0) {
        console.error('Adicione um curso primeiro!');
        return;
    }

    const coursesOptions = coursesFiles.reduce(
        (acc, filename, index) => {
            acc[`${index + 1}`] = filename;
            return acc;
        },
        {} as Record<string, string>,
    );

    const options = await questions([
        { question: 'Titulo da aula?' },
        {
            question: 'Para qual curso ?',
            validOptions: coursesOptions,
            abortInvalidOption: true,
        },
        { question: 'Tempo de aula? (Minutos)' },
        {
            question: 'Nivel',
            validOptions: {
                '1': 'Iniciante',
                '2': 'Intermediário',
                '3': 'Avançado',
            },
            abortInvalidOption: true,
        },
        { question: 'ID do video (youtube)' },
    ]);

    if (options.at(0) === 'quit') {
        return '';
    }

    const title = options.at(0)!,
        courseFilename = options.at(1)!,
        slug = slugify(title),
        videoID = options.at(4)!,
        lessonTime = parseInt(options.at(2)!),
        level = options.at(3)!;

    const courseFile = coursesFiles.find(file => file === courseFilename)!;

    const [course, lessonsFiles] = await Promise.all([readJson(courseFile), retrieveLessonFiles()]);

    const prevLesson = lessonsFiles.length === 0 ? null : lessonsFiles.at(lessonsFiles.length - 1);
    let _previous = null;
    if (prevLesson) {
        const prevLessonFile = await readJson(prevLesson);
        _previous = `/curso/${course.slug}/${prevLessonFile.slug}`;
    }

    const lesson = {
        id: `${lessonsFiles.length + 1}`,
        title,
        slug,
        thumbnail: `https://i.ytimg.com/vi/${videoID}/sddefault.jpg`,
        videoID,
        contents: {
            total_lesson_time: lessonTime,
            level,
        },
        course: {
            title: course.title,
        },
        created_at: Date.now(),
        _links: {
            _self: `/curso/${course.slug}/${slug}`,
            _course: `/curso/${course.slug}`,
            _previous,
            _next: null,
        },
    };

    const filename = `lesson-${Date.now()}.json`;

    await Promise.all([
        writeJson(filename, lesson),
        updateJson(courseFile, course_data => {
            course_data.contents.total_lesson_time += lessonTime;
            course_data.contents.lessons.push(filename);

            return course_data;
        }),
        prevLesson &&
            updateJson(prevLesson, lesson_data => {
                lesson_data._links._next = `/curso/${course.slug}/${slug}`;
                return lesson_data;
            }),
    ]);

    console.log(`Aula criada: ${DB_PATH}/${filename}`);
}
