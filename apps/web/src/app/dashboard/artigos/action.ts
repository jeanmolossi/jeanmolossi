'use server';

import prisma from '@/lib/prisma';

export async function getArticles({ offset = 0, limit = 10 }) {
    const data = await prisma.article.findMany({
        take: limit,
        skip: offset,
        include: {
            tags: {
                include: { tag: true },
            },
        },
    });

    return data;
}
