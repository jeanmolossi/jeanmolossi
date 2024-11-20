#!/usr/bin/env -S ts-node --transpileOnly

import { contentType } from './content-generator-cli/content-selector';
import { generateCourse } from './content-generator-cli/course';
import { generateLesson } from './content-generator-cli/lesson';
import { close } from './content-generator-cli/quiz';

async function createContent(content: string) {
    const generators: Record<string, Function> = {
        Course: generateCourse,
        Lesson: generateLesson,
    };

    const generator = generators[content];

    if (generator) {
        generator();
    }
}

async function main() {
    const content = await contentType();
    if (!content) {
        return;
    }

    await createContent(content);

    close();
}

main();
