import { readFile, writeFile } from 'fs/promises';
import { DB_PATH } from './config';

export function slugify(text: string): string {
    return text
        .replace(/[!@#$%^&*\s()]+/i, '-')
        .replace(/^-(.*)/g, '$1')
        .replace(/(.*)-$/g, '$1')
        .replace(/[\-\s]+/g, '-')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

export async function readJson(filename: string) {
    return await readFile(`${DB_PATH}/${filename}`, { encoding: 'utf8' }).then(buf =>
        JSON.parse(buf.toString()),
    );
}

export async function writeJson(filename: string, body: object) {
    return await writeFile(`${DB_PATH}/${filename}`, JSON.stringify(body, null, 4));
}

export async function updateJson(filename: string, cb: (currentData: any) => any) {
    const currentFile = await readJson(filename);
    const newBody = cb(currentFile);
    return writeJson(filename, newBody);
}
