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
    target: "serverless"
}

module.exports = nextConfig
