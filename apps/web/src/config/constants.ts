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
