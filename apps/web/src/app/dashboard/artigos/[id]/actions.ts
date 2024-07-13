'use server';

import prisma from '@/lib/prisma';

export async function getArticleById(id: string) {
    const data = await prisma.article.findFirst({
        where: { id },
        include: {
            tags: {
                include: { tag: true },
            },
        },
    });

    return data;
}
