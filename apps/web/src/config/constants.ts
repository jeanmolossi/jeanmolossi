import { NextConfig } from 'next';
import { ImageConfig, RemotePattern } from 'next/dist/shared/lib/image-config';
import { z } from 'zod';

export const gtag = {
    GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
    GTM_TRACKING_TAG: process.env.NEXT_PUBLIC_GTM_TRACKING_TAG,
};

export const social = {
    github: 'https://github.com/jeanmolossi?utm_source=portfolio',
    twitter: 'https://twitter.com/jeanmolossi?utm_source=portfolio',
    linkedin: 'https://www.linkedin.com/in/jean-carlos-molossi-512098126/?utm_source=portfolio',
    youtube: 'https://www.youtube.com/channel/UCWQyi_jJN_C-yVffPleNlaQ?utm_source=portfolio',
    telegram: 'https://t.me/jeanmolossi?utm_source=portfolio',
    instagram: 'https://instagram.com/jeancarlosmolossi?utm_source=portfolio',
} as const;

export const article = {
    per_page: 30,
};

export const youtube = {
    per_page: 2,
};

export const App = () => {
    // if (process.env.NODE_ENV === 'production') return {} as any;

    return z
        .object({
            NEXT_PUBLIC_DEV_TO_BASE_URL: z.string().min(1).url(),
            NEXT_PUBLIC_GA_TRACKING_ID: z.string().min(1),
            NEXT_PUBLIC_GTM_TRACKING_TAG: z.string().min(1),
        })
        .parse(process.env);
};

export const Api = () => {
    // if (process.env.NODE_ENV === 'production') return {} as any;

    return z
        .object({
            BASE_URL: z.string().min(1).url(),
            STRAPI_URL: z.string().min(1).url(),
            STRAPI_AUTH_TOKEN: z.string().min(1),

            DEV_TO_BASE_URL: z.string().min(1).url(),
            DEV_TO_API_KEY: z.string().min(1),

            YOUTUBE_V3_API: z.string().min(1).url(),
            YOUTUBE_API_KEY: z.string().min(1),
            YOUTUBE_CHAN_ID: z.string().min(1),

            TELEGRAM_BOT_TOKEN: z.string().refine(v => /[0-9]{9,10}:[a-zA-Z_0-9]{34}/.test(v), {
                message: 'TELEGRAM_BOT_TOKEN invalid',
            }),
            TELEGRAM_MY_ID: z.string().length(9),

            PRIVATE_KEY: z.string().min(1),
            PUBLIC_KEY: z.string().min(1),
            SECRET: z.string(),
        })
        .parse(process.env);
};
