import { readFile } from 'fs/promises';

export async function readJson<T>(filepath: string): Promise<T> {
    const file = await readFile(filepath)
        .then(buf => JSON.parse(buf.toString()) as T)
        .catch(() => null);

    return file as T;
}
