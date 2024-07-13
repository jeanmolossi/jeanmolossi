'use server';

import prisma from '@/lib/prisma';
import { createClient } from '@/lib/supabase/ssr-server';
import { encode, isBlurhashValid } from 'blurhash';
import { redirect } from 'next/navigation';
import sharp from 'sharp';
import slugify from 'slugify';

interface ArticleObject {
    title: string;
    subtitle: string;
    cover: File;
    article: string;
    read_time: string;
    tags: string;
    save: 'save' | 'publish';
}

const ARTICLES_URL = '/dashboard/artigos';
const ERROR_URL = ARTICLES_URL + '?error';

export async function submit(formData: FormData) {
    const supabase = createClient();
    console.log(Object.fromEntries(formData.entries()));

    const article: ArticleObject = Object.fromEntries(formData.entries()) as any;

    const fileExtension = article.cover.name.split('.').at(1);
    const slug = slugify(article.title, { lower: true, trim: true });
    const coverPath = `${slug}/cover.${fileExtension}`;

    const blurhashPromise = getBlurhashPreview(article.cover).catch(err => {
        console.error(err);
        return { blurhash: null };
    });

    const { error } = await supabase.storage.from('media').upload(coverPath, article.cover, {
        cacheControl: '86400', // 24h
    });

    if (error) {
        console.error(error);
        return redirect(
            `${ERROR_URL}=${encodeURIComponent('Mídia do artigo duplicada, tente outro título')}`,
        );
    }

    const tags = article.tags.split(',').map(tag => ({
        name: tag.trim(),
        slug: slugify(tag.trim(), { lower: true, trim: true }),
    }));

    const { blurhash } = await blurhashPromise;

    const inserted = await prisma.article
        .create({
            data: {
                title: article.title,
                subtitle: article.subtitle,
                content: article.article,
                reading_time: parseInt(article.read_time),
                slug,
                cover: coverPath,
                blurhash,
                tags: {
                    create: tags.map(tag => ({
                        tag: {
                            connectOrCreate: {
                                create: tag,
                                where: { slug: tag.slug },
                            },
                        },
                    })),
                },
                published_at: article.save === 'publish' ? new Date() : null,
            },
        })
        .then(data => ({ data, error: null }))
        .catch(err => ({ error: err, data: null }));

    if (inserted.error) {
        console.error(inserted.error);
        return redirect(`${ERROR_URL}=${encodeURIComponent('Não foi possível inserir o artigo')}`);
    }

    return redirect(`${ARTICLES_URL}/${inserted.data?.id}`);
}

async function getBlurhashPreview(file: File) {
    const image = sharp(await file.arrayBuffer());
    const dimensions = await image.metadata();

    return new Promise<{ blurhash: string; width: number; height: number }>((resolve, reject) => {
        const { width = 447, height = 251 } = dimensions;
        image
            .raw()
            .ensureAlpha()
            .toBuffer((err, buffer) => {
                if (err) {
                    reject(err);
                    return;
                }

                const blurhash = encode(new Uint8ClampedArray(buffer), width!, height!, 4, 4);
                if (isBlurhashValid(blurhash)) {
                    resolve({ blurhash, width, height });
                } else {
                    reject(new Error('invalid blurhash'));
                }
            });
    });
}
