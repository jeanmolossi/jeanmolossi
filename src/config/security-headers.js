const defaultSrc = [
    "'self'",
    "https://www.googletagmanager.com/",
    "https://www.google-analytics.com/",
    "https://*.us-east-1.amazonaws.com/",
    "https://*.hotjar.com/",
    "https://i.ytimg.com/",
    "'unsafe-inline'"
]

const scriptSrc = [
    "'self'",
    "https://www.googletagmanager.com/",
    "https://*.hotjar.com/",
    "https://*.us-east-1.amazonaws.com/",
    "https://translate.google.com/",
    "'unsafe-inline'",

    // development
    "http://localhost:3000",
    process.env.NODE_ENV !== "production"
        ? "'unsafe-eval'" : undefined,
]

const childSrc = [
    "'self'",
    "https://www.youtube.com/",
    "https://*.hotjar.com/"
]

const styleSrc = [
    "'self'",
    "https://fonts.googleapis.com/",
    "'unsafe-inline'"
]

const fontSrc = [
    "'self'",
    "https://fonts.gstatic.com/",
]

const imgSrc = [
    "'self'",
    "https://jeanmolossi.com.br/",
    "https://i.ytimg.com/",
    "data:",
]

const ContentSecurityPolicy = `
  connect-src ${defaultSrc.join(' ')};
  default-src ${defaultSrc.join(' ')};
  script-src-elem ${scriptSrc.join(' ')};
  script-src ${scriptSrc.join(' ')};
  child-src ${childSrc.join(' ')};
  style-src-elem ${styleSrc.join(' ')};
  font-src ${fontSrc.join(' ')};
  img-src ${imgSrc.join(' ')};
`

module.exports = [
    {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
    },
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
    },
    {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
    },
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    },
    {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin',
    },
    {
        key: 'Content-Security-Policy',
        value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
    }
];
