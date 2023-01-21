export const gtag = {
    GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
    GTM_TRACKING_TAG: process.env.NEXT_PUBLIC_GTM_TRACKING_TAG,
};

export const social = {
    github: 'https://github.com/jeanmolossi',
    twitter: 'https://twitter.com/jeanmolossi',
    linkedin: 'https://www.linkedin.com/in/jean-carlos-molossi-512098126/',
    youtube: 'https://www.youtube.com/channel/UCWQyi_jJN_C-yVffPleNlaQ',
    telegram: 'https://t.me/jeanmolossi',
    instagram: 'https://instagram.com/jeancarlosmolossi',
} as const;

export const article = {
    per_page: 2
}
