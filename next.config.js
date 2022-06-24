/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    images: {
        domains: [
            'res.cloudinary.com',
            's3.amazonaws.com',
        ]
    },
    devIndicators: {
        autoPrerender: false,
    },
}

module.exports = nextConfig
